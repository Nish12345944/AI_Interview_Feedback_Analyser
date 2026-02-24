# AI Mock Interview Analyzer

A production-ready full-stack application for conducting live mock interviews with AI-powered feedback.

## Features

- **Skill-Based Interviews**: Select specific skills to be interviewed on
- **AI-Generated Questions**: Dynamic question generation based on selected skills
- **Live Audio Recording**: Record your responses in real-time
- **Audio Transcription**: Automatic speech-to-text using OpenAI Whisper
- **Comprehensive Analysis**: 
  - Communication scoring
  - Confidence assessment
  - Structure evaluation
  - Technical skill evaluation
- **Detailed Feedback**: AI-powered improvement suggestions
- **PostgreSQL Storage**: Persistent storage of all interviews and analyses

## Tech Stack

- **Backend**: FastAPI, SQLAlchemy, PostgreSQL
- **Frontend**: React, react-mic, Axios
- **Infrastructure**: Docker, Docker Compose
- **AI**: OpenAI API (GPT-3.5 + Whisper)

## Quick Start

1. Clone the repository
2. Add your OpenAI API key to `.env`:
   ```
   OPENAI_API_KEY=your_key_here
   ```

3. Run with Docker Compose:
   ```bash
   docker-compose up --build
   ```

4. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Docs: http://localhost:8000/docs

## How It Works

1. **Select Skills**: Choose the skills you want to be interviewed on (Python, JavaScript, React, etc.)
2. **Get Questions**: AI generates 5 relevant interview questions
3. **Record Answers**: Record your audio responses for each question
4. **Get Feedback**: Receive detailed AI analysis with scores and improvement suggestions

## API Endpoints

- `POST /api/questions` - Generate interview questions based on skills
- `POST /api/upload-audio` - Upload and transcribe audio file
- `POST /api/analyze` - Analyze interview transcript
- `GET /api/analysis/{id}` - Get analysis by ID
- `GET /api/analyses` - List all analyses

## Development

### Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## Database Migration

If upgrading from the old version, run:
```bash
cd backend
python migration_001.py
```

## License

MIT
