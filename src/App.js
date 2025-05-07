import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Lecturers from './pages/Lecturers';


function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[#E5E7EB]">
        <Routes>
          
          <Route path="/lecturers" element={<Lecturers />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;