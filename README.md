# InterviewAI Pro 🎤

A production-ready full-stack application for conducting live mock interviews with AI-powered feedback and analysis. Features a stunning Japanese-inspired dark theme UI.

## 🎯 Features

- **Two Interview Types:**
  - 💻 Technical Interview (Python, JavaScript, React, AWS, etc.)
  - 👔 HR Interview (Behavioral questions)
- **Instant Question Generation** - Get 5 relevant questions immediately
- **Live Audio Recording** - Record your responses in real-time
- **AI-Powered Analysis:**
  - Communication Score (0-100)
  - Confidence Score (0-100)
  - Structure Score (0-100)
  - Technical Score (0-100)
- **Detailed Feedback** - Personalized improvement suggestions
- **Beautiful UI** - Dark theme with Japanese aesthetic
- **Fully Responsive** - Works on mobile, tablet, and desktop

## 🛠️ Tech Stack

**Backend:**
- FastAPI
- SQLAlchemy
- PostgreSQL
- OpenAI API (GPT-3.5 + Whisper)

**Frontend:**
- React
- Axios
- Native MediaRecorder API
- Noto Sans JP Font

**Infrastructure:**
- Docker
- Docker Compose

## 🚀 Quick Start

### Prerequisites
- Docker Desktop installed
- OpenAI API key (optional - app works with mock data)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Nish12345944/AI_Interview_Feedback_Analyser.git
cd AI_Interview_Feedback_Analyser
```

2. **Set up environment variables** (Optional)
```bash
# Edit .env file and add your OpenAI API key
OPENAI_API_KEY=your_openai_api_key_here
DATABASE_URL=postgresql+asyncpg://interview_user:interview_pass@postgres:5432/interview_db
```

3. **Run with Docker Compose**
```bash
docker-compose up --build
```

4. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

## 📖 How to Use

1. **Choose Interview Type**
   - Select Technical or HR interview

2. **Select Skills** (Technical only)
   - Choose relevant skills (Python, React, AWS, etc.)

3. **Start Interview**
   - Get 5 instant questions based on your selection

4. **Record Answers**
   - Click "Start Recording" for each question
   - Speak your answer naturally
   - Click "Stop Recording" when done

5. **Get Feedback**
   - Click "Finish Interview"
   - Receive instant AI-style analysis
   - View scores and improvement suggestions

## 🎨 UI Features
- **Smooth Animations**: Hover effects and transitions
- **Responsive Design**: Mobile-first approach
- **Professional Look**: Clean and modern interface

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/questions` | Generate interview questions |
| POST | `/api/upload-audio` | Upload and transcribe audio |
| POST | `/api/analyze` | Analyze interview transcript |
| GET | `/api/analysis/{id}` | Get analysis by ID |
| GET | `/api/analyses` | List all analyses |

## 💻 Development

### Backend Setup
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # Mac/Linux
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

## 📁 Project Structure

```
AI_Interview_Feedback_Analyser/
├── backend/
│   ├── app/
│   │   ├── api/          # API routes
│   │   ├── core/         # Config & database
│   │   ├── models/       # Database models
│   │   ├── schemas/      # Pydantic schemas
│   │   └── services/     # AI services
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── App.js
│   │   └── App.css
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
├── .env
└── README.md
```

## 🔒 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | Your OpenAI API key | No (uses mock data) |
| `DATABASE_URL` | PostgreSQL connection string | Yes |

## 🚢 Deployment

### Deploy to Render

1. **Create PostgreSQL Database** on Render
2. **Deploy Backend**:
   - Build: `pip install -r requirements.txt`
   - Start: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - Root: `backend`
   - Env: `OPENAI_API_KEY`, `DATABASE_URL`

3. **Deploy Frontend**:
   - Build: `cd frontend && npm install && npm run build`
   - Publish: `frontend/build`
   - Env: `REACT_APP_API_URL` (your backend URL)

See `DEPLOYMENT.md` for detailed instructions.

## ✨ Key Features

- **No API Required**: Works with mock data for instant testing
- **Instant Feedback**: Get results in 2 seconds
- **Beautiful Scores**: Visual score cards with color coding
- **Skill-Based**: Questions tailored to selected skills
- **Session History**: Track all your practice sessions

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🙏 Acknowledgments

- OpenAI for GPT-3.5 and Whisper API
- FastAPI for the excellent web framework
- React for the frontend library
- Google Fonts for Noto Sans JP

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Made with ❤️ for interview preparation**
