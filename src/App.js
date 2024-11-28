import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import BusinessDirectory from './pages/BusinessDirectory';
import PlacesToStay from './pages/PlacesToStay';
import ThingsToDo from './pages/ThingsToDo';
import EatAndDrink from './pages/EatAndDrink';
import OurTown from './pages/OurTown';
import React from 'react';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/places-to-stay" element={<PlacesToStay />} />
          <Route path="/things-to-do" element={<ThingsToDo />} />
          <Route path="/eat-and-drink" element={<EatAndDrink />} />
          <Route path="/our-town" element={<OurTown />} />
          <Route path="/business-directory" element={<BusinessDirectory />} />
          <Route path="/plan-your-trip" element={<div>Plan Your Trip</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
