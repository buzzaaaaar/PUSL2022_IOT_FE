import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import iotLogo from '../images/iotLogo.png';
import homeIcon from '../images/navbarHome.png';
import lecturesIcon from '../images/navbarLectures.png';
import studentsIcon from '../images/navbarStudents.png';
import lecturersIcon from '../images/navbarLecturers.png';
import programmesIcon from '../images/navbarProgrammes.png';
import modulesIcon from '../images/navbarModules.png';
import analyticsIcon from '../images/navbarAnalytics.png';
import settingsIcon from '../images/navbarSettings.png';

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-80 bg-white flex flex-col h-screen fixed">
      {/* Larger Logo Header */}
      <div className="p-4 flex justify-center">
        <img 
          src={iotLogo} 
          alt="IoT Logo" 
          className="h-40 w-auto"
        />
      </div>
      
      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-1">
          {[
            { path: "/home", icon: homeIcon, name: "Home" },
            { path: "/lectures", icon: lecturesIcon, name: "Lectures" },
            { path: "/students", icon: studentsIcon, name: "Students" },
            { path: "/lecturers", icon: lecturersIcon, name: "Lecturers" },
            { path: "/programmes", icon: programmesIcon, name: "Programmes" },
            { path: "/modules", icon: modulesIcon, name: "Modules" },
            { path: "/analytics", icon: analyticsIcon, name: "Analytics" },
            { path: "/settings", icon: settingsIcon, name: "Settings" }
          ].map((item) => (
            <li key={item.path}>
              <Link 
                to={item.path}
                className={`flex items-center p-3 rounded-lg ${location.pathname === item.path ? 
                  'border-2 border-[#4C1D95] text-[#4C1D95]' : 
                  'text-[#4C1D95] hover:bg-gray-100'}`}
              >
                <img src={item.icon} alt={item.name} className="w-6 h-6 mr-3" />
                <span className="font-medium">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;