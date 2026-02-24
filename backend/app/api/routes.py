from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List
import os
import uuid
import aiofiles
from app.core.database import get_db
from app.models.analysis import Analysis
from app.schemas.analysis import AnalysisCreate, AnalysisResponse, QuestionRequest, QuestionResponse
from app.services.ai_service import analyze_interview, generate_interview_questions, transcribe_audio

router = APIRouter(prefix="/api", tags=["analysis"])

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/questions", response_model=QuestionResponse)
async def get_questions(data: QuestionRequest):
    questions = await generate_interview_questions(data.skills)
    return {"questions": questions}

@router.post("/upload-audio")
async def upload_audio(file: UploadFile = File(...)):
    try:
        # Generate unique filename
        import uuid
        file_extension = file.filename.split('.')[-1] if '.' in file.filename else 'wav'
        unique_filename = f"{uuid.uuid4()}.{file_extension}"
        file_path = os.path.join(UPLOAD_DIR, unique_filename)
        
        # Save file
        async with aiofiles.open(file_path, 'wb') as f:
            content = await file.read()
            await f.write(content)
        
        # Transcribe
        transcript = await transcribe_audio(file_path)
        
        # Clean up file
        try:
            os.remove(file_path)
        except:
            pass
            
        return {"transcript": transcript, "audio_path": file_path}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/analyze", response_model=AnalysisResponse)
async def create_analysis(
    data: AnalysisCreate,
    db: AsyncSession = Depends(get_db)
):
    ai_result = await analyze_interview(data.transcript, data.skills)
    
    analysis = Analysis(
        skills=data.skills,
        transcript=data.transcript,
        communication_score=ai_result.get("communication_score"),
        confidence_score=ai_result.get("confidence_score"),
        structure_score=ai_result.get("structure_score"),
        technical_score=ai_result.get("technical_score"),
        improvement_suggestions=ai_result.get("improvement_suggestions")
    )
    
    db.add(analysis)
    await db.commit()
    await db.refresh(analysis)
    
    return analysis

@router.get("/analysis/{analysis_id}", response_model=AnalysisResponse)
async def get_analysis(
    analysis_id: int,
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(Analysis).where(Analysis.id == analysis_id))
    analysis = result.scalar_one_or_none()
    
    if not analysis:
        raise HTTPException(status_code=404, detail="Analysis not found")
    
    return analysis

@router.get("/analyses", response_model=List[AnalysisResponse])
async def list_analyses(
    skip: int = 0,
    limit: int = 10,
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(
        select(Analysis).order_by(Analysis.created_at.desc()).offset(skip).limit(limit)
    )
    analyses = result.scalars().all()
    return analyses
