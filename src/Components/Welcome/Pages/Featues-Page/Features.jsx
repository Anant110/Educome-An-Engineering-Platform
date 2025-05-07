import React, { useEffect, useState } from 'react';
import './Features.css';
import FeaturesCard from './Features-Components/FeaturesCard';
import { Scrollreveal } from '../../../Animations/Scrollreveal';

function Features() {
  const [width, setWidth] = useState(window.innerWidth);

  //-----Scrollreveal Animation----  
  useEffect(() => {
    Scrollreveal();
  }, []);

  // Update the width state on window resize
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="features-page">
      <h1 className="features-page-heading">
        <span className="Features-Page-Main-Heading">
          Here are some <span>cool</span> Features
        </span>
      </h1>
      <div className="features-body">
        <div className={width > 1005 ? 'feature-card-1' : ''}>
          <FeaturesCard
            className="features-card"
            icons={"./Icons/google-books.png"}
            heading={"Read Books"}
            subheading={"A hub for avid readers seeking knowledge from books."}
          />
        </div>
        <div className={width > 1005 ? 'feature-card-2' : ''}>
          <FeaturesCard
            className="features-card"
            icons={"./Icons/representative.png"}
            heading={"Find Right Mate"}
            subheading={"A platform to connect with the perfect teammate."}
          />
        </div>
        <div className={width > 1005 ? 'feature-card-3' : ''}>
          <FeaturesCard
            className="features-card"
            icons={"./Icons/rank.png"}
            heading={"See Your Ranking"}
            subheading={"Track your development ranking among peers."}
          />
        </div>
        <div className={width > 1005 ? 'feature-card-4' : ''}>
          <FeaturesCard
            className="features-card"
            icons={"./Icons/artificial-intelligence.png"}
            heading={"Learn with AI"}
            subheading={"Enhance your learning experience with AI assistance."}
          />
        </div>
        <div className={width > 1005 ? 'feature-card-5' : ''}>
          <FeaturesCard
            className="features-card"
            icons={"./Icons/people.png"}
            heading={"Learn with Community"}
            subheading={"Engage and share knowledge within a vibrant community."}
          />
        </div>
        <div className={width > 1005 ? 'feature-card-6' : ''}>
          <FeaturesCard
            className="features-card"
            icons={"./Icons/google-gemini-icon.png"}
            heading={"Ask with Gemini"}
            subheading={"Interact and collaborate securely with Gemini."}
          />
        </div>
      </div>
    </div>
  );
}

export default Features;
