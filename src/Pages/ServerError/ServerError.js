import React from 'react';
import './ServerError.css';

function ServerError() {
  return (
    <div className="server-error">
      <div className="error-content">
        <i className="fas fa-server fa-5x icon"></i>
        <h1>Oops! Server is Down</h1>
        <p>We're working hard to fix this issue. Please wait a moment.</p>
      </div>
    </div>
  );
}

export default ServerError;
