import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Gemini.css';
import Bot from '../../../Bot/Bot';
import { FaPlayCircle, FaVideo } from 'react-icons/fa';

function Gemini() {
  const location = useLocation();
  const navigate = useNavigate();

  const geminiResponse = location.state?.geminiResponse || ''; 
  const query = location.state?.query || ''; 
  const sanitizedResponse = geminiResponse.replace(/[*#]/g, ''); 

  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [queryHistory, setQueryHistory] = useState([]);
  const [responseHandled, setResponseHandled] = useState(false);

  const splitTextIntoLines = (text, maxWordsPerLine) => {
    const words = text.split(' ');
    const lines = [];
    for (let i = 0; i < words.length; i += maxWordsPerLine) {
      lines.push(words.slice(i, i + maxWordsPerLine).join(' '));
    }
    return lines;
  };

  useEffect(() => {
    if (sanitizedResponse && currentIndex < sanitizedResponse.length) {
      const interval = setInterval(() => {
        setDisplayedText((prevText) => sanitizedResponse.substring(0, prevText.length + 1));
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, 5);

      return () => clearInterval(interval);
    }
  }, [sanitizedResponse, currentIndex]);

  useEffect(() => {
    if (sanitizedResponse && query && !responseHandled) {
      setQueryHistory((prevHistory) => [
        ...prevHistory,
        { query, response: sanitizedResponse },
      ]);
      setDisplayedText('');
      setCurrentIndex(0);
      setResponseHandled(true);
    }
  }, [sanitizedResponse, query, responseHandled]);

  useEffect(() => {
    setResponseHandled(false);
  }, [query]);

  const navigateToVideosResponse = () => {
    navigate('/self-learn/response/Videos', { state: { query } });
  };

  return (
    <div className="Gemini-response">
      <div className="bgblue">
        <h2><span onClick={navigateToVideosResponse}><FaPlayCircle style={{position:'relative',top:'3px'}}/> ETube</span></h2>
        <div className="card">
          {queryHistory.map((entry, index) => (
            <div key={index} className="history-entry">
              {entry.response !== sanitizedResponse && (
                <>
                  <div className="response-left">
                    <img src="./bot.png" alt="" />
                    {splitTextIntoLines(entry.response, 8).map((line, idx) => (
                      <p key={idx}>{line}</p>
                    ))}
                  </div>
                  <div className="query-right">
                    <p>{entry.query}</p>
                  </div>
                </>
              )}
            </div>
          ))}
          {displayedText && (
            <div className="current-entry">
              <div className="query-right">
                <p>{query}</p>
              </div>
              <div className="response-left">
                {splitTextIntoLines(displayedText, 8).map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="chat-bot">
        <Bot />
      </div>
    </div>
  );
}

export default Gemini;
