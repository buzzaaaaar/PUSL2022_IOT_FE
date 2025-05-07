import React from 'react';

const HomePage = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-[#4C1D95] text-white p-4">
        {/* Logo Section */}
        <div className="mb-8 flex items-center">
          <img 
            src="/images/logo.png"  // Main logo
            alt="Smart University Logo" 
            className="h-12 mr-2"
          />
          <div>
            <h1 className="text-2xl font-bold mb-1">SMART UNIVERSITY</h1>
            <p className="text-sm text-[#FACC15]">ATTENDANCE TRACKER</p>
          </div>
        </div>
        
        <nav>
          <ul className="space-y-2">
            <li className="flex items-center p-2 bg-[#3A0D7E] rounded">
              <img src="/images/home-icon.png" className="w-5 h-5 mr-3" alt="Home" />
              <span>Home</span>
            </li>
            <li className="flex items-center p-2 hover:bg-[#3A0D7E] rounded">
              <img src="/images/lectures-icon.png" className="w-5 h-5 mr-3" alt="Lectures" />
              <span>Lectures</span>
            </li>
            <li className="flex items-center p-2 hover:bg-[#3A0D7E] rounded">
              <img src="/images/students-icon.png" className="w-5 h-5 mr-3" alt="Students" />
              <span>Students</span>
            </li>
            <li className="flex items-center p-2 hover:bg-[#3A0D7E] rounded">
              <img src="/images/lecturers-icon.png" className="w-5 h-5 mr-3" alt="Lecturers" />
              <span>Lecturers</span>
            </li>
            <li className="flex items-center p-2 hover:bg-[#3A0D7E] rounded">
              <img src="/images/programmes-icon.png" className="w-5 h-5 mr-3" alt="Programmes" />
              <span>Programmes</span>
            </li>
            <li className="flex items-center p-2 hover:bg-[#3A0D7E] rounded">
              <img src="/images/modules-icon.png" className="w-5 h-5 mr-3" alt="Modules" />
              <span>Modules</span>
            </li>
            <li className="flex items-center p-2 hover:bg-[#3A0D7E] rounded">
              <img src="/images/analytics-icon.png" className="w-5 h-5 mr-3" alt="Analytics" />
              <span>Analytics</span>
            </li>
            <li className="flex items-center p-2 hover:bg-[#3A0D7E] rounded">
              <img src="/images/settings-icon.png" className="w-5 h-5 mr-3" alt="Settings" />
              <span>Settings</span>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        <h2 className="text-2xl font-bold mb-8">Home</h2>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <img src="/images/students-count-icon.png" className="w-8 h-8 mr-3" alt="Students" />
              <h3 className="text-gray-500 text-sm font-medium">TOTAL REGISTERED STUDENTS</h3>
            </div>
            <p className="text-3xl font-bold mt-2">8,036</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <img src="/images/live-icon.png" className="w-8 h-8 mr-3" alt="Live" />
              <h3 className="text-gray-500 text-sm font-medium">LIVE ATTENDANCE STATUS</h3>
            </div>
            <p className="text-3xl font-bold mt-2">2,121 students present</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <img src="/images/attendance-icon.png" className="w-8 h-8 mr-3" alt="Attendance" />
              <h3 className="text-gray-500 text-sm font-medium">THIS WEEK'S ATTENDANCE</h3>
            </div>
            <p className="text-3xl font-bold mt-2">87.5%</p>
          </div>
        </div>
        
        {/* Attendance Chart */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <div className="flex items-center mb-4">
            <img src="/images/chart-icon.png" className="w-6 h-6 mr-2" alt="Chart" />
            <h3 className="text-lg font-semibold">Overall Attendance %</h3>
          </div>
          <div className="h-64">
            {/* Chart placeholder */}
            <div className="flex items-end h-full border-b-2 border-l-2 border-gray-200">
              <div className="flex-1 flex justify-between items-end px-2">
                <div className="w-8 bg-[#4C1D95] h-3/4"></div>
                <div className="w-8 bg-[#4C1D95] h-full"></div>
                <div className="w-8 bg-[#4C1D95] h-5/6"></div>
                <div className="w-8 bg-[#4C1D95] h-2/3"></div>
                <div className="w-8 bg-[#4C1D95] h-1/2"></div>
                <div className="w-8 bg-[#4C1D95] h-1/3"></div>
                <div className="w-8 bg-[#4C1D95] h-1/4"></div>
              </div>
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-500">
              <span>Monday</span>
              <span>Tuesday</span>
              <span>Wednesday</span>
              <span>Thursday</span>
              <span>Friday</span>
              <span>Saturday</span>
              <span>Sunday</span>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <footer className="text-center text-gray-500 text-sm mt-8">
          <div className="flex justify-center items-center mb-2">
            <img src="/images/nsbm-logo.png" className="h-8 mr-2" alt="NSBM Logo" />
            <img src="/images/iot-group-logo.png" className="h-8" alt="IoT Group Logo" />
          </div>
          <p>Copyright © 2025 | Smart University Attendance Tracker | Powered By The NSBM Green University Introduction to IoT Group BA</p>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;