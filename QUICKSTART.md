# Quick Start Guide (Windows)

## Prerequisites
1. Install Docker Desktop for Windows from https://www.docker.com/products/docker-desktop
2. Get an OpenAI API key from https://platform.openai.com/api-keys

## Setup (5 minutes)

### Step 1: Configure API Key
1. Open the `.env` file in this folder
2. Replace `your_openai_api_key_here` with your actual OpenAI API key
3. Save the file

### Step 2: Start the Application
1. Open Command Prompt or PowerShell in this folder
2. Run:
   ```
   setup.bat
   ```
   OR
   ```
   docker-compose up --build
   ```

### Step 3: Access the Application
- Open your browser and go to: http://localhost:3000
- The backend API is at: http://localhost:8000
- API documentation is at: http://localhost:8000/docs

## Usage

1. Paste an interview transcript in the text area
2. Click "Analyze Interview"
3. Wait 10-20 seconds for AI analysis
4. View your scores and improvement suggestions

## Stop the Application

Press `Ctrl+C` in the terminal, then run:
```
docker-compose down
```

## Troubleshooting

### "Docker is not running"
- Start Docker Desktop from the Start menu

### "Port already in use"
- Stop other applications using ports 3000, 8000, or 5432
- Or change ports in docker-compose.yml

### "Analysis failed"
- Check if your OpenAI API key is correct in .env
- Ensure you have API credits in your OpenAI account

## Need Help?
Check GUIDE.md for detailed documentation.
