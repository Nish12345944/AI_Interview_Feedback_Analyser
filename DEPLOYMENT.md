# Deployment Guide for Render

## Prerequisites
- GitHub account
- Render account (https://render.com)
- OpenAI API key

## Step 1: Push to GitHub
```bash
git add .
git commit -m "Deploy-ready application"
git push origin main
```

## Step 2: Create PostgreSQL Database on Render

1. Go to Render Dashboard
2. Click "New +" → "PostgreSQL"
3. Name: `interview-db`
4. Database: `interview_db`
5. User: `interview_user`
6. Click "Create Database"
7. Copy the "Internal Database URL"

## Step 3: Deploy Backend

1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Configure:
   - **Name**: `interview-backend`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - **Root Directory**: `backend`

4. Add Environment Variables:
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `DATABASE_URL`: Paste the Internal Database URL from Step 2

5. Click "Create Web Service"

## Step 4: Deploy Frontend

1. Click "New +" → "Static Site"
2. Connect your GitHub repository
3. Configure:
   - **Name**: `interview-frontend`
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Publish Directory**: `frontend/build`

4. Add Environment Variable:
   - `REACT_APP_API_URL`: `https://interview-backend.onrender.com` (replace with your backend URL)

5. Click "Create Static Site"

## Step 5: Test Your Application

1. Wait for both services to deploy (5-10 minutes)
2. Open your frontend URL
3. Test the interview flow

## Troubleshooting

### Backend Issues
- Check logs in Render dashboard
- Verify DATABASE_URL is correct
- Ensure OPENAI_API_KEY is set

### Frontend Issues
- Verify REACT_APP_API_URL points to backend
- Check CORS settings in backend
- Clear browser cache

### Database Issues
- Ensure database is running
- Check connection string format
- Verify network access

## Environment Variables Summary

### Backend
```
OPENAI_API_KEY=sk-...
DATABASE_URL=postgresql+asyncpg://user:pass@host/db
```

### Frontend
```
REACT_APP_API_URL=https://your-backend.onrender.com
```

## Notes

- Free tier services sleep after 15 minutes of inactivity
- First request after sleep may take 30-60 seconds
- Upgrade to paid tier for always-on services
- Database backups are automatic on paid plans
