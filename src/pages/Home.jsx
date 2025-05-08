import React, { useState, useRef, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import profileIcon from '../images/profile.png';
import logoutIcon from '../images/logOut.png';

const TopPanel = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const userName = "Admin";
  const initial = userName[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="bg-[#4C1D95] p-4 flex justify-between items-center absolute top-0 right-0 left-80 font-montserrat">
      <div className="text-white font-bold text-2xl ml-4">
        Home
      </div>
      
      <div className="relative" ref={dropdownRef}>
        <button 
          onClick={() => setShowDropdown(!showDropdown)}
          className="bg-white text-[#4C1D95] font-bold rounded-full h-8 w-8 flex items-center justify-center"
          aria-label="User menu"
        >
          {initial}
        </button>
        
        {showDropdown && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
            <button 
              className="w-full text-left px-4 py-2 text-sm text-[#4C1D95] hover:bg-gray-100 flex items-center font-montserrat"
              onClick={() => setShowDropdown(false)}
            >
              <img src={profileIcon} alt="Profile" className="w-4 h-4 mr-2" />
              <span>Profile</span>
            </button>
            <button 
              className="w-full text-left px-4 py-2 text-sm text-[#4C1D95] hover:bg-gray-100 flex items-center font-montserrat"
              onClick={() => setShowDropdown(false)}
            >
              <img src={logoutIcon} alt="Logout" className="w-4 h-4 mr-2" />
              <span>Log Out</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default function Home() {
    return (
      <div className="flex flex-col h-screen font-montserrat bg-[#E5E7EB] relative">
        {/* Sidebar */}
        <div className="fixed left-0 top-0 w-80 h-full">
          <Sidebar />
        </div>
        
        <div className="flex-1 flex flex-col overflow-hidden ml-80 bg-[#E5E7EB]"> {/* Added bg-[#E5E7EB] here */}
          {/* Top Panel */}
          <TopPanel />
  
          <main className="flex-1 bg-[#E5E7EB] p-6 overflow-auto mt-16"> {/* Changed from bg-gray-100 to bg-[#E5E7EB] */}
            <div className="flex flex-col md:flex-row gap-6 h-full">
              {/* Left Column - Centered boxes */}
              <div className="flex flex-col gap-6 w-full md:w-1/3 justify-center">
                {/* Total Registered Students - Increased height */}
                <div className="bg-white shadow rounded p-0 h-40 font-montserrat">
                  <div className="bg-[#FACC15] text-white p-5 rounded-t text-2xl text-center">
                    TOTAL REGISTERED STUDENTS
                  </div>
                  <div className="text-center text-2xl py-6">8,036</div>
                </div>
  
                {/* Live Attendance Status - Increased height */}
                <div className="bg-white shadow rounded p-0 h-40 font-montserrat">
                  <div className="bg-[#F97316] text-white p-5 rounded-t text-2xl text-center">
                    LIVE ATTENDANCE STATUS
                  </div>
                  <div className="text-center text-2xl py-6">
                    2,121 present
                  </div>
                </div>
              </div>
  
              {/* Right Column - Chart */}
              <div className="w-full md:w-2/3">
                <div className="bg-white shadow rounded p-0 h-full font-montserrat">
                  <div className="bg-[#22C55E] text-white p-6 rounded-t text-2xl text-center">
                    THIS WEEK'S ATTENDANCE
                  </div>
                  <div className="p-2 h-[calc(100%-3rem)]">
                    <ResponsiveContainer width="100%" height={400}>
                      <LineChart
                        data={data}
                        margin={{ top: 5, right: 15, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="2 2" />
                        <XAxis dataKey="day" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="attendance"
                          stroke="#10B981"
                          strokeWidth={2}
                          activeDot={{ r: 5 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
  
        {/* Footer */}
        <Footer />
      </div>
    );
  }
const data = [
  { day: 'Mon', attendance: 70 },
  { day: 'Tue', attendance: 55 },
  { day: 'Wed', attendance: 68 },
  { day: 'Thu', attendance: 73 },
  { day: 'Fri', attendance: 69 },
  { day: 'Sat', attendance: 65 },
  { day: 'Sun', attendance: 85 },
];
