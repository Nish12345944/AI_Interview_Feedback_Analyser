import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import MockInterview from './components/MockInterview';
import ResultsDisplay from './components/ResultsDisplay';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async (transcript, skills) => {
    setLoading(true);
    setError(null);
    setResult(null);

    // Generate mock analysis instead of API call
    setTimeout(() => {
      const mockResult = {
        id: Math.floor(Math.random() * 10000),
        skills: skills,
        transcript: transcript,
        communication_score: Math.floor(Math.random() * 20) + 70,
        confidence_score: Math.floor(Math.random() * 20) + 70,
        structure_score: Math.floor(Math.random() * 20) + 70,
        technical_score: Math.floor(Math.random() * 20) + 70,
        improvement_suggestions: `Great job on your interview! Here are some suggestions: 1) Practice more examples related to ${skills.join(', ')}. 2) Work on articulating your thoughts more clearly. 3) Provide more specific examples from your experience. 4) Show more enthusiasm when discussing your projects. 5) Prepare better answers for behavioral questions.`,
        created_at: new Date().toISOString()
      };
      setResult(mockResult);
      setLoading(false);
    }, 2000);
  };

  const resetInterview = () => {
    setResult(null);
    setError(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🎤 InterviewAI Pro</h1>
        <p>Master Your Interview Skills with AI-Powered Feedback</p>
      </header>

      <main className="App-main">
        {!result && <MockInterview onAnalyze={handleAnalyze} loading={loading} />}
        
        {error && (
          <div className="error-message">
            <p>❌ {error}</p>
            <button onClick={resetInterview}>Try Again</button>
          </div>
        )}

        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Analyzing your interview... This may take a moment.</p>
          </div>
        )}

        {result && (
          <>
            <ResultsDisplay result={result} />
            <button onClick={resetInterview} style={{marginTop: '2rem'}}>Start New Interview</button>
          </>
        )}
      </main>

      <footer className="App-footer">
        <p>🤖 Powered by AI • Built with Precision</p>
      </footer>
    </div>
  );
}

export default App;
