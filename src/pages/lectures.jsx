import React, { useState, useRef, useEffect, useMemo } from 'react';
import profileIcon from '../images/profile.png';
import logoutIcon from '../images/logOut.png';
import pastLecturesIcon from '../images/pastLectures.png';
import scheduledLecturesIcon from '../images/scheduledLectures.png';
import searchIcon from '../images/search.png';
import saveSuccessfulIcon from '../images/saveSuccessful.png';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

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
          className="bg-white text-[#4C1D95] font-bold rounded-full h-8 w-8 flex items-center justify-center"
        >
          {initial}
        </button>
        {showDropdown && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 font-montserrat">
            <button
              className="w-full text-left px-4 py-2 text-sm text-gray-700 flex items-center transition-colors duration-200"
              onClick={() => console.log("Profile clicked")}
            >
              <img src={profileIcon} alt="Profile" className="w-4 h-4 mr-2" />
              <span>Profile</span>
            </button>
            <button
              className="w-full text-left px-4 py-2 text-sm text-gray-700 flex items-center transition-colors duration-200"
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

// Success Notification Component
const SuccessNotification = ({ isVisible, onClose }) => {
  if (!isVisible) return null;
  
  return (
    <div className="fixed inset-x-0 top-[152px] flex justify-center items-center z-50 px-4">
      <div className="bg-white rounded-lg shadow-lg flex flex-col max-w-md border-l-4 border-[#22C55E] animate-fadeIn">
        {/* Close button in the top-right with divider */}
        <div className="flex justify-end border-b border-gray-200 p-2">
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        {/* Notification content with increased height */}
        <div className="p-6 flex items-center">
          <img src={saveSuccessfulIcon} alt="Success" className="w-10 h-10 mr-3" />
          <div>
            <h3 className="font-semibold text-gray-800 text-lg">Save Successful!</h3>
            <p className="text-gray-600 text-sm">The lecture has been added successfully.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const lecturesData = [
  { module: 'CS2020', lecturer: 'LEC102', date: '2025-04-15', start: '09:00 AM', end: '10:30 AM', location: 'NB-202' },
  { module: 'SE2035', lecturer: 'LEC109', date: '2025-04-16', start: '01:00 PM', end: '02:30 PM', location: 'NB-304' },
  { module: 'IT2011', lecturer: 'LEC101', date: '2025-04-17', start: '11:00 AM', end: '12:00 PM', location: 'NB-110' },
  { module: 'CS2020', lecturer: 'LEC102', date: '2025-04-18', start: '09:00 AM', end: '10:30 AM', location: 'NB-202' },
];

export default function LecturesPage() {
  const [activeTab, setActiveTab] = useState('past');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredLectures, setFilteredLectures] = useState(lecturesData);
  const [showAddLectureModal, setShowAddLectureModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [moduleCode, setModuleCode] = useState('');
  const [lecturerId, setLecturerId] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const modalRef = useRef(null);

  // Get current date using useMemo to prevent recreation on every render
  const today = useMemo(() => new Date(), []);
  const currentDay = today.getDate();

  // Sample data for dropdowns
  const moduleCodes = ['CS2020', 'SE2035', 'IT2011', 'CS2025'];
  const lecturerIds = ['LEC101', 'LEC102', 'LEC103', 'LEC104'];
  const locations = ['NB-202', 'NB-304', 'NB-110', 'NB-205'];
  const timeSlots = [
    '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', 
    '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', 
    '04:00 PM', '05:00 PM'
  ];

  // Check if form is valid
  const isFormValid = useMemo(() => {
    return (
      moduleCode.trim() !== '' &&
      lecturerId.trim() !== '' &&
      selectedDate !== null &&
      startTime.trim() !== '' &&
      endTime.trim() !== '' &&
      location.trim() !== ''
    );
  }, [moduleCode, lecturerId, selectedDate, startTime, endTime, location]);

  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      setFilteredLectures(lecturesData);
    } else {
      const filtered = lecturesData.filter(lecture => 
        lecture.module.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lecture.lecturer.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredLectures(filtered);
    }
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const changeMonth = (increment) => {
    setCurrentMonth(prev => {
      let newMonth = prev + increment;
      let newYear = currentYear;
      
      if (newMonth > 11) {
        newMonth = 0;
        newYear++;
      } else if (newMonth < 0) {
        newMonth = 11;
        newYear--;
      }
      
      setCurrentYear(newYear);
      return newMonth;
    });
  };

  const renderCalendar = () => {
    const days = [];
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    
    // Empty cells for days before the start of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<td key={`empty-${i}`} className="py-1 px-1"></td>);
    }
    
    // Days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const isSelected = selectedDate === i && 
                         currentMonth === today.getMonth() && 
                         currentYear === today.getFullYear();
      const isToday = i === currentDay && 
                      currentMonth === today.getMonth() && 
                      currentYear === today.getFullYear();
      days.push(
        <td 
          key={`day-${i}`} 
          className={`py-1 px-1 text-center cursor-pointer text-sm ${
            isToday ? 'font-bold' : ''
          } ${
            isSelected ? 'bg-[#22C55E] text-white rounded-full' : 'hover:bg-gray-100'
          }`}
          onClick={() => handleDateSelect(i)}
        >
          {i}
        </td>
      );
    }
    
    // Split days into weeks
    const weeks = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }
    
    return weeks;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    
    // Here you would typically send the data to your backend
    console.log({
      moduleCode,
      lecturerId,
      date: selectedDate ? `${currentYear}-${currentMonth + 1}-${selectedDate}` : '',
      startTime,
      endTime,
      location
    });
    
    // Close the modal
    setShowAddLectureModal(false);
    
    // Show success notification
    setShowSuccessNotification(true);
    
    // Reset form
    setModuleCode('');
    setLecturerId('');
    setSelectedDate(null);
    setStartTime('');
    setEndTime('');
    setLocation('');
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowAddLectureModal(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Set today's date as default
  useEffect(() => {
    if (showAddLectureModal) {
      setSelectedDate(currentDay);
      setCurrentMonth(today.getMonth());
      setCurrentYear(today.getFullYear());
    }
  }, [showAddLectureModal, currentDay, today]);

  return (
    <div className="flex flex-col h-screen bg-[#E5E7EB] font-montserrat">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 w-80 h-full">
        <Sidebar />
      </div>

      {/* Main content area */}
      <div className="ml-80 flex-1 flex flex-col overflow-hidden">
        {/* Top Panel */}
        <TopPanel />

        {/* Success Notification */}
        <SuccessNotification 
          isVisible={showSuccessNotification} 
          onClose={() => setShowSuccessNotification(false)} 
        />

        {/* Main content with #E5E7EB background */}
        <main className="flex-1 overflow-auto bg-[#E5E7EB]">
          <div className="px-6 pt-4">
            {/* Add Lecture Button - Reduced size */}
            <div className="flex justify-end mb-6">
              <button 
                onClick={() => setShowAddLectureModal(true)}
                className="bg-[#22C55E] hover:bg-white text-white hover:text-[#22C55E] font-semibold px-4 py-2 text-base border-2 border-[#22C55E] transition-colors duration-300"
              >
                + ADD LECTURE
              </button>
            </div>
            
            {/* Tabs container */}
            <div className="bg-white px-6 -mx-6 pb-2 h-20 flex items-center">
              <div className="flex relative w-full">
                <button
                  className={`flex items-center justify-center px-6 py-6 text-lg font-semibold flex-1 ${
                    activeTab === 'past' ? 'text-black' : 'text-gray-500'
                  }`}
                  onClick={() => setActiveTab('past')}
                >
                  <img src={pastLecturesIcon} alt="Past Lectures" className="w-5 h-5 mr-2" />
                  PAST LECTURES
                </button>
                {/* Vertical divider */}
                <div className="border-r border-gray-300 h-12 my-auto"></div>
                <button
                  className={`flex items-center justify-center px-6 py-6 text-lg font-semibold flex-1 ${
                    activeTab === 'scheduled' ? 'text-black' : 'text-gray-500'
                  }`}
                  onClick={() => setActiveTab('scheduled')}
                >
                  <img src={scheduledLecturesIcon} alt="Scheduled Lectures" className="w-5 h-5 mr-2" />
                  SCHEDULED LECTURES
                </button>
                {/* Green underline for active tab */}
                <div 
                  className={`absolute bottom-0 h-1.5 bg-[#22C55E] transition-all duration-300 ${
                    activeTab === 'past' ? 'left-0 right-1/2' : 'left-1/2 right-0'
                  }`}
                ></div>
              </div>
            </div>

            {/* Search Bar - Reduced size */}
            <div className="flex items-center gap-2 mb-4 mt-6 w-1/2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search by module code/lecturer ID"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-full p-2 pr-8 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#22C55E] bg-white text-sm placeholder-italic placeholder-[#E5E7EB]"
                />
                <img 
                  src={searchIcon} 
                  alt="Search" 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4" 
                />
              </div>
              <button 
                onClick={handleSearch}
                className="px-3 py-2 bg-[#22C55E] hover:bg-white text-white hover:text-[#22C55E] rounded border-2 border-[#22C55E] text-sm transition-colors duration-300"
              >
                SEARCH
              </button>
            </div>

            {/* Table with white background */}
            <div className="bg-white shadow rounded p-4 overflow-auto border border-gray-200 mt-2">
              <table className="w-full table-auto">
                <thead className="text-left">
                  <tr className="text-base uppercase border-b-2 text-[#22C55E]">
                    <th className="py-2 font-normal text-center">Module Code</th>
                    <th className="font-normal text-center">Lecturer ID</th>
                    <th className="font-normal text-center">Date</th>
                    <th className="font-normal text-center">Start Time</th>
                    <th className="font-normal text-center">End Time</th>
                    <th className="font-normal text-center">Location</th>
                    <th className="font-normal text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLectures.map((lec, index) => (
                    <tr key={index} className="border-b text-gray-800">
                      <td className="py-3 text-center text-sm">{lec.module}</td>
                      <td className="text-center text-sm">{lec.lecturer}</td>
                      <td className="text-center text-sm">{lec.date}</td>
                      <td className="text-center text-sm">{lec.start}</td>
                      <td className="text-center text-sm">{lec.end}</td>
                      <td className="text-center text-sm">{lec.location}</td>
                      <td className="text-center">
                        <button className="bg-[#FACC15] hover:bg-white text-white hover:text-[#FACC15] px-3 py-1 rounded border-2 border-[#FACC15] transition-colors duration-300 text-sm">
                          VIEW ATTENDANCE
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>

        {/* Footer */}
        <Footer />

        {/* Add Lecture Modal */}
        {showAddLectureModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50 pt-16">
            <div 
              ref={modalRef}
              className="bg-white w-full max-w-md h-[calc(100%-32px)] flex flex-col border-l-2 border-[#22C55E]"
              style={{ borderRadius: '0' }}
            >
              {/* Header with close button */}
              <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-[#1E1E1E]">Add Lecture</h2>
                <button 
                  onClick={() => setShowAddLectureModal(false)}
                  className="text-black hover:text-gray-700 text-3xl font-bold px-2"
                >
                  ×
                </button>
              </div>

              {/* Scrollable form content */}
              <div className="overflow-y-auto flex-grow p-4">
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    {/* Module Code Dropdown */}
                    <div>
                      <label className="block text-sm font-medium text-[#22C55E] mb-1">Module Code</label>
                      <div className="relative">
                        <select
                          value={moduleCode}
                          onChange={(e) => setModuleCode(e.target.value)}
                          className="w-full p-2 border-2 border-[#22C55E] rounded focus:outline-none focus:ring-2 focus:ring-[#22C55E] bg-white appearance-none hover:border-[#22C55E]"
                          required
                        >
                          <option value="">Select Module Code</option>
                          {moduleCodes.map((code) => (
                            <option key={code} value={code} className="hover:bg-[#22C55E] hover:text-white">{code}</option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#22C55E]">
                          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Lecturer ID Dropdown */}
                    <div>
                      <label className="block text-sm font-medium text-[#22C55E] mb-1">Lecturer ID</label>
                      <div className="relative">
                        <select
                          value={lecturerId}
                          onChange={(e) => setLecturerId(e.target.value)}
                          className="w-full p-2 border-2 border-[#22C55E] rounded focus:outline-none focus:ring-2 focus:ring-[#22C55E] bg-white appearance-none hover:border-[#22C55E]"
                          required
                        >
                          <option value="">Select Lecturer ID</option>
                          {lecturerIds.map((id) => (
                            <option key={id} value={id} className="hover:bg-[#22C55E] hover:text-white">{id}</option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#22C55E]">
                          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Date Picker */}
                    <div>
                      <label className="block text-sm font-medium text-[#22C55E] mb-1">Date</label>
                      <div className="border-2 border-[#22C55E] p-2">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium text-sm">
                            {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} {currentYear}
                          </span>
                          <div className="flex space-x-2">
                            <button 
                              type="button" 
                              onClick={() => changeMonth(-1)}
                              className="p-1 hover:bg-gray-100 rounded text-[#22C55E] text-sm"
                            >
                              &lt;
                            </button>
                            <button 
                              type="button" 
                              onClick={() => changeMonth(1)}
                              className="p-1 hover:bg-gray-100 rounded text-[#22C55E] text-sm"
                            >
                              &gt;
                            </button>
                          </div>
                        </div>
                        <table className="w-full">
                          <thead>
                            <tr className="text-[#22C55E] text-xs">
                              <th className="py-1">S</th>
                              <th className="py-1">M</th>
                              <th className="py-1">T</th>
                              <th className="py-1">W</th>
                              <th className="py-1">T</th>
                              <th className="py-1">F</th>
                              <th className="py-1">S</th>
                            </tr>
                          </thead>
                          <tbody>
                            {renderCalendar().map((week, index) => (
                              <tr key={`week-${index}`}>
                                {week}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Start Time Dropdown */}
                    <div>
                      <label className="block text-sm font-medium text-[#22C55E] mb-1">Start Time</label>
                      <div className="relative">
                        <select
                          value={startTime}
                          onChange={(e) => setStartTime(e.target.value)}
                          className="w-full p-2 border-2 border-[#22C55E] rounded focus:outline-none focus:ring-2 focus:ring-[#22C55E] bg-white appearance-none hover:border-[#22C55E]"
                          required
                        >
                          <option value="">Select Start Time</option>
                          {timeSlots.map((time) => (
                            <option key={`start-${time}`} value={time} className="hover:bg-[#22C55E] hover:text-white">{time}</option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#22C55E]">
                          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* End Time Dropdown */}
                    <div>
                      <label className="block text-sm font-medium text-[#22C55E] mb-1">End Time</label>
                      <div className="relative">
                        <select
                          value={endTime}
                          onChange={(e) => setEndTime(e.target.value)}
                          className="w-full p-2 border-2 border-[#22C55E] rounded focus:outline-none focus:ring-2 focus:ring-[#22C55E] bg-white appearance-none hover:border-[#22C55E]"
                          required
                        >
                          <option value="">Select End Time</option>
                          {timeSlots.map((time) => (
                            <option key={`end-${time}`} value={time} className="hover:bg-[#22C55E] hover:text-white">{time}</option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#22C55E]">
                          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Location Dropdown */}
                    <div>
                      <label className="block text-sm font-medium text-[#22C55E] mb-1">Location</label>
                      <div className="relative">
                        <select
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          className="w-full p-2 border-2 border-[#22C55E] rounded focus:outline-none focus:ring-2 focus:ring-[#22C55E] bg-white appearance-none hover:border-[#22C55E]"
                          required
                        >
                          <option value="">Select Location</option>
                          {locations.map((loc) => (
                            <option key={loc} value={loc} className="hover:bg-[#22C55E] hover:text-white">{loc}</option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#22C55E]">
                          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              {/* Buttons at bottom */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex justify-start space-x-3">
                  <button 
                    type="submit"
                    onClick={handleSubmit}
                    disabled={!isFormValid}
                    className={`px-4 py-2 text-white rounded border-2 border-[#22C55E] transition-colors duration-300 ${
                      isFormValid 
                        ? 'bg-[#22C55E] hover:bg-white hover:text-[#22C55E]'
                        : 'bg-[#22C55E] cursor-not-allowed'
                    }`}
                  >
                    Save
                  </button>
                  <button 
                    type="button"
                    onClick={() => setShowAddLectureModal(false)}
                    className="px-4 py-2 bg-[#22C55E] text-white rounded hover:bg-white hover:text-[#22C55E] hover:border-2 hover:border-[#22C55E] border-2 border-[#22C55E] transition-colors duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}