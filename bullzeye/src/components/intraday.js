import React, { useState, useEffect } from 'react';
import bullzeyeLogo from '../assets/Logo_noName.png';
import '../styles/intraday.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faBookmark, faBell, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
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
            {returns.toFixed(2)} ({returnPercent}%) 
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
  const handleChatbotClick = () => {
    alert("Chatbot is now open!"); // Placeholder for chatbot functionality
  };

  return (
    <div className="trader-tools">
      <div className="news-section">
        <h3>News & Events</h3>
        <div className='news-box'>
          <h5>News one title goes here</h5>
          <a href='www.google.com'>Read more <FontAwesomeIcon icon={faArrowUpRightFromSquare} /></a>
        </div>
        <div className='news-box'>
          <h5>News two title goes here</h5>
          <a href='www.google.com'>Read more <FontAwesomeIcon icon={faArrowUpRightFromSquare} /></a>
        </div>
      </div>
      <button className="chatbot-button" onClick={handleChatbotClick}>
        🤖 BIG BULL
      </button>
    </div>
  );
};

export default Intraday;