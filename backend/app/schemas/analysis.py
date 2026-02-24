from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List

class AnalysisCreate(BaseModel):
    skills: List[str]
    transcript: str

class AnalysisResponse(BaseModel):
    id: int
    skills: List[str]
    transcript: str
    audio_path: Optional[str]
    communication_score: Optional[float]
    confidence_score: Optional[float]
    structure_score: Optional[float]
    technical_score: Optional[float]
    improvement_suggestions: Optional[str]
    created_at: datetime
    
    class Config:
        from_attributes = True

class QuestionRequest(BaseModel):
    skills: List[str]

class QuestionResponse(BaseModel):
    questions: List[str]
