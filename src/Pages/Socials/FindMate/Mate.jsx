import React, { useState, useEffect } from 'react';
import { FaJava, FaJs, FaPython, FaGithub, FaReact } from 'react-icons/fa';
import './Mate.css';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import { app } from '../../../Components/Firebase/Firebase';

const Mate = () => {
  const [userRankings, setUserRankings] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('');

  const db = getFirestore(app);

  const fetchUserRankings = async (language = '') => {
    try {
      const q = language
        ? query(collection(db, 'Github-rank'), where('bestLanguage', '==', language))
        : collection(db, 'Github-rank');
      const querySnapshot = await getDocs(q);
      const rankings = [];
      querySnapshot.forEach((doc) => {
        rankings.push(doc.data());
      });
      rankings.sort((a, b) => b.devScore - a.devScore);
      setUserRankings(rankings);
      console.log('User Rankings:', rankings);
    } catch (error) {
      console.error('Error fetching user rankings:', error);
    }
  };

  useEffect(() => {
    fetchUserRankings(selectedLanguage);
  }, [selectedLanguage]);

  const handleLanguageClick = (language) => {
    setSelectedLanguage(language);
  };

  const renderLanguageIcon = (language) => {
    switch (language) {
      case 'Java':
        return <FaJava />;
      case 'JavaScript':
        return <FaJs />;
      case 'Python':
        return <FaPython />;
      case 'React':
        return <FaReact />;
      default:
        return <FaGithub />;
    }
  };

  const handleSeeProfileClick = (username) => {
    window.open(`https://github.com/${username}`, '_blank');
  };

  return (
    <div className="dev-mate">
      <h2>Find your<span className='dev-mate-text'>dev mate 🛸</span></h2>
      <div className="user-rankingss">
          <div className='navigate-professionali'>
            <span onClick={() => handleLanguageClick('Java')}> Java</span> 
            <span onClick={() => handleLanguageClick('Python')}> Python</span> 
            <span onClick={() => handleLanguageClick('JavaScript')}> JavaScript</span> 
            <span onClick={() => handleLanguageClick('React')}> React</span>
            <span onClick={() => handleLanguageClick('')}> All</span>
          </div>
        <div className="ranking-list">
          {userRankings.map((user, index) => (
            <div className="ranking-item" key={index}>
              <div className="profile-infos">
                <div className="user-profile">
                  <img src={`https://github.com/${user.username}.png`} alt="Profile" className="profile-pic" />
                  <p className="username">{user.username}</p>
                </div>
                <div className="user-details">
                  <div className="user-detail-card">
                    <div className="user-profile-info">
                      <p className="dev-score">{user.devScore}</p>
                      <p className="label">Score</p>
                    </div>
                    <div className="user-profile-info">
                      <p className="rank">{index + 1}</p>
                      <p className="label">Rank</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="see-profile-link">
                <p className="top-skills">{user.bestLanguage}</p>
                <p className="see-profile-text" onClick={() => handleSeeProfileClick(user.username)}>See Profile</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Mate;
