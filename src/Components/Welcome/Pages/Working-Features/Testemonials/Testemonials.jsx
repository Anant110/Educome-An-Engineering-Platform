import React, { useState, useEffect } from 'react';
import { FaJava, FaJs, FaPython, FaGithub, FaReact } from 'react-icons/fa';
import './Testemonials.css';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import { app } from '../../../../Firebase/Firebase';

const Testemonials = () => {
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
      // Slice to show only the first 5 users
      setUserRankings(rankings.slice(0, 5));
    } catch (error) {
      console.error('Error fetching user rankings:', error);
    }
  };

  useEffect(() => {
    fetchUserRankings(selectedLanguage);
  }, [selectedLanguage]);

  const handleSeeProfileClick = (username) => {
    window.open(`https://github.com/${username}`, '_blank');
  };

  return (
    <div className="github-profiles" id="Testemonials">
      <span>Here are some of our recent <span className='testemonial-user'> users</span></span>
      <div className="user-ranking">
        <table className="ranking-tables">
          <thead>
            <tr>
              {/* <th>Rank</th> */}
              <th>Avatar</th>
              <th>Username</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {userRankings.map((user, index) => (
              <tr key={index}>
                {/* <td>{index + 1}</td> */}
                <td><img src={`https://github.com/${user.username}.png`} alt="Profile" className="profile-pic" /></td>
                <td>{user.username}</td>
                <td>{user.devScore}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Testemonials;
