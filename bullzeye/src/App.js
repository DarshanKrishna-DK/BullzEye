import React from "react";
import './styles/App.css';
import bullzeyeLogo from './assets/Logo_noName.png';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Intraday from "./components/intraday";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHourglassHalf, faScroll, faChartLine, faHandHoldingDollar, faWallet, faPlus } from '@fortawesome/free-solid-svg-icons';

function App() {
  return (
    <Router>
    <div className="app">
      <Header />
      <main>
        <IndicesSection />
        <div className="content">
          <div className = "main-content">
            <MostTraded />
            <ProductTools />
          </div>
          <Sidebar />
        </div>
      </main>
      <footer className="footer">
        <p>&copy; 2023 BullzEye. All rights reserved.</p>
      </footer>
    </div>
    <Routes>
      <Route path="/intraday" element={<Intraday />} />
    </Routes>
    </Router>
  );
}

const Header = () => (
  <header className="header">
    <div className="logo">
      <img src={bullzeyeLogo} alt="BullzEye Logo"/>
      <h2>B<span>ullz</span>E<span>ye</span></h2>
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

const IndicesSection = () => (
  <section className="indices">
    <div className="index"><p>NIFTY</p> 23,813.40 <span className="green">+63.20 (0.27%)</span></div>
    <div className="index"><p>SENSEX</p> 78,699.07 <span className="green">+226.59 (0.29%)</span></div>
    <div className="index"><p>BANKNIFTY</p> 51,311.30 <span className="green">+140.60 (0.27%)</span></div>
    <div className="index"><p>FINNIFTY</p> 23,750.00 <span className="green">+75.00 (0.32%)</span></div>
  </section>
);

const MostTraded = () => {
    const navigate = useNavigate(); 

    const handleClick = () => {
      navigate('/intraday');
    };
    return(
    <section className="most-traded">
    <h2>Most Traded Stocks</h2>
    <div className="cards">
      <StockCard onClick={handleClick} name="One Mobikwik Systems" price="₹627.80" change="-10.85 (-1.70%)" />
      <StockCard name="Garden Reach" price="₹1,695.80" change="138.70 (8.91%)" />
      <StockCard name="Finolex Industries" price="₹256.05" change="18.65 (7.86%)" />
      {/* <StockCard name="Amber Enterprises" price="₹7,442.95" change="-424.75 (-5.40%)" /> */}
    </div>
  </section>
    );
};

const StockCard = ({ name, price, change }) => {
  const navigate = useNavigate(); 

  const handleClick = () => {
    navigate('/intraday');
  };

  return (
    <div className="stock-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <div className="stock-name">{name}</div>
      <div className="stock-price">{price}</div>
      <div className={`stock-change ${change.startsWith('-') ? 'red' : 'green'}`}>{change}</div>
    </div>
  );
};

const ProductTools = () => (
  <section className="product-tools">
    <h2>Product Tools</h2>
    <div className="tools">
      <div className="tool">
        <span><FontAwesomeIcon icon={faHourglassHalf} /></span>
        <p>Intraday</p>
      </div>
      <div className="tool">
        <span><FontAwesomeIcon icon={faScroll} /></span>
        <p>IPO</p>
      </div>
      <div className="tool">
        <span><FontAwesomeIcon icon={faChartLine} /></span>
        <p>F&O</p>
      </div>
    </div>
  </section>
);

const Sidebar = () => (
  <aside className="sidebar">
    <section>
      <h3><FontAwesomeIcon icon={faHandHoldingDollar} /> Your Investments</h3>
      <p>Invested: ₹0</p>
      <p>Current Value: ₹0</p>
      <p>Total Returns: ₹0</p>
      <p>1 Day Returns: ₹0</p>
    </section>
    <section id="balance">
      <h3><FontAwesomeIcon icon={faWallet} /> Wallet Balance</h3>
      <div className="add-funds">
        <p>₹0</p>
        <button><FontAwesomeIcon icon={faPlus} /> Add Funds</button>
      </div>
    </section>
  </aside>
);

export default App;