import React, { useState, useRef } from 'react';
import axios from 'axios';
import './Books.css';
import { FaArrowAltCircleDown, FaArrowAltCircleLeft, FaArrowAltCircleRight, FaArrowLeft, FaArrowRight, FaBook, FaFire, FaLink } from 'react-icons/fa';

const Books = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');
  const booksSectionRef = useRef(null);

const webDevelopmentBooks = [
  { name: 'Understanding React.js', emoji: '📖' },
  { name: 'Mastering Node.js', emoji: '📘' },
  { name: 'Angular Fundamentals', emoji: '📗' },
  { name: 'Advanced Vue.js', emoji: '📖' },
  { name: 'Frontend Development Basics', emoji: '📘' },
  { name: 'Full-stack Web Development', emoji: '📗' },
  { name: 'Introduction to Django', emoji: '📖' },
  { name: 'Spring Boot Essentials', emoji: '📘' },
  { name: 'ASP.NET Core Overview', emoji: '📗' },
  { name: 'Ruby on Rails Fundamentals', emoji: '📖' }
];


const programmingLanguagesBooks = [
  { name: 'JavaScript Programming Essentials', emoji: '📖' },
  { name: 'Python Programming Guide', emoji: '📘' },
  { name: 'Java Language Basics', emoji: '📗' },
  { name: 'C++ Programming Techniques', emoji: '📖' },
  { name: 'Ruby Language Overview', emoji: '📘' },
  { name: 'Go Programming Insights', emoji: '📗' },
  { name: 'Swift Programming Fundamentals', emoji: '📖' },
  { name: 'R Language Essentials', emoji: '📘' },
  { name: 'PHP Programming Concepts', emoji: '📗' },
  { name: 'TypeScript Essentials', emoji: '📖' }
];


const dataScienceBooks = [
  { name: 'Python for Data Science Basics', emoji: '📖' },
  { name: 'Introduction to Machine Learning', emoji: '📘' },
  { name: 'Deep Learning Concepts', emoji: '📗' },
  { name: 'Data Visualization Methods', emoji: '📖' },
  { name: 'Big Data Analysis', emoji: '📘' },
  { name: 'Natural Language Processing Fundamentals', emoji: '📗' },
  { name: 'Algorithms for Data Mining', emoji: '📖' },
  { name: 'Statistics in Data Science', emoji: '📘' },
  { name: 'Applications of AI and Machine Learning', emoji: '📗' },
  { name: 'Data Science Techniques', emoji: '📖' }
];


const otherDomainsBooks = [
  { name: 'Cybersecurity Principles', emoji: '📖' },
  { name: 'Cloud Computing Overview', emoji: '📘' },
  { name: 'Blockchain Technology Basics', emoji: '📗' },
  { name: 'Fundamentals of IoT', emoji: '📖' },
  { name: 'AR/VR Development Insights', emoji: '📘' },
  { name: 'Game Development Concepts', emoji: '📗' },
  { name: 'Mobile App Development Basics', emoji: '📖' },
  { name: 'UI/UX Design Fundamentals', emoji: '📘' },
  { name: 'Digital Marketing Essentials', emoji: '📗' },
  { name: 'Project Management Basics', emoji: '📖' }
];


  const handleSearch = async (searchQuery) => {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}`;

    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        const optimizedBooks = await optimizeDescriptions(response.data.items);
        setBooks(optimizedBooks);
        setError('');
        booksSectionRef.current.scrollIntoView({ behavior: 'smooth' });
      } else {
        setError('Failed to fetch books.');
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

  const renderThemes = (themes, title) => (
    <div className='books-box'>
      <h2>{title}</h2>
      <div className="suggested-theme">
        {themes.map((theme) => (
          <button key={theme.name} className="theme-buttoni" onClick={() => handleThemeClick(theme)}>
            <div className='theme-buttons'>
              <div>
              {theme.emoji} {theme.name} 
            </div>
            <div className='themeArrow'>
              {<FaFire size='12' color="blue"/>}
            </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const optimizeDescriptions = async (books) => {
    const optimizedBooks = await Promise.all(
      books.map(async (book) => {
        const description = book.volumeInfo.description ? await ensureEnglishAndOptimize(book.volumeInfo.description) : 'No description available.';
        return { ...book, description };
      })
    );
    return optimizedBooks;
  };

  const ensureEnglishAndOptimize = async (description) => {
    const language = detectLanguage(description); 

    if (language !== 'en') {
      description = await translateToEnglish(description);
    }

    const optimizedDescription = await optimizeWithGemini(description); 
    return optimizedDescription;
  };

  const detectLanguage = (text) => {
    return 'en';
  };

  const translateToEnglish = async (text) => {
    return text;
  };

  const optimizeWithGemini = async (text) => {
    return text + ' (optimized)';
  };

  return (
    <div className="book-search-container">
      <div className='book-banke'>
        <div>
        <h1>Book Library</h1>    
      <p>Explore a curated collection of books across various genres. Whether you're looking for fiction, non-fiction, science, history, or more, find your next great read here 🎉✌️.</p>
      </div>
      {renderThemes(webDevelopmentBooks, 'Web Development')}
      {renderThemes(programmingLanguagesBooks, 'Programming Languages')}
      {renderThemes(dataScienceBooks, 'Data Science')}
      {renderThemes(otherDomainsBooks, 'Other Domains')}
      
      <div className="search-container">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Enter book category or name"
        />
        <button onClick={handleButtonClick} >
          Search
        </button>
      </div>
      
      {error && <p className="error-message">{error}</p>}
      
      <div ref={booksSectionRef} className="books-container">
        {books.map((book) => (
          <div key={book.id} className="book-item">
            <h2>{book.volumeInfo.title}</h2>
            <p>{book.description}</p>
            <div className="book-links">
              <a href={book.volumeInfo.infoLink} target="_blank" rel="noopener noreferrer">
                <FaBook color='white'/>
              </a>
              {book.volumeInfo.previewLink && (
                <a href={book.volumeInfo.previewLink} target="_blank" rel="noopener noreferrer">
                  <FaLink color='white'/>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default Books;
