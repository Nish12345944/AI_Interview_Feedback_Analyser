import React from 'react';

function ResultsDisplay({ result }) {
  const getScoreColor = (score) => {
    if (score >= 80) return '#4caf50';
    if (score >= 60) return '#ff9800';
    return '#f44336';
  };

  const ScoreCard = ({ title, score, icon }) => (
    <div className="score-card">
      <div className="score-icon">{icon}</div>
      <h3>{title}</h3>
      <div className="score-circle" style={{ borderColor: getScoreColor(score) }}>
        <span className="score-value">{score}</span>
        <span className="score-max">/100</span>
      </div>
    </div>
  );

  return (
    <div className="results-display">
      <h2>📊 Analysis Results</h2>
      
      <div className="skills-tested">
        <strong>🎯 Skills Tested:</strong> {result.skills.join(', ')}
      </div>

      <div className="scores-grid">
        <ScoreCard 
          title="Communication" 
          score={result.communication_score} 
          icon="💬"
        />
        <ScoreCard 
          title="Confidence" 
          score={result.confidence_score} 
          icon="💪"
        />
        <ScoreCard 
          title="Structure" 
          score={result.structure_score} 
          icon="📋"
        />
        <ScoreCard 
          title="Technical" 
          score={result.technical_score} 
          icon="🔧"
        />
      </div>

      <div className="suggestions-section">
        <h3>💡 Improvement Suggestions</h3>
        <div className="suggestions-content">
          <p>{result.improvement_suggestions}</p>
        </div>
      </div>

      <div className="analysis-meta">
        <small>📝 Session ID: {result.id} • {new Date(result.created_at).toLocaleString()}</small>
      </div>
    </div>
  );
}

export default ResultsDisplay;
