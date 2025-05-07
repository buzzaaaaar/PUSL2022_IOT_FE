import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Lecturers from './pages/Lecturers';


function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Routes>
         
          <Route path="/lecturers" element={<Lecturers />} />
          {/* Add other routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;