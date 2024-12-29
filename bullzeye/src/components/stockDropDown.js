import React, { useState } from 'react';
import '../styles/stockDropDown.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const StockDropDown = ({ stockPositions, currentPrice, setWalletBalance, setStockPositions }) => {
  const [selectedOption, setSelectedOption] = useState("Parameters"); 
  const [showExitPopup, setShowExitPopup] = useState(false); // State for exit confirmation popup
  const [exitIndex, setExitIndex] = useState(null); // Track which position is being exited

  const stockData = {
    todayLow: 150.00,
    todayHigh: 155.00,
    fiftyTwoWLow: 120.00,
    fiftyTwoWHigh: 180.00,
    open: 152.00,
    prevClose: 151.00,
    volume: 100000,
    lowerCircuit: 145.00,
    upperCircuit: 160.00,
  };

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value); 
  };

  const handleExitClick = (index) => {
    setExitIndex(index); // Set the index of the position to exit
    setShowExitPopup(true); // Show the exit confirmation popup
  };

  const handleConfirmExit = () => {
    const totalInvestment = stockPositions[exitIndex].averagePrice * stockPositions[exitIndex].quantity;
    const totalReturns = (currentPrice - stockPositions[exitIndex].averagePrice) * stockPositions[exitIndex].quantity;

    // Update wallet balance
    setWalletBalance(prevBalance => prevBalance + totalInvestment + totalReturns);

    // Mark the position as exited
    setStockPositions(prevPositions => {
      const updatedPositions = [...prevPositions];
      updatedPositions[exitIndex].isExited = true; // Set the position to exited
      return updatedPositions;
    });

    setShowExitPopup(false); // Close the popup
    alert(`You have exited. Your balance has been updated with ₹${(totalInvestment + totalReturns).toFixed(2)}.`);
  };

  const handleCancelExit = () => {
    setShowExitPopup(false); // Close the popup without any action
  };

  // Calculate total returns from all active positions
  const totalReturns = stockPositions.reduce((total, position) => {
    if (!position.isExited) {
      return total + (currentPrice - position.averagePrice) * position.quantity;
    }
    return total;
  }, 0);

  return (
    <div className="stock-dropdown">
      <select id="stock-options" value={selectedOption} onChange={handleSelectChange}>
        <option value="Parameters">Parameters</option>
        <option value="Market Depth">Market Depth</option>
        <option value="Positions">Positions</option>
      </select>

      {selectedOption === "Parameters" && (
        <div className="parameters">
          <div className="parameter-row">
            <div className="parameter">
              <h4>Today's Low</h4>
              <p>{stockData.todayLow}</p>
            </div>
            <div className="parameter">
              <h4>Today's High</h4>
              <p>{stockData.todayHigh}</p>
            </div>
          </div>
          <div className="parameter-row">
            <div className="parameter">
              <h4>52W Low</h4>
              <p>{stockData.fiftyTwoWLow}</p>
            </div>
            <div className="parameter">
              <h4>52W High</h4>
              <p>{stockData.fiftyTwoWHigh}</p>
            </div>
          </div>
          <div className="parameter-row">
            <div className="parameter">
              <h4>Open</h4>
              <p>{stockData.open}</p>
            </div>
            <div className="parameter">
              <h4>Prev. Close</h4>
              <p>{stockData.prevClose}</p>
            </div>
          </div>
          <div className="parameter-row">
            <div className="parameter">
              <h4>Volume</h4>
              <p>{stockData.volume}</p>
            </div>
            <div className="parameter">
              <h4>Lower Circuit</h4>
              <p>{stockData.lowerCircuit}</p>
            </div>
          </div>
          <div className="parameter-row">
            <div className="parameter">
              <h4>Upper Circuit</h4>
              <p>{stockData.upperCircuit}</p>
            </div>
          </div>
        </div>
      )}

      {selectedOption === "Market Depth" && (
        <div className="market-depth">
          <p>Market is not open yet.</p>
        </div>
      )}

      {selectedOption === "Positions" && (
        <div className="positions">
          <h3 className='returns-box'>Total Returns <br/> <span>{totalReturns.toFixed(2)} BUL</span></h3>

          {stockPositions.map((position, index) => {
            if (position.isExited) {
              return (
                <div key={index} className="position-box" style={{ opacity: 0.5 }}>
                  <h4>One Mobikwik Systems (Exited)</h4>
                  <div className='position-info'>
                    <p>Quantity: {position.quantity}</p>
                    <p>Avg: {position.averagePrice} BUL</p>
                    <p>{((currentPrice - position.averagePrice) * position.quantity).toFixed(2)} BUL (Final Returns)</p>
                  </div>
                  <button className='exit-button' disabled>
                    <FontAwesomeIcon icon={faRightFromBracket} />
                  </button>
                </div>
              );
            }

            const returns = (currentPrice - position.averagePrice) * position.quantity;
            const returnsClass = returns > 0 ? 'green' : 'red'; 
            return (
              <div key={index} className="position-box">
                <h4>One Mobikwik Systems</h4>
                <div className='position-info'>
                  <p>Quantity: {position.quantity}</p>
                  <p>Avg: {position.averagePrice} BUL</p>                    
                  <p className={returnsClass}>{returns.toFixed(2)} BUL</p>
                </div>
                <button className='exit-button' onClick={() => handleExitClick(index)}>
                  <FontAwesomeIcon icon={faRightFromBracket} />
                </button>
              </div>
            );
          })}

          {showExitPopup && (
            <div className="exit-popup">
              <h3>Confirm Exit</h3>
              <p>Are you sure you want to exit this position?</p>
              <button onClick={handleConfirmExit}>Yes</button>
              <button onClick={handleCancelExit}>No</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StockDropDown;