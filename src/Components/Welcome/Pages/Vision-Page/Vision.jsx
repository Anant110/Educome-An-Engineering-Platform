import React, { useEffect } from 'react';
import './Vision.css';
import { Link } from 'react-router-dom';
import { gsapAnimations } from '../../../Animations/Gsap';
import { FaGraduationCap } from 'react-icons/fa';
import AnimatedGradientText from './../../../Animations/AnimatedGradientText';

function Vision() {
  // UseEffect hook to run GSAP animations
  useEffect(() => {
    gsapAnimations();
  }, []);

  return (
    <div className="vision-container">
      <div className="centered">
        <div className="icon-container">
          <FaGraduationCap className="vision-icon" />
        </div>
        <p className="brand-names">Educome</p>
        <p className="vision-heading">
          <AnimatedGradientText>
            A Platform For Engineers💙
          </AnimatedGradientText> 
        </p>
       
        <div className='vis-btn'>
          <Link to="/signup">
          <button className="featured-btn"> Start learning now!</button>
        </Link>
        <a 
          href="https://www.producthunt.com/posts/educome?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-educome" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <img 
            src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=491405&theme=neutral" 
            alt="Educome - A Platform for Engineering Aspirants | Product Hunt" 
            style={{ width: '250px', height: '54px' }} 
            width="250" 
            height="54" 
          />
        </a>
        </div>
      </div>
    </div>
  );
}

export default Vision;
