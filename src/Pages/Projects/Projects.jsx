import React, { useState, useRef } from 'react';
import axios from 'axios';
import './Projects.css';
import { FaGithub, FaLink, FaYoutube } from 'react-icons/fa';
import { OpenApi } from '../../Components/Api/OpenApi';

const Projects = () => {
  const [query, setQuery] = useState('');
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');
  const projectsSectionRef = useRef(null);

  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;

  const webDevelopmentProjects = [
    { name: 'E-commerce App', emoji: '🛒' },
    { name: 'LMS', emoji: 'Ⓜ️' },
    { name: 'News App', emoji: '📰' },
    { name: 'Music player', emoji: '📻' },
    { name: 'Digital Co2 Footprint', emoji: '♻️' },
    { name: 'Global Warning', emoji: '🌤️' },
    { name: 'Real-time Chat App', emoji: '💬' },
    { name: 'Travel Booking Website', emoji: '🌍' },
    { name: 'Job Portal', emoji: '💼' },
    { name: 'Project Searching', emoji: '🔎' },
    { name: 'Event Management App', emoji: '🎉' },
    { name: 'Recipe suggestion', emoji: '🍽️' },
    { name: 'Fitness Tracker', emoji: '🏃' },
  ];

  const programmingLanguagesProjects = [
    { name: 'Banking System', emoji: '🏦' },
    { name: 'Web Scraper', emoji: '🕷️' },
    { name: 'JavaScript Game Engine', emoji: '🎮' },
    { name: 'C++ Algorithm Visualizer', emoji: '🔧' },
    { name: 'Ruby Inventory Management', emoji: '📦' },
    { name: 'Go REST API', emoji: '🔗' },
    { name: 'Rust Blockchain', emoji: '⛓️' },
    { name: 'Swift iOS App', emoji: '📱' },
    { name: 'PHP Content Management System', emoji: '🖥️' },
    { name: 'TypeScript React Components Library', emoji: '⚛️' },
    { name: 'Scala Finance Application', emoji: '💸' },
    { name: 'Perl Automation Script', emoji: '🤖' },
  ];

  const dataScienceProjects = [
    { name: 'ML Stock Predictor', emoji: '📈' },
    { name: 'Data Science Dashboard', emoji: '📊' },
    { name: 'Deep Learning Image Classifier', emoji: '🧠' },
    { name: 'AI Chatbot', emoji: '🤖' },
    { name: 'NLP Sentiment Analyzer', emoji: '🗣️' },
    { name: 'Data Visualization Tool', emoji: '📉' },
    { name: 'Big Data Processing System', emoji: '💾' },
    { name: 'Statistical Analysis App', emoji: '📉' },
    { name: 'Machine Learning Model Deployment', emoji: '🚀' },
    { name: 'Genetic Algorithm Optimization', emoji: '🧬' },
    { name: 'Time Series Forecasting', emoji: '⏳' },
    { name: 'Computer Vision Application', emoji: '👁️' },
    { name: 'Reinforcement Learning Agent', emoji: '🤖' },
    { name: 'Bioinformatics Tool', emoji: '🧬' },
    { name: 'Sign Language Detection', emoji: '🔎' },
  ];

  const otherDomainsProjects = [
    { name: 'Android Fitness Tracker', emoji: '🏃' },
    { name: 'iOS Recipe App', emoji: '🍲' },
    { name: 'Cloud File Storage', emoji: '☁️' },
    { name: 'Blockchain Voting System', emoji: '🗳️' },
    { name: 'UI/UX Design Tool', emoji: '🎨' },
    { name: 'Cybersecurity Scanner', emoji: '🔒' },
    { name: 'DevOps CI/CD Pipeline', emoji: '🚀' },
    { name: 'Game Development Platform', emoji: '🎮' },
    { name: 'Virtual Reality Experience', emoji: '🕶️' },
    { name: 'Augmented Reality App', emoji: '📱' },
    { name: 'Digital Marketing Analytics', emoji: '📈' },
    { name: 'IoT Smart Home System', emoji: '🏠' },
    { name: 'Robotics Automation Software', emoji: '🤖' },
    { name: 'Environmental Monitoring System', emoji: '🌍' },
    { name: 'Legal Document Automation', emoji: '⚖️' },
  ];

  const[webDevelopment, setWebDevelopment] = useState(webDevelopmentProjects);
  const[programmingLanguages, setProgrammingLanguages] = useState(programmingLanguagesProjects);
  const[dataScience, setDataScience] = useState(dataScienceProjects);
  const[otherDomains, setOtherDomains] = useState(otherDomainsProjects);

  const handleSearch = async (searchQuery) => {
    const url = `https://api.github.com/search/repositories?q=${searchQuery}&sort=stars&order=desc`;

    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        const optimizedProjects = await optimizeDescriptions(response.data.items);
        setProjects(optimizedProjects);
        setError('');
        projectsSectionRef.current.scrollIntoView({ behavior: 'smooth' });
      } else {
        setError('Failed to fetch projects.');
      }
    } catch (err) {
      console.error('Error fetching data from API:', err);
      if (err.response) {
        setError(`Error: ${err.response.status} - ${err.response.data.message}`);
      } else if (err.request) {
        setError('No response received from server. Please check your network connection.');
      } else {
        setError('Error in setting up the request.');
      }
    }
  };

  const handleThemeClick = (theme) => {
    handleSearch(theme.name);
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleButtonClick = () => {
    handleSearch(query);
  };

  const getSomeMoreProject = async (themes,setProjects,title) => {
  const prompt = `Give me a list of ${themes} projects specifically oriented in ${title} in the format of an array like this: ["🎵Music Player", "🙊E-commerce",..etc]. Just give me the project array, nothing else.`;

  try {
    const response = await OpenApi(prompt);
    console.log('Response from OpenApi:', response); 

    let projectsArray;

    if (Array.isArray(response)) {
      projectsArray = response;
    } else{
      projectsArray = JSON.parse(response);
    }

    const newProjects = projectsArray.map(projectName => ({ name: projectName}));

    setProjects(themes => [...themes,...newProjects]);

  } catch (error) {
    console.error('Error fetching additional projects:', error);
    setError('Error fetching additional projects. Please try again.');
  }
};


  const renderThemes = (themes, title,setProjects) => (
    <div className='projects-box'>
      <h2>{title}</h2>
      <div className="suggested-themes">
        {themes.map((theme) => (
          <button key={theme.name} className="theme-button" onClick={() => handleThemeClick(theme)}>
            {theme.emoji} {theme.name}
          </button>
        ))}
        <button className="theme-button" onClick={() => getSomeMoreProject(themes,setProjects,title)}>
          ➕ See More
        </button>
      </div>
    </div>
  );

  const optimizeDescriptions = async (projects) => {
    const optimizedProjects = await Promise.all(
      projects.map(async (project) => {
        const description = project.description ? await ensureEnglishAndOptimize(project.description) : 'No description available.';
        return { ...project, description };
      })
    );
    return optimizedProjects;
  };

  const ensureEnglishAndOptimize = async (description) => {
    // Dummy language detection and translation logic for illustration
    const language = detectLanguage(description); // This function should detect the language of the description

    if (language !== 'en') {
      description = await translateToEnglish(description); // This function should translate the description to English
    }

    const optimizedDescription = await optimizeWithGemini(description); // This function should call the Gemini API to optimize the description
    return optimizedDescription;
  };

  const detectLanguage = (text) => {
    // Dummy function: always returns 'en'
    return 'en';
  };

  const translateToEnglish = async (text) => {
    // Dummy function: assumes the text is already in English
    return text;
  };

  const optimizeWithGemini = async (text) => {
    // Dummy function: returns the text with "(optimized)" appended
    return text + ' (optimized)';
  };

    const paginate = (projects) => {
    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    return projects.slice(indexOfFirstProject, indexOfLastProject);
  };

   const nextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  return (
    <div className="project-search-container">
      <div className='Project-con'>
        <h1>Project Portfolio</h1>
        <p>Here's a collection of top-notch projects that you can proudly add to your resume. This Project Portfolio will help you find the best among the best projects, complete with their code, documentation, and live views. Feel free to use any of these and let us know what you think about this initiative! Happy Learning 🎉✌️</p>
        {renderThemes(webDevelopment, 'Web Development', setWebDevelopment)}
        {renderThemes(programmingLanguages, 'Programming Languages', setProgrammingLanguages)}
        {renderThemes(dataScience, 'Data Science', setDataScience)}
        {renderThemes(otherDomains, 'Other Domains', setOtherDomains)}
        <div>
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            className="project-search-input"
            placeholder="Enter project name..."
          />
          <button onClick={handleButtonClick} className="project-search-button">Search</button>
        </div>
      </div>
      <div ref={projectsSectionRef}>
        {projects.length > 0 && (
           <div ref={projectsSectionRef} className='projects-result'>
            <h3 className='head-result'>Projects</h3>
        {projects.length > 0 && (
          <div className="project-cards">
            {paginate(projects).map((project) => (
              <div key={project.id} className="project-card">
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <div className="project-links">
                  <a href={project.html_url} target="_blank" rel="noopener noreferrer">
                    <FaGithub /> GitHub
                  </a>
                  {project.homepage && (
                    <a href={project.homepage} target="_blank" rel="noopener noreferrer">
                      🛸 Live Demo
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        {error && <p className="error-message">{error}</p>}
        {projects.length > 0 && (
          <div className="paginations">
            <button onClick={prevPage} disabled={currentPage === 1}>
              Back
            </button>
            <span>Page {currentPage}</span>
            <button onClick={nextPage} disabled={currentPage * projectsPerPage >= projects.length}>
              Next
            </button>
          </div>
        )}
      </div>
        )}
      </div>
      {error && <div className="error-message">{error}</div>}
      
    </div>
  );
};

export default Projects;
