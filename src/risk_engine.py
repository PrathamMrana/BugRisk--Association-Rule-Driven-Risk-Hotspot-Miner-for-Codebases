import pandas as pd
import numpy as np
from mlxtend.preprocessing import TransactionEncoder
from mlxtend.frequent_patterns import apriori, fpgrowth, association_rules

def preprocess_transactions(df: pd.DataFrame) -> tuple[pd.DataFrame, TransactionEncoder]:
    """
    Converts a categorical DataFrame into a transaction-encoded binary DataFrame.
    Each value is prefixed with its column name (e.g. 'module=auth').
    
    Parameters:
        df (pd.DataFrame): The synthetic software defect dataset.
        
    Returns:
        encoded_df (pd.DataFrame): The one-hot encoded boolean DataFrame.
        te (TransactionEncoder): The fitted TransactionEncoder instance.
    """
    transactions = []
    for _, row in df.iterrows():
        transaction = [f"{col}={row[col]}" for col in df.columns]
        transactions.append(transaction)
        
    te = TransactionEncoder()
    te_ary = te.fit(transactions).transform(transactions)
    encoded_df = pd.DataFrame(te_ary, columns=te.columns_)
    return encoded_df, te

def mine_association_rules(
    encoded_df: pd.DataFrame, 
    min_support: float = 0.03, 
    min_confidence: float = 0.50, 
    min_lift: float = 1.2,
    algorithm: str = "fpgrowth"
) -> pd.DataFrame:
    """
    Mines association rules using Apriori or FP-Growth from mlxtend.
    
    Parameters:
        encoded_df (pd.DataFrame): One-hot encoded dataset.
        min_support (float): Minimum support threshold.
        min_confidence (float): Minimum confidence threshold.
        min_lift (float): Minimum lift threshold.
        algorithm (str): Mining algorithm, either 'fpgrowth' or 'apriori'.
        
    Returns:
        pd.DataFrame: DataFrame containing all rules satisfying thresholds.
    """
    # Find frequent itemsets using the specified algorithm
    if algorithm == "fpgrowth":
        frequent_itemsets = fpgrowth(encoded_df, min_support=min_support, use_colnames=True)
    elif algorithm == "apriori":
        frequent_itemsets = apriori(encoded_df, min_support=min_support, use_colnames=True)
    else:
        raise ValueError(f"Unknown algorithm '{algorithm}'. Must be 'fpgrowth' or 'apriori'.")
        
    if frequent_itemsets.empty:
        return pd.DataFrame()
        
    # Generate association rules using lift
    rules = association_rules(frequent_itemsets, metric="lift", min_threshold=min_lift)
    if rules.empty:
        return pd.DataFrame()
        
    # Filter rules based on confidence
    rules = rules[rules["confidence"] >= min_confidence]
    return rules

def filter_and_format_rules(rules_df: pd.DataFrame) -> list[dict]:
    """
    Filters rules according to defect-intelligence schema rules:
    - Antecedent (LHS) must consist ONLY of context variables: module, subsystem, language, tech_stack.
    - Antecedent must contain at least one of: module, subsystem, or tech_stack.
    - Consequent (RHS) must consist ONLY of defect variables: bug_type, severity.
    
    Parameters:
        rules_df (pd.DataFrame): Raw rules mined from the transaction matrix.
        
    Returns:
        list[dict]: List of clean, formatted rule dictionaries.
    """
    if rules_df.empty:
        return []
        
    filtered_rules = []
    
    for _, row in rules_df.iterrows():
        antecedent = sorted(list(row["antecedents"]))
        consequent = sorted(list(row["consequents"]))
        
        # Check antecedent validity
        antecedent_valid = True
        has_required_context = False
        for item in antecedent:
            if not (item.startswith("module=") or item.startswith("subsystem=") or 
                    item.startswith("language=") or item.startswith("tech_stack=")):
                antecedent_valid = False
                break
            if item.startswith("module=") or item.startswith("subsystem=") or item.startswith("tech_stack="):
                has_required_context = True
                
        # Check consequent validity
        consequent_valid = True
        for item in consequent:
            if not (item.startswith("bug_type=") or item.startswith("severity=")):
                consequent_valid = False
                break
                
        if antecedent_valid and has_required_context and consequent_valid:
            filtered_rules.append({
                "antecedent": antecedent,
                "consequent": consequent,
                "support": float(row["support"]),
                "confidence": float(row["confidence"]),
                "lift": float(row["lift"])
            })
            
    return filtered_rules

def get_matching_rules_for_module(module_name: str, filtered_rules: list[dict], df: pd.DataFrame) -> list[dict]:
    """
    Determines which rules apply to a given module.
    A rule matches a module M if:
    1. The antecedent explicitly includes 'module=M'
    2. OR the antecedent does NOT explicitly reference any other module (i.e. module=X where X != M),
       AND the antecedent is present in at least 5% of the transactions of module M.
       
    Parameters:
        module_name (str): The module being evaluated.
        filtered_rules (list[dict]): The list of filtered rules.
        df (pd.DataFrame): The original raw dataset (to check transaction coverage).
        
    Returns:
        list[dict]: Subset of rules matching the module's characteristics.
    """
    module_df = df[df["module"] == module_name]
    if module_df.empty:
        return []
        
    # Convert all transactions for this module to item sets
    module_transactions = []
    for _, row in module_df.iterrows():
        trans = set(f"{col}={row[col]}" for col in df.columns)
        module_transactions.append(trans)
        
    matching_rules = []
    for rule in filtered_rules:
        antecedent_set = set(rule["antecedent"])
        
        # Exclude rule if it explicitly references a different module
        has_other_module = False
        for item in antecedent_set:
            if item.startswith("module=") and item != f"module={module_name}":
                has_other_module = True
                break
        if has_other_module:
            continue
            
        # Count transactions in this module matching the antecedent
        match_count = 0
        for trans in module_transactions:
            if antecedent_set.issubset(trans):
                match_count += 1
                
        # Require at least 20% coverage of module transactions to be statistically relevant
        # and prevent background noise from matching general rules.
        min_match_required = max(1, int(len(module_transactions) * 0.20))
        if match_count >= min_match_required:
            matching_rules.append(rule)
            
    return matching_rules

def compute_module_risk(df: pd.DataFrame, filtered_rules: list[dict]) -> list[dict]:
    """
    Computes normalized risk scores and levels for each module based on rule matches.
    Formula: Risk(M) = SUM(support * confidence * lift) for matching rules.
    
    Parameters:
        df (pd.DataFrame): The raw synthetic bug dataset.
        filtered_rules (list[dict]): Filtered and formatted association rules.
        
    Returns:
        list[dict]: Risk scores and levels for all modules.
    """
    unique_modules = df["module"].unique()
    raw_risks = {}
    module_rule_matches = {}
    
    # Step 1: Compute raw risk scores
    for module in unique_modules:
        matching_rules = get_matching_rules_for_module(module, filtered_rules, df)
        
        # Sum of support * confidence * lift
        raw_risk = sum(r["support"] * r["confidence"] * r["lift"] for r in matching_rules)
        raw_risks[module] = raw_risk
        
        # Sort module's matching rules deterministically for stable outputs
        sorted_rules = sorted(
            matching_rules, 
            key=lambda x: (
                round(x["lift"] * x["confidence"] * x["support"], 6),
                ", ".join(sorted(x["antecedent"])),
                ", ".join(sorted(x["consequent"]))
            ), 
            reverse=True
        )
        module_rule_matches[module] = sorted_rules
        
    # Step 2: Normalize raw risk scores to 0-100 scale
    max_risk = max(raw_risks.values()) if raw_risks else 0
    min_risk = min(raw_risks.values()) if raw_risks else 0
    risk_range = max_risk - min_risk
    
    normalized_risks = {}
    for module, raw_score in raw_risks.items():
        if risk_range > 0:
            norm_score = ((raw_score - min_risk) / risk_range) * 100
        else:
            norm_score = 50.0  # Default if all scores are identical
        normalized_risks[module] = round(norm_score, 2)
        
    # Step 3: Categorize risk levels and compile output structure
    module_risks = []
    for module in unique_modules:
        score = normalized_risks[module]
        
        if score < 25.0:
            level = "LOW"
        elif score < 50.0:
            level = "MEDIUM"
        elif score < 75.0:
            level = "HIGH"
        else:
            level = "CRITICAL"
            
        module_risks.append({
            "module": module,
            "risk_score": score,
            "risk_level": level,
            "top_rules": module_rule_matches[module][:5]  # Export up to top 5 rules for explainability
        })
        
    # Sort modules by risk score descending
    module_risks = sorted(module_risks, key=lambda x: x["risk_score"], reverse=True)
    return module_risks
