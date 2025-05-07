import React from 'react';
import './FeaturesCard.css'; // Import CSS file for styling if needed

function FeaturesCard({
  icons,
  heading,
  subheading,
}) {
  return (
    <div className="features-card">
      <div className="e-card playing">
      <div className="image"></div>
      <div className="wave"></div>
      <div className="wave"></div>
      <div className="wave"></div>
      <div className="infotops">
        <img src={icons} alt="" className="feature-icon"/><br />      
        {heading}<br />
        <div className="name">{subheading}</div>
      </div>
    </div>
    </div>
  );
}

export default FeaturesCard;
