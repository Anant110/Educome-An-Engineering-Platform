import React from 'react';
import './Developers.css';
import { Code, GitHub, LinkedIn } from '@mui/icons-material';

function Developers() {
  return (
    <div className="developer-container" id="dev">
      <span>About Developer</span>
      <div className="about-section">
        <div className="photo-section">
          <img src='./Images/dev-profile.jpg' alt="Developer" />
        </div>
        <div className="about-developer">
          <h2>Abhinav Raj Srivastava</h2>
          <p>Hey! Developers, I am Abhinav Raj Srivastav. Currently a Final Year Student at ABES Engineering College Ghaziabad. I would be very happy to listen to any valuable feedback from your side, feel free to write it in the feedback section. As always, Keep Hustling 🚀🧑‍🚀.</p>
          <div className="social-profiles">
            <a href="https://www.linkedin.com/in/abhinav-raj-srivastava-599aaa1b2/" target="_blank" rel="noopener noreferrer"><LinkedIn style={{position: "relative", left: "0px", top: "3px"}}/></a>
            <a href="https://github.com/Abhinavrajsrivastav" target="_blank" rel="noopener noreferrer"><GitHub style={{position: "relative", left: "0px", top: "3px"}}/></a>
            <a href="https://abhinav-raj.onrender.com/" target="_blank" rel="noopener noreferrer"><Code style={{position: "relative", left: "0px", top: "3px"}}/></a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Developers;
