import openai
import json
from typing import List
from app.core.config import settings

openai.api_key = settings.OPENAI_API_KEY

async def generate_interview_questions(skills: List[str]) -> List[str]:
    prompt = f"""Generate 5 interview questions for a candidate with the following skills: {', '.join(skills)}

Provide questions that test both technical knowledge and practical application.
Return ONLY a JSON array of questions, nothing else.

Example format: ["Question 1?", "Question 2?", "Question 3?", "Question 4?", "Question 5?"]
"""
    
    try:
        response = openai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are an expert technical interviewer."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.8,
            max_tokens=300
        )
        
        content = response.choices[0].message.content.strip()
        questions = json.loads(content)
        return questions
    except Exception as e:
        return [
            f"Tell me about your experience with {skills[0] if skills else 'technology'}?",
            "Describe a challenging project you worked on.",
            "How do you approach problem-solving?",
            "What are your strengths and weaknesses?",
            "Where do you see yourself in 5 years?"
        ]

async def transcribe_audio(audio_path: str) -> str:
    try:
        with open(audio_path, "rb") as audio_file:
            transcript = openai.audio.transcriptions.create(
                model="whisper-1",
                file=audio_file
            )
        return transcript.text
    except Exception as e:
        raise Exception(f"Transcription failed: {str(e)}")

async def analyze_interview(transcript: str, skills: List[str]) -> dict:
    skills_str = ', '.join(skills)
    prompt = f"""Analyze this mock interview for a candidate with skills in {skills_str}:

Transcript:
{transcript}

Provide analysis in JSON format:
{{
    "communication_score": <0-100>,
    "confidence_score": <0-100>,
    "structure_score": <0-100>,
    "technical_score": <0-100>,
    "improvement_suggestions": "<detailed feedback>"
}}

Evaluate:
- Communication: Clarity, articulation
- Confidence: Assertiveness, hesitation
- Structure: Organization, coherence
- Technical: Knowledge depth for {skills_str}
"""
    
    try:
        response = openai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are an expert interview coach."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            max_tokens=500
        )
        
        content = response.choices[0].message.content
        result = json.loads(content)
        return result
    except Exception as e:
        return {
            "communication_score": 0,
            "confidence_score": 0,
            "structure_score": 0,
            "technical_score": 0,
            "improvement_suggestions": f"Analysis failed: {str(e)}"
        }
