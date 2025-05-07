// src/components/Chatbot.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Chatbot.css'; // Import the CSS file for styling

const Chatbot = () => {
    const [userInput, setUserInput] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [sessionId, setSessionId] = useState('');
    
    const assistantUrl = 'https://api.au-syd.assistant.watson.cloud.ibm.com/instances/beb1614d-c5fb-4656-b544-0136478c1b79'; // Replace with your Watson Assistant URL
    const apiKey = 'sI122Bdxlwj0YuiIOuN9cvY1YQPeRyvz6Gvd3yG7CcB7'; // Replace with your Watson Assistant API Key

    // Function to create a session
    const createSession = async () => {
        try {
            const response = await axios.post(
                `${assistantUrl}/v2/assistants/YOUR_ASSISTANT_ID/sessions?version=2021-06-14`,
                {},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Basic ${btoa('apikey:' + apiKey)}`
                    }
                }
            );
            setSessionId(response.data.session_id); // Save the session ID
        } catch (error) {
            console.error('Error creating session:', error);
        }
    };

    useEffect(() => {
        createSession(); // Create a session on component mount
    }, []);

    const handleSend = async () => {
        const message = { input: { text: userInput } };
        setChatHistory([...chatHistory, { sender: 'user', text: userInput }]);

        try {
            const response = await axios.post(
                `${assistantUrl}/v2/assistants/YOUR_ASSISTANT_ID/sessions/${sessionId}/message?version=2021-06-14`,
                message,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Basic ${btoa('apikey:' + apiKey)}`
                    }
                }
            );

            const assistantResponse = response.data.output.generic[0].text;
            setChatHistory([...chatHistory, { sender: 'user', text: userInput }, { sender: 'assistant', text: assistantResponse }]);
            setUserInput('');
        } catch (error) {
            console.error('Error communicating with Watson Assistant:', error);
        }
    };

    return (
        <div className='watson-ibm'>
            <div className="chatbot-container">
                <div className="chat-history">
                    {chatHistory.map((msg, index) => (
                        <div key={index} className={`message ${msg.sender}`}>
                            {msg.text}
                        </div>
                    ))}
                </div>
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Type your message..."
                    className="chat-input"
                />
                <button onClick={handleSend} className="send-button">Send</button>
            </div>
        </div>
    );
};


export default Chatbot;
