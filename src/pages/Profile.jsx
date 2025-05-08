import React, { useState, useRef, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import saveSuccessfulIcon from '../images/saveSuccessful.png';
import profileIcon from '../images/profile.png';
import logoutIcon from '../images/logOut.png';

const Profile = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const dropdownRef = useRef(null);
  
  // User data - in a real application, this would come from API/database
  const userName = "Admin";
  const initial = userName[0];
  const userData = {
    username: "admin_sachintha",
    email: "sachintha.perera@nsbm.ac.lk"
  };

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

  const validateForm = () => {
    const newErrors = { currentPassword: '', newPassword: '', confirmPassword: '' };
    let isValid = true;

    if (!currentPassword.trim()) {
      newErrors.currentPassword = 'Current password is required';
      isValid = false;
    }

    if (!newPassword.trim()) {
      newErrors.newPassword = 'New password is required';
      isValid = false;
    } else if (newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters';
      isValid = false;
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSave = () => {
    if (validateForm()) {
      // In a real application, you would send the password update request to the server here
      // Show success notification
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        // Clear form after success
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#E5E7EB] font-sans">
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 ml-80 overflow-auto relative">
          {/* Page Header */}
          <div className="bg-[#4C1D95] p-4 flex justify-between items-center">
            <div className="text-white font-bold text-xl">
              Profile
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
              {/* Profile Content */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column - Administrator Information */}
                <div>
                  <h2 className="text-xl font-bold text-[#1E1E1E] mb-6">Administrator Information</h2>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-[#3B82F6] mb-2">Username:</label>
                    <div className="text-gray-800">{userData.username}</div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-[#3B82F6] mb-2">Email:</label>
                    <div className="text-gray-800">{userData.email}</div>
                  </div>
                </div>
                
                {/* Right Column - Change Password */}
                <div>
                  <h2 className="text-xl font-bold text-[#3B82F6] mb-6">Change Password</h2>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Password*</label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className={`w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] ${
                        errors.currentPassword ? 'border-red-500 ring-1 ring-red-500' : ''
                      }`}
                    />
                    {errors.currentPassword && <p className="text-red-500 text-xs mt-1">{errors.currentPassword}</p>}
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">New Password*</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className={`w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] ${
                        errors.newPassword ? 'border-red-500 ring-1 ring-red-500' : ''
                      }`}
                    />
                    {errors.newPassword && <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>}
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password*</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] ${
                        errors.confirmPassword ? 'border-red-500 ring-1 ring-red-500' : ''
                      }`}
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      onClick={handleSave}
                      className="px-8 py-2 bg-[#3B82F6] text-white rounded-lg font-medium hover:bg-blue-600 active:bg-blue-700 active:ring-2 active:ring-blue-300 transition-all"
                    >
                      SAVE
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;