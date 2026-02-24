@echo off
echo Setting up AI Interview Feedback Analyzer...

if not exist .env (
    echo .env file not found. Please create one from .env.example
    exit /b 1
)

echo Building Docker containers...
docker-compose build

echo Starting services...
docker-compose up -d

echo Waiting for services to be ready...
timeout /t 10 /nobreak > nul

echo Setup complete!
echo.
echo Access the application:
echo   Frontend: http://localhost:3000
echo   Backend API: http://localhost:8000
echo   API Docs: http://localhost:8000/docs
echo.
echo To view logs: docker-compose logs -f
echo To stop: docker-compose down
