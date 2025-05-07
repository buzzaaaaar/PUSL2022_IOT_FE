import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Lecturers from './pages/Lecturers';
import Programmes from './pages/Programmes';
import Modules from './pages/Modules';


function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[#E5E7EB]">
        <Routes>
          <Route path="/lecturers" element={<Lecturers />} />
          <Route path="/programmes" element={<Programmes />} />
          <Route path="/modules" element={<Modules />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;