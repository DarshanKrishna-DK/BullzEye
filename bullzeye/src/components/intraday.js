import { faArrowUpRightFromSquare, faBell, faBookmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {  useState, useEffect  } from 'react';
import bullzeyeLogo from '../assets/Logo_noName.png';
import '../styles/intraday.css';
import StockDropDown from './stockDropDown';
import StockGraph from './stockGraph';
import StockPositions from './stockPositions';

function Intraday() {
  const initialPrice = 627.8; // Set the initial price
  const [currentPrice, setCurrentPrice] = useState(initialPrice); // State to hold the current price
  const [walletBalance, setWalletBalance] = useState(100000); // Initial wallet balance
  const [stockPositions, setStockPositions] = useState([]); // State to hold stock positions

  return (
      <div className="intraday">
        <main>
          <Index />
          <div className="Intra-page">
            <div id="Stock-details">
              <StockDetails currentPrice={currentPrice} initialPrice={initialPrice} walletBalance={walletBalance} />
              <StockGraph initialPrice={initialPrice} setCurrentPrice={setCurrentPrice} />
              <StockPositions 
                currentPrice={currentPrice} 
                walletBalance={walletBalance} 
                setWalletBalance={setWalletBalance} 
                setStockPositions={setStockPositions}
                stockPositions={stockPositions}
              />
            </div>
            <StockDropDown 
              stockPositions={stockPositions} // Pass stockPositions to StockDropDown
              currentPrice={currentPrice} // Pass currentPrice to StockDropDown
              setWalletBalance={setWalletBalance}
              setStockPositions={setStockPositions}
            />
            <TraderTools />
          </div>
        </main>
      </div>
  );
}

// Contains the index prices (NIFTY, BANK NIFTY, SENSEX, etc)
const Index = () => {
  const [indices, setIndices] = useState([
    { name: "NIFTY", value: 23813.40, change: "+0.00 (0.00%)", className: "green" },
    { name: "SENSEX", value: 78699.07, change: "+0.00 (0.00%)", className: "green" },
    { name: "BANKNIFTY", value: 51311.30, change: "+0.00 (0.00%)", className: "green" },
    { name: "FINNIFTY", value: 23750.00, change: "+0.00 (0.00%)", className: "green" },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndices(prevIndices => 
        prevIndices.map(index => {
          const fluctuation = (Math.random() * 2 - 1) * 0.5; // Random fluctuation between -0.5 and 0.5
          const newValue = parseFloat((index.value + fluctuation).toFixed(2)); // Update value
          const change = (newValue - index.value).toFixed(2);
          const changePercentage = ((change / index.value) * 100).toFixed(2);
          const className = change > 0 ? "green" : change < 0 ? "red" : "neutral"; // Determine class based on change

          return {
            ...index,
            value: newValue,
            change: `${change} (${changePercentage}%)`,
            className: className,
          };
        })
      );
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

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
const StockDetails = ({ currentPrice, initialPrice, walletBalance }) => {
  const returns = currentPrice - initialPrice; 
  const returnPercent = ((returns / initialPrice) * 100).toFixed(2);

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

  // Determine the class based on the returns value
  const returnsClass = returns > 0 ? 'green' : 'red';

  return (
    <div className="stock-features">
      <div className="stock-detail">
        <h2>One Mobikwik Systems</h2>
        <p>₹{currentPrice}
          <span className={returnsClass}>
            {returns.toFixed(2)} ({ returnPercent}%) 
          </span>
        </p>
      </div>
      <div className="stock-buttons">
        <button className="actionbutton">
          <FontAwesomeIcon icon={faBookmark} />
        </button>
        <button className="actionbutton">
          <FontAwesomeIcon icon={faBell} />
        </button>
      </div>
      <div className="simulator-section">
        <div className="flex-container">
          <h3>Simulator</h3>
          <label className="switch">
            <input type="checkbox" checked={isSimulatorOn} onChange={toggleSimulator} />
            <span className="slider"></span>
          </label>
        </div>
        <div className="balance">
          <p>Balance: {isSimulatorOn ? walletBalance + ' BUL' : '₹0'}</p>
        </div>
      </div>
    </div>
  );
};


// Contains news section, test token balance and chatbot assistant. 
const TraderTools = () => {
  const [isOpen, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

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