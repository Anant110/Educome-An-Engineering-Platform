import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

import './CoverLetterGenerator.css';
import { OpenApi } from '../../Components/Api/OpenApi';

const CoverLetterGenerator = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [skills, setSkills] = useState('');
  const [position, setPosition] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copy, setCopy] = useState(false);

  const handleGenerateCoverLetter = async () => {
    try {
      const response = await OpenApi(`Generate a concise, professional cover letter that stands out. Job description: ${jobDescription}, Position: ${position}, Skills: ${skills}`);
      console.log('Generated cover letter:', response);
      setCoverLetter(response);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error generating cover letter:', error);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(coverLetter);
    setCopy(true);
  };

  return (
    <div className="coverletter-box">
      <div className="cover-letter-generator">
        <h2>Generate Cover Letter</h2>
        <textarea
          placeholder="Job Description"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Skills"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />
        <input
          type="text"
          placeholder="Position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
        <button onClick={handleGenerateCoverLetter}>Generate Cover Letter</button>

        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          contentLabel="Cover Letter"
          className="Modal"
          overlayClassName="Overlay"
        >
          <h2>Generated Cover Letter</h2>
          <pre>{coverLetter}</pre>
          <button onClick={handleCopyToClipboard}>{copy?'Copied':'Copy'}</button>
          <button onClick={() => setIsModalOpen(false)}>Close</button>
        </Modal>
      </div>
    </div>
  );
};

export default CoverLetterGenerator;
