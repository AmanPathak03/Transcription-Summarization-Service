import React, { useState, useRef } from 'react';
import axios from 'axios'; // Import axios for API calls
import { assets } from '../../Assets/assets';
import { useAuth } from "../../components/AuthContext";

import './Main.css';

const Main = () => {
  const { user } = useAuth(); // Get authenticated user
  const [file, setFile] = useState(null); // For audio files
  const [inputText, setInputText] = useState(''); // For manual text input
  const [uploadProgress, setUploadProgress] = useState(0);
  const [summary, setSummary] = useState(''); // State to store summary
  const [loading, setLoading] = useState(false);
  const [transcription, setTranscription] = useState(''); // State to store transcription
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false); // To track upload/transcription progress
  const [showUploadUI, setShowUploadUI] = useState(true); // Toggle upload UI visibility

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };
  
  const handleChooseFile = () => {
    fileInputRef.current.click();
  };
  
  const handleAudioUpload = async () => {
    if (!file) {
      alert("Please select a file before uploading.");
      return;
    }
  
    if (!user || !user.email) {
      alert("Please log in to upload audio.");
      return;
    }
  
    setUploadProgress(0);
    setLoading(true);
  
    try {
      // Prepare the form data
      const formData = new FormData();
      formData.append("email", user.email); // Attach email
      formData.append("file", file); // Attach audio file, renamed to match the API file
  
      const response = await axios.post(
        "http://127.0.0.1:8000/transcription/transcribe",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted); // Update the progress bar
          },
        }
      );
  
      // Update transcription and UI
      setTranscription(response.data.transcription);
      setUploadProgress(100);
    } catch (error) {
      console.error("Error transcribing audio:", error);
      alert("Failed to transcribe the audio. Please try again.");
    } finally {
      setLoading(false);
      setTimeout(() => setUploadProgress(0), 3000);
      setShowUploadUI(false);
    }
  };
  const handleTextSummarization = async () => {
    if (!inputText.trim()) {
      alert('Please enter some text to summarize.');
      return;
    }

    if (!user || !user.email) {
      alert("Please log in to summarize text.");
      return;
    }

    setLoading(true); // Show loader
    setSummary(""); // Clear previous summary


    const requestBody = {
      email: user.email,
      text: inputText,
      max_length: 100,
      min_length: 25,
    };

    console.log("Request payload:", requestBody);

    // Summarize the entered text
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/summarizer/summarize?email=${encodeURIComponent(
          user.email
        )}&text=${encodeURIComponent(inputText)}&max_length=100&min_length=25`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      const data = await response.json();
  
      if (response.ok) {
        setSummary(data.summary || "No summary available.");
      } else {
        setSummary(`Error: ${data.error || "Unable to fetch summary."}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setSummary("Error: Unable to fetch summary.");
    } finally {
      setLoading(false); // Hide loader
    }
  };

  return (
    <div className="main-container">
      <h1>Audio Transcription and Text Summarization</h1>
      <p className="description">
      Use AI-based Audio Transcriptor and Summarizer to summarize audio or text files with one click. This tool is a free online service to get the timed text and summaries of any input.
      </p>

      <div className="file-upload-container">
        {showUploadUI ? (
          <div className="upload-box">
            {!file ? (
              // Show the initial upload UI
              <>
                <img src={assets.audio_file} alt="Audio File" className="audio-icon" />
                <p>Drag and drop an audio file to transcribe</p>
                <span>OR</span>
                <button className="choose-file-button" onClick={handleChooseFile}>
                  + Choose an Audio
                </button>
                {/* Hidden file input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="audio/*"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
              </>
            ) : loading ? (
              // Show the loader after clicking "Transcribe"
              <div className="transcription-loader">
                <div className="spinner"></div>
                <p>Transcribing... Please wait.</p>
              </div>
            ) : (
              // Show the file details and transcribe button after selecting a file
              <div className="file-info">
                <p>Selected File: {file.name}</p>
                <button className="summarize-button" onClick={handleAudioUpload}>
                  Transcribe
                </button>
              </div>
            )}

            {uploadProgress > 0 && (
              <div className="upload-progress">
                Transcripting: {uploadProgress}%
              </div>
            )}
          </div>
        ) : (
          <div className="transcription-summary-container">
            <h2>Transcription:</h2>
            <p>{transcription}</p>
          </div>
        )}
      </div>

      <div className="text-summary-container">
        {/* Text input and summary side by side */}
        <div className="text-summarization-container">
          <h2>Enter Text to Summarize</h2>
          <textarea
            className="text-input"
            placeholder="Type or paste your text here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button className="summarize-button" onClick={handleTextSummarization}>Summarize Text</button>
        </div>

        <div className="text-summarization-container">
        <h2>Summary:</h2>
        <textarea className="output-container" value={summary} readOnly />
        {loading &&
            <div className="loader"></div> // Loader displayed when summarizing
        }
        </div>
      </div>


      <section className="info-section">
        <div className="info-content">
          <h2>Limited time for full playback or reading?</h2>
          <p>Use <a href="#">Audio Transcriptor and Summarizer</a> to quickly summarize audio or text files, saving you from the need to listen to entire recordings or read lengthy content.</p>
        </div>
        <div className="info-image">
          <img src={assets.audio_summary} alt="File Summarization Illustration" />
        </div>
      </section>

      <section className="steps-section">
        <h2>How to use AI Summarizer?</h2>
        <p>Follow these steps to summarize audio or text with AI:</p>

        <div className="steps-container">
          <div className="step-card">
            <img src={assets.step1} alt="Step 1 Icon" />
            <h3>Step 1: Upload Audio or Enter Text</h3>
            <p>Upload an audio file or type/paste text in the input field.</p>
          </div>

          <div className="step-card">
            <img src={assets.step2} alt="Step 2 Icon" />
            <h3>Step 2: Process the Input</h3>
            <p>Our AI will analyze your file or text and generate a transcription or summary.</p>
          </div>

          <div className="step-card">
            <img src={assets.step3} alt="Step 3 Icon" />
            <h3>Step 3: View the Results</h3>
            <p>Receive concise and clear insights tailored to your input.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Main;
