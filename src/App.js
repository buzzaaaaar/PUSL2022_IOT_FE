import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Home from './pages/home';
import LecturesPage from './pages/lectures';
import AttendancePage from './pages/attendance';
import Reauthentication from './pages/reauthentication';
import AnalyticsPage from './pages/analytics';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/lectures" element={<LecturesPage />} />
        <Route path="/attendance" element={<AttendancePage />} />
        <Route path="/reauthentication" element={<Reauthentication />} />
        <Route path="/attendance/:lectureId" element={<AttendancePage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
      </Routes>
    </Router>
  );
}

export default App;