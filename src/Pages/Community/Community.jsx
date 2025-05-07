import React, { useState } from 'react';
import './Community.css';
import { OpenApi } from '../../Components/Api/OpenApi';

const Community = () => {
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [communityDetails, setCommunityDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const domains = [
    {
      name: 'Coding',
      communities: ['JavaScript', 'Python', 'Java']
    },
    {
      name: 'Engineering',
      communities: ['Mechanical', 'Electrical', 'Civil']
    },
    {
      name: 'Class 12',
      communities: ['Physics', 'Chemistry', 'Mathematics']
    },
    {
      name: 'Class 10',
      communities: ['Science', 'Math', 'English']
    },
    {
      name: 'Data Science',
      communities: ['Machine Learning', 'Statistics', 'Data Analysis']
    },
    {
      name: 'Web Development',
      communities: ['HTML', 'CSS', 'React']
    },
    {
      name: 'Mobile Development',
      communities: ['iOS', 'Android', 'Flutter']
    },
    {
      name: 'Cloud Computing',
      communities: ['AWS', 'Azure', 'Google Cloud']
    },
    {
      name: 'Cybersecurity',
      communities: ['Ethical Hacking', 'Network Security', 'Cryptography']
    },
    {
      name: 'Artificial Intelligence',
      communities: ['Neural Networks', 'Natural Language Processing', 'Robotics']
    }
  ];

  const fetchCommunityDetails = async (community) => {
    try {
      setLoading(true);
      setError(null);

      const query = `give me the ${community} communities only including its description, name, and joining links for platforms like Discord, Slack, and Telegram. I am developing an educational project. give me the result in this format {["platformname", "description", "platformjoinlink","platformimg"]} only, else do not give any single word. please do not give anythings else not a single word. give minumum 6 resources.`;

      const response = await OpenApi(query);
      const data = typeof response === 'string' ? JSON.parse(response) : response;

      if (Array.isArray(data)) {
        setCommunityDetails(data);
      } else {
        throw new Error('Unexpected data format');
      }
    } catch (error) {
      console.error('Error fetching community details:', error);
      setError('Failed to load community details. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleCommunityClick = (community) => {
    setSelectedCommunity(community);
    fetchCommunityDetails(community);
  };

  return (
    <div className="community-container">
      <h1 className="community-title">
        💌 Join a Community
      </h1>
      <div className="community-domains">
        {domains.map((domain, index) => (
          <div key={index} className="community-domain">
            <h2 className="domain-title">{domain.name}</h2>
            <ul className="community-list">
              {domain.communities.map((community, index) => (
                <li 
                  key={index} 
                  className="community-item" 
                  onClick={() => handleCommunityClick(community)}
                >
                  {community}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {loading && <p>Loading community details...</p>}
      {error && <p>{error}</p>}
      {selectedCommunity && communityDetails.length > 0 && !loading && !error && (
        <div className="community-details">
          <h2 className="details-title">🍀 {selectedCommunity} Communities 🍀</h2>
          <div className="community-cards">
            {communityDetails.map((detail, index) => (
              <div key={index} className="community-card">
                <img src='https://www.mindful.org/content/uploads/Finding-community-where-you-least-expect-it.jpg' alt='img' className="community-card-img" />
                <div className="community-card-content">
                  <h3>{detail[0]}</h3>
                  <p>{detail[1]}</p>
                  <a href={detail[2]} className="community-card-link" target="_blank" rel="noopener noreferrer">
                    Join Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Community;
