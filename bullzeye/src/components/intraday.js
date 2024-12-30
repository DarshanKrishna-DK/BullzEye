import { faArrowUpRightFromSquare, faBell, faBookmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import bullzeyeLogo from '../assets/Logo_noName.png';
import '../styles/intraday.css';
import StockGraph from './chart';
import StockDropDown from './stockDropDown';

function Intraday() {
  return (
      <div className="intraday">
        <main>
          <Index/>
          <div class="Intra-page">
            <div id="Stock-details">
              <StockDetails/>
              <StockGraph/>
              {/* <StockPrice/> */}
            </div>
            <StockDropDown/>
            <TraderTools/>
          </div>
        </main>
      </div>
  );
}

// Contains the index prices (NIFTY, BANK NIFTY, SENSEX, etc)
const Index = () => {
  const indices = [
    { name: "NIFTY", value: "23,813.40", change: "+63.20 (0.27%)", className: "green" },
    { name: "SENSEX", value: "78,699.07", change: "+226.59 (0.29%)", className: "green" },
    { name: "BANKNIFTY", value: "51,311.30", change: "+140.60 (0.27%)", className: "green" },
    { name: "FINNIFTY", value: "23,750.00", change: "+75.00 (0.32%)", className: "green" },
  ];

  return (
    <section className="indices">
      <div className="logo">
        <img src={bullzeyeLogo} alt="BullzEye Logo" />
        <h2>
          B<span>ullz</span>E<span>ye</span>
        </h2>
      </div>
      {indices.map((index, idx) => (
        <div key={idx} className="index">
          <p>{index.name}</p>
          {index.value} <span className={index.className}>{index.change}</span>
        </div>
      ))}
    </section>
  );
};

// Contains Stock Name, Price, Returns, Save, Alert and Simulator Toggle
const StockDetails = () => {
  const [isSimulatorOn, setIsSimulatorOn] = useState(false); // State to manage simulator toggle

  const toggleSimulator = () => {
    const newSimulatorState = !isSimulatorOn; 
    setIsSimulatorOn(newSimulatorState); 

    if (newSimulatorState) {
      alert("Switched to simulator."); 
    } else {
      alert("Simulator turned off."); 
    }
  };

  const stockPrice = 627.80; // Example stock price
  const stockReturns = +10.85; // Example returns
  const stockReturnsPercent = -1.70; // Example returns percentage
  const balance = 100000; // Example balance

  // Determine the class based on the returns value
  const returnsClass = stockReturns > 0 ? 'green' : 'red';

  return (
    <div className="stock-features">
      <div className="stock-detail">
        <h2>One Mobikwik Systems</h2>
        <p>₹{stockPrice}
        <span className={returnsClass}>
          {stockReturns} ({stockReturnsPercent}%) 
        </span>
        </p>
      </div>
      <div className="stock-buttons">
        <button className="actionbutton"><FontAwesomeIcon icon={faBookmark} /></button>
        <button className="actionbutton"><FontAwesomeIcon icon={faBell} /></button>
      </div>
      <div className="simulator-section">
        <div className = "flex-container">
        <h3>Simulator</h3>
        <label className="switch">
          <input type="checkbox" checked={isSimulatorOn} onChange={toggleSimulator} />
          <span className="slider"></span>
        </label>
        </div>
        <div className="balance">
          <p>Balance: {isSimulatorOn ? balance + ' BUL' : '₹0'}</p>
        </div>
      </div>
    </div>
  );
};


// Contains news section, test token balance and chatbot assistant. 
const TraderTools = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isOpen, setOpen] = useState(false);

  const handleChatbotClick = () => {
    setOpen(!isOpen);
    if (isOpen) {
      // Clear the chat when closing
      setMessages([]);
    }
  };

  const handleSend = (messageText, isAutoSend = false) => {
    if (messageText.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: messageText, sender: isAutoSend ? 'bot' : 'user' },
      ]);

      if (!isAutoSend) {
        handleQuestionClick(messageText.trim());
        setInput('');
      }
    }
  };

  const handleQuestionClick = (question) => {
    const currentTime = new Date();
    const marketOpenTime = new Date();
    marketOpenTime.setHours(9, 15, 0);

    let response;
    if (question === 'Stocks > 12%') {
      response = currentTime < marketOpenTime ? 'The market will open at 9:15 AM.' : 'None at this moment.';
    } else if (question === 'Stocks < 6%') {
      response = currentTime < marketOpenTime ? 'The market is yet to open.' : 'None at this moment.';
    } else {
      response = "I'm not sure how to answer that.";
    }

    // Simulate bot response
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: response, sender: 'bot' },
      ]);
    }, 500);
  };

  return (
    <div className="trader-tools">
      {!isOpen ? (
        <>
          <div className="news-section">
            <h3>News & Events</h3>
            <div className="news-box">
              <h5>News one title goes here</h5>
              <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">
                Read more <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
              </a>
            </div>
            <div className="news-box">
              <h5>News one title goes here</h5>
              <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">
                Read more <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
              </a>
            </div>
          </div>
          <button className="chatbot-button" onClick={handleChatbotClick}>
            🤖 BIG BULL
          </button>
        </>
      ) : (
        <div className={`chat-section ${isOpen ? 'open' : ''}`}>
          <div className="chat-header">
            <h3>Chat with BIG BULL</h3>
          </div>
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.sender === 'user' ? 'user-message' : 'bot-message'}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chat-buttons">
            <div className="button-row">
              <button
                className="chatbot-option-button"
                onClick={() => {
                  handleSend('Stocks > 12%', true);
                  handleQuestionClick('Stocks > 12%');
                }}
              >
                Stocks {'>'} 12%
              </button>
              <button
                className="chatbot-option-button"
                onClick={() => {
                  handleSend('Stocks < 6%', true);
                  handleQuestionClick('Stocks < 6%');
                }}
              >
                Stocks {'<'} 6%
              </button>
            </div>
          </div>
          <div className="chat-input-section">
            <input
              className="chatbot-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="Enter Chat"
            />
            <button className="send-button" onClick={() => handleSend(input)}>
              Send
            </button>
          </div>
          <button className="chatbot-close-button" onClick={handleChatbotClick}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};


export default Intraday;