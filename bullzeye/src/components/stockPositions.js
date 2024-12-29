import React, { useState } from 'react';
import '../styles/StockPositions.css'; 

const StockPositions = ({ currentPrice, walletBalance, setWalletBalance, setStockPositions }) => {
  const [quantity, setQuantity] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  const handleBuyClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setQuantity(0); // Reset quantity when closing
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleConfirmBuy = () => {
    const totalCost = currentPrice * quantity;
    if (totalCost > walletBalance) {
      alert("Insufficient balance!");
      return;
    }
    setWalletBalance(walletBalance - totalCost); // Update wallet balance

    // Update stock positions
    setStockPositions(prevPositions => [
        ...prevPositions,
        { quantity: quantity, averagePrice: currentPrice, isExited: false } // Add new position with isExited property
      ]);

    alert(`Bought ${quantity} shares at ₹${currentPrice} each.`);
    handleClosePopup(); // Close the popup
  };

  return (
    <div className="stock-positions">
      <button onClick={handleBuyClick}>Buy</button>
      <button>Sell</button>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Buy Stock</h3>
            <label>
              Quantity:
              <input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                min="1"
              />
            </label>
            <button onClick={handleConfirmBuy}>Buy</button>
            <button onClick={handleClosePopup}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockPositions;