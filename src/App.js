import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Home from './pages/home';
import LecturesPage from './pages/lectures';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/lectures" element={<LecturesPage />} />
      </Routes>
    </Router>
  );
}

export default App;