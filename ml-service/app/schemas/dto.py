from pydantic import BaseModel, Field
from typing import Optional, List

class PipelineRunRequest(BaseModel):
    rows: Optional[int] = Field(None, description="Number of rows to generate in synthetic dataset")
    seed: Optional[int] = Field(None, description="Random seed for generation reproducibility")
    algorithm: Optional[str] = Field(None, description="Mining algorithm: 'fpgrowth' or 'apriori'")
    support: Optional[float] = Field(None, description="Minimum support threshold")
    confidence: Optional[float] = Field(None, description="Minimum confidence threshold")
    lift: Optional[float] = Field(None, description="Minimum lift threshold")
    dataSource: Optional[str] = Field("synthetic", description="Data source: 'synthetic' or 'uploaded'")

class RuleDTO(BaseModel):
    antecedent: str
    consequent: str
    support: float
    confidence: float
    lift: float

class ModuleRiskDTO(BaseModel):
    module: str
    risk_score: float
    risk_level: str
    top_rules: List[RuleDTO]

class PipelineRunResponse(BaseModel):
    status: str
    rules_count: int
    modules_count: int
    runtime_ms: int
    dataset_hash: Optional[str] = None
    dataset_rows: Optional[int] = None
    dataset_columns: Optional[int] = None
    rules: List[RuleDTO]
    module_risk: List[ModuleRiskDTO]

