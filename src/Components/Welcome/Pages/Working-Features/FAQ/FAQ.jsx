import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import './FAQ.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What is Educome?",
      answer: "Educome is a Platform designed for engineering aspirants",
    },
    {
      question: "Is Educome free to use?",
      answer: "Yes, Educome is completely free to use",
    },
    {
      question: "How do I create a dynamic resume on Educome?",
      answer: "To create a dynamic resume on Educome, you need to fill in your details in the Profile section",
    },
    {
      question: "What is the Leaderboard feature?",
      answer: "The Leaderboard feature on Educome displays the top performers on the platform",
    },
    {
      question: "How is the ranking determined on the Leaderboard?",
      answer: "The ranking on the Leaderboard is determined based on the total number of points earned by a user",
    },
    {
      question: "How can I compare my performance with other users on Educome?",
      answer: "You can compare your performance with other users on Educome by visiting the Leaderboard section",
    },
    {
      question: "How do I provide feedback or suggest features?",
      answer: "You can provide feedback or suggest features by clicking on the Feedback button in the Profile section",
    },
  ];

  return (
    <div className='FAQ-BOX'>
      <div className="faq-container">
        <h2>FAQs</h2>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`faq-item ${activeIndex === index ? 'active' : ''}`}
              onClick={() => toggleFAQ(index)}
            >
              <div className="faq-question">
                {faq.question}
                <span className="faq-icon">
                  {activeIndex === index ? <FiChevronUp /> : <FiChevronDown />}
                </span>
              </div>
              <div className={`faq-answer ${activeIndex === index ? 'show' : ''}`}>
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
