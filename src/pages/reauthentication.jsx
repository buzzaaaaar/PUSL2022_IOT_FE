import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Reauthentication = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    username: '',
    password: ''
  });
  const [authError, setAuthError] = useState('');
  const navigate = useNavigate();

  // Check if there's a pending override request when component mounts
  useEffect(() => {
    const student = sessionStorage.getItem('overrideStudent');
    const lectureId = sessionStorage.getItem('lectureId');
    
    if (!student || !lectureId) {
      // If no pending override, redirect to home or login
      navigate('/');
    }
  }, [navigate]);

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      username: '',
      password: ''
    };

    if (!username.trim()) {
      newErrors.username = 'Username is required';
      valid = false;
    } else if (username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
      valid = false;
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAuthError('');
    
    if (validateForm()) {
      // Replace with your actual authentication logic
      // This is just an example - in a real app, you would verify against your backend
      if (username === 'admin' && password === 'admin123') {
        // Get the stored student and lectureId
        const student = JSON.parse(sessionStorage.getItem('overrideStudent'));
        const lectureId = sessionStorage.getItem('lectureId');
        
        // Redirect back to attendance page with showModal=true
        navigate(`/attendance/${lectureId}`, {
          state: { 
            showOverrideModal: true, 
            student,
            reauthenticated: true // Flag to indicate successful reauthentication
          }
        });
        
        // Clear the stored data
        sessionStorage.removeItem('overrideStudent');
        sessionStorage.removeItem('lectureId');
      } else {
        setAuthError('Invalid credentials. Please try again.');
      }
    }
  };

  return (
    <div className="flex h-screen w-full font-montserrat">
      {/* Left side - white */}
      <div className="hidden md:flex md:w-1/2 bg-white"></div>
      
      {/* Right side - purple */}
      <div className="w-full md:w-1/2 bg-[#4C1D95] flex flex-col justify-center items-center p-8">
        <div className="max-w-md w-full">
          <h1 className="text-white text-4xl mb-3">Let's make sure it's you!</h1>
          <p className="text-[#E5E7EB] text-s mb-10">Please login to continue</p>
          
          {authError && (
            <div className="mb-4 p-2 bg-red-100 border-l-4 border-red-500 text-red-700">
              <p>{authError}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-white text-sm mb-3" htmlFor="username">
                Username<span className="text-white">*</span>
              </label>
              <input
                id="username"
                type="text"
                placeholder="Enter username"
                className={`w-full p-2 rounded-md bg-[#4C1D95] text-white border border-white focus:outline-none focus:border-white focus:ring-0 placeholder:text-[#E5E7EB] placeholder-italic placeholder:text-xs py-1 ${
                  errors.username ? 'border-red-500' : ''
                }`}
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (errors.username) {
                    setErrors({...errors, username: ''});
                  }
                }}
                required
              />
              {errors.username && (
                <p className="text-red-500 text-xs mt-1">{errors.username}</p>
              )}
            </div>
            
            <div className="mb-10">
              <label className="block text-white text-sm mb-3" htmlFor="password">
                Password<span className="text-white">*</span>
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter password"
                className={`w-full p-2 rounded-md bg-[#4C1D95] text-white border border-white focus:outline-none focus:border-white focus:ring-0 placeholder:text-[#E5E7EB] placeholder-italic placeholder:text-xs py-1 ${
                  errors.password ? 'border-red-500' : ''
                }`}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) {
                    setErrors({...errors, password: ''});
                  }
                }}
                required
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>
            
            <button
              type="submit"
              className="w-full bg-[#FACC15] hover:bg-white text-white text-l hover:text-[#FACC15] font-semibold py-1 px-4 rounded-md transition duration-300 border border-[#FACC15]"
            >
              LOG IN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reauthentication;