import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import BusinessDirectory from './pages/BusinessDirectory';
import PlacesToStay from './pages/PlacesToStay';
import ThingsToDo from './pages/ThingsToDo';
import EatAndDrink from './pages/EatAndDrink';
import OurTown from './pages/OurTown';
import PlanYourTrip from './pages/PlanYourTrip';
import Contact from './pages/Contact';
import SubmitBusiness from './pages/SubmitBusiness';
import Announcement from './components/Announcement';
import React from 'react';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <div className="flex-none">
          <Announcement 
            message="Explore local businesses and discover what makes our town special." 
            bgColor="bg-green-600"
            textColor="text-white"
            storageKey="welcome-announcement"
            persistClosed={false}
          />
        </div>
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/places-to-stay" element={<PlacesToStay />} />
            <Route path="/things-to-do" element={<ThingsToDo />} />
            <Route path="/eat-and-drink" element={<EatAndDrink />} />
            <Route path="/our-town" element={<OurTown />} />
            <Route path="/business-directory" element={<BusinessDirectory />} />
            <Route path="/plan-your-trip" element={<PlanYourTrip />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/submit-business" element={<SubmitBusiness />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
