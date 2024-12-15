import React, { createContext, useState, useContext } from 'react';

// Create a context for the transcription service
const TranscriptionContext = createContext();

// Create a custom hook to access the context
export const useTranscription = () => {
  return useContext(TranscriptionContext);
};

// Context Provider Component
export const TranscriptionProvider = ({ children }) => {
  // State variables for managing transcription
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcriptionText, setTranscriptionText] = useState('');
  const [audioFile, setAudioFile] = useState(null);
  const [error, setError] = useState(null);

  // Function to start transcription
  const startTranscription = (audio) => {
    setIsTranscribing(true);
    setAudioFile(audio);
    setError(null);
    // Simulate transcription process (replace with your API call)
    setTimeout(() => {
      setTranscriptionText("Transcription of the audio file...");
      setIsTranscribing(false);
    }, 3000);
  };

  // Function to reset transcription
  const resetTranscription = () => {
    setIsTranscribing(false);
    setTranscriptionText('');
    setAudioFile(null);
    setError(null);
  };

  // Providing the context value to children components
  return (
    <TranscriptionContext.Provider value={{
      isTranscribing,
      transcriptionText,
      audioFile,
      error,
      startTranscription,
      resetTranscription
    }}>
      {children}
    </TranscriptionContext.Provider>
  );
};
