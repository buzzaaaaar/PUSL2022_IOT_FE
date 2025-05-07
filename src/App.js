import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Lecturers from './pages/Lecturers';
import Programmes from './pages/Programmes';


function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[#E5E7EB]">
        <Routes>
          <Route path="/lecturers" element={<Lecturers />} />
          <Route path="/programmes" element={<Programmes />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;