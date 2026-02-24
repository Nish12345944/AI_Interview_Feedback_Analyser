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

    try {
      const response = await axios.post(`${API_URL}/api/analyze`, {
        transcript,
        skills
      });
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetInterview = () => {
    setResult(null);
    setError(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🎤 AI Mock Interview Analyzer</h1>
        <p>Practice interviews with AI-powered feedback</p>
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
        <p>Powered by AI • Built with FastAPI & React</p>
      </footer>
    </div>
  );
}

export default App;
