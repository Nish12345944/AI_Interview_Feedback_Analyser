# API Testing Examples

## Using cURL

### 1. Health Check
```bash
curl http://localhost:8000/health
```

**Expected Response:**
```json
{
  "status": "healthy"
}
```

### 2. Analyze Interview (POST)
```bash
curl -X POST http://localhost:8000/api/analyze \
  -H "Content-Type: application/json" \
  -d "{\"transcript\": \"Interviewer: Tell me about yourself. Candidate: I am a software developer with 5 years of experience in Python and JavaScript. I have worked on various web applications and APIs.\"}"
```

**Expected Response:**
```json
{
  "id": 1,
  "transcript": "Interviewer: Tell me about yourself...",
  "communication_score": 85.0,
  "confidence_score": 78.0,
  "structure_score": 82.0,
  "improvement_suggestions": "Consider providing more specific examples...",
  "created_at": "2024-01-15T10:30:00Z"
}
```

### 3. Get Specific Analysis (GET)
```bash
curl http://localhost:8000/api/analysis/1
```

### 4. List All Analyses (GET)
```bash
curl http://localhost:8000/api/analyses?skip=0&limit=10
```

## Using PowerShell (Windows)

### Analyze Interview
```powershell
$body = @{
    transcript = "Interviewer: What is your biggest strength? Candidate: My biggest strength is problem-solving. I enjoy tackling complex challenges and finding efficient solutions."
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:8000/api/analyze" -Method Post -Body $body -ContentType "application/json"
```

### Get Analysis
```powershell
Invoke-RestMethod -Uri "http://localhost:8000/api/analysis/1" -Method Get
```

### List Analyses
```powershell
Invoke-RestMethod -Uri "http://localhost:8000/api/analyses" -Method Get
```

## Sample Interview Transcripts

### Example 1: Short Interview
```json
{
  "transcript": "Interviewer: Tell me about yourself.\nCandidate: I'm a software developer with 5 years of experience. I specialize in Python and JavaScript, and I've built several web applications.\n\nInterviewer: What's your biggest achievement?\nCandidate: I led a team that reduced our application's load time by 60% through optimization."
}
```

### Example 2: Technical Interview
```json
{
  "transcript": "Interviewer: Explain how you would design a scalable API.\nCandidate: I would start by using a microservices architecture. Each service would handle a specific domain. I'd use REST or GraphQL for the API layer, implement caching with Redis, and use a load balancer for distribution.\n\nInterviewer: How would you handle authentication?\nCandidate: I would implement JWT tokens with refresh token rotation. Store tokens securely and implement rate limiting to prevent abuse."
}
```

### Example 3: Behavioral Interview
```json
{
  "transcript": "Interviewer: Tell me about a time you faced a difficult challenge.\nCandidate: In my previous role, we had a critical production bug that affected thousands of users. I quickly assembled a team, identified the root cause within 2 hours, and deployed a fix. We also implemented better monitoring to prevent similar issues.\n\nInterviewer: How do you handle disagreements with team members?\nCandidate: I believe in open communication. I listen to their perspective, share mine, and we work together to find the best solution for the project."
}
```

## Using Postman

### Setup
1. Create a new request
2. Set method to POST
3. URL: `http://localhost:8000/api/analyze`
4. Headers: `Content-Type: application/json`
5. Body (raw JSON):
```json
{
  "transcript": "Your interview transcript here..."
}
```

### Collection
Import this JSON into Postman:

```json
{
  "info": {
    "name": "AI Interview Feedback Analyzer",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Health Check",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "http://localhost:8000/health",
          "protocol": "http",
          "host": ["localhost"],
          "port": "8000",
          "path": ["health"]
        }
      }
    },
    {
      "name": "Analyze Interview",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"transcript\": \"Interviewer: Tell me about yourself.\\nCandidate: I am a software developer...\"\n}"
        },
        "url": {
          "raw": "http://localhost:8000/api/analyze",
          "protocol": "http",
          "host": ["localhost"],
          "port": "8000",
          "path": ["api", "analyze"]
        }
      }
    },
    {
      "name": "Get Analysis",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "http://localhost:8000/api/analysis/1",
          "protocol": "http",
          "host": ["localhost"],
          "port": "8000",
          "path": ["api", "analysis", "1"]
        }
      }
    },
    {
      "name": "List Analyses",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "http://localhost:8000/api/analyses?skip=0&limit=10",
          "protocol": "http",
          "host": ["localhost"],
          "port": "8000",
          "path": ["api", "analyses"],
          "query": [
            {
              "key": "skip",
              "value": "0"
            },
            {
              "key": "limit",
              "value": "10"
            }
          ]
        }
      }
    }
  ]
}
```

## Python Testing Script

```python
import requests
import json

BASE_URL = "http://localhost:8000"

# Test 1: Health Check
response = requests.get(f"{BASE_URL}/health")
print("Health Check:", response.json())

# Test 2: Analyze Interview
transcript = """
Interviewer: Tell me about yourself.
Candidate: I'm a software developer with 5 years of experience in Python and JavaScript.

Interviewer: What's your biggest strength?
Candidate: My biggest strength is problem-solving and attention to detail.
"""

response = requests.post(
    f"{BASE_URL}/api/analyze",
    json={"transcript": transcript}
)
print("\nAnalysis Result:", json.dumps(response.json(), indent=2))

# Test 3: Get Analysis
analysis_id = response.json()["id"]
response = requests.get(f"{BASE_URL}/api/analysis/{analysis_id}")
print("\nGet Analysis:", json.dumps(response.json(), indent=2))

# Test 4: List Analyses
response = requests.get(f"{BASE_URL}/api/analyses")
print("\nAll Analyses:", json.dumps(response.json(), indent=2))
```

## JavaScript/Node.js Testing

```javascript
const axios = require('axios');

const BASE_URL = 'http://localhost:8000';

async function testAPI() {
  try {
    // Health Check
    const health = await axios.get(`${BASE_URL}/health`);
    console.log('Health:', health.data);

    // Analyze Interview
    const analysis = await axios.post(`${BASE_URL}/api/analyze`, {
      transcript: 'Interviewer: Tell me about yourself. Candidate: I am a developer...'
    });
    console.log('Analysis:', analysis.data);

    // Get Analysis
    const id = analysis.data.id;
    const getAnalysis = await axios.get(`${BASE_URL}/api/analysis/${id}`);
    console.log('Get Analysis:', getAnalysis.data);

    // List Analyses
    const list = await axios.get(`${BASE_URL}/api/analyses`);
    console.log('List:', list.data);
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

testAPI();
```

## Expected Score Ranges

- **Communication Score (0-100)**
  - 80-100: Excellent clarity and articulation
  - 60-79: Good communication with minor issues
  - 40-59: Moderate communication skills
  - 0-39: Needs significant improvement

- **Confidence Score (0-100)**
  - 80-100: Very confident and assertive
  - 60-79: Generally confident
  - 40-59: Some hesitation
  - 0-39: Lacks confidence

- **Structure Score (0-100)**
  - 80-100: Well-organized and coherent
  - 60-79: Mostly structured
  - 40-59: Some organization issues
  - 0-39: Poorly structured

## Troubleshooting

### "Connection refused"
- Ensure Docker containers are running: `docker-compose ps`
- Check if backend is healthy: `curl http://localhost:8000/health`

### "Analysis failed"
- Verify OpenAI API key is set in `.env`
- Check backend logs: `docker-compose logs backend`

### "Invalid transcript"
- Ensure transcript is not empty
- Check JSON formatting is correct
