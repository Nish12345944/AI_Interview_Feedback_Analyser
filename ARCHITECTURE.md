# Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER BROWSER                             │
│                     http://localhost:3000                        │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    FRONTEND CONTAINER                            │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    React Application                      │  │
│  │  ┌─────────────────┐  ┌──────────────────────────────┐  │  │
│  │  │ AnalysisForm    │  │    ResultsDisplay            │  │  │
│  │  │ - Text Input    │  │    - Score Cards             │  │  │
│  │  │ - Submit Button │  │    - Suggestions             │  │  │
│  │  └─────────────────┘  └──────────────────────────────┘  │  │
│  │                                                           │  │
│  │                      App.js (Main)                       │  │
│  │                    - State Management                    │  │
│  │                    - API Calls (Axios)                   │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│                    Nginx (Port 80 → 3000)                       │
└────────────────────────────┬────────────────────────────────────┘
                             │ HTTP Requests
                             │ /api/*
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    BACKEND CONTAINER                             │
│                    FastAPI (Port 8000)                           │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                      main.py                              │  │
│  │                  - CORS Middleware                        │  │
│  │                  - Route Registration                     │  │
│  └────────────────────────┬─────────────────────────────────┘  │
│                            │                                     │
│  ┌────────────────────────▼─────────────────────────────────┐  │
│  │                   api/routes.py                           │  │
│  │  ┌──────────────────────────────────────────────────┐    │  │
│  │  │ POST /api/analyze                                 │    │  │
│  │  │ GET  /api/analysis/{id}                           │    │  │
│  │  │ GET  /api/analyses                                │    │  │
│  │  └──────────────────────────────────────────────────┘    │  │
│  └────────────────────────┬─────────────────────────────────┘  │
│                            │                                     │
│  ┌────────────────────────▼─────────────────────────────────┐  │
│  │              services/ai_service.py                       │  │
│  │  ┌──────────────────────────────────────────────────┐    │  │
│  │  │  analyze_interview()                              │    │  │
│  │  │  - Calls OpenAI API                               │    │  │
│  │  │  - Returns scores & suggestions                   │    │  │
│  │  └──────────────────────────────────────────────────┘    │  │
│  └───────────────────────────────────────────────────────────┘  │
│                            │                                     │
│  ┌────────────────────────▼─────────────────────────────────┐  │
│  │              models/analysis.py                           │  │
│  │              schemas/analysis.py                          │  │
│  │  - SQLAlchemy ORM Model                                   │  │
│  │  - Pydantic Validation                                    │  │
│  └────────────────────────┬─────────────────────────────────┘  │
│                            │                                     │
│  ┌────────────────────────▼─────────────────────────────────┐  │
│  │              core/database.py                             │  │
│  │  - Async SQLAlchemy Engine                                │  │
│  │  - Session Management                                     │  │
│  └───────────────────────────────────────────────────────────┘  │
└────────────────────────────┬────────────────────────────────────┘
                             │ SQL Queries
                             │ (asyncpg)
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                   POSTGRES CONTAINER                             │
│                   PostgreSQL 15 (Port 5432)                      │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    Database: interview_db                 │  │
│  │  ┌──────────────────────────────────────────────────┐    │  │
│  │  │              Table: analyses                      │    │  │
│  │  │  - id (Primary Key)                               │    │  │
│  │  │  - transcript (Text)                              │    │  │
│  │  │  - communication_score (Float)                    │    │  │
│  │  │  - confidence_score (Float)                       │    │  │
│  │  │  - structure_score (Float)                        │    │  │
│  │  │  - improvement_suggestions (Text)                 │    │  │
│  │  │  - created_at (Timestamp)                         │    │  │
│  │  └──────────────────────────────────────────────────┘    │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│                    Volume: postgres_data                         │
└─────────────────────────────────────────────────────────────────┘

                             ▲
                             │ API Calls
                             │
┌─────────────────────────────────────────────────────────────────┐
│                      EXTERNAL SERVICE                            │
│                      OpenAI API                                  │
│                   (GPT-3.5-turbo)                                │
│  - Receives interview transcript                                 │
│  - Returns structured analysis                                   │
└─────────────────────────────────────────────────────────────────┘


DATA FLOW:
──────────

1. User pastes transcript → React Form
2. Form submits → Axios POST to /api/analyze
3. FastAPI receives request → Validates with Pydantic
4. AI Service calls OpenAI API → Gets analysis
5. Backend creates Analysis record → Saves to PostgreSQL
6. Response sent back → React displays results


DOCKER COMPOSE ORCHESTRATION:
─────────────────────────────

┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Frontend   │────▶│   Backend    │────▶│  PostgreSQL  │
│  Port: 3000  │     │  Port: 8000  │     │  Port: 5432  │
└──────────────┘     └──────────────┘     └──────────────┘
      │                     │                     │
      └─────────────────────┴─────────────────────┘
                    Docker Network
```

## Key Components

### Frontend (React)
- **Purpose**: User interface for transcript input and results display
- **Technology**: React 18, Axios, Custom CSS
- **Container**: Nginx serving static build

### Backend (FastAPI)
- **Purpose**: API server, business logic, AI integration
- **Technology**: FastAPI, SQLAlchemy, OpenAI SDK
- **Container**: Python 3.11 with Uvicorn

### Database (PostgreSQL)
- **Purpose**: Persistent storage for analyses
- **Technology**: PostgreSQL 15
- **Container**: Official PostgreSQL Alpine image

### External Service (OpenAI)
- **Purpose**: AI-powered interview analysis
- **Technology**: GPT-3.5-turbo API
- **Integration**: Via OpenAI Python SDK
