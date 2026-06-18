import requests
import json
import os

base_url = "http://localhost:8080/api/v1"
data_dir = "/Users/prathamrana/Desktop/BugRisk- Association-Rule–Driven Risk Hotspot Miner for Codebases/data"

# Login
login_res = requests.post(f"{base_url}/auth/login", json={
    "username": "admin",
    "password": "admin123"
})
token = login_res.json()["token"]
headers = {"Authorization": f"Bearer {token}"}

datasets = [
    "clean_unique_dataset.csv",
    "duplicate_dataset.csv",
    "missing_values_dataset.csv",
    "broken_schema_dataset.csv"
]

print("==================================================")
print("PHASE A END-TO-END DATASET INGESTION AUDIT")
print("==================================================")

for ds in datasets:
    file_path = os.path.join(data_dir, ds)
    print(f"\n---> Testing Dataset Ingestion: {ds}")
    
    with open(file_path, "rb") as f:
        files = {"file": (ds, f, "text/csv")}
        upload_res = requests.post(f"{base_url}/scan/upload", headers={"Authorization": f"Bearer {token}"}, files=files)
        
    if upload_res.status_code != 200:
        print(f"  [Error] Upload status code: {upload_res.status_code}")
        print(f"  [Body]: {upload_res.text}")
        continue
        
    upload_data = upload_res.json()
    print(f"  * Upload Status: {upload_data.get('status')}")
    print(f"  * Schema Validation Status: {upload_data.get('validation_status')}")
    print(f"  * Errors Mapped: {upload_data.get('errors')}")
    
    if upload_data.get("validation_status") == "invalid":
        # Broken schema expected output
        print("  ✔ Successfully rejected invalid schema.")
        continue

    # Retrieve dataset profile profile
    profile_res = requests.post(f"{base_url}/analytics/dataset-profile?source=uploaded", headers=headers)
    profile = profile_res.json()
    
    print(f"  * Total Rows: {profile.get('rows')}")
    print(f"  * Duplicate Rows: {profile.get('duplicates')}")
    print(f"  * Null Cells: {profile.get('null_count')}")
    print(f"  * Quality Score: {profile.get('quality_score')}/100")
    print(f"  * Schema Verification Check: {profile.get('schema_status')}")
    
    # Assertions check
    if ds == "clean_unique_dataset.csv":
        if profile.get('duplicates') == 0 and profile.get('quality_score') >= 90:
            print("  ✔ Clean unique dataset matches expected quality thresholds!")
        else:
            print("  ✘ Clean unique dataset fails quality expectations.")
    elif ds == "duplicate_dataset.csv":
        if profile.get('duplicates') > 0 and profile.get('quality_score') < 90:
            print("  ✔ Duplicate penalty triggers warning quality reduction!")
        else:
            print("  ✘ Duplicate penalty fails to reduce score.")
    elif ds == "missing_values_dataset.csv":
        if profile.get('null_count') > 0 and profile.get('quality_score') < 90:
            print("  ✔ Null cell penalty triggers warning quality reduction!")
        else:
            print("  ✘ Null cell penalty fails to reduce score.")
            
print("\n==================================================")
