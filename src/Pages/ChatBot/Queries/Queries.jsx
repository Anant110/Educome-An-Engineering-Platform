import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Queries.css';
import { OpenApi, fetchSearchResults } from '../../../Components/Api/OpenApi';
import { FaSearch, FaSeedling } from 'react-icons/fa';
import { Send } from '@mui/icons-material';

const Queries = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [geminiResponse, setGeminiResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleQuery = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const searchResults = await fetchSearchResults(query);
      const geminiResponse = await OpenApi(query);
      const serializableGeminiResponse = JSON.parse(JSON.stringify(geminiResponse));

      setSearchResults(searchResults);
      setGeminiResponse(serializableGeminiResponse);
      navigate('/self-learn/response', { state: { searchResults, geminiResponse: serializableGeminiResponse, query } });
    } catch (error) {
      setError('An error occurred while processing your request.');
      console.error('Error handling submit:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="brand-container">
        <span className="brand-name">Educome</span>
        <span className="search-suggestion">Have a question? Ask it!</span>
      </div>
      <div className="message-boxies">
        <input
          required
          placeholder="Write here..."
          type="text"
          id="messageInput"
          value={query}
          onChange={handleQuery}
          disabled={loading}
        />
        <button id="sendButton" onClick={handleSubmit} disabled={loading} style={{backgroundColor: "#176cda"}}>
          {loading ? <FaSearch /> : <Send />}
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Queries;
