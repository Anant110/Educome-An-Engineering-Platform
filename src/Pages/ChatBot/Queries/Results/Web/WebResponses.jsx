import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './WebResponses.css';

function WebResponses({
    searchResult,
}) {
    const location = useLocation();
    // const searchResults = location.state.searchResults || [];
    const [searchResults, setSearchResults] = useState(searchResult || []); 
    const [currentPage, setCurrentPage] = useState(1);
    const resultsPerPage = 4;
    const totalPages = Math.ceil(searchResults.length / resultsPerPage);
    // console.log(searchResult);

    const nextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const prevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const startIndex = (currentPage - 1) * resultsPerPage;
    const endIndex = startIndex + resultsPerPage;
    const currentResults = searchResult.slice(startIndex, endIndex);



    return (
        <div className="web-response-container">
            <h2>Source</h2>
            <div className="pagination">
                <button onClick={prevPage} disabled={currentPage === 1}>{"<"}</button>
                {/* <span>{currentPage} of {totalPages}</span> */}
                <button onClick={nextPage} disabled={currentPage === totalPages}>{">"}</button>
            </div>
            <div className="responses-list">
                {currentResults.map((result, index) => (
                    <div key={startIndex + index} className="response-items">
                        <a href={result.link} target="_blank" rel="noopener noreferrer" className="web-result">
                            <p className='web-response-index'>{startIndex + index + 1}</p>
                            <h3 className="result-title">{result.title}</h3>
                        </a>
                        <p className="result-snippet">{result.snippet}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default WebResponses;
