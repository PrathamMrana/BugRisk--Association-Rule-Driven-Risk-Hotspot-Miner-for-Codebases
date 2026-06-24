import os
import time
import logging
import pandas as pd
from app.core import config
from app.services.data_generator import generate_synthetic_data
from app.services.risk_engine import (
    preprocess_transactions,
    mine_association_rules,
    filter_and_format_rules,
    compute_module_risk
)

logger = logging.getLogger(__name__)

def run_analytics_pipeline(
    rows: int = None,
    seed: int = None,
    algorithm: str = None,
    support: float = None,
    confidence: float = None,
    lift: float = None,
    dataSource: str = "synthetic"
) -> dict:
    """
    Orchestrates the data generation, rule mining, and risk scoring pipeline.
    """
    rows = rows if rows is not None else config.DATASET_SIZE
    seed = seed if seed is not None else config.RANDOM_SEED
    algorithm = algorithm if algorithm is not None else config.DEFAULT_ALGORITHM
    support = support if support is not None else config.MIN_SUPPORT
    confidence = confidence if confidence is not None else config.MIN_CONFIDENCE
    lift = lift if lift is not None else config.MIN_LIFT

    start_time = time.perf_counter()

    # Define paths relative to the ml-service root
    service_root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    data_dir = os.path.join(service_root, "data")
    os.makedirs(data_dir, exist_ok=True)
    csv_path = os.path.join(data_dir, "synthetic_bug_data.csv")

    # Step 1: Data Source Loading
    logger.info(f"Running ML Scan: rows={rows}, algorithm={algorithm}, support={support}, seed={seed}, dataSource={dataSource}")
    if dataSource == "uploaded":
        uploaded_path = os.path.join(data_dir, "uploaded_data.csv")
        if not os.path.exists(uploaded_path):
            raise ValueError("No uploaded dataset found. Please upload a dataset first.")
        df = pd.read_csv(uploaded_path)
    else:
        df = generate_synthetic_data(csv_path, num_records=rows, seed=seed)

    # Step 2: Transaction Encoding
    encoded_df, _ = preprocess_transactions(df)

    # Step 3: Mining Rules (Apriori or FP-Growth)
    raw_rules = mine_association_rules(
        encoded_df,
        min_support=support,
        min_confidence=confidence,
        min_lift=lift,
        algorithm=algorithm
    )

    # Step 4: Schema Filtering
    filtered_rules = filter_and_format_rules(raw_rules)

    # Step 5: Scoring Module Risks
    module_risks = compute_module_risk(df, filtered_rules)

    import hashlib
    # Compute simple short SHA-256 hash of the DataFrame to identify the dataset version
    df_csv = df.to_csv(index=False)
    dataset_hash = hashlib.sha256(df_csv.encode('utf-8')).hexdigest()[:8]

    raw_runtime_ms = (time.perf_counter() - start_time) * 1000
    runtime_ms = int(raw_runtime_ms)
    if runtime_ms <= 0 and raw_runtime_ms > 0.0:
        # confirmed measurement_resolution limitation: the float value is positive but int truncated it to 0
        runtime_ms = 1
    elif runtime_ms < 0:
        logger.warning(f"Negative runtime detected: {raw_runtime_ms}ms! Clamping to 1ms due to measurement anomaly.")
        runtime_ms = 1

    logger.info(f"ML Scan complete. Runtimes: {runtime_ms}ms | Rules: {len(filtered_rules)} | Modules: {len(module_risks)}")

    # Helper function to format list rules as Spring Boot consumable representations
    def format_rule(rule: dict) -> dict:
        return {
            "antecedent": ", ".join(rule["antecedent"]),
            "consequent": ", ".join(rule["consequent"]),
            "support": round(rule["support"], 4),
            "confidence": round(rule["confidence"], 4),
            "lift": round(rule["lift"], 4)
        }

    rules_formatted = [format_rule(r) for r in filtered_rules]
    rules_formatted = sorted(
        rules_formatted,
        key=lambda x: (x["antecedent"], x["consequent"], x["support"], x["confidence"], x["lift"])
    )

    risk_formatted = []
    for mr in module_risks:
        risk_formatted.append({
            "module": mr["module"],
            "risk_score": mr["risk_score"],
            "risk_level": mr["risk_level"],
            "top_rules": [format_rule(r) for r in mr["top_rules"]]
        })

    import math
    def sanitize_nans(obj):
        if isinstance(obj, float) and math.isnan(obj):
            return None
        elif isinstance(obj, dict):
            return {k: sanitize_nans(v) for k, v in obj.items()}
        elif isinstance(obj, list):
            return [sanitize_nans(i) for i in obj]
        return obj

    final_result = {
        "status": "success",
        "rules_count": len(rules_formatted),
        "modules_count": len(risk_formatted),
        "runtime_ms": runtime_ms,
        "dataset_hash": dataset_hash,
        "dataset_rows": len(df),
        "dataset_columns": len(df.columns),
        "rules": rules_formatted,
        "module_risk": risk_formatted
    }
    
    return sanitize_nans(final_result)


def run_analytics_pipeline_stream(
    rows: int = None,
    seed: int = None,
    algorithm: str = None,
    support: float = None,
    confidence: float = None,
    lift: float = None,
    dataSource: str = "synthetic"
):
    """
    Yields step-by-step pipeline execution events as dictionaries.
    """
    start_time = time.perf_counter()
    rows = rows if rows is not None else config.DATASET_SIZE
    seed = seed if seed is not None else config.RANDOM_SEED
    algorithm = algorithm if algorithm is not None else config.DEFAULT_ALGORITHM
    support = support if support is not None else config.MIN_SUPPORT
    confidence = confidence if confidence is not None else config.MIN_CONFIDENCE
    lift = lift if lift is not None else config.MIN_LIFT

    service_root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    data_dir = os.path.join(service_root, "data")
    os.makedirs(data_dir, exist_ok=True)
    
    # Event 1: DATASET_INGEST
    yield {"stage": "DATASET_INGEST", "progress": 15, "detail": f"Loading {dataSource} dataset..."}
    time.sleep(0.3)
    
    if dataSource == "uploaded":
        uploaded_path = os.path.join(data_dir, "uploaded_data.csv")
        if not os.path.exists(uploaded_path):
            yield {"stage": "FAILED", "progress": 0, "error": "No uploaded dataset found. Please upload a dataset first."}
            return
        df = pd.read_csv(uploaded_path)
    else:
        csv_path = os.path.join(data_dir, "synthetic_bug_data.csv")
        df = generate_synthetic_data(csv_path, num_records=rows, seed=seed)

    # Event 2: TRANSACTION_ENCODING
    yield {"stage": "TRANSACTION_ENCODING", "progress": 35, "detail": f"Pre-processing and binary encoding {len(df)} transactions..."}
    time.sleep(0.3)
    encoded_df, _ = preprocess_transactions(df)

    # Event 3: FP_TREE_CONSTRUCTION / APRIORI_MATRIX_CONSTRUCTION
    stage_name = "FP_TREE_CONSTRUCTION" if algorithm == "fpgrowth" else "APRIORI_MATRIX_CONSTRUCTION"
    yield {"stage": stage_name, "progress": 55, "detail": f"Building {algorithm} structure with min_support={support}..."}
    time.sleep(0.3)
    
    from mlxtend.frequent_patterns import fpgrowth as ml_fpgrowth, apriori as ml_apriori, association_rules as ml_association_rules
    if algorithm == "fpgrowth":
        frequent_itemsets = ml_fpgrowth(encoded_df, min_support=support, use_colnames=True)
    else:
        frequent_itemsets = ml_apriori(encoded_df, min_support=support, use_colnames=True)

    # Event 4: RULE_MINING
    yield {"stage": "RULE_MINING", "progress": 75, "detail": f"Mining rules with confidence={confidence} and lift={lift}..."}
    time.sleep(0.3)
    
    if frequent_itemsets.empty:
        filtered_rules = []
    else:
        raw_rules = ml_association_rules(frequent_itemsets, metric="lift", min_threshold=lift)
        if raw_rules.empty:
            filtered_rules = []
        else:
            raw_rules = raw_rules[raw_rules["confidence"] >= confidence]
            filtered_rules = filter_and_format_rules(raw_rules)

    # Event 5: RISK_SCORING
    yield {"stage": "RISK_SCORING", "progress": 90, "detail": "Calculating normalized hotspot risk index scores..."}
    time.sleep(0.3)
    module_risks = compute_module_risk(df, filtered_rules)

    # Format output for completed stage
    def format_rule(rule: dict) -> dict:
        return {
            "antecedent": ", ".join(rule["antecedent"]),
            "consequent": ", ".join(rule["consequent"]),
            "support": round(rule["support"], 4),
            "confidence": round(rule["confidence"], 4),
            "lift": round(rule["lift"], 4)
        }

    rules_formatted = [format_rule(r) for r in filtered_rules]
    rules_formatted = sorted(
        rules_formatted,
        key=lambda x: (x["antecedent"], x["consequent"], x["support"], x["confidence"], x["lift"])
    )

    risk_formatted = []
    for mr in module_risks:
        risk_formatted.append({
            "module": mr["module"],
            "risk_score": mr["risk_score"],
            "risk_level": mr["risk_level"],
            "top_rules": [format_rule(r) for r in mr["top_rules"]]
        })

    import hashlib
    # Compute simple short SHA-256 hash of the DataFrame to identify the dataset version
    df_csv = df.to_csv(index=False)
    dataset_hash = hashlib.sha256(df_csv.encode('utf-8')).hexdigest()[:8]

    raw_runtime_ms = (time.perf_counter() - start_time) * 1000
    runtime_ms = int(raw_runtime_ms)
    if runtime_ms <= 0 and raw_runtime_ms > 0.0:
        runtime_ms = 1

    import math
    def sanitize_nans(obj):
        if isinstance(obj, float) and math.isnan(obj):
            return None
        elif isinstance(obj, dict):
            return {k: sanitize_nans(v) for k, v in obj.items()}
        elif isinstance(obj, list):
            return [sanitize_nans(i) for i in obj]
        return obj

    final_result = {
        "stage": "COMPLETED",
        "progress": 100,
        "detail": f"{algorithm.upper()} ML calculations completed successfully.",
        "result": {
            "status": "success",
            "rules_count": len(rules_formatted),
            "modules_count": len(risk_formatted),
            "runtime_ms": runtime_ms,
            "dataset_hash": dataset_hash,
            "dataset_rows": len(df),
            "dataset_columns": len(df.columns),
            "rules": rules_formatted,
            "module_risk": risk_formatted
        }
    }

    yield sanitize_nans(final_result)
