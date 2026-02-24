import React, { useState } from 'react';

function AnalysisForm({ onAnalyze, loading }) {
  const [transcript, setTranscript] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (transcript.trim()) {
      onAnalyze(transcript);
    }
  };

  return (
    <div className="analysis-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="transcript">
            Paste your interview transcript below:
          </label>
          <textarea
            id="transcript"
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder="Enter the interview transcript here... Include questions and answers for best results."
            rows="10"
            disabled={loading}
            required
          />
        </div>
        
        <button type="submit" disabled={loading || !transcript.trim()}>
          {loading ? 'Analyzing...' : 'Analyze Interview'}
        </button>
      </form>
    </div>
  );
}

export default AnalysisForm;
