import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
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

const SuccessNotification = ({ isVisible, onClose, message, children }) => {
  if (!isVisible) return null;
  
  return (
    <div className="fixed inset-x-0 top-[152px] flex justify-center items-center z-50 px-4">
      <div className="bg-white rounded-lg shadow-lg flex flex-col max-w-md border-l-4 border-[#22C55E] animate-fadeIn">
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
        
        <div className="p-6 flex items-center">
          <img src={saveSuccessfulIcon} alt="Success" className="w-10 h-10 mr-3" />
          <div>
            <h3 className="font-semibold text-gray-800 text-lg">Save Successful!</h3>
            <p className="text-gray-600 text-sm">{message}</p>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

const DeleteConfirmation = ({ isVisible, onConfirm, onCancel }) => {
  if (!isVisible) return null;
  
  return (
    <div className="fixed inset-x-0 top-[152px] flex justify-center items-center z-50 px-4">
      <div className="bg-white rounded-lg shadow-lg flex flex-col max-w-md w-96 border-l-4 border-[#22C55E] animate-fadeIn">
        <div className="p-6">
          <p className="text-gray-600 text-sm mb-6 text-center">Are you sure you want to delete this item?</p>
          <div className="flex justify-center space-x-4">
            <button 
              onClick={onCancel}
              className="px-6 py-2 bg-[#22C55E] text-white rounded hover:bg-white hover:text-[#22C55E] border-2 border-[#22C55E] transition-colors duration-300"
            >
              No
            </button>
            <button 
              onClick={onConfirm}
              className="px-6 py-2 bg-[#22C55E] text-white rounded hover:bg-white hover:text-[#22C55E] border-2 border-[#22C55E] transition-colors duration-300"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const pastLecturesData = [
  { id: 1, module: 'CS2020', lecturer: 'LEC102', date: '2025-04-15', start: '09:00 AM', end: '10:30 AM', location: 'NB-202' },
  { id: 2, module: 'SE2035', lecturer: 'LEC109', date: '2025-04-16', start: '01:00 PM', end: '02:30 PM', location: 'NB-304' },
  { id: 3, module: 'IT2011', lecturer: 'LEC101', date: '2025-04-17', start: '11:00 AM', end: '12:00 PM', location: 'NB-110' },
  { id: 4, module: 'CS2020', lecturer: 'LEC102', date: '2025-04-18', start: '09:00 AM', end: '10:30 AM', location: 'NB-202' },
];

const scheduledLecturesData = [
  { id: 5, module: 'CS2020', lecturer: 'LEC102', date: '2025-04-15', start: '09:00 AM', end: '10:30 AM', location: 'NB-202' },
  { id: 6, module: 'SE2035', lecturer: 'LEC109', date: '2025-04-16', start: '01:00 PM', end: '02:30 PM', location: 'NB-304' },
  { id: 7, module: 'IT2011', lecturer: 'LEC101', date: '2025-04-17', start: '11:00 AM', end: '12:00 PM', location: 'NB-110' },
  { id: 8, module: 'CS2020', lecturer: 'LEC102', date: '2025-04-18', start: '09:00 AM', end: '10:30 AM', location: 'NB-202' },
];

export default function LecturesPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('past');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredLectures, setFilteredLectures] = useState(pastLecturesData);
  const [showLectureModal, setShowLectureModal] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [selectedDate, setSelectedDate] = useState(null);
  const [moduleCode, setModuleCode] = useState('');
  const [lecturerId, setLecturerId] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [lectureToDelete, setLectureToDelete] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [noResultsFound, setNoResultsFound] = useState(false);
  const [currentLectureId, setCurrentLectureId] = useState(null);
  const modalRef = useRef(null);

  const [today, setToday] = useState(new Date());
  const currentDay = today.getDate();

  // Update today's date daily
  useEffect(() => {
    const updateToday = () => {
      const now = new Date();
      if (now.getDate() !== today.getDate() || 
          now.getMonth() !== today.getMonth() || 
          now.getFullYear() !== today.getFullYear()) {
        setToday(now);
      }
    };

    // Update at midnight
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    const timeUntilMidnight = midnight.getTime() - new Date().getTime();

    const timeoutId = setTimeout(() => {
      updateToday();
      // Then update every 24 hours
      setInterval(updateToday, 24 * 60 * 60 * 1000);
    }, timeUntilMidnight);

    return () => clearTimeout(timeoutId);
  }, [today]);

  const moduleCodes = ['CS2020', 'SE2035', 'IT2011', 'CS2025', 'SE2040', 'IT2015'];
  const lecturerIds = ['LEC101', 'LEC102', 'LEC103', 'LEC104', 'LEC105'];
  const locations = ['NB-202', 'NB-304', 'NB-110', 'NB-205'];
  const timeSlots = [
    '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', 
    '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', 
    '04:00 PM', '05:00 PM'
  ];

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

  useEffect(() => {
    setFilteredLectures(activeTab === 'past' ? pastLecturesData : scheduledLecturesData);
  }, [activeTab]);

  const handleSearch = () => {
    const dataToSearch = activeTab === 'past' ? pastLecturesData : scheduledLecturesData;
    
    if (searchQuery.trim() === '') {
      setFilteredLectures(dataToSearch);
      setNoResultsFound(false);
    } else {
      const filtered = dataToSearch.filter(lecture => 
        lecture.module.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lecture.lecturer.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      if (filtered.length === 0) {
        setNoResultsFound(true);
        setFilteredLectures([]);
      } else {
        setNoResultsFound(false);
        setFilteredLectures(filtered);
      }
    }
  };

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredLectures(activeTab === 'past' ? pastLecturesData : scheduledLecturesData);
      setNoResultsFound(false);
    }
  }, [searchQuery, activeTab]);

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
    
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<td key={`empty-${i}`} className="py-1 px-1"></td>);
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      const isSelected = selectedDate === i && 
                         currentMonth === today.getMonth() && 
                         currentYear === today.getFullYear();
      const isToday = i === today.getDate() && 
                      currentMonth === today.getMonth() && 
                      currentYear === today.getFullYear();
      days.push(
        <td 
          key={`day-${i}`} 
          className={`py-1 px-1 text-center cursor-pointer text-sm ${
            isToday ? 'font-bold bg-[#22C55E] text-white rounded-full' : ''
          } ${
            isSelected ? 'bg-[#3B82F6] text-white rounded-full' : 'hover:bg-gray-100'
          }`}
          onClick={() => handleDateSelect(i)}
        >
          {i}
        </td>
      );
    }
    
    const weeks = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }
    
    return weeks;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    
    if (modalType === 'add') {
      const newLecture = {
        id: scheduledLecturesData.length + 1,
        module: moduleCode,
        lecturer: lecturerId,
        date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(selectedDate).padStart(2, '0')}`,
        start: startTime,
        end: endTime,
        location: location
      };
      
      scheduledLecturesData.unshift(newLecture);
      if (activeTab === 'scheduled') {
        setFilteredLectures([newLecture, ...filteredLectures]);
      }
      setNotificationMessage('The lecture has been added successfully.');
      setShowSuccessNotification(true);
    } else {
      // Update existing lecture
      const lectureIndex = scheduledLecturesData.findIndex(lec => lec.id === currentLectureId);
      if (lectureIndex !== -1) {
        scheduledLecturesData[lectureIndex] = {
          ...scheduledLecturesData[lectureIndex],
          module: moduleCode,
          lecturer: lecturerId,
          date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(selectedDate).padStart(2, '0')}`,
          start: startTime,
          end: endTime,
          location: location
        };
        
        if (activeTab === 'scheduled') {
          setFilteredLectures([...scheduledLecturesData]);
        }
        setNotificationMessage('The lecture has been updated successfully.');
        setShowSuccessNotification(true);
      }
    }
    
    setShowLectureModal(false);
    
    setModuleCode('');
    setLecturerId('');
    setSelectedDate(null);
    setStartTime('');
    setEndTime('');
    setLocation('');
    setCurrentLectureId(null);
  };

  const handleEditLecture = (lectureId) => {
    const lectureToEdit = scheduledLecturesData.find(lec => lec.id === lectureId);
    if (lectureToEdit) {
      const dateParts = lectureToEdit.date.split('-');
      const year = parseInt(dateParts[0]);
      const month = parseInt(dateParts[1]) - 1;
      const day = parseInt(dateParts[2]);
      
      setModuleCode(lectureToEdit.module);
      setLecturerId(lectureToEdit.lecturer);
      setSelectedDate(day);
      setCurrentMonth(month);
      setCurrentYear(year);
      setStartTime(lectureToEdit.start);
      setEndTime(lectureToEdit.end);
      setLocation(lectureToEdit.location);
      setCurrentLectureId(lectureId);
      setModalType('edit');
      setShowLectureModal(true);
    }
  };

  const handleDeleteClick = (lectureId) => {
    setLectureToDelete(lectureId);
    setShowDeleteConfirmation(true);
  };

  const handleDeleteConfirm = () => {
    const index = scheduledLecturesData.findIndex(lec => lec.id === lectureToDelete);
    if (index !== -1) {
      scheduledLecturesData.splice(index, 1);
      setFilteredLectures(scheduledLecturesData.filter(lec => lec.id !== lectureToDelete));
    }
    setShowDeleteConfirmation(false);
    setLectureToDelete(null);
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirmation(false);
    setLectureToDelete(null);
  };

  const handleAddLecture = () => {
    setModalType('add');
    setShowLectureModal(true);
    setSelectedDate(today.getDate());
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowLectureModal(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-[#E5E7EB] font-montserrat">
      <div className="fixed left-0 top-0 w-80 h-full">
        <Sidebar />
      </div>

      <div className="ml-80 flex-1 flex flex-col overflow-hidden">
        <TopPanel />

        <SuccessNotification 
          isVisible={showSuccessNotification} 
          onClose={() => setShowSuccessNotification(false)}
          message={notificationMessage}
        />

        <DeleteConfirmation
          isVisible={showDeleteConfirmation}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />

        <main className="flex-1 overflow-auto bg-[#E5E7EB]">
          <div className="px-6 pt-4">
            <div className="flex justify-end mb-6">
              <button 
                onClick={handleAddLecture}
                className="bg-[#22C55E] hover:bg-white text-white hover:text-[#22C55E] font-semibold px-4 py-2 text-base border-2 border-[#22C55E] transition-colors duration-300"
              >
                + ADD LECTURE
              </button>
            </div>
            
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
                <div 
                  className={`absolute bottom-0 h-1.5 bg-[#22C55E] transition-all duration-300 ${
                    activeTab === 'past' ? 'left-0 right-1/2' : 'left-1/2 right-0'
                  }`}
                ></div>
              </div>
            </div>

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
                    <th className="font-normal text-center"></th>
                  </tr>
                </thead>
                <tbody>
                  {noResultsFound ? (
                    <tr>
                      <td colSpan="7" className="py-6 text-center text-gray-500">
                        No results found
                      </td>
                    </tr>
                  ) : (
                    filteredLectures.map((lec) => (
                      <tr key={lec.id} className="border-b text-gray-800">
                        <td className="py-3 text-center text-sm">{lec.module}</td>
                        <td className="text-center text-sm">{lec.lecturer}</td>
                        <td className="text-center text-sm">{lec.date}</td>
                        <td className="text-center text-sm">{lec.start}</td>
                        <td className="text-center text-sm">{lec.end}</td>
                        <td className="text-center text-sm">{lec.location}</td>
                        <td className="text-center space-x-2">
                          {activeTab === 'past' ? (
                            <button 
                              onClick={() => navigate(`/attendance/${lec.id}`)}
                              className="bg-[#FACC15] hover:bg-white text-white hover:text-[#FACC15] px-4 py-1 rounded border-2 border-[#FACC15] transition-colors duration-300 text-sm"
                            >
                              VIEW ATTENDANCE
                            </button>
                          ) : (
                            <>
                              <button 
                                onClick={() => handleEditLecture(lec.id)}
                                className="bg-[#3B82F6] hover:bg-white text-white hover:text-[#3B82F6] px-4 py-1 rounded border-2 border-[#3B82F6] transition-colors duration-300 text-sm"
                              >
                                EDIT
                              </button>
                              <button 
                                onClick={() => handleDeleteClick(lec.id)}
                                className="bg-[#EF4444] hover:bg-white text-white hover:text-[#EF4444] px-4 py-1 rounded border-2 border-[#EF4444] transition-colors duration-300 text-sm"
                              >
                                DELETE
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>

        <Footer />

        {showLectureModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50 pt-16">
            <div 
              ref={modalRef}
              className="bg-white w-full max-w-md h-[calc(100%-32px)] flex flex-col border-l-2 border-[#22C55E]"
              style={{ borderRadius: '0' }}
            >
              <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-[#1E1E1E]">
                  {modalType === 'add' ? 'Add Lecture' : 'Edit Lecture'}
                </h2>
                <button 
                  onClick={() => setShowLectureModal(false)}
                  className="text-black hover:text-gray-700 text-3xl font-bold px-2"
                >
                  ×
                </button>
              </div>

              <div className="overflow-y-auto flex-grow p-4">
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
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
                    SAVE
                  </button>
                  <button 
                    type="button"
                    onClick={() => setShowLectureModal(false)}
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