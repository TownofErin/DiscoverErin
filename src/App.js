import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import React from 'react';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/places-to-stay" element={<div>Places to Stay</div>} />
          <Route path="/things-to-do" element={<div>Things to Do</div>} />
          <Route path="/eat-and-drink" element={<div>Eat & Drink</div>} />
          <Route path="/our-town" element={<div>Our Town</div>} />
          <Route path="/explore-businesses" element={<div>Explore our Businesses</div>} />
          <Route path="/plan-your-trip" element={<div>Plan Your Trip</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
