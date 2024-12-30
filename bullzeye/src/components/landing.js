import React, { useEffect, useState } from "react";
import '../styles/landing.css';
import bullzeyeLogo from '../assets/Logo_noName.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { useNavigate } from 'react-router-dom';
import { faHourglassHalf, faScroll, faChartLine, faHandHoldingDollar, faWallet, faPlus } from '@fortawesome/free-solid-svg-icons';


function Landing() {
  return (
      <div className="landing">
        <Header />
        <main>
          <IndicesSection />
          <div className="content">
            <div className="main-content">
              <MostTraded />
              <ProductTools />
            </div>
            <Sidebar />
          </div>
        </main>
        <Footer />
      </div>
  );
}

const Header = () => (
  <header className="header">
    <div className="logo">
      <img src={bullzeyeLogo} alt="BullzEye Logo" />
      <h2>
        B<span>ullz</span>E<span>ye</span>
      </h2>
    </div>
    <nav>
      <a href="#">Explore</a>
      <a href="#">Dashboard</a>
    </nav>
    <div className="search">
      <input type="text" placeholder="🔍 What are you looking for today?" />
    </div>
    <div className="icons">
      <span>🔔</span>
      <span>🛒</span>
      <span>👤</span>
    </div>
  </header>
);

const IndicesSection = () => {
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
      {indices.map((index, idx) => (
        <div key={idx} className="index">
          <p>{index.name}</p>
          {index.value} <span className={index.className}>{index.change}</span>
        </div>
      ))}
    </section>
  );
};

const MostTraded = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [stocks, setStocks] = useState([
    { name: "One Mobikwik Systems", price: 627.80, change: "0.00 (0.00%)" },
    { name: "Garden Reach", price: 1695.80, change: "0.00 (0.00%)" },
    { name: "Finolex Industries", price: 256.05, change: "0.00 (0.00%)" },
  ]);

  useEffect(() => {
    const intervals = stocks.map((stock, index) => {
      return setInterval(() => {
        setStocks(prevStocks => 
          prevStocks.map((s, idx) => {
            if (idx === index) {
              const fluctuation = (Math.random() * 10 - 5); // Random fluctuation between -5 and +5
              const newPrice = parseFloat((s.price + fluctuation).toFixed(2)); // Update price
              const change = (newPrice - s.price).toFixed(2);
              const changePercentage = ((change / s.price) * 100).toFixed(2);
              return {
                ...s,
                price: newPrice,
                change: `${change} (${changePercentage}%)`,
              };
            }
            return s; // Return unchanged stock
          })
        );
      }, (index + 1) * 3000); // Different intervals for each stock (3s, 6s, 9s)
    });

    return () => intervals.forEach(clearInterval); // Cleanup on unmount
  }, [stocks]);

  const handleCardClick = () => {
    navigate("/intraday"); // Navigate to the intraday page
  };

  return (
    <section className="most-traded">
      <h2>Most Traded Stocks</h2>
      <div className="cards">
        {stocks.map((stock, idx) => (
          <StockCard key={idx} {...stock} onClick={handleCardClick} />
        ))}
      </div>
    </section>
  );
};

const StockCard = ({ name, price, change, onClick }) => {
  return (
    <div className="stock-card" onClick={onClick} style={{ cursor: 'pointer' }}>
      <div className="stock-name">{name}</div>
      <div className="stock-price">₹{price}</div>
      <div className={`stock-change ${change.startsWith('-') ? 'red' : 'green'}`}>{change}</div>
    </div>
  );
};

const ProductTools = () => {
  const tools = [
    { icon: faHourglassHalf, label: "Intraday" },
    { icon: faScroll, label: "IPO" },
    { icon: faChartLine, label: "F&O" },
  ];

  return (
    <section className="product-tools">
      <h2>Product Tools</h2>
      <div className="tools">
        {tools.map((tool, idx) => (
          <div key={idx} className="tool">
            <span>
              <FontAwesomeIcon icon={tool.icon} />
            </span>
            <p>{tool.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const Sidebar = () => (
  <aside className="sidebar">
    <InvestmentSection />
    <WalletBalance />
  </aside>
);

const InvestmentSection = () => (
  <section>
    <h3>
      <FontAwesomeIcon icon={faHandHoldingDollar} /> Your Investments
    </h3>
    <p>Invested: ₹0</p>
    <p>Current Value: ₹0</p>
    <p>Total Returns: ₹0</p>
    <p>1 Day Returns: ₹0</p>
  </section>
);

const WalletBalance = () => (

  <section id="balance">
    <h3>
      <FontAwesomeIcon icon={faWallet} /> Wallet Balance
    </h3>
    <div className="add-funds">
      <p>₹0</p>
      <button >
        <FontAwesomeIcon icon={faPlus} /> Add Funds
      </button>
    </div>
  </section>
)

const Footer = () => (
  <footer className="footer">
    <p>&copy; 2024 BullzEye. All rights reserved.</p>
  </footer>
);

export default Landing;
