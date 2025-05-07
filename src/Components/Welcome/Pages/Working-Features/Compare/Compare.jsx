import React, { useState } from 'react';
import axios from 'axios';
import './Compare.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire } from '@fortawesome/free-solid-svg-icons';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Compare = () => {
  const [username1, setUsername1] = useState('');
  const [username2, setUsername2] = useState('');
  const [userData1, setUserData1] = useState(null);
  const [userData2, setUserData2] = useState(null);
  const [error, setError] = useState('');

const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');

  try {
    const [user1Response, user2Response] = await Promise.all([
      axios.get(`https://api.github.com/users/${username1}`),
      axios.get(`https://api.github.com/users/${username2}`)
    ]);

    const [repos1Response, repos2Response] = await Promise.all([
      axios.get(user1Response.data.repos_url),
      axios.get(user2Response.data.repos_url)
    ]);

    const devScore1 = calculateDevScore(user1Response.data, repos1Response.data);
    const devScore2 = calculateDevScore(user2Response.data, repos2Response.data);

    const techStacks1 = getTechStacks(repos1Response.data);
    const techStacks2 = getTechStacks(repos2Response.data);

    setUserData1({ ...user1Response.data, repos: repos1Response.data, devScore: devScore1, techStacks: techStacks1 });
    setUserData2({ ...user2Response.data, repos: repos2Response.data, devScore: devScore2, techStacks: techStacks2 });
  } catch (error) {
    setError('Error fetching GitHub data. Please try again.');
    console.error('Error fetching GitHub data:', error);
  }
};


  const calculateDevScore = (userData, repos) => {
    return userData.followers + userData.public_repos + repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
  };

  const getTechStacks = (repos) => {
    const languageCount = {};
    repos.forEach(repo => {
      if (repo.language) {
        if (languageCount[repo.language]) {
          languageCount[repo.language]++;
        } else {
          languageCount[repo.language] = 1;
        }
      }
    });
    return Object.entries(languageCount).sort((a, b) => b[1] - a[1]).map(([lang, count]) => ({ lang, count })).slice(0, 5);
  };

 const renderComparison = () => {
  if (!userData1 || !userData2) {
    return null;
  }

  const totalStars1 = userData1.repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
  const totalStars2 = userData2.repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);

  const pieData1 = {
    labels: userData1.techStacks.map(stack => stack.lang),
    datasets: [
      {
        data: userData1.techStacks.map(stack => stack.count),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#66FF66', '#FFA07A'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#66FF66', '#FFA07A']
      }
    ]
  };

  const pieData2 = {
    labels: userData2.techStacks.map(stack => stack.lang),
    datasets: [
      {
        data: userData2.techStacks.map(stack => stack.count),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#66FF66', '#FFA07A'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#66FF66', '#FFA07A']
      }
    ]
  };

  return (
    <div className="comparisons">
      <div className='com-box'>
        <div className="userprofile">
        <img src={userData1.avatar_url} alt="Profile 1" />
        <h2>{userData1.name}</h2>
        <p>{userData1.bio}</p>
        <p className="metric">Followers: {userData1.followers}</p>
        <p className="metric">Repos: {userData1.public_repos}</p>
        <p className="metric">Dev Score: {userData1.devScore}</p>
        <p className="metric">Top Tech Stacks: {userData1.techStacks.map(stack => stack.lang).join(', ')}</p>
      </div>
      <div className="chart-container">
        <h2>Languages Used</h2>
        <div className="chart">
          <Pie data={pieData1} />
        </div>
      </div>

      <FontAwesomeIcon icon={faFire} className="vs-icon" style={{ color: "yellow" }} />

      <div className="userprofile">
        <img src={userData2.avatar_url} alt="Profile 2" />
        <h2>{userData2.name}</h2>
        <p>{userData2.bio}</p>
        <p className="metric">Followers: {userData2.followers}</p>
        <p className="metric">Repos: {userData2.public_repos}</p>
        <p className="metric">Dev Score: {userData2.devScore}</p>
        <p className="metric">Top Tech Stacks: {userData2.techStacks.map(stack => stack.lang).join(', ')}</p>
      </div>
      <div className="chart-container">
        <h2>Languages Used</h2>
        <div className="chart">
          <Pie data={pieData2} />
        </div>
      </div>
      </div>
      <div className="comparison-table">
        <h2>Comparison Table</h2>
        <table>
          <thead>
            <tr>
              <th>Metric</th>
              <th>{userData1.name}</th>
              <th>{userData2.name}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Followers</td>
              <td>{userData1.followers}</td>
              <td>{userData2.followers}</td>
            </tr>
            <tr>
              <td>Total Repos</td>
              <td>{userData1.public_repos}</td>
              <td>{userData2.public_repos}</td>
            </tr>
            <tr>
              <td>Total Stars</td>
              <td>{totalStars1}</td>
              <td>{totalStars2}</td>
            </tr>
            <tr>
              <td>Date Joined</td>
              <td>{new Date(userData1.created_at).toLocaleDateString()}</td>
              <td>{new Date(userData2.created_at).toLocaleDateString()}</td>
            </tr>
            <tr>
              <td>Dev Score</td>
              <td>{userData1.devScore}</td>
              <td>{userData2.devScore}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};


  return (
    <div className="compare">
      <div className="Compare-Box">
        <h1>Compare GitHub Users</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter GitHub username 1"
            value={username1}
            onChange={(e) => setUsername1(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter GitHub username 2"
            value={username2}
            onChange={(e) => setUsername2(e.target.value)}
          />
          <button className="compare-btn" type="submit">Compare</button>
        </form>
        {error && <p className="error">{error}</p>}
        {renderComparison()}
      </div>
    </div>
  );
};

export default Compare;
