import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Lecturers from './pages/Lecturers';
import Programmes from './pages/Programmes';
import Modules from './pages/Modules';
import Settings from './pages/Settings';


function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[#E5E7EB]">
        <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
          <Route path="/lecturers" element={<Lecturers />} />
          <Route path="/programmes" element={<Programmes />} />
          <Route path="/modules" element={<Modules />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;