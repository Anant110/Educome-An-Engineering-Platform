import React from 'react';
import './Feedback.css';

const FeedbackEmbed = () => {
  return (
    <div className='feedback-embed-container'>
      <h2>We value your feedback</h2>
      <iframe
        src="https://forms.gle/JaN34JzzDWhtjAUv5"
        width="100%"
        height="600"
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
        title="Feedback Form"
      >
        Loading…
      </iframe>
    </div>
  );
};

export default FeedbackEmbed;
