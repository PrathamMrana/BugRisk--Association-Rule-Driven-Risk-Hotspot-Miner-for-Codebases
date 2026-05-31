import os
import json
import logging
import argparse
from src import config
from src.data_generator import generate_synthetic_data
from src.risk_engine import (
    preprocess_transactions,
    mine_association_rules,
    filter_and_format_rules,
    compute_module_risk
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

def format_rule_for_export(rule: dict) -> dict:
    """Formats antecedent and consequent as clean, Spring-Boot-friendly strings."""
    return {
        "antecedent": ", ".join(rule["antecedent"]),
        "consequent": ", ".join(rule["consequent"]),
        "support": round(rule["support"], 4),
        "confidence": round(rule["confidence"], 4),
        "lift": round(rule["lift"], 4)
    }

def main():
    # Setup Argument Parser for optional CLI override
    parser = argparse.ArgumentParser(description="Bug Pattern Risk Engine Pipeline")
    parser.add_argument("--algorithm", type=str, default=config.DEFAULT_ALGORITHM, choices=["fpgrowth", "apriori"],
                        help="Frequent pattern mining algorithm (default: fpgrowth)")
    parser.add_argument("--rows", type=int, default=config.DATASET_SIZE,
                        help="Number of records in synthetic dataset (default: 2500)")
    parser.add_argument("--seed", type=int, default=config.RANDOM_SEED,
                        help="Random seed for data generation reproducibility (default: 42)")
    parser.add_argument("--support", type=float, default=config.MIN_SUPPORT,
                        help="Minimum support threshold (default: 0.03)")
    parser.add_argument("--confidence", type=float, default=config.MIN_CONFIDENCE,
                        help="Minimum confidence threshold (default: 0.50)")
    parser.add_argument("--lift", type=float, default=config.MIN_LIFT,
                        help="Minimum lift threshold (default: 1.2)")
    args = parser.parse_args()

    logger.info("Initializing Bug Pattern Risk Engine pipeline...")
    logger.info(f"Configuration settings: Algorithm={args.algorithm}, Rows={args.rows}, Seed={args.seed}, "
                f"Min Support={args.support}, Min Confidence={args.confidence}, Min Lift={args.lift}")
    
    # Establish workspace directories
    project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    data_dir = os.path.join(project_root, "data")
    artifacts_dir = os.path.join(project_root, "artifacts")
    
    os.makedirs(data_dir, exist_ok=True)
    os.makedirs(artifacts_dir, exist_ok=True)
    
    csv_path = os.path.join(data_dir, "synthetic_bug_data.csv")
    rules_json_path = os.path.join(artifacts_dir, "rules.json")
    risk_json_path = os.path.join(artifacts_dir, "module_risk.json")
    
    # 1. Dataset Generation
    logger.info("Step 1: Generating synthetic software defect dataset...")
    df = generate_synthetic_data(csv_path, num_records=args.rows, seed=args.seed)
    logger.info(f"Dataset generated successfully with {len(df)} records at: {csv_path}")
    
    # 2. Preprocessing & Rule Mining
    logger.info("Step 2: Preprocessing and encoding transactions...")
    encoded_df, _ = preprocess_transactions(df)
    
    logger.info(f"Step 3: Mining association rules using {args.algorithm.upper()}...")
    raw_rules = mine_association_rules(
        encoded_df,
        min_support=args.support,
        min_confidence=args.confidence,
        min_lift=args.lift,
        algorithm=args.algorithm
    )
    logger.info(f"Raw rules mined: {len(raw_rules)}")
    
    # 3. Rule Filtering & Formatting
    filtered_rules = filter_and_format_rules(raw_rules)
    logger.info(f"Mined and filtered {len(filtered_rules)} domain-valid defect patterns.")
    
    # 4. Module Risk Scoring
    logger.info("Step 4: Scoring module defect risk...")
    module_risks_raw = compute_module_risk(df, filtered_rules)
    logger.info(f"Modules scored: {len(module_risks_raw)}")
    
    # 5. Format & Export Artifacts
    logger.info("Step 5: Formatting and exporting artifacts for Spring Boot / React integration...")
    
    # Format and sort rules deterministically for rules.json to ensure stable file hashes
    rules_export = [format_rule_for_export(r) for r in filtered_rules]
    rules_export = sorted(
        rules_export,
        key=lambda x: (x["antecedent"], x["consequent"], x["support"], x["confidence"], x["lift"])
    )
    
    # Format module risk scores and their associated top rules
    risk_export = []
    for module_risk in module_risks_raw:
        risk_export.append({
            "module": module_risk["module"],
            "risk_score": module_risk["risk_score"],
            "risk_level": module_risk["risk_level"],
            "top_rules": [format_rule_for_export(r) for r in module_risk["top_rules"]]
        })
        
    # Write files
    with open(rules_json_path, "w") as f:
        json.dump(rules_export, f, indent=2)
        
    with open(risk_json_path, "w") as f:
        json.dump(risk_export, f, indent=2)
        
    logger.info("Artifacts successfully exported to artifacts/ folder.")
    
    # 6. Health Verification Output
    print("\n" + "="*50)
    print("      PIPELINE HEALTH VERIFICATION SUMMARY      ")
    print("="*50)
    print(f"[-] Records Generated:  {len(df)}")
    print(f"[-] Defect Rules Mined: {len(rules_export)}")
    print(f"[-] Modules Scored:     {len(risk_export)}")
    print(f"[-] Rules Export:       SUCCESS ({rules_json_path})")
    print(f"[-] Risk Export:        SUCCESS ({risk_json_path})")
    print("="*50)
    print("Module Risk Levels Breakdown:")
    for mod in risk_export:
        print(f"  * Module: {mod['module']:<15} | Score: {mod['risk_score']:<6} | Level: {mod['risk_level']}")
    print("="*50 + "\n")

if __name__ == "__main__":
    main()
