import React, { useState } from 'react';
import './Result.css'; // Import CSS file for styling
import { useLocation } from 'react-router-dom';
import { getJson } from "serpapi";

const Result = () => {
  const [topic, setTopic] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();
  const query = location.state.category;

  const fetchSearchResults = () => {
    getJson({
      engine: "google",
      q: topic || query,
      api_key: "d478fbb07644160b00848da745815b61aa711c7d4ea2cdf8d7e165e6af32e3ce"
    }, (json) => {
      setSearchResults(json.organic_results);
    });
  };

  const handleSearch = () => {
    if (topic.trim() !== '') {
      fetchSearchResults();
    }
  };

  return (
    <div className="result-container">
      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter a topic"
      />
      <button onClick={handleSearch}>Search</button>
      <div>
        {searchResults.length > 0 ? (
          <ul>
            {searchResults.map((result, index) => (
              <li key={index}>
                <a href={result.link} target="_blank" rel="noopener noreferrer">{result.title}</a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No search results found for this topic.</p>
        )}
      </div>
    </div>
  );
};

export default Result;
