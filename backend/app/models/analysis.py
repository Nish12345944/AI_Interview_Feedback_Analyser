from sqlalchemy import Column, Integer, String, Text, Float, DateTime, JSON
from sqlalchemy.sql import func
from app.core.database import Base

class Analysis(Base):
    __tablename__ = "analyses"
    
    id = Column(Integer, primary_key=True, index=True)
    skills = Column(JSON, nullable=False)
    transcript = Column(Text, nullable=False)
    audio_path = Column(String, nullable=True)
    communication_score = Column(Float)
    confidence_score = Column(Float)
    structure_score = Column(Float)
    technical_score = Column(Float)
    improvement_suggestions = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
