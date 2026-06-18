import pandas as pd
import random
import os

# Define categories
modules = ["database", "auth", "payment", "analytics", "gateway", "profile", "search", "reporting", "inventory", "notification"]
subsystems = ["database", "security", "api", "backend", "web", "ui", "queue", "worker", "auth_sub", "router"]
languages = ["Java", "Go", "Python", "TypeScript", "JavaScript"]
tech_stacks = ["PostgreSQL", "JWT", "SpringBoot", "Docker", "Kafka", "React"]
bug_types = ["performance", "security", "integration", "concurrency", "validation", "network"]
severities = ["critical", "high", "medium", "low"]

unique_records = set()

# Inject structured pattern 1: Auth Security Pattern (auth + JWT -> security + critical)
for sub in subsystems:
    for lang in languages:
        unique_records.add(("auth", sub, lang, "JWT", "security", "critical"))

# Inject structured pattern 2: Database Performance Pattern (database + PostgreSQL -> performance + high)
for sub in subsystems:
    for lang in languages:
        unique_records.add(("database", sub, lang, "PostgreSQL", "performance", "high"))

# Inject structured pattern 3: Payment Integration Pattern (payment + SpringBoot -> integration + high)
for sub in subsystems:
    for lang in languages:
        unique_records.add(("payment", sub, lang, "SpringBoot", "integration", "high"))

# Inject structured pattern 4: Analytics Concurrency Pattern (analytics + Kafka -> concurrency + medium)
for sub in subsystems:
    for lang in languages:
        unique_records.add(("analytics", sub, lang, "Kafka", "concurrency", "medium"))

# Inject structured pattern 5: Gateway Network Pattern (gateway + Docker -> network + critical)
for sub in subsystems:
    for lang in languages:
        unique_records.add(("gateway", sub, lang, "Docker", "network", "critical"))

# Fill the rest with completely unique random records until we hit 650 records
attempts = 0
max_attempts = 200000
while len(unique_records) < 650 and attempts < max_attempts:
    attempts += 1
    rec = (
        random.choice(modules),
        random.choice(subsystems),
        random.choice(languages),
        random.choice(tech_stacks),
        random.choice(bug_types),
        random.choice(severities)
    )
    unique_records.add(rec)

# Convert to DataFrame
df_clean = pd.DataFrame(list(unique_records), columns=["module", "subsystem", "language", "tech_stack", "bug_type", "severity"])

# Output paths
data_dir = "/Users/prathamrana/Desktop/BugRisk- Association-Rule–Driven Risk Hotspot Miner for Codebases/data"
os.makedirs(data_dir, exist_ok=True)

# 1. Save Clean Unique Dataset
clean_path = os.path.join(data_dir, "clean_unique_dataset.csv")
df_clean.to_csv(clean_path, index=False)
print(f"Generated clean dataset: {clean_path} | Rows: {len(df_clean)} | Duplicates: {df_clean.duplicated().sum()}")

# 2. Save Duplicate Dataset
# Duplicate 150 random rows
df_dup_rows = df_clean.sample(150, replace=False)
df_dup = pd.concat([df_clean, df_dup_rows], ignore_index=True)
dup_path = os.path.join(data_dir, "duplicate_dataset.csv")
df_dup.to_csv(dup_path, index=False)
print(f"Generated duplicate dataset: {dup_path} | Rows: {len(df_dup)} | Duplicates: {df_dup.duplicated().sum()}")

# 3. Save Missing Values Dataset
# Copy clean and randomly set ~15% of cells to empty strings
df_missing = df_clean.copy()
for col in df_missing.columns:
    for i in range(len(df_missing)):
        if random.random() < 0.15:
            df_missing.at[i, col] = ""
missing_path = os.path.join(data_dir, "missing_values_dataset.csv")
df_missing.to_csv(missing_path, index=False)
print(f"Generated missing values dataset: {missing_path} | Rows: {len(df_missing)}")

# 4. Save Broken Schema Dataset
# Remove 'severity' column
df_broken = df_clean.copy()
df_broken.drop(columns=["severity"], inplace=True)
broken_path = os.path.join(data_dir, "broken_schema_dataset.csv")
df_broken.to_csv(broken_path, index=False)
print(f"Generated broken schema dataset: {broken_path} | Rows: {len(df_broken)} | Columns: {list(df_broken.columns)}")
