# AI Interview Feedback Analyzer - Complete Guide

## 📋 Overview

A production-ready full-stack application that analyzes interview transcripts using AI and provides structured feedback with scores and improvement suggestions.

## 🏗️ Architecture

### Backend (FastAPI)
- **Framework**: FastAPI with async/await support
- **Database**: PostgreSQL with SQLAlchemy ORM
- **AI Service**: OpenAI GPT-3.5-turbo for analysis
- **API Documentation**: Auto-generated Swagger UI at `/docs`

### Frontend (React)
- **Framework**: React 18
- **HTTP Client**: Axios
- **Styling**: Custom CSS with responsive design
- **Server**: Nginx for production serving

### Infrastructure
- **Containerization**: Docker & Docker Compose
- **Database**: PostgreSQL 15
- **Reverse Proxy**: Nginx

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose installed
- OpenAI API key (get from https://platform.openai.com/api-keys)

### Setup Steps

1. **Clone and navigate to the project**
   ```bash
   cd "AI Interview Feedback Analyzer"
   ```

2. **Configure environment**
   - Edit `.env` file and add your OpenAI API key:
   ```
   OPENAI_API_KEY=sk-your-actual-key-here
   ```

3. **Start the application**
   
   On Windows:
   ```bash
   setup.bat
   ```
   
   On Linux/Mac:
   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```
   
   Or manually:
   ```bash
   docker-compose up --build
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

## 📖 Usage

1. Open http://localhost:3000 in your browser
2. Paste an interview transcript in the text area
3. Click "Analyze Interview"
4. View the results with scores and suggestions

### Example Transcript

```
Interviewer: Tell me about yourself.
Candidate: Um, well, I'm a software developer with about 5 years of experience. I've worked on various projects using Python and JavaScript. I really enjoy problem-solving and building scalable applications.

Interviewer: What's your biggest strength?
Candidate: I think my biggest strength is my ability to learn quickly. When I encounter new technologies, I can pick them up fast and apply them effectively.

Interviewer: Describe a challenging project you worked on.
Candidate: One challenging project was when we had to migrate a legacy system to a microservices architecture. It required careful planning and coordination with multiple teams. We successfully completed it in 6 months.
```

## 🔧 Development

### Backend Development

```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # Linux/Mac
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend Development

```bash
cd frontend
npm install
npm start
```

### Database Access

```bash
docker exec -it interview_db psql -U interview_user -d interview_db
```

## 📊 API Endpoints

### POST /api/analyze
Analyze an interview transcript

**Request:**
```json
{
  "transcript": "Interview transcript text..."
}
```

**Response:**
```json
{
  "id": 1,
  "transcript": "Interview transcript text...",
  "communication_score": 85.0,
  "confidence_score": 78.0,
  "structure_score": 82.0,
  "improvement_suggestions": "Consider using more specific examples...",
  "created_at": "2024-01-15T10:30:00Z"
}
```

### GET /api/analysis/{id}
Retrieve a specific analysis by ID

### GET /api/analyses?skip=0&limit=10
List all analyses with pagination

## 🐳 Docker Commands

```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild containers
docker-compose up --build

# Remove volumes (reset database)
docker-compose down -v
```

## 🔒 Security Considerations

1. **API Keys**: Never commit `.env` file with real API keys
2. **CORS**: Configure allowed origins in production
3. **Rate Limiting**: Add rate limiting for production use
4. **Input Validation**: All inputs are validated via Pydantic
5. **SQL Injection**: Protected by SQLAlchemy ORM

## 📁 Project Structure

```
AI Interview Feedback Analyzer/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   └── routes.py          # API endpoints
│   │   ├── core/
│   │   │   ├── config.py          # Configuration
│   │   │   └── database.py        # Database setup
│   │   ├── models/
│   │   │   └── analysis.py        # SQLAlchemy models
│   │   ├── schemas/
│   │   │   └── analysis.py        # Pydantic schemas
│   │   ├── services/
│   │   │   └── ai_service.py      # AI analysis logic
│   │   └── main.py                # FastAPI app
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── AnalysisForm.js
│   │   │   └── ResultsDisplay.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
├── docker-compose.yml
├── .env
└── README.md
```

## 🧪 Testing

### Backend Tests
```bash
cd backend
pytest
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 🚀 Production Deployment

### Environment Variables for Production

```env
OPENAI_API_KEY=your_production_key
DATABASE_URL=postgresql+asyncpg://user:pass@prod-db:5432/db
```

### Deployment Checklist

- [ ] Set production environment variables
- [ ] Configure CORS with specific origins
- [ ] Enable HTTPS/SSL
- [ ] Set up database backups
- [ ] Configure logging and monitoring
- [ ] Add rate limiting
- [ ] Set up CI/CD pipeline
- [ ] Configure health checks

## 🐛 Troubleshooting

### Database Connection Issues
```bash
docker-compose logs postgres
docker-compose restart postgres
```

### Backend Not Starting
```bash
docker-compose logs backend
# Check if OPENAI_API_KEY is set in .env
```

### Frontend Not Loading
```bash
docker-compose logs frontend
# Check if backend is running
```

## 📝 License

MIT License - feel free to use this project for learning or commercial purposes.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📧 Support

For issues and questions, please open an issue on GitHub.
