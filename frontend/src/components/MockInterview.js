import React, { useState, useRef } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const SKILL_OPTIONS = [
  'Python', 'JavaScript', 'React', 'Node.js', 'Java', 'C++',
  'SQL', 'AWS', 'Docker', 'Machine Learning', 'Data Structures',
  'System Design'
];

function MockInterview({ onAnalyze, loading }) {
  const [step, setStep] = useState(1);
  const [interviewType, setInterviewType] = useState('technical');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [recording, setRecording] = useState(false);
  const [audioBlobs, setAudioBlobs] = useState([]);
  const [processing, setProcessing] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const handleSkillToggle = (skill) => {
    setSelectedSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const startInterview = async () => {
    const skills = interviewType === 'hr' ? ['HR Interview'] : selectedSkills;
    
    if (interviewType === 'technical' && selectedSkills.length === 0) {
      alert('Please select at least one skill');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/api/questions`, {
        skills: skills
      });
      setQuestions(response.data.questions);
      setStep(2);
    } catch (error) {
      alert('Failed to generate questions');
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setAudioBlobs(prev => [...prev, audioBlob]);
      };

      mediaRecorderRef.current.start();
      setRecording(true);
    } catch (error) {
      alert('Microphone access denied');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setRecording(false);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      finishInterview();
    }
  };

  const finishInterview = async () => {
    if (audioBlobs.length === 0) {
      alert('Please record at least one answer');
      return;
    }

    setProcessing(true);
    setStep(3);

    try {
      // Combine all audio blobs
      const combinedBlob = new Blob(audioBlobs, { type: 'audio/wav' });
      const formData = new FormData();
      formData.append('file', combinedBlob, 'interview.wav');

      // Upload and transcribe
      const uploadResponse = await axios.post(`${API_URL}/api/upload-audio`, formData, {
        headers: { 
          'Content-Type': 'multipart/form-data'
        },
        timeout: 120000 // 2 minutes timeout
      });

      const transcript = uploadResponse.data.transcript;
      const skills = interviewType === 'hr' ? ['HR Interview'] : selectedSkills;

      // Analyze
      onAnalyze(transcript, skills);
    } catch (error) {
      console.error('Error:', error);
      const errorMsg = error.response?.data?.detail || error.message || 'Failed to process audio';
      alert('Failed to process audio: ' + errorMsg);
      setProcessing(false);
      setStep(2);
    }
  };

  return (
    <div className="mock-interview">
      {step === 1 && (
        <div className="skill-selection">
          <h2>🏯 Choose Your Path</h2>
          
          <div className="interview-type-selector">
            <button
              className={`type-btn ${interviewType === 'technical' ? 'selected' : ''}`}
              onClick={() => setInterviewType('technical')}
            >
              🛡️ Technical Warrior
            </button>
            <button
              className={`type-btn ${interviewType === 'hr' ? 'selected' : ''}`}
              onClick={() => setInterviewType('hr')}
            >
              🏯 HR Diplomat
            </button>
          </div>

          {interviewType === 'technical' && (
            <>
              <p>Select your weapons of mastery:</p>
              <div className="skills-grid">
                {SKILL_OPTIONS.map(skill => (
                  <button
                    key={skill}
                    className={`skill-btn ${selectedSkills.includes(skill) ? 'selected' : ''}`}
                    onClick={() => handleSkillToggle(skill)}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </>
          )}

          {interviewType === 'hr' && (
            <p className="hr-description">
              🏯 Master the art of diplomacy. Face questions about honor, wisdom, and your warrior's journey.
            </p>
          )}

          <button
            className="start-btn"
            onClick={startInterview}
            disabled={interviewType === 'technical' && selectedSkills.length === 0}
          >
            ⚔️ Begin Training
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="interview-session">
          <div className="progress">
            ⛩️ Challenge {currentQuestion + 1} of {questions.length}
          </div>
          <div className="question-card">
            <h3>🏯 Question:</h3>
            <p>{questions[currentQuestion]}</p>
          </div>

          <div className="recording-section">
            <div className="recording-indicator">
              {recording && <div className="pulse"></div>}
              <p>{recording ? '🔴 Recording...' : '⏸️ Ready to record'}</p>
            </div>
            <div className="recording-controls">
              {!recording ? (
                <button onClick={startRecording} className="record-btn">
                  🎤 Speak Your Truth
                </button>
              ) : (
                <button onClick={stopRecording} className="stop-btn">
                  ⏹️ End Response
                </button>
              )}
            </div>
            {audioBlobs.length > currentQuestion && (
              <button onClick={nextQuestion} className="next-btn">
                {currentQuestion < questions.length - 1 ? '⛩️ Next Challenge' : '⚔️ Complete Training'}
              </button>
            )}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="processing">
          <div className="spinner"></div>
          <h2>⛩️ Sensei is Analyzing...</h2>
          <p>Transcribing your words and evaluating your performance...</p>
        </div>
      )}
    </div>
  );
}

export default MockInterview;
