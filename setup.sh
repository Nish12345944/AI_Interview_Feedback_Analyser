#!/bin/bash

echo "🚀 Setting up AI Interview Feedback Analyzer..."

# Check if .env exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Please create one from .env.example"
    exit 1
fi

# Build and start services
echo "📦 Building Docker containers..."
docker-compose build

echo "🎬 Starting services..."
docker-compose up -d

echo "⏳ Waiting for services to be ready..."
sleep 10

echo "✅ Setup complete!"
echo ""
echo "🌐 Access the application:"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:8000"
echo "   API Docs: http://localhost:8000/docs"
echo ""
echo "📝 To view logs: docker-compose logs -f"
echo "🛑 To stop: docker-compose down"
