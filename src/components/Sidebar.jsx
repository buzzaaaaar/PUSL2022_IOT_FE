import React from 'react';
import { Link } from 'react-router-dom';
import homeIcon from '../images/navbarHome.png';
import lecturesIcon from '../images/navbarLectures.png';
import lecturersIcon from '../images/navbarLecturers.png';
import modulesIcon from '../images/navbarModules.png';
import settingsIcon from '../images/navbarSettings.png';
import studentsIcon from '../images/navbarStudents.png';
import programmesIcon from '../images/navbarProgrammes.png';
import analyticsIcon from '../images/navbarAnalytics.png';
import iotLogo from '../images/iotLogo.png';

const Sidebar = () => {
  // SidebarHeader content now integrated directly
  const SidebarHeader = () => (
    <div className="p-4 border-b border-gray-700 flex items-center">
      <img 
        src={iotLogo} 
        alt="IoT Logo" 
        className="w-10 h-10 mr-3"
      />
      <h1 className="text-lg font-bold">SMART UNIVERSITY ATTENDANCE TRACKER</h1>
    </div>
  );

  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col h-full">
      {/* Integrated SidebarHeader */}
      <SidebarHeader />
      
      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-4">
          <li>
            <Link to="/" className="flex items-center hover:text-blue-300 p-2 rounded hover:bg-gray-700">
              <img src={homeIcon} alt="Home" className="w-5 h-5 mr-3" />
              <span>Home</span>
            </Link>
          </li>
          
          <li>
            <Link to="/lectures" className="flex items-center hover:text-blue-300 p-2 rounded hover:bg-gray-700">
              <img src={lecturesIcon} alt="Lectures" className="w-5 h-5 mr-3" />
              <span>Lectures</span>
            </Link>
            <ul className="ml-8 mt-2 space-y-2">
              <li>
                <Link to="/students" className="flex items-center text-sm hover:text-blue-300 p-1 rounded hover:bg-gray-700">
                  <img src={studentsIcon} alt="Students" className="w-4 h-4 mr-2" />
                  <span>Students</span>
                </Link>
              </li>
            </ul>
          </li>
          
          <li className="bg-gray-700 rounded-lg">
            <Link to="/lecturers" className="flex items-center text-blue-300 p-2 rounded">
              <img src={lecturersIcon} alt="Lecturers" className="w-5 h-5 mr-3" />
              <span>Lecturers</span>
            </Link>
            <ul className="ml-8 mt-2 space-y-2">
              <li>
                <Link to="/programmes" className="flex items-center text-sm hover:text-blue-300 p-1 rounded hover:bg-gray-700">
                  <img src={programmesIcon} alt="Programmes" className="w-4 h-4 mr-2" />
                  <span>Programmes</span>
                </Link>
              </li>
            </ul>
          </li>
          
          <li>
            <Link to="/modules" className="flex items-center hover:text-blue-300 p-2 rounded hover:bg-gray-700">
              <img src={modulesIcon} alt="Modules" className="w-5 h-5 mr-3" />
              <span>Modules</span>
            </Link>
            <ul className="ml-8 mt-2 space-y-2">
              <li>
                <Link to="/analytics" className="flex items-center text-sm hover:text-blue-300 p-1 rounded hover:bg-gray-700">
                  <img src={analyticsIcon} alt="Analytics" className="w-4 h-4 mr-2" />
                  <span>Analytics</span>
                </Link>
              </li>
            </ul>
          </li>
          
          <li>
            <Link to="/settings" className="flex items-center hover:text-blue-300 p-2 rounded hover:bg-gray-700">
              <img src={settingsIcon} alt="Settings" className="w-5 h-5 mr-3" />
              <span>Settings</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;