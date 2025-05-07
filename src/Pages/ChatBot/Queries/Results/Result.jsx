import React from 'react'
import Gemini from './Ai/Gemini'
import WebResponses from './Web/WebResponses'
import './Result.css';
import { useLocation } from 'react-router-dom';

function Result() {

  const location = useLocation();
  const searchResult = location.state.searchResults;
  const geminiResponses = location.state.geminiResponse;
  const query  = location.state.query;

  return (
    <div className='search-result-container'>
        <Gemini />
        <WebResponses searchResult={searchResult}/>
    </div>
  )
}

export default Result