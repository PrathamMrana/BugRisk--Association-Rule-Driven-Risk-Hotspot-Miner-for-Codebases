import os
import pandas as pd
import numpy as np

# Define categorical choices as specified in requirements
MODULES = ["auth", "payment", "search", "database", "notification", "analytics", "gateway", "profile", "inventory", "reporting"]
SUBSYSTEMS = ["backend", "frontend", "api", "database", "security"]
LANGUAGES = ["Java", "Python", "JavaScript", "Go", "TypeScript"]
TECH_STACKS = ["SpringBoot", "React", "NodeJS", "PostgreSQL", "Redis", "JWT", "Docker", "Kafka"]
BUG_TYPES = ["security", "performance", "concurrency", "memory", "logic", "validation", "integration", "network"]
SEVERITIES = ["low", "medium", "high", "critical"]

def generate_synthetic_data(output_path: str, num_records: int = 2500, seed: int = 42) -> pd.DataFrame:
    """
    Generates a realistic software defect dataset with injected domain-specific correlations.
    
    Parameters:
        output_path (str): The file path where the generated CSV should be saved.
        num_records (int): The total number of records to generate.
        seed (int): The random seed for reproducibility.
        
    Returns:
        pd.DataFrame: The generated dataset.
    """
    np.random.seed(seed)
    
    # We will split generation into patterns and background noise.
    # We'll assign proportions to each pattern to ensure clear signal (support > 3%).
    patterns_to_generate = {
        "auth_security": int(num_records * 0.08),       # ~8% auth critical security bugs
        "database_perf": int(num_records * 0.10),       # ~10% database performance issues
        "payment_integration": int(num_records * 0.07), # ~7% payment integration high bugs
        "analytics_validation": int(num_records * 0.08),# ~8% analytics validation medium bugs
        "gateway_network": int(num_records * 0.08),     # ~8% gateway network critical bugs
    }
    
    noise_count = num_records - sum(patterns_to_generate.values())
    records = []
    
    # 1. Generate Auth Security Pattern: auth + JWT + Java -> security + critical
    for _ in range(patterns_to_generate["auth_security"]):
        records.append({
            "module": "auth",
            "subsystem": "security",
            "language": "Java",
            "tech_stack": "JWT",
            "bug_type": "security",
            "severity": "critical"
        })
        
    # 2. Generate Database Performance Pattern: database + PostgreSQL -> performance + high
    for _ in range(patterns_to_generate["database_perf"]):
        records.append({
            "module": "database",
            "subsystem": "database",
            "language": np.random.choice(["Java", "Python"]),
            "tech_stack": "PostgreSQL",
            "bug_type": "performance",
            "severity": "high"
        })
        
    # 3. Generate Payment Integration Pattern: payment + api -> integration + high
    for _ in range(patterns_to_generate["payment_integration"]):
        records.append({
            "module": "payment",
            "subsystem": "api",
            "language": np.random.choice(["Java", "TypeScript"]),
            "tech_stack": "SpringBoot",
            "bug_type": "integration",
            "severity": "high"
        })
        
    # 4. Generate Analytics Validation Pattern: analytics + backend -> validation + medium
    for _ in range(patterns_to_generate["analytics_validation"]):
        records.append({
            "module": "analytics",
            "subsystem": "backend",
            "language": "Python",
            "tech_stack": "Kafka",
            "bug_type": "validation",
            "severity": "medium"
        })

    # 5. Generate Gateway Network Pattern: gateway + api -> network + critical
    for _ in range(patterns_to_generate["gateway_network"]):
        records.append({
            "module": "gateway",
            "subsystem": "api",
            "language": "Go",
            "tech_stack": "Docker",
            "bug_type": "network",
            "severity": "critical"
        })

    # 6. Generate Background Noise (completely random choice to dilute data realistically)
    for _ in range(noise_count):
        records.append({
            "module": np.random.choice(MODULES),
            "subsystem": np.random.choice(SUBSYSTEMS),
            "language": np.random.choice(LANGUAGES),
            "tech_stack": np.random.choice(TECH_STACKS),
            "bug_type": np.random.choice(BUG_TYPES),
            "severity": np.random.choice(SEVERITIES)
        })
        
    # Create DataFrame and shuffle to mix patterns and noise
    df = pd.DataFrame(records)
    df = df.sample(frac=1, random_state=seed).reset_index(drop=True)
    
    # Ensure target directory exists
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    # Export to CSV
    df.to_csv(output_path, index=False)
    return df

if __name__ == "__main__":
    # Test script run
    data_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data")
    csv_path = os.path.join(data_dir, "synthetic_bug_data.csv")
    df = generate_synthetic_data(csv_path)
    print(f"Generated synthetic defect dataset with {len(df)} records at: {csv_path}")
    print("\nFirst 5 records:")
    print(df.head())
