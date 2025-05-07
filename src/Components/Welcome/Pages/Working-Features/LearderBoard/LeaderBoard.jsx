import React, { useState, useEffect } from 'react';
import { FaCrown } from 'react-icons/fa';
import './LeaderBoard.css';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import { app } from '../../../../Firebase/Firebase';

const LeaderBoard = () => {
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
      setUserRankings(rankings.slice(0, 50));
    } catch (error) {
      console.error('Error fetching user rankings:', error);
    }
  };

  useEffect(() => {
    fetchUserRankings(selectedLanguage);
  }, [selectedLanguage]);

  const getCrownColor = (index) => {
    switch(index) {
      case 0:
        return 'gold';
      case 1:
        return 'silver';
      case 2:
        return '#cd7f32'; // bronze
      default:
        return 'transparent';
    }
  };

  return (
    <div className="github-profiless" id="Testemonials">
       <span><span className='testemonial-users'>LeaderBoard</span></span>
      <div className="user-rankings">
        <table className="ranking-tables">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Avatar</th>
              <th>Username</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {userRankings.map((user, index) => (
              <React.Fragment key={index}>
                <tr>
                  <td>{index + 1}</td>
                  <td><img src={`https://github.com/${user.username}.png`} alt="Profile" className="profile-pics" /></td>
                  <td>
                    {index < 3 && (
                      <FaCrown color={getCrownColor(index)} className="crown-icon" />
                    )}
                    {user.username}
                  </td>
                  <td>{user.devScore}</td>
                </tr>
                <tr><td colSpan="4"><hr /></td></tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderBoard;
