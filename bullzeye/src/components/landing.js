import React from "react";
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
  const indices = [
    { name: "NIFTY", value: "23,813.40", change: "+63.20 (0.27%)", className: "green" },
    { name: "SENSEX", value: "78,699.07", change: "+226.59 (0.29%)", className: "green" },
    { name: "BANKNIFTY", value: "51,311.30", change: "+140.60 (0.27%)", className: "green" },
    { name: "FINNIFTY", value: "23,750.00", change: "+75.00 (0.32%)", className: "green" },
  ];

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
  const stocks = [
    { name: "One Mobikwik Systems", price: "₹627.80", change: "-10.85 (-1.70%)" },
    { name: "Garden Reach", price: "₹1,695.80", change: "+138.70 (8.91%)" },
    { name: "Finolex Industries", price: "₹256.05", change: "+18.65 (7.86%)" },
  ];

  return (
    <section className="most-traded">
      <h2>Most Traded Stocks</h2>
      <div className="cards">
        {stocks.map((stock, idx) => (
          <StockCard key={idx} {...stock} />
        ))}
      </div>
    </section>
  );
};

const StockCard = ({ name, price, change }) => {
    const navigate = useNavigate();
    const handleNavigate = () => {
      navigate('/intraday');
    }
    return(
    <div onClick={handleNavigate} className="stock-card" style={{ cursor: 'pointer' }}>
      <div className="stock-name">{name}</div>
      <div className="stock-price">{price}</div>
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
    <p>&copy; 2023 BullzEye. All rights reserved.</p>
  </footer>
);

export default Landing;
