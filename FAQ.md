# Frequently Asked Questions (FAQ)

## General Questions

### What is the AI Interview Feedback Analyzer?
A full-stack web application that uses AI to analyze interview transcripts and provide structured feedback including communication, confidence, and structure scores along with improvement suggestions.

### What technologies are used?
- **Backend**: FastAPI (Python), PostgreSQL, SQLAlchemy
- **Frontend**: React, Axios
- **AI**: OpenAI GPT-3.5-turbo
- **Infrastructure**: Docker, Docker Compose, Nginx

### Is this production-ready?
Yes! The application includes:
- Proper error handling
- Database persistence
- Docker containerization
- Environment-based configuration
- Security best practices
- Comprehensive documentation

## Setup & Installation

### Do I need to install Python or Node.js?
No! Everything runs in Docker containers. You only need Docker Desktop installed.

### How do I get an OpenAI API key?
1. Go to https://platform.openai.com
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key
5. Copy and paste it into your `.env` file

### What if I don't have an OpenAI API key?
You'll need one to use the AI analysis feature. OpenAI offers free credits for new accounts. Alternatively, you can modify the `ai_service.py` to use a different AI provider.

### How much does OpenAI API cost?
GPT-3.5-turbo costs approximately $0.002 per 1K tokens. A typical interview analysis uses ~500-1000 tokens, costing $0.001-$0.002 per analysis.

### Can I run this without Docker?
Yes, but it's more complex:
1. Install Python 3.11+
2. Install PostgreSQL
3. Install Node.js 18+
4. Set up virtual environments
5. Install dependencies manually
6. Configure database connections

Docker is highly recommended for simplicity.

## Usage Questions

### What format should the interview transcript be in?
Plain text format with clear speaker labels. Example:
```
Interviewer: Question here?
Candidate: Answer here.
```

### How long should the transcript be?
- Minimum: 100 words
- Recommended: 300-1000 words
- Maximum: 4000 words (API limit)

### How long does analysis take?
Typically 10-20 seconds, depending on:
- Transcript length
- OpenAI API response time
- Network latency

### Can I upload audio files?
The current version accepts text transcripts only. To add audio support:
1. Integrate a speech-to-text service (Whisper, Google Speech-to-Text)
2. Add file upload handling in backend
3. Process audio to text before analysis

### Are my transcripts saved?
Yes, all analyses are saved to the PostgreSQL database. You can view past analyses via the API endpoints.

### Can I delete old analyses?
Currently, there's no delete endpoint. You can add one by:
1. Adding a DELETE route in `routes.py`
2. Implementing the delete logic
3. Adding a delete button in the frontend

## Technical Questions

### How does the AI analysis work?
1. User submits transcript
2. Backend sends transcript to OpenAI API with specific prompt
3. OpenAI analyzes and returns structured JSON
4. Backend saves results to database
5. Frontend displays scores and suggestions

### What scores are provided?
- **Communication Score**: Clarity, articulation, vocabulary
- **Confidence Score**: Assertiveness, hesitation patterns
- **Structure Score**: Organization, coherence, logical flow

Each score ranges from 0-100.

### Can I customize the scoring criteria?
Yes! Edit the prompt in `backend/app/services/ai_service.py`:
```python
prompt = f"""Analyze the following interview transcript...
[Modify this section to change criteria]
"""
```

### How accurate is the AI analysis?
The analysis is based on GPT-3.5-turbo, which provides reasonable insights but should be used as guidance, not absolute truth. Accuracy depends on:
- Transcript quality
- Interview context
- AI model limitations

### Can I use a different AI model?
Yes! Options include:
- GPT-4 (more accurate, more expensive)
- Claude (Anthropic)
- Open-source models (Llama, Mistral)
- Custom fine-tuned models

Modify `ai_service.py` to integrate different providers.

## Database Questions

### Where is the database stored?
In a Docker volume named `postgres_data`. Data persists even when containers are stopped.

### How do I backup the database?
```bash
docker exec interview_db pg_dump -U interview_user interview_db > backup.sql
```

### How do I restore from backup?
```bash
docker exec -i interview_db psql -U interview_user interview_db < backup.sql
```

### Can I use a different database?
Yes, but you'll need to:
1. Update `DATABASE_URL` in `.env`
2. Ensure the database supports async operations
3. Test compatibility with SQLAlchemy

Supported databases: PostgreSQL, MySQL (with aiomysql), SQLite (limited async support)

### How do I view database contents?
```bash
docker exec -it interview_db psql -U interview_user interview_db
\dt  # List tables
SELECT * FROM analyses;  # View data
```

## Deployment Questions

### Can I deploy this to production?
Yes! See `DEPLOYMENT_CHECKLIST.md` for detailed steps.

### What hosting providers are recommended?
- **AWS**: ECS, RDS, S3, CloudFront
- **Google Cloud**: Cloud Run, Cloud SQL
- **Azure**: App Service, Azure Database
- **DigitalOcean**: Droplets, Managed Databases
- **Heroku**: Easy deployment with add-ons

### Do I need a domain name?
Not required for testing, but recommended for production. You can use:
- Custom domain (yourdomain.com)
- Cloud provider subdomain
- IP address (not recommended)

### How do I enable HTTPS?
1. Get SSL certificate (Let's Encrypt is free)
2. Configure Nginx with SSL
3. Update frontend API URL to use HTTPS
4. Redirect HTTP to HTTPS

### How many users can this handle?
Depends on your infrastructure:
- **Single server**: 100-1000 concurrent users
- **With load balancer**: 10,000+ users
- **Bottleneck**: OpenAI API rate limits

## Troubleshooting

### "Docker is not running"
Start Docker Desktop from your applications menu.

### "Port already in use"
Another application is using the port. Options:
1. Stop the other application
2. Change ports in `docker-compose.yml`

### "Cannot connect to database"
1. Check if PostgreSQL container is running: `docker-compose ps`
2. Verify DATABASE_URL in `.env`
3. Check logs: `docker-compose logs postgres`

### "OpenAI API error"
Common causes:
- Invalid API key
- Insufficient credits
- Rate limit exceeded
- Network issues

Check backend logs: `docker-compose logs backend`

### "Frontend shows blank page"
1. Check if backend is running
2. Verify API URL in frontend
3. Check browser console for errors
4. Check frontend logs: `docker-compose logs frontend`

### "Analysis takes too long"
- OpenAI API might be slow
- Check network connectivity
- Consider using GPT-3.5-turbo-16k for faster responses
- Implement timeout handling

### "Scores seem inaccurate"
AI analysis is subjective. To improve:
- Provide more detailed transcripts
- Refine the prompt in `ai_service.py`
- Use GPT-4 for better accuracy
- Add more context to the prompt

## Customization Questions

### Can I change the UI design?
Yes! Edit `frontend/src/App.css` to customize:
- Colors
- Fonts
- Layout
- Animations

### Can I add more features?
Absolutely! Ideas:
- Audio file upload
- Video analysis
- Multiple language support
- Comparison with past interviews
- Export to PDF
- Email reports
- Team collaboration

### Can I add authentication?
Yes! Options:
- JWT tokens
- OAuth (Google, GitHub)
- Session-based auth
- API keys

You'll need to:
1. Add auth middleware in backend
2. Create login/signup endpoints
3. Add login UI in frontend
4. Protect routes

### Can I add more scoring categories?
Yes! Modify the prompt in `ai_service.py` to include:
- Technical knowledge
- Problem-solving
- Leadership
- Teamwork
- Creativity

Update the database model and frontend accordingly.

## Performance Questions

### How do I make it faster?
1. **Caching**: Add Redis for repeated analyses
2. **CDN**: Use CloudFront or similar for frontend
3. **Database**: Add indexes, optimize queries
4. **API**: Use GPT-3.5-turbo-16k (faster)
5. **Async**: Already implemented!

### Can I process multiple transcripts at once?
Yes! The backend uses async/await, supporting concurrent requests. For batch processing, add a queue system (Celery, RabbitMQ).

### How do I monitor performance?
Add monitoring tools:
- **APM**: New Relic, DataDog
- **Logging**: ELK Stack, CloudWatch
- **Metrics**: Prometheus + Grafana

## Cost Questions

### How much does it cost to run?
**Development (local)**: Free (except OpenAI API)

**Production**:
- Server: $5-50/month (DigitalOcean, AWS)
- Database: $15-100/month (managed)
- OpenAI API: ~$0.002 per analysis
- Domain: $10-15/year
- SSL: Free (Let's Encrypt)

**Total**: ~$30-200/month depending on scale

### Can I reduce OpenAI costs?
Yes:
- Use GPT-3.5-turbo (cheapest)
- Limit transcript length
- Cache common analyses
- Implement rate limiting
- Use prompt engineering to reduce tokens

### Is there a free tier?
OpenAI offers free credits for new accounts. After that, you pay per use.

## Legal & Privacy Questions

### Is user data stored securely?
- Transcripts stored in PostgreSQL
- Use environment variables for secrets
- Enable database encryption in production
- Implement HTTPS for data in transit

### Can I use this commercially?
Yes! The code is MIT licensed. However:
- Comply with OpenAI's terms of service
- Add proper privacy policy
- Comply with GDPR/CCPA if applicable
- Consider data retention policies

### Do I need a privacy policy?
If you're collecting user data, yes. Include:
- What data you collect
- How you use it
- How long you store it
- User rights (access, deletion)

## Contributing Questions

### Can I contribute to this project?
Yes! Contributions welcome:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

### What features are planned?
Potential roadmap:
- Audio file upload
- Multiple language support
- Advanced analytics
- Team features
- Export functionality
- Mobile app

### How do I report bugs?
Open an issue on GitHub with:
- Description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Environment details

## Still Have Questions?

- Check the documentation files (README.md, GUIDE.md)
- Review the code comments
- Open an issue on GitHub
- Check OpenAI documentation
- Review FastAPI documentation
- Review React documentation

---

**Pro Tip**: Most issues can be solved by checking the logs:
```bash
docker-compose logs -f
```
