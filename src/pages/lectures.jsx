import React, { useState, useRef, useEffect } from 'react';
import profileIcon from '../images/profile.png';
import logoutIcon from '../images/logOut.png';
import pastLecturesIcon from '../images/pastLectures.png';
import scheduledLecturesIcon from '../images/scheduledLectures.png';
import searchIcon from '../images/search.png';
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

const lecturesData = [
  { module: 'CS2020', lecturer: 'LEC102', date: '2025-04-15', start: '09:00 AM', end: '10:30 AM', location: 'NB-202' },
  { module: 'SE2035', lecturer: 'LEC109', date: '2025-04-16', start: '01:00 PM', end: '02:30 PM', location: 'NB-304' },
  { module: 'IT2011', lecturer: 'LEC101', date: '2025-04-17', start: '11:00 AM', end: '12:00 PM', location: 'NB-110' },
  { module: 'CS2020', lecturer: 'LEC102', date: '2025-04-18', start: '09:00 AM', end: '10:30 AM', location: 'NB-202' },
];

export default function LecturesPage() {
  const [activeTab, setActiveTab] = useState('past');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddLectureModal, setShowAddLectureModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [moduleCode, setModuleCode] = useState('');
  const [lecturerId, setLecturerId] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('');

  // Sample data for dropdowns
  const moduleCodes = ['CS2020', 'SE2035', 'IT2011', 'CS2025'];
  const lecturerIds = ['LEC101', 'LEC102', 'LEC103', 'LEC104'];
  const locations = ['NB-202', 'NB-304', 'NB-110', 'NB-205'];
  const timeSlots = [
    '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', 
    '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', 
    '04:00 PM', '05:00 PM'
  ];

  const filteredLectures = lecturesData.filter(
    (lec) =>
      lec.module.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lec.lecturer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      return lecturesData;
    } else {
      return lecturesData.filter(lecture => 
        lecture.module.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lecture.lecturer.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const renderCalendar = () => {
    const days = [];
    const daysInMonth = 30;
    const startDay = 3; // April 2025 starts on Wednesday
    
    // Empty cells for days before the start of the month
    for (let i = 0; i < startDay; i++) {
      days.push(<td key={`empty-${i}`} className="py-2 px-1"></td>);
    }
    
    // Days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const isSelected = selectedDate === i;
      days.push(
        <td 
          key={`day-${i}`} 
          className={`py-2 px-1 text-center cursor-pointer ${isSelected ? 'bg-[#22C55E] text-white rounded-full' : 'hover:bg-gray-100'}`}
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
    // Here you would typically send the data to your backend
    console.log({
      moduleCode,
      lecturerId,
      date: selectedDate ? `2025-04-${selectedDate}` : '',
      startTime,
      endTime,
      location
    });
    setShowAddLectureModal(false);
    // Reset form
    setModuleCode('');
    setLecturerId('');
    setSelectedDate(null);
    setStartTime('');
    setEndTime('');
    setLocation('');
  };

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

        {/* Main content with #E5E7EB background */}
        <main className="flex-1 overflow-auto bg-[#E5E7EB]">
          <div className="px-6 pt-6">
            {/* Add Lecture Button positioned at top right */}
            <div className="flex justify-end mb-8">
              <button 
                onClick={() => setShowAddLectureModal(true)}
                className="bg-[#22C55E] hover:bg-white text-white hover:text-[#22C55E] font-semibold px-6 py-3 rounded-lg shadow text-lg border-2 border-[#22C55E] transition-colors duration-300"
              >
                + ADD LECTURE
              </button>
            </div>
            
            {/* Tabs container */}
            <div className="bg-white px-6 -mx-6 pb-2 h-24 flex items-center">
              <div className="flex relative w-full">
                <button
                  className={`flex items-center justify-center px-8 py-8 text-xl font-semibold flex-1 ${
                    activeTab === 'past' ? 'text-black' : 'text-gray-500'
                  }`}
                  onClick={() => setActiveTab('past')}
                >
                  <img src={pastLecturesIcon} alt="Past Lectures" className="w-6 h-6 mr-3" />
                  PAST LECTURES
                </button>
                {/* Vertical divider */}
                <div className="border-r border-gray-300 h-16 my-auto"></div>
                <button
                  className={`flex items-center justify-center px-8 py-8 text-xl font-semibold flex-1 ${
                    activeTab === 'scheduled' ? 'text-black' : 'text-gray-500'
                  }`}
                  onClick={() => setActiveTab('scheduled')}
                >
                  <img src={scheduledLecturesIcon} alt="Scheduled Lectures" className="w-6 h-6 mr-3" />
                  SCHEDULED LECTURES
                </button>
                {/* Green underline for active tab */}
                <div 
                  className={`absolute bottom-0 h-2 bg-[#22C55E] transition-all duration-300 ${
                    activeTab === 'past' ? 'left-0 right-1/2' : 'left-1/2 right-0'
                  }`}
                ></div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex items-center gap-3 mb-6 mt-8 w-1/2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search by module code/lecturer ID"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4C1D95] bg-white text-base placeholder-italic placeholder-[#E5E7EB]"
                />
                <img 
                  src={searchIcon} 
                  alt="Search" 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5" 
                />
              </div>
              <button 
                onClick={handleSearch}
                className="px-5 py-3 bg-[#22C55E] hover:bg-white text-white hover:text-[#22C55E] rounded-lg border-2 border-[#22C55E] text-lg transition-colors duration-300"
              >
                SEARCH
              </button>
            </div>

            {/* Table with white background */}
            <div className="bg-white shadow rounded-lg p-5 overflow-auto border border-gray-200 mt-4">
              <table className="w-full table-auto">
                <thead className="text-left">
                  <tr className="text-lg uppercase border-b-2 text-[#22C55E]">
                    <th className="py-3 font-normal text-center">Module Code</th>
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
                      <td className="py-4 text-center text-base">{lec.module}</td>
                      <td className="text-center text-base">{lec.lecturer}</td>
                      <td className="text-center text-base">{lec.date}</td>
                      <td className="text-center text-base">{lec.start}</td>
                      <td className="text-center text-base">{lec.end}</td>
                      <td className="text-center text-base">{lec.location}</td>
                      <td className="text-center">
                        <button className="bg-[#FACC15] hover:bg-white text-white hover:text-[#FACC15] px-4 py-1.5 rounded-lg border-2 border-[#FACC15] transition-colors duration-300 text-base">
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

        {/* Add Lecture Modal - Right Aligned */}
        {showAddLectureModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-end z-50">
            <div className="bg-white rounded-l-lg p-6 w-full max-w-md h-full">
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold text-[#1E1E1E]">Add Lecture</h2>
                </div>

                {/* Form Content */}
                <form onSubmit={handleSubmit} className="flex-grow">
                  <div className="space-y-6">
                    {/* Module Code Dropdown */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Module Code</label>
                      <select
                        value={moduleCode}
                        onChange={(e) => setModuleCode(e.target.value)}
                        className="w-full p-2 border border-[#22C55E] rounded focus:outline-none focus:ring-2 focus:ring-[#22C55E]"
                        required
                      >
                        <option value="">Select Module Code</option>
                        {moduleCodes.map((code) => (
                          <option key={code} value={code}>{code}</option>
                        ))}
                      </select>
                    </div>

                    {/* Lecturer ID Dropdown */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Lecturer ID</label>
                      <select
                        value={lecturerId}
                        onChange={(e) => setLecturerId(e.target.value)}
                        className="w-full p-2 border border-[#22C55E] rounded focus:outline-none focus:ring-2 focus:ring-[#22C55E]"
                        required
                      >
                        <option value="">Select Lecturer ID</option>
                        {lecturerIds.map((id) => (
                          <option key={id} value={id}>{id}</option>
                        ))}
                      </select>
                    </div>

                    {/* Date Picker */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                      <div className="border border-[#22C55E] rounded-lg p-3">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">April 2025</span>
                          <div className="flex space-x-2">
                            <button type="button" className="p-1 hover:bg-gray-100 rounded text-[#22C55E]">
                              &lt;
                            </button>
                            <button type="button" className="p-1 hover:bg-gray-100 rounded text-[#22C55E]">
                              &gt;
                            </button>
                          </div>
                        </div>
                        <table className="w-full">
                          <thead>
                            <tr className="text-[#22C55E] text-sm">
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
                      <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                      <select
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="w-full p-2 border border-[#22C55E] rounded focus:outline-none focus:ring-2 focus:ring-[#22C55E]"
                        required
                      >
                        <option value="">Select Start Time</option>
                        {timeSlots.map((time) => (
                          <option key={`start-${time}`} value={time}>{time}</option>
                        ))}
                      </select>
                    </div>

                    {/* End Time Dropdown */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                      <select
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        className="w-full p-2 border border-[#22C55E] rounded focus:outline-none focus:ring-2 focus:ring-[#22C55E]"
                        required
                      >
                        <option value="">Select End Time</option>
                        {timeSlots.map((time) => (
                          <option key={`end-${time}`} value={time}>{time}</option>
                        ))}
                      </select>
                    </div>

                    {/* Location Dropdown */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                      <select
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full p-2 border border-[#22C55E] rounded focus:outline-none focus:ring-2 focus:ring-[#22C55E]"
                        required
                      >
                        <option value="">Select Location</option>
                        {locations.map((loc) => (
                          <option key={loc} value={loc}>{loc}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Buttons at bottom left */}
                  <div className="flex justify-start space-x-3 pt-8 mt-auto">
                    <button 
                      type="button"
                      onClick={() => setShowAddLectureModal(false)}
                      className="px-6 py-2 border border-[#22C55E] text-[#22C55E] rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="px-6 py-2 bg-[#22C55E] text-white rounded-lg hover:bg-[#1EAE50] transition-colors"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}