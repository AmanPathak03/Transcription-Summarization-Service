import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext'; // Adjust the import path based on your project structure
import './Files.css';

const SavedFiles = () => {
  const { user } = useAuth(); 
  const [audioFiles, setAudioFiles] = useState([]);
  const [transcriptions, setTranscriptions] = useState([]);
  const [summaries, setSummaries] = useState([]);
  const [loading, setLoading] = useState(true);

  const email = user?.email; // Extract email from the authenticated user

  // Function to format date and time
  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);

    // Get hour and minute
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';

    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // '0' should be '12'

    // Format day with ordinal suffix
    const day = date.getDate();
    const ordinalSuffix = (day) => {
      if (day % 10 === 1 && day !== 11) return 'st';
      if (day % 10 === 2 && day !== 12) return 'nd';
      if (day % 10 === 3 && day !== 13) return 'rd';
      return 'th';
    };

    // Get month and year
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    // Format final string
    return `${hours}:${minutes.toString().padStart(2, '0')} ${ampm} ${day}${ordinalSuffix(day)} ${month} ${year}`;
  };


  useEffect(() => {
    if (!email) {
      console.error('Email is required to fetch files');
      setLoading(false); // Stop loading if email is not available
      return;
    }

    // Fetch transcriptions and summaries from the backend
    const fetchFiles = async () => {
      try {
        const audioResponse = await fetch(
          `http://127.0.0.1:8000/transcription/transcriptions?email=${encodeURIComponent(email)}`
        );
        const transcriptionResponse = await fetch(
          `http://127.0.0.1:8000/transcription/transcriptions?email=${encodeURIComponent(email)}`
        );
        const summaryResponse = await fetch(
          `http://127.0.0.1:8000/summarizer/summarizations?email=${encodeURIComponent(email)}`
        );

        if (!audioResponse.ok || !transcriptionResponse.ok || !summaryResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const audioData = await audioResponse.json();
        const transcriptionData = await transcriptionResponse.json();
        const summaryData = await summaryResponse.json();

        setAudioFiles(audioData);
        setTranscriptions(transcriptionData);
        setSummaries(summaryData);
      } catch (error) {
        console.error('Error fetching files:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, [email]);

  return (
    <div className="main-container">
      <h1>Saved Audio Files, Transcriptions & Summaries</h1>

      {loading ? (
        <div className="loader"></div> // Show loading animation while fetching data
      ) : (
        <>
          <div className="files-list">
            {/* Display audio files */}
            <div className="file-section">
              <h2>Audio Files</h2>
              {audioFiles.length > 0 ? (
                audioFiles.map((file) => (
                  <div key={file.id} className="file-card">
                    <p>{file.file_name}</p>
                    <p>
                      <a
                        href={file.file_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                      >
                        <button className="download-btn">Download</button>
                      </a>
                    </p>
                  </div>
                ))
              ) : (
                <p>No audio files available.</p>
              )}
            </div>


            {/* Display transcriptions */}
            <div className="file-section">
              <h2>Transcriptions</h2>
              {transcriptions.length > 0 ? (
                transcriptions.map((file) => (
                  <div key={file.id} className="file-card">
                    <h3>{file.file_name}</h3>
                    <p>{file.transcription}</p>
                    <p><strong>Date:</strong> {formatDateTime(file.uploaded_at)}</p>
                  </div>
                ))
              ) : (
                <p>No transcriptions available.</p>
              )}
            </div>

            {/* Display summaries */}
            <div className="file-section">
              <h2>Summaries</h2>
              {summaries.length > 0 ? (
                summaries.map((file) => (
                  <div key={file.id} className="file-card">
                    <h3>{file.file_name}</h3>
                    <p>{file.summary}</p>
                    <p><strong>Date:</strong> {formatDateTime(file.uploaded_at)}</p>
                  </div>
                ))
              ) : (
                <p>No summaries available.</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SavedFiles;
