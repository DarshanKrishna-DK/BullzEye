import React from "react";
import Landing from "./components/landing";
import Intraday from "./components/intraday";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/intraday" element={<Intraday />} />
      </Routes>
    </Router>
  );
}

export default App;