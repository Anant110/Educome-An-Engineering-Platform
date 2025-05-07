import React from 'react';
import './Footer.css';
import { FaGithub, FaLinkedin, FaTwitter, FaXing, FaStar, FaGoogle } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <div className="footer-logo">
          <img src="./Icons/cat.png" alt="Logo" />
          {/* <FaGoogle  size='25'/> */}
          <span>Educome</span>
        </div>
        <div className="footer-nav">
          <a href="#code">Coding</a>
          <a href="#showcase">Storytelling</a>
          <a href="#impress">Hustling</a>
          <a href="#contact">🧑‍🚀🛸</a>
        </div>
        <button className="footer-github-button">
          <FaStar size='25'/>
          Star on GitHub
        </button>
      </div>
      
      <div className="footer-right">
        <h4>Dev Links</h4>
        <ul>
          <li><a href="https://github.com/Abhinavrajsrivastav">Contribute</a></li>
          <li><a href="https://github.com/Abhinavrajsrivastav/pacifics-path">Like on Github</a></li>
        </ul>
        <div className="footer-social-icons">
          <a href="https://www.linkedin.com/in/abhinav-raj-srivastava-599aaa1b2/" aria-label="LinkedIn"><FaLinkedin /></a>
          <a href="https://github.com/Abhinavrajsrivastav" aria-label="GitHub"><FaGithub /></a>
          <a href="https://twitter.com/srivast254" aria-label="Xing"><FaXing /></a>
        </div>
      <p>© 2024 Made with 💙by Abhinav Raj Srivastav</p>
      </div>
    </footer>
  );
};

export default Footer;
