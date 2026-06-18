import os
import io
import time
import json
import logging
import pandas as pd
from fastapi import APIRouter, Query, HTTPException, UploadFile, File
from fastapi.responses import StreamingResponse
from typing import Optional, List
from app.schemas.dto import PipelineRunRequest, PipelineRunResponse, RuleDTO, ModuleRiskDTO
from app.services.pipeline_service import run_analytics_pipeline, run_analytics_pipeline_stream
from app.services.data_generator import generate_synthetic_data
from app.services.risk_engine import preprocess_transactions

router = APIRouter()
logger = logging.getLogger(__name__)

# In-memory store for rule outputs (acts as temporary repository)
_last_scan_rules: List[dict] = []
_last_scan_risks: List[dict] = []

@router.post("/run", response_model=PipelineRunResponse)
def run_scan(request: Optional[PipelineRunRequest] = None):
    """
    Executes the analytical mining pipeline and persists results in memory.
    """
    global _last_scan_rules, _last_scan_risks
    req_data = request.dict(exclude_none=True) if request else {}
    try:
        result = run_analytics_pipeline(**req_data)
        _last_scan_rules = result["rules"]
        _last_scan_risks = result["module_risk"]
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Pipeline execution error: {str(e)}")

@router.post("/upload")
async def upload_dataset(file: UploadFile = File(...)):
    """
    Uploads a CSV or JSON file, validates the schema, and saves it as uploaded_data.csv.
    """
    filename = file.filename.lower()
    content = await file.read()
    
    try:
        if filename.endswith(".csv"):
            df = pd.read_csv(io.BytesIO(content))
        elif filename.endswith(".json"):
            df = pd.read_json(io.BytesIO(content))
        else:
            raise HTTPException(status_code=400, detail="Unsupported file format. Please upload a CSV or JSON file.")
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to parse file: {str(e)}")
        
    # Schema validation
    required_cols = {"module", "subsystem", "language", "tech_stack", "bug_type", "severity"}
    missing = required_cols - set(df.columns)
    
    validation_status = "valid"
    validation_errors = []
    if missing:
        validation_status = "invalid"
        validation_errors.append(f"Missing required columns: {', '.join(missing)}")
        
    if df.empty:
        validation_status = "invalid"
        validation_errors.append("Dataset is empty.")
        
    # Preview data (first 10 records)
    records = df.head(10).to_dict(orient="records")
    preview_data = [{k: (None if pd.isna(v) else v) for k, v in r.items()} for r in records]
    total_rows = len(df)
    
    # Save the file to data/uploaded_data.csv if valid
    if validation_status == "valid":
        service_root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
        data_dir = os.path.join(service_root, "data")
        os.makedirs(data_dir, exist_ok=True)
        uploaded_path = os.path.join(data_dir, "uploaded_data.csv")
        df.to_csv(uploaded_path, index=False)
        
    return {
        "status": "success",
        "validation_status": validation_status,
        "errors": validation_errors,
        "total_rows": total_rows,
        "columns": list(df.columns),
        "preview": preview_data
    }

@router.get("/dataset-profile")
def get_dataset_profile(source: Optional[str] = Query("synthetic")):
    """
    Profiles the active dataset (either 'uploaded' or the 'synthetic' baseline)
    without requiring redundant re-uploads of files.
    """
    service_root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    data_dir = os.path.join(service_root, "data")
    uploaded_path = os.path.join(data_dir, "uploaded_data.csv")
    
    if source == "uploaded" and os.path.exists(uploaded_path):
        try:
            df = pd.read_csv(uploaded_path)
            profile_type = "uploaded"
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Failed to parse uploaded dataset: {str(e)}")
    else:
        # Fallback to generating synthetic dataset for baseline profile
        try:
            temp_path = os.path.join(data_dir, "synthetic_baseline.csv")
            os.makedirs(data_dir, exist_ok=True)
            df = generate_synthetic_data(temp_path, num_records=2000, seed=42)
            profile_type = "synthetic"
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Failed to generate baseline synthetic dataset: {str(e)}")

    rows = len(df)
    cols = list(df.columns)
    
    # Calculate nulls and duplicates
    duplicates = int(df.duplicated().sum())
    null_count = int(df.isnull().sum().sum())
    
    # Column completeness
    completeness = {}
    for col in cols:
        non_null = int(df[col].notnull().sum())
        completeness[col] = round((non_null / max(rows, 1)) * 100, 1)
        
    # Schema validation
    required_cols = {"module", "subsystem", "language", "tech_stack", "bug_type", "severity"}
    missing_columns = list(required_cols - set(cols))
    
    schema_violations = []
    unsupported_categories = []
    
    # Validate severity categories
    if "severity" in df.columns:
        valid_severities = {"critical", "high", "medium", "low"}
        invalid_sevs = df[~df["severity"].astype(str).str.lower().isin(valid_severities) & df["severity"].notnull()]["severity"].unique()
        if len(invalid_sevs) > 0:
            unsupported_categories.extend([f"severity={val}" for val in invalid_sevs])
            schema_violations.append(f"Severity column contains unsupported categories: {list(invalid_sevs)}")
            
    # Validate required columns present
    if missing_columns:
        schema_violations.append(f"Missing required columns: {missing_columns}")
        
    schema_status = "healthy" if not schema_violations else "violated"
    
    # Premium fully dynamic quality score formula (0-100)
    q_score = 100.0
    
    # 1. Deduct for duplicates relative to dataset size (nonlinear penalty scaling)
    if rows > 0:
        duplicate_ratio = duplicates / rows
        if duplicate_ratio <= 0.10:
            dup_penalty = duplicate_ratio * 30.0
        elif duplicate_ratio <= 0.30:
            dup_penalty = 3.0 + (duplicate_ratio - 0.10) * 85.0
        elif duplicate_ratio <= 0.50:
            dup_penalty = 20.0 + (duplicate_ratio - 0.30) * 100.0
        elif duplicate_ratio <= 0.70:
            dup_penalty = 40.0 + (duplicate_ratio - 0.50) * 60.0
        else:
            dup_penalty = min(100.0, 52.0 + (duplicate_ratio - 0.70) * 160.0)
        q_score -= dup_penalty
        
    # 2. Deduct for null/empty cells relative to total table cells (nonlinear penalty scaling)
    total_cells = rows * len(cols)
    if total_cells > 0:
        null_ratio = null_count / total_cells
        if null_ratio > 0.0:
            null_penalty = 12.0
            if null_ratio <= 0.05:
                null_penalty += null_ratio * 100.0
            elif null_ratio <= 0.15:
                null_penalty += 5.0 + (null_ratio - 0.05) * 200.0
            else:
                null_penalty += 25.0 + (null_ratio - 0.15) * 300.0
            q_score -= min(100.0, null_penalty)
        
    # 3. Deduct for missing required columns (30% penalty per missing column)
    q_score -= len(missing_columns) * 30.0
    
    # 4. Deduct for unsupported categories and schema violations (up to 20% penalty)
    total_violations = len(schema_violations) + len(unsupported_categories)
    q_score -= min(20.0, total_violations * 5.0)
    
    # Clamp score between 0 and 100
    quality_score = int(max(0.0, min(100.0, q_score)))
    
    # Frequencies
    severity_distribution = df["severity"].value_counts().to_dict() if "severity" in df.columns else {}
    module_frequency = df["module"].value_counts().head(10).to_dict() if "module" in df.columns else {}
    language_frequency = df["language"].value_counts().head(10).to_dict() if "language" in df.columns else {}
    tech_stack_frequency = df["tech_stack"].value_counts().head(10).to_dict() if "tech_stack" in df.columns else {}
    bug_type_frequency = df["bug_type"].value_counts().head(10).to_dict() if "bug_type" in df.columns else {}
    
    return {
        "status": "success",
        "profile_type": profile_type,
        "rows": rows,
        "duplicates": duplicates,
        "null_count": null_count,
        "quality_score": quality_score,
        "schema_status": schema_status,
        "completeness": completeness,
        "severity_distribution": severity_distribution,
        "module_frequency": module_frequency,
        "language_frequency": language_frequency,
        "tech_stack_frequency": tech_stack_frequency,
        "bug_type_frequency": bug_type_frequency,
        "quality_checks": {
            "missing_columns": missing_columns,
            "empty_values": null_count,
            "duplicate_rows": duplicates,
            "unsupported_categories": unsupported_categories,
            "schema_violations": schema_violations
        }
    }

@router.get("/stream")
def stream_scan(
    rows: Optional[int] = Query(None),
    seed: Optional[int] = Query(None),
    algorithm: Optional[str] = Query(None),
    support: Optional[float] = Query(None),
    confidence: Optional[float] = Query(None),
    lift: Optional[float] = Query(None),
    dataSource: str = Query("synthetic")
):
    """
    Server-Sent Events endpoint streaming defect mining steps in real time.
    """
    def event_stream():
        global _last_scan_rules, _last_scan_risks
        generator = run_analytics_pipeline_stream(
            rows=rows,
            seed=seed,
            algorithm=algorithm,
            support=support,
            confidence=confidence,
            lift=lift,
            dataSource=dataSource
        )
        for event in generator:
            if event.get("stage") == "COMPLETED" and "result" in event:
                res = event["result"]
                _last_scan_rules = res.get("rules", [])
                _last_scan_risks = res.get("module_risk", [])
            yield f"data: {json.dumps(event)}\n\n"
            
    return StreamingResponse(event_stream(), media_type="text/event-stream")

@router.post("/playground/compare")
def compare_playground(request: Optional[PipelineRunRequest] = None):
    """
    Executes both FP-Growth and Apriori under identical parameters and returns runtime comparison statistics.
    """
    req_data = request.dict(exclude_none=True) if request else {}
    rows = req_data.get("rows", 2500)
    seed = req_data.get("seed", 42)
    support = req_data.get("support", 0.03)
    confidence = req_data.get("confidence", 0.50)
    lift = req_data.get("lift", 1.2)
    dataSource = req_data.get("dataSource", "synthetic")
    
    service_root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    data_dir = os.path.join(service_root, "data")
    if dataSource == "uploaded":
        uploaded_path = os.path.join(data_dir, "uploaded_data.csv")
        if not os.path.exists(uploaded_path):
            raise HTTPException(status_code=400, detail="No uploaded dataset found. Please upload a dataset first.")
        df = pd.read_csv(uploaded_path)
    else:
        csv_path = os.path.join(data_dir, "synthetic_bug_data.csv")
        df = generate_synthetic_data(csv_path, num_records=rows, seed=seed)
        
    encoded_df, _ = preprocess_transactions(df)
    
    # 1. Benchmark FP-Growth
    from mlxtend.frequent_patterns import fpgrowth as ml_fpgrowth, apriori as ml_apriori, association_rules as ml_association_rules
    
    fpgrowth_itemsets_time = None
    fpgrowth_rules_time = None
    fpgrowth_total_time = None
    fpgrowth_rules_count = 0
    
    try:
        t0 = time.perf_counter()
        frequent_fpgrowth = ml_fpgrowth(encoded_df, min_support=support, use_colnames=True)
        raw_itemsets_time = (time.perf_counter() - t0) * 1000
        fpgrowth_itemsets_time = int(raw_itemsets_time)
        if fpgrowth_itemsets_time <= 0 and raw_itemsets_time > 0.0:
            fpgrowth_itemsets_time = 1
            
        t1 = time.perf_counter()
        rules_fpgrowth = ml_association_rules(frequent_fpgrowth, metric="lift", min_threshold=lift) if not frequent_fpgrowth.empty else pd.DataFrame()
        if not rules_fpgrowth.empty:
            rules_fpgrowth = rules_fpgrowth[rules_fpgrowth["confidence"] >= confidence]
        raw_rules_time = (time.perf_counter() - t1) * 1000
        fpgrowth_rules_time = int(raw_rules_time)
        if fpgrowth_rules_time <= 0 and raw_rules_time > 0.0:
            fpgrowth_rules_time = 1
            
        fpgrowth_total_time = fpgrowth_itemsets_time + fpgrowth_rules_time
        fpgrowth_rules_count = len(rules_fpgrowth)
    except Exception as e:
        logger.error(f"FP-Growth mining error: {e}")
        fpgrowth_total_time = None
        fpgrowth_itemsets_time = None
        fpgrowth_rules_time = None
        fpgrowth_rules_count = 0
        
    # 2. Benchmark Apriori
    apriori_itemsets_time = None
    apriori_rules_time = None
    apriori_total_time = None
    apriori_rules_count = 0
    
    try:
        t0 = time.perf_counter()
        frequent_apriori = ml_apriori(encoded_df, min_support=support, use_colnames=True)
        raw_itemsets_time = (time.perf_counter() - t0) * 1000
        apriori_itemsets_time = int(raw_itemsets_time)
        if apriori_itemsets_time <= 0 and raw_itemsets_time > 0.0:
            apriori_itemsets_time = 1
            
        t1 = time.perf_counter()
        rules_apriori = ml_association_rules(frequent_apriori, metric="lift", min_threshold=lift) if not frequent_apriori.empty else pd.DataFrame()
        if not rules_apriori.empty:
            rules_apriori = rules_apriori[rules_apriori["confidence"] >= confidence]
        raw_rules_time = (time.perf_counter() - t1) * 1000
        apriori_rules_time = int(raw_rules_time)
        if apriori_rules_time <= 0 and raw_rules_time > 0.0:
            apriori_rules_time = 1
            
        apriori_total_time = apriori_itemsets_time + apriori_rules_time
        apriori_rules_count = len(rules_apriori)
    except Exception as e:
        logger.error(f"Apriori mining error: {e}")
        apriori_total_time = None
        apriori_itemsets_time = None
        apriori_rules_time = None
        apriori_rules_count = 0
        
    return {
        "status": "success",
        "dataset_size": len(df),
        "fpgrowth": {
            "itemsets_time_ms": fpgrowth_itemsets_time,
            "rules_time_ms": fpgrowth_rules_time,
            "total_time_ms": fpgrowth_total_time,
            "rules_count": fpgrowth_rules_count
        },
        "apriori": {
            "itemsets_time_ms": apriori_itemsets_time,
            "rules_time_ms": apriori_rules_time,
            "total_time_ms": apriori_total_time,
            "rules_count": apriori_rules_count
        }
    }


@router.get("/rules")
def get_rules(
    module: Optional[str] = Query(None, description="Filter rules by antecedent module"),
    severity: Optional[str] = Query(None, description="Filter rules by consequent severity"),
    support: Optional[float] = Query(None, description="Minimum support threshold"),
    confidence: Optional[float] = Query(None, description="Minimum confidence threshold"),
    lift: Optional[float] = Query(None, description="Minimum lift threshold"),
    page: int = Query(1, ge=1, description="Page number"),
    size: int = Query(10, ge=1, description="Page size"),
    sort_by: str = Query("lift", regex="^(support|confidence|lift)$", description="Metric to sort by"),
    sort_desc: bool = Query(True, description="Descending sort order")
):
    """
    Retrieves mined rules with multi-parameter filtering, sorting, and pagination.
    """
    global _last_scan_rules
    if not _last_scan_rules:
        # Run default baseline scan if no data exists
        run_scan()
        
    filtered = _last_scan_rules
    
    # Filter by module present in antecedent
    if module:
        filtered = [r for r in filtered if f"module={module}" in r["antecedent"]]
        
    # Filter by severity present in consequent
    if severity:
        filtered = [r for r in filtered if f"severity={severity}" in r["consequent"]]
        
    # Filter by numeric thresholds
    if support is not None:
        filtered = [r for r in filtered if r["support"] >= support]
    if confidence is not None:
        filtered = [r for r in filtered if r["confidence"] >= confidence]
    if lift is not None:
        filtered = [r for r in filtered if r["lift"] >= lift]
        
    # Sort
    filtered = sorted(filtered, key=lambda x: x[sort_by], reverse=sort_desc)
    
    # Paginate
    total = len(filtered)
    start = (page - 1) * size
    end = start + size
    paginated = filtered[start:end]
    
    return {
        "total": total,
        "page": page,
        "size": size,
        "rules": paginated
    }

@router.get("/risk", response_model=List[ModuleRiskDTO])
def get_risk(
    module: Optional[str] = Query(None, description="Filter risk index by module name"),
    risk_level: Optional[str] = Query(None, description="Filter risk index by risk level (LOW, MEDIUM, HIGH, CRITICAL)")
):
    """
    Retrieves modules' defect risks.
    """
    global _last_scan_risks
    if not _last_scan_risks:
        run_scan()
        
    filtered = _last_scan_risks
    
    if module:
        filtered = [r for r in filtered if r["module"] == module]
    if risk_level:
        filtered = [r for r in filtered if r["risk_level"].upper() == risk_level.upper()]
        
    return filtered


@router.get("/analytics/summary")
def get_analytics_summary():
    """
    Returns aggregated analytics from the last ML scan execution:
    average lift, confidence, support, top hotspot module, severity distribution,
    rule count by module, and performance metadata.
    """
    global _last_scan_rules, _last_scan_risks

    if not _last_scan_rules:
        run_scan()

    rules = _last_scan_rules
    risks = _last_scan_risks

    total_rules = len(rules)

    if total_rules == 0:
        return {
            "total_rules": 0,
            "avg_lift": 0.0,
            "avg_confidence": 0.0,
            "avg_support": 0.0,
            "max_lift": 0.0,
            "top_module": None,
            "severity_distribution": {},
            "rules_by_module": {},
            "risk_level_counts": {}
        }

    avg_lift = round(sum(r["lift"] for r in rules) / total_rules, 4)
    avg_confidence = round(sum(r["confidence"] for r in rules) / total_rules, 4)
    avg_support = round(sum(r["support"] for r in rules) / total_rules, 4)
    max_lift = round(max(r["lift"] for r in rules), 4)

    # Severity distribution from consequents
    severity_dist = {}
    for r in rules:
        consequent = r.get("consequent", "")
        if "severity=" in consequent:
            sev = consequent.split("severity=")[-1].split(",")[0].strip()
            severity_dist[sev] = severity_dist.get(sev, 0) + 1

    # Rules count per module from antecedents
    rules_by_module = {}
    for r in rules:
        antecedent = r.get("antecedent", "")
        for part in antecedent.split(","):
            part = part.strip()
            if part.startswith("module="):
                mod = part.split("=")[1]
                rules_by_module[mod] = rules_by_module.get(mod, 0) + 1

    # Risk level distribution
    risk_level_counts = {}
    top_module = None
    top_score = 0.0
    for risk in risks:
        level = risk.get("risk_level", "UNKNOWN")
        risk_level_counts[level] = risk_level_counts.get(level, 0) + 1
        score = risk.get("risk_score", 0.0)
        if score > top_score:
            top_score = score
            top_module = risk.get("module")

    return {
        "total_rules": total_rules,
        "avg_lift": avg_lift,
        "avg_confidence": avg_confidence,
        "avg_support": avg_support,
        "max_lift": max_lift,
        "top_module": top_module,
        "top_module_risk_score": round(top_score, 4),
        "severity_distribution": severity_dist,
        "rules_by_module": rules_by_module,
        "risk_level_counts": risk_level_counts
    }


@router.get("/sample-data/download")
def download_sample_csv():
    """
    Returns a downloadable sample CSV with the required schema for upload testing.
    """
    import csv
    import io
    from fastapi.responses import StreamingResponse

    sample_rows = [
        {"module": "auth", "subsystem": "security", "language": "Java", "tech_stack": "JWT", "bug_type": "security", "severity": "critical"},
        {"module": "auth", "subsystem": "security", "language": "Java", "tech_stack": "JWT", "bug_type": "security", "severity": "critical"},
        {"module": "database", "subsystem": "database", "language": "Java", "tech_stack": "PostgreSQL", "bug_type": "performance", "severity": "high"},
        {"module": "database", "subsystem": "database", "language": "Python", "tech_stack": "PostgreSQL", "bug_type": "performance", "severity": "high"},
        {"module": "payment", "subsystem": "api", "language": "Java", "tech_stack": "SpringBoot", "bug_type": "integration", "severity": "critical"},
        {"module": "payment", "subsystem": "api", "language": "Java", "tech_stack": "SpringBoot", "bug_type": "integration", "severity": "high"},
        {"module": "search", "subsystem": "backend", "language": "Python", "tech_stack": "Redis", "bug_type": "performance", "severity": "medium"},
        {"module": "notification", "subsystem": "backend", "language": "JavaScript", "tech_stack": "NodeJS", "bug_type": "logic", "severity": "low"},
        {"module": "gateway", "subsystem": "api", "language": "Go", "tech_stack": "Docker", "bug_type": "concurrency", "severity": "medium"},
        {"module": "analytics", "subsystem": "backend", "language": "Python", "tech_stack": "Kafka", "bug_type": "memory", "severity": "high"},
        {"module": "profile", "subsystem": "frontend", "language": "TypeScript", "tech_stack": "React", "bug_type": "validation", "severity": "low"},
        {"module": "inventory", "subsystem": "backend", "language": "Java", "tech_stack": "SpringBoot", "bug_type": "logic", "severity": "medium"},
        {"module": "auth", "subsystem": "security", "language": "Java", "tech_stack": "JWT", "bug_type": "security", "severity": "high"},
        {"module": "database", "subsystem": "database", "language": "Java", "tech_stack": "PostgreSQL", "bug_type": "concurrency", "severity": "high"},
        {"module": "payment", "subsystem": "api", "language": "Java", "tech_stack": "SpringBoot", "bug_type": "security", "severity": "critical"},
        {"module": "reporting", "subsystem": "backend", "language": "Python", "tech_stack": "Kafka", "bug_type": "performance", "severity": "medium"},
        {"module": "search", "subsystem": "backend", "language": "Go", "tech_stack": "Redis", "bug_type": "memory", "severity": "low"},
        {"module": "gateway", "subsystem": "api", "language": "Go", "tech_stack": "Docker", "bug_type": "integration", "severity": "medium"},
        {"module": "analytics", "subsystem": "backend", "language": "Python", "tech_stack": "Kafka", "bug_type": "logic", "severity": "low"},
        {"module": "notification", "subsystem": "backend", "language": "JavaScript", "tech_stack": "NodeJS", "bug_type": "validation", "severity": "low"},
    ]

    output = io.StringIO()
    writer = csv.DictWriter(output, fieldnames=["module", "subsystem", "language", "tech_stack", "bug_type", "severity"])
    writer.writeheader()
    writer.writerows(sample_rows)
    output.seek(0)

    return StreamingResponse(
        iter([output.getvalue()]),
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=bugrisk_sample_data.csv"}
    )
