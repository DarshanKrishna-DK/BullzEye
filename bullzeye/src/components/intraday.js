import React, {useState} from 'react';
import bullzeyeLogo from '../assets/Logo_noName.png';
import '../styles/intraday.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faBookmark, faBell } from '@fortawesome/free-solid-svg-icons';
import StockGraph from './chart';

function Intraday() {
  return (
      <div className="intraday">
        <main>
          <Index/>
          <div class="Intra-page">
            <div id="Stock-details">
              <StockDetails/>
              <StockGraph/>
              <StockPrice/>
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

// Graph which shows the stock performace
// const StockChart = () => {
//   <StockGraph/>
// };

// Contains stock performance with low and high price for 1 Day & 52 Week
const StockPrice = () => {
  <p>This component will have 1day and 52 week low and high. </p>
};

// Contains dropdown to access Stock parameter values, positions, about company & financials
const StockDropDown = () => {
  const [selectedOption, setSelectedOption] = useState("Parameters"); // Default selected option

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value); // Update selected option
  };

  return (
    <div className="stock-dropdown">
      <label htmlFor="stock-options">Select Option:</label>
      <select id="stock-options" value={selectedOption} onChange={handleSelectChange}>
        <option value="Parameters">Parameters</option>
        <option value="Market Depth">Market Depth</option>
        <option value="Positions">Positions</option>
      </select>
      <div className="selected-option">
        <p>You have selected: {selectedOption}</p>
      </div>
    </div>
  );
};

// Contains news section, test token balance and chatbot assistant. 
const TraderTools = () => {
  const handleChatbotClick = () => {
    // Logic to open the chatbot can be implemented here
    alert("Chatbot is now open!"); // Placeholder for chatbot functionality
  };

  return (
    <div className="trader-tools">
      <h3>Trader Tools</h3>
      <button className="chatbot-button" onClick={handleChatbotClick}>
        🤖 Open AI Chatbot
      </button>
    </div>
  );
};

export default Intraday;