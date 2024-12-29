import React, { useState } from 'react';
import '../styles/stockDropDown.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

// Contains dropdown to access Stock parameter values, positions, about company & financials
const StockDropDown = () => {
  const [selectedOption, setSelectedOption] = useState("Parameters"); 

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

  const positionsData = [
    {
      stockName: "One Mobikwik Systems",
      quantity: 10,
      averagePrice: 150.00,
      currentPrice: 155.00,
    },
    {
      stockName: "Enviro Infra Engineers",
      quantity: 5,
      averagePrice: 160.00,
      currentPrice: 155.00,
    },
  ];

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value); 
  };

  return (
    <div className="stock-dropdown">
      {/* <label htmlFor="stock-options">Select Option:</label> */}
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
          <p>Market isn't open yet</p>
        </div>
      )}

      {selectedOption === "Positions" && (
        <div className="positions">
            <div className='returns-box'>
                <h4>Total Returns</h4>
                <p>₹{positionsData.reduce((total, position) => total + position.currentPrice - position.averagePrice, 0).toFixed(2)}</p>
            </div>
          {positionsData.map((position, index) => {
            const returns = position.currentPrice - position.averagePrice;
            const returnsClass = returns > 0 ? 'green' : 'red'; // Determine class based on returns
            return (
              <div key={index} className="position-box">
                <h4>{position.stockName}</h4>
                <div className='position-info'>
                    <p>Quantity: {position.quantity}</p>
                    <p>Avg: ₹{position.averagePrice}</p>                    
                    <p className={returnsClass}>₹{returns.toFixed(2)}</p>
                </div>
                <button className='exit-button'><FontAwesomeIcon icon={faRightFromBracket} /></button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default StockDropDown;