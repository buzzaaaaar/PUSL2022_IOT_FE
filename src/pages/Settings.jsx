import React, { useState, useRef, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import saveSuccessfulIcon from '../images/saveSuccessful.png';
import profileIcon from '../images/profile.png';
import logoutIcon from '../images/logOut.png';

const Settings = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [startWindow, setStartWindow] = useState(15);
  const [endWindow, setEndWindow] = useState(15);
  const [tempStartWindow, setTempStartWindow] = useState(15);
  const [tempEndWindow, setTempEndWindow] = useState(15);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const dropdownRef = useRef(null);
  
  // User data
  const userName = "Admin";
  const initial = userName[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleEdit = () => {
    setTempStartWindow(startWindow);
    setTempEndWindow(endWindow);
    setIsEditing(true);
  };

  const handleSave = () => {
    setStartWindow(tempStartWindow);
    setEndWindow(tempEndWindow);
    setIsEditing(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#E5E7EB] font-sans">
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 ml-80 overflow-auto relative">
          {/* Page Header */}
          <div className="bg-[#4C1D95] p-4 flex justify-between items-center">
            <div className="text-white font-bold text-xl">
              Settings
            </div>
            
            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setShowDropdown(!showDropdown)}
                className="bg-white text-[#4C1D95] font-bold rounded-full h-8 w-8 flex items-center justify-center"
              >
                {initial}
              </button>
              
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                  <a href="/profile" className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                    <img src={profileIcon} alt="Profile" className="w-4 h-4 mr-2" />
                    <span>Profile</span>
                  </a>
                  <a href="/logout" className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                    <img src={logoutIcon} alt="Logout" className="w-4 h-4 mr-2" />
                    <span>Log Out</span>
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Success Notification */}
          {showSuccess && (
            <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-30">
              <div className="bg-white p-10 rounded-lg shadow-lg w-96 relative">
                <button 
                  onClick={() => setShowSuccess(false)}
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-3xl font-light w-8 h-8 flex items-center justify-center"
                >
                  &times;
                </button>
                
                <div className="flex items-center justify-center pt-2">
                  <img src={saveSuccessfulIcon} alt="Success" className="w-10 h-10 mr-3" />
                  <span className="text-lg font-medium">Save successful</span>
                </div>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className={`p-6 ${showSuccess ? 'blur-sm' : ''}`}>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column - Current Settings */}
                {/* Left Column - Current Settings */}
<div>
  <h2 className="text-xl font-bold text-[#1E1E1E] mb-6">Scan Time Window</h2>
  
  <div className="space-y-6">
    <div>
      <label className="block text-sm font-medium text-[#3B82F6] mb-2">Scan Start Window:</label>
      <div className="text-gray-800">{startWindow} minutes before lecture</div>
    </div>
    
    <div>
      <label className="block text-sm font-medium text-[#3B82F6] mb-2">Scan End Window:</label>
      <div className="text-gray-800">{endWindow} minutes after lecture</div>
    </div>
    
    <button
      onClick={handleEdit}
      className={`px-6 py-2 rounded-lg font-medium border-2 transition-all ${
        isEditing 
          ? 'bg-white text-[#3B82F6] border-[#3B82F6]' 
          : 'bg-[#3B82F6] text-white border-transparent hover:bg-blue-600'
      }`}
    >
      EDIT
    </button>
  </div>
</div>
                
                {/* Right Column - Edit Form (only visible when editing) */}
                {isEditing && (
                  <div>
                    <h2 className="text-xl font-bold text-[#3B82F6] mb-6">Edit Scan Time</h2>
                    
                    <div className="space-y-6 w-3/4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Scan Start Window Before Lecture (minutes):
                        </label>
                        <input
                          type="number"
                          value={tempStartWindow}
                          onChange={(e) => setTempStartWindow(parseInt(e.target.value) || 0)}
                          className="w-full p-2 border-2 border-[#1E1E1E] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Scan End Window After Lecture (minutes):
                        </label>
                        <input
                          type="number"
                          value={tempEndWindow}
                          onChange={(e) => setTempEndWindow(parseInt(e.target.value) || 0)}
                          className="w-full p-2 border-2 border-[#1E1E1E] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
                        />
                      </div>
                      
                      <div className="flex justify-center">
                        <button
                          onClick={handleSave}
                          className="w-full px-4 py-3 bg-[#3B82F6] text-white rounded-lg font-medium hover:bg-blue-600 active:bg-blue-700 active:ring-2 active:ring-blue-300 transition-all text-center"
                        >
                          SAVE
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Settings;