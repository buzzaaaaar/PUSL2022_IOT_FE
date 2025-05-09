import { useState, useRef, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import searchIcon from '../images/search.png';
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
    <div className="bg-[#4C1D95] p-4 flex justify-between items-center font-montserrat">
      <div className="text-white font-bold text-xl">Lectures</div>
      <div className="relative" ref={dropdownRef}>
        <button 
          onClick={() => setShowDropdown(!showDropdown)}
          className="bg-white text-[#4C1D95] font-bold rounded-full h-8 w-8 flex items-center justify-center text-sm"
        >
          {initial}
        </button>
        {showDropdown && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
            <button
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
              onClick={() => console.log("Profile clicked")}
            >
              <img src={profileIcon} alt="Profile" className="w-4 h-4 mr-2" />
              <span>Profile</span>
            </button>
            <button
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
              onClick={() => console.log("Logout clicked")}
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

export default function AttendancePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  
  const attendanceData = [
    { 
      studentId: '20231', 
      rfidScanStatus: 'Success',
      rfidScanTime: '08:56:13', 
      faceScanStatus: 'Success', 
      faceScanTime: '08:56:19', 
      attendanceStatus: 'Present' 
    },
    { 
      studentId: '20452', 
      rfidScanStatus: 'Success',
      rfidScanTime: '08:58:02', 
      faceScanStatus: 'Failure', 
      faceScanTime: 'N/A', 
      attendanceStatus: 'Absent' 
    },
    { 
      studentId: '20999', 
      rfidScanStatus: 'Failure',
      rfidScanTime: 'N/A', 
      faceScanStatus: 'Success', 
      faceScanTime: '09:01:44', 
      attendanceStatus: 'Absent' 
    },
    { 
      studentId: '20503', 
      rfidScanStatus: 'Failure',
      rfidScanTime: 'N/A', 
      faceScanStatus: 'Failure', 
      faceScanTime: 'N/A', 
      attendanceStatus: 'Absent' 
    },
  ];

  // Initialize filtered data with all data
  useEffect(() => {
    setFilteredData(attendanceData);
  }, []);

  const handleSearch = () => {
    setHasSearched(true);
    
    if (!searchQuery.trim()) {
      // If search is empty, show all data
      setFilteredData(attendanceData);
      return;
    }
    
    // Filter data based on student ID
    const results = attendanceData.filter(student => 
      student.studentId.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setFilteredData(results);
  };
  
  return (
    <div className="flex h-screen bg-[#E5E7EB] font-montserrat">
      {/* Sidebar with increased space */}
      <div className="w-80 bg-gray-800">
        <Sidebar />
      </div>
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Fixed Top Panel */}
        <div className="flex-none">
          <TopPanel />
        </div>
        
        {/* Fixed Attendance heading */}
        <div className="flex-none bg-[#FACC15] py-5">
          <h1 className="text-center text-xl font-bold text-white">ATTENDANCE</h1>
        </div>
        
        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto">
          {/* Class information section - adjusted spacing */}
          <section className="px-10 py-4 bg-white">
            <div className="grid grid-cols-2 gap-x-10 gap-y-2"> {/* Reduced gap between items */}
              {/* First Column */}
              <div className="space-y-2">
                <div className="flex gap-2 items-center"> {/* Changed to flex with gap */}
                  <span className="font-medium text-gray-600 whitespace-nowrap">Module Code:</span>
                  <span className="text-[#1E1E1E]">CS2020</span>
                </div>
                <div className="flex gap-2 items-center">
                  <span className="font-medium text-gray-600 whitespace-nowrap">Lecture ID:</span>
                  <span className="text-[#1E1E1E]">LEC102</span>
                </div>
                <div className="flex gap-2 items-center">
                  <span className="font-medium text-gray-600 whitespace-nowrap">Date:</span>
                  <span className="text-[#1E1E1E]">2025-04-15</span>
                </div>
              </div>
              
              {/* Second Column */}
              <div className="space-y-2">
                <div className="flex gap-2 items-center">
                  <span className="font-medium text-gray-600 whitespace-nowrap">Start Time:</span>
                  <span className="text-[#1E1E1E]">09:00 AM</span>
                </div>
                <div className="flex gap-2 items-center">
                  <span className="font-medium text-gray-600 whitespace-nowrap">End Time:</span>
                  <span className="text-[#1E1E1E]">10:30 AM</span>
                </div>
                <div className="flex gap-2 items-center">
                  <span className="font-medium text-gray-600 whitespace-nowrap">Location:</span>
                  <span className="text-[#1E1E1E]">NB-202</span>
                </div>
              </div>
            </div>
          </section>
          
          {/* Search section with hover effects */}
          <section className="px-6 py-4 bg-[#E5E7EB]">
            <div className="flex items-center gap-2 w-1/2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search student ID"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-full p-2 pl-8 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#FACC15] bg-white text-sm"
                />
                <img 
                  src={searchIcon} 
                  alt="Search" 
                  className="absolute left-2 top-2.5 h-4 w-4" 
                />
              </div>
              <button 
                onClick={handleSearch}
                className="px-6 py-2 bg-[#FACC15] text-white rounded font-medium text-sm border-2 border-[#FACC15] hover:bg-white hover:text-[#FACC15] transition-colors duration-200"
              >
                SEARCH
              </button>
            </div>
          </section>
          
          {/* Attendance table with reduced row height */}
          <main className="px-10 py-6">
            <div className="bg-white rounded-lg shadow-lg w-full">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-3 px-6 text-left font-medium text-[#FACC15]">STUDENT ID</th>
                    <th className="py-3 px-6 text-left font-medium text-[#FACC15]">RFID SCAN</th>
                    <th className="py-3 px-6 text-left font-medium text-[#FACC15]">RFID TIME</th>
                    <th className="py-3 px-6 text-left font-medium text-[#FACC15]">FACE SCAN</th>
                    <th className="py-3 px-6 text-left font-medium text-[#FACC15]">FACE TIME</th>
                    <th className="py-3 px-6 text-left font-medium text-[#FACC15]">STATUS</th>
                    <th className="py-3 px-6 text-left font-medium text-[#FACC15]">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length > 0 ? (
                    filteredData.map((student, index) => (
                      <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-3 px-6 text-[#1E1E1E]">{student.studentId}</td>
                        <td className="py-3 px-6 text-[#1E1E1E]">{student.rfidScanStatus}</td>
                        <td className="py-3 px-6 text-[#1E1E1E]">{student.rfidScanTime}</td>
                        <td className="py-3 px-6 text-[#1E1E1E]">{student.faceScanStatus}</td>
                        <td className="py-3 px-6 text-[#1E1E1E]">{student.faceScanTime}</td>
                        <td className="py-3 px-6 text-[#1E1E1E]">{student.attendanceStatus}</td>
                        <td className="py-3 px-6">
                          <button className="px-8 py-1.5 bg-[#3B82F6] text-white rounded-md text-sm font-medium border-2 border-[#3B82F6] hover:bg-white hover:text-[#3B82F6] transition-colors duration-200">
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : hasSearched ? (
                    <tr>
                      <td colSpan="7" className="py-8 text-center text-lg font-medium text-gray-500">
                        No result found
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </div>
    </div>
  );
}