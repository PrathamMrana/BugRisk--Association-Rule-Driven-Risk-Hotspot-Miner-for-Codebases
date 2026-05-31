import os
import time
import json
import logging
import pandas as pd
import numpy as np
from src import config

# Configure logging for validation
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger("validation")

def step_1_env_validation():
    logger.info("--- STEP 1: ENVIRONMENT VALIDATION ---")
    req_path = "requirements.txt"
    if not os.path.exists(req_path):
        logger.error("requirements.txt does not exist!")
        return False
    logger.info("requirements.txt exists.")
    
    try:
        import pandas as pd
        import numpy as np
        import mlxtend
        import sklearn
        logger.info("All dependencies (pandas, numpy, mlxtend, scikit-learn) imported successfully.")
        return True
    except ImportError as e:
        logger.error(f"Import failed: {str(e)}")
        return False

def step_3_dataset_validation(csv_path):
    logger.info("--- STEP 3: DATASET VALIDATION ---")
    if not os.path.exists(csv_path):
        logger.error(f"Dataset CSV not found at: {csv_path}")
        return None
        
    df = pd.read_csv(csv_path)
    logger.info(f"Dataset record count: {len(df)}")
    
    # Check columns
    expected_cols = {"module", "subsystem", "language", "tech_stack", "bug_type", "severity"}
    actual_cols = set(df.columns)
    missing_cols = expected_cols - actual_cols
    if missing_cols:
        logger.error(f"Missing columns: {missing_cols}")
        return None
    logger.info("All expected columns exist.")
    
    # Validate Pattern 1: auth + JWT + Java -> security bugs, critical severity
    pattern_1 = df[(df["module"] == "auth") & (df["tech_stack"] == "JWT") & (df["language"] == "Java")]
    p1_count = len(pattern_1)
    p1_sec_crit = len(pattern_1[(pattern_1["bug_type"] == "security") & (pattern_1["severity"] == "critical")])
    logger.info(f"Pattern 1 (auth + JWT + Java) matching rows: {p1_count}")
    logger.info(f"Pattern 1 security + critical rows: {p1_sec_crit} ({p1_sec_crit/p1_count*100:.1f}%)")
    
    # Validate Pattern 2: database + PostgreSQL -> performance bugs
    pattern_2 = df[(df["module"] == "database") & (df["tech_stack"] == "PostgreSQL")]
    p2_count = len(pattern_2)
    p2_perf = len(pattern_2[pattern_2["bug_type"] == "performance"])
    logger.info(f"Pattern 2 (database + PostgreSQL) matching rows: {p2_count}")
    logger.info(f"Pattern 2 performance rows: {p2_perf} ({p2_perf/p2_count*100:.1f}%)")
    
    # Validate Pattern 3: backend + Kafka + Java/Go -> concurrency bugs, high/critical severity
    pattern_3 = df[(df["subsystem"] == "backend") & (df["tech_stack"] == "Kafka") & (df["language"].isin(["Go", "Java"]))]
    p3_count = len(pattern_3)
    p3_con_high = len(pattern_3[(pattern_3["bug_type"] == "concurrency") & (pattern_3["severity"].isin(["high", "critical"]))])
    logger.info(f"Pattern 3 (backend + Kafka + Java/Go) matching rows: {p3_count}")
    logger.info(f"Pattern 3 concurrency + high/critical rows: {p3_con_high} ({p3_con_high/p3_count*100:.1f}%)")
    
    # Validate Pattern 4: payment + integration -> critical defects
    pattern_4 = df[(df["module"] == "payment") & (df["subsystem"] == "api")]
    p4_count = len(pattern_4)
    p4_integ_crit = len(pattern_4[(pattern_4["bug_type"] == "integration") & (pattern_4["severity"] == "critical")])
    logger.info(f"Pattern 4 (payment + api) matching rows: {p4_count}")
    logger.info(f"Pattern 4 integration + critical rows: {p4_integ_crit} ({p4_integ_crit/p4_count*100:.1f}%)")
    
    return {
        "record_count": len(df),
        "pattern_1": (p1_count, p1_sec_crit),
        "pattern_2": (p2_count, p2_perf),
        "pattern_3": (p3_count, p3_con_high),
        "pattern_4": (p4_count, p4_integ_crit)
    }

def step_4_rule_validation(rules_json_path):
    logger.info("--- STEP 4: ASSOCIATION RULE VALIDATION ---")
    if not os.path.exists(rules_json_path):
        logger.error(f"rules.json not found at: {rules_json_path}")
        return False
        
    with open(rules_json_path, "r") as f:
        rules = json.load(f)
        
    logger.info(f"Total rules mined: {len(rules)}")
    if len(rules) == 0:
        logger.error("rules.json is empty!")
        return False
        
    # Check schema and metrics bounds
    schema_correct = True
    metric_correct = True
    
    for r in rules:
        # Schema check
        for field in ["antecedent", "consequent", "support", "confidence", "lift"]:
            if field not in r:
                schema_correct = False
                logger.error(f"Rule missing field '{field}': {r}")
        
        # Metric bounds check
        if not (0 <= r.get("support", -1) <= 1):
            metric_correct = False
        if not (0 <= r.get("confidence", -1) <= 1):
            metric_correct = False
        if r.get("lift", -1) <= 0:
            metric_correct = False
            
    if schema_correct:
        logger.info("All rules match required schema.")
    else:
        logger.error("Rules schema validation failed.")
        
    if metric_correct:
        logger.info("All rule metrics fall within valid bounds.")
    else:
        logger.error("Rules metric bounds validation failed.")
        
    # Print top 5 rules by lift
    sorted_rules = sorted(rules, key=lambda x: x.get("lift", 0), reverse=True)
    logger.info("Top 5 Mined Defect Rules by Lift:")
    for i, r in enumerate(sorted_rules[:5]):
        logger.info(f"  [1] {r['antecedent']} -> {r['consequent']} (sup={r['support']:.4f}, conf={r['confidence']:.4f}, lift={r['lift']:.4f})")
        
    return schema_correct and metric_correct

def step_5_module_risk_validation(risk_json_path):
    logger.info("--- STEP 5: MODULE RISK ENGINE VALIDATION ---")
    if not os.path.exists(risk_json_path):
        logger.error(f"module_risk.json not found at: {risk_json_path}")
        return False
        
    with open(risk_json_path, "r") as f:
        risks = json.load(f)
        
    schema_correct = True
    score_numeric = True
    levels_correct = True
    
    for m in risks:
        for field in ["module", "risk_score", "risk_level", "top_rules"]:
            if field not in m:
                schema_correct = False
                logger.error(f"Module missing field '{field}': {m}")
                
        if not isinstance(m.get("risk_score"), (int, float)):
            score_numeric = False
            
        level = m.get("risk_level")
        if level not in ["LOW", "MEDIUM", "HIGH", "CRITICAL"]:
            levels_correct = False
            logger.error(f"Invalid risk level '{level}' for module '{m.get('module')}'")
            
    if schema_correct:
        logger.info("module_risk.json matches required schema.")
    if score_numeric:
        logger.info("All module risk scores are numeric.")
    if levels_correct:
        logger.info("All risk levels are semantically valid.")
        
    logger.info("Module Risk Scores:")
    for m in risks:
        logger.info(f"  * Module: {m['module']:<12} | Score: {m['risk_score']:<6} | Level: {m['risk_level']}")
        
    return schema_correct and score_numeric and levels_correct

def step_6_parameter_sensitivity(df):
    logger.info("--- STEP 6: PARAMETER SENSITIVITY TEST ---")
    from src.risk_engine import preprocess_transactions, mine_association_rules, filter_and_format_rules
    
    encoded_df, _ = preprocess_transactions(df)
    
    # Baseline: configuration values
    raw_base = mine_association_rules(encoded_df, min_support=config.MIN_SUPPORT, min_confidence=config.MIN_CONFIDENCE, min_lift=config.MIN_LIFT, algorithm=config.DEFAULT_ALGORITHM)
    filtered_base = len(filter_and_format_rules(raw_base))
    
    # Experiment A: min_support = 0.01
    raw_exp_a = mine_association_rules(encoded_df, min_support=0.01, min_confidence=config.MIN_CONFIDENCE, min_lift=config.MIN_LIFT, algorithm=config.DEFAULT_ALGORITHM)
    filtered_exp_a = len(filter_and_format_rules(raw_exp_a))
    
    # Experiment B: min_confidence = 0.90
    raw_exp_b = mine_association_rules(encoded_df, min_support=config.MIN_SUPPORT, min_confidence=0.90, min_lift=config.MIN_LIFT, algorithm=config.DEFAULT_ALGORITHM)
    filtered_exp_b = len(filter_and_format_rules(raw_exp_b))
    
    logger.info(f"Baseline (sup={config.MIN_SUPPORT}, conf={config.MIN_CONFIDENCE})  Mined Rules: {filtered_base}")
    logger.info(f"Exp A (sup=0.01, conf={config.MIN_CONFIDENCE})     Mined Rules: {filtered_exp_a} (Expected: > {filtered_base})")
    logger.info(f"Exp B (sup={config.MIN_SUPPORT}, conf=0.90)     Mined Rules: {filtered_exp_b} (Expected: < {filtered_base})")
    
    sensitivity_ok = (filtered_exp_a > filtered_base) and (filtered_exp_b < filtered_base)
    if sensitivity_ok:
        logger.info("Parameter sensitivity behaves correctly (rules increase at lower support and decrease at higher confidence).")
    else:
        logger.error("Parameter sensitivity failed validation!")
        
    return {
        "baseline": filtered_base,
        "support_0_01": filtered_exp_a,
        "confidence_0_90": filtered_exp_b,
        "passed": sensitivity_ok
    }

def benchmark_algorithms():
    logger.info("--- STEP 7: ALGORITHM MIGRATION BENCHMARK (Apriori vs FP-Growth) ---")
    from src.data_generator import generate_synthetic_data
    from src.risk_engine import preprocess_transactions
    from mlxtend.frequent_patterns import apriori, fpgrowth, association_rules
    
    sizes = [2500, 5000, 10000]
    benchmark_results = []
    
    for size in sizes:
        temp_csv = f"data/synthetic_bug_data_bench_{size}.csv"
        df = generate_synthetic_data(temp_csv, num_records=size, seed=config.RANDOM_SEED)
        encoded_df, _ = preprocess_transactions(df)
        
        # Clean up temp file
        if os.path.exists(temp_csv):
            os.remove(temp_csv)
            
        # 1. Benchmark Apriori
        t_start_ap = time.perf_counter()
        
        t_mine_start = time.perf_counter()
        frequent_ap = apriori(encoded_df, min_support=config.MIN_SUPPORT, use_colnames=True)
        t_mine_ap = time.perf_counter() - t_mine_start
        
        t_rules_start = time.perf_counter()
        if not frequent_ap.empty:
            rules_ap = association_rules(frequent_ap, metric="lift", min_threshold=config.MIN_LIFT)
            if not rules_ap.empty:
                rules_ap = rules_ap[rules_ap["confidence"] >= config.MIN_CONFIDENCE]
        else:
            rules_ap = pd.DataFrame()
        t_rules_ap = time.perf_counter() - t_rules_start
        
        t_total_ap = time.perf_counter() - t_start_ap
        rules_count_ap = len(rules_ap)
        
        # 2. Benchmark FP-Growth
        t_start_fp = time.perf_counter()
        
        t_mine_start = time.perf_counter()
        frequent_fp = fpgrowth(encoded_df, min_support=config.MIN_SUPPORT, use_colnames=True)
        t_mine_fp = time.perf_counter() - t_mine_start
        
        t_rules_start = time.perf_counter()
        if not frequent_fp.empty:
            rules_fp = association_rules(frequent_fp, metric="lift", min_threshold=config.MIN_LIFT)
            if not rules_fp.empty:
                rules_fp = rules_fp[rules_fp["confidence"] >= config.MIN_CONFIDENCE]
        else:
            rules_fp = pd.DataFrame()
        t_rules_fp = time.perf_counter() - t_rules_start
        
        t_total_fp = time.perf_counter() - t_start_fp
        rules_count_fp = len(rules_fp)
        
        # Verify rule equivalence
        equivalent = False
        if rules_count_ap == rules_count_fp:
            if rules_count_ap == 0:
                equivalent = True
            else:
                def normalize_rules_df(rdf):
                    rdf = rdf.copy()
                    rdf["ant_str"] = rdf["antecedents"].apply(lambda x: ", ".join(sorted(list(x))))
                    rdf["con_str"] = rdf["consequents"].apply(lambda x: ", ".join(sorted(list(x))))
                    rdf = rdf.sort_values(by=["ant_str", "con_str", "support", "confidence"]).reset_index(drop=True)
                    return rdf[["ant_str", "con_str", "support", "confidence", "lift"]]
                
                norm_ap = normalize_rules_df(rules_ap)
                norm_fp = normalize_rules_df(rules_fp)
                
                numeric_cols = ["support", "confidence", "lift"]
                cols_match = (norm_ap["ant_str"] == norm_fp["ant_str"]).all() and (norm_ap["con_str"] == norm_fp["con_str"]).all()
                nums_match = np.allclose(norm_ap[numeric_cols].values, norm_fp[numeric_cols].values, atol=1e-5)
                equivalent = cols_match and nums_match
                
        benchmark_results.append({
            "size": size,
            "apriori": {
                "mine_time": t_mine_ap,
                "rules_time": t_rules_ap,
                "total_time": t_total_ap,
                "rules_count": rules_count_ap
            },
            "fpgrowth": {
                "mine_time": t_mine_fp,
                "rules_time": t_rules_fp,
                "total_time": t_total_fp,
                "rules_count": rules_count_fp
            },
            "equivalent": equivalent
        })
        
    # Print comparison matrix
    print("\n" + "="*85)
    print("                      ALGORITHM BENCHMARK COMPARISON MATRIX                      ")
    print("="*85)
    print(f"{'Algorithm':<10} | {'Rows':<6} | {'Mining Time (s)':<16} | {'Rules Time (s)':<15} | {'Total Time (s)':<15} | {'Rules':<6}")
    print("-"*85)
    for res in benchmark_results:
        size = res["size"]
        ap = res["apriori"]
        fp = res["fpgrowth"]
        print(f"{'Apriori':<10} | {size:<6} | {ap['mine_time']:<16.4f} | {ap['rules_time']:<15.4f} | {ap['total_time']:<15.4f} | {ap['rules_count']:<6}")
        print(f"{'FPGrowth':<10} | {size:<6} | {fp['mine_time']:<16.4f} | {fp['rules_time']:<15.4f} | {fp['total_time']:<15.4f} | {fp['rules_count']:<6}")
        print(f"[-] Rule Equivalence Verified: {res['equivalent']}")
        print("-"*85)
    print("="*85 + "\n")
    
    return benchmark_results

def step_8_quality_review(rules_json_path):
    logger.info("--- STEP 8: SEMANTIC QUALITY & REALISM REVIEW ---")
    with open(rules_json_path, "r") as f:
        rules = json.load(f)
        
    bad_associations = []
    for r in rules:
        ant = r["antecedent"]
        con = r["consequent"]
        
        if "tech_stack=React" in ant or "subsystem=frontend" in ant:
            if "bug_type=performance" in con and "tech_stack=PostgreSQL" not in ant:
                bad_associations.append(r)
                
    logger.info(f"Identified {len(bad_associations)} potentially sub-optimal or generic associations.")
    if bad_associations:
        logger.info("Sample sub-optimal/spurious rule candidates (for post-processing):")
        for r in bad_associations[:3]:
            logger.info(f"  * {r['antecedent']} -> {r['consequent']}")
    else:
        logger.info("No major semantic violations detected. Mined association rules are clean.")
        
    return bad_associations

def run_all_validation():
    # Load dataset
    csv_path = "data/synthetic_bug_data.csv"
    rules_path = "artifacts/rules.json"
    risk_path = "artifacts/module_risk.json"
    
    # Execute Steps
    env_ok = step_1_env_validation()
    df = pd.read_csv(csv_path) if os.path.exists(csv_path) else None
    
    data_results = step_3_dataset_validation(csv_path) if df is not None else None
    rules_ok = step_4_rule_validation(rules_path)
    risk_ok = step_5_module_risk_validation(risk_path)
    
    sens_results = step_6_parameter_sensitivity(df) if df is not None else None
    bench_results = benchmark_algorithms()
    quality_issues = step_8_quality_review(rules_path)
    
    # Save validation metadata
    report = {
        "env_ok": env_ok,
        "data_results": data_results,
        "rules_ok": rules_ok,
        "risk_ok": risk_ok,
        "sensitivity": sens_results,
        "benchmark": bench_results,
        "quality_issues_count": len(quality_issues)
    }
    
    logger.info("Validation run complete.")
    return report

if __name__ == "__main__":
    run_all_validation()
