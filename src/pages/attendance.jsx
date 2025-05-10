import { useState, useRef, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import searchIcon from '../images/search.png';
import profileIcon from '../images/profile.png';
import logoutIcon from '../images/logOut.png';
import saveSuccessfulIcon from '../images/saveSuccessful.png';

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

const SaveSuccessNotification = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-96 relative">
        <div className="p-4 border-b border-[#D4D4D4] flex justify-end">
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-3xl font-bold"
          >
            ×
          </button>
        </div>
        
        <div className="p-6 flex items-center justify-center space-x-4">
          <img src={saveSuccessfulIcon} alt="Success" className="w-10 h-10" />
          <span className="text-lg text-[#013024]">Save Successful</span>
        </div>
      </div>
    </div>
  );
};

const OverrideAttendanceModal = ({ student, onClose, onSave }) => {
  const [status, setStatus] = useState(student.attendanceStatus);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = () => {
    onSave(status);
    setShowSuccess(true);
  };

  const handleNotificationClose = () => {
    setShowSuccess(false);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 z-40 flex justify-end font-montserrat">
        <div className="bg-black bg-opacity-50 absolute inset-0" onClick={onClose}></div>
        <div className="bg-white w-full max-w-md h-[calc(100vh-64px)] mt-16 relative flex flex-col">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-[#1E1E1E]">Override Attendance</h2>
            <button 
              onClick={onClose}
              className="text-black hover:text-gray-700 text-2xl font-bold"
            >
              ×
            </button>
          </div>
          
          <div className="p-6 space-y-6 flex-1">
            <div>
              <label className="block text-sm font-medium text-[#22C55E] mb-1">Student ID</label>
              <div className="p-2 bg-gray-100 rounded text-gray-900">{student.studentId}</div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[#22C55E] mb-1">Attendance Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full p-2 border border-[#22C55E] rounded focus:outline-none focus:ring-1 focus:ring-[#22C55E]"
              >
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
              </select>
            </div>
          </div>
          
          <div className="p-6 border-t border-gray-200 flex justify-start space-x-3">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-[#22C55E] text-white rounded-md border border-[#22C55E] hover:bg-white hover:text-[#22C55E] transition-colors duration-200"
            >
              SAVE
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#22C55E] text-white rounded-md border border-[#22C55E] hover:bg-white hover:text-[#22C55E] transition-colors duration-200"
            >
              CANCEL
            </button>
          </div>
        </div>
      </div>

      {showSuccess && <SaveSuccessNotification onClose={handleNotificationClose} />}
    </>
  );
};

export default function AttendancePage() {
  const { lectureId } = useParams();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [showOverrideModal, setShowOverrideModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  
  const [filteredData, setFilteredData] = useState([
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
  ]);

  const lectureDetails = {
    1: { module: 'CS2020', lecturer: 'LEC102', date: '2025-04-15', start: '09:00 AM', end: '10:30 AM', location: 'NB-202' },
    2: { module: 'SE2035', lecturer: 'LEC109', date: '2025-04-16', start: '01:00 PM', end: '02:30 PM', location: 'NB-304' },
    3: { module: 'IT2011', lecturer: 'LEC101', date: '2025-04-17', start: '11:00 AM', end: '12:00 PM', location: 'NB-110' },
    4: { module: 'CS2020', lecturer: 'LEC102', date: '2025-04-18', start: '09:00 AM', end: '10:30 AM', location: 'NB-202' },
  };

  useEffect(() => {
    if (location.state?.showOverrideModal && location.state?.student) {
      setSelectedStudent(location.state.student);
      setShowOverrideModal(true);
      // Clear the state to prevent the modal from showing again on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const currentLecture = lectureDetails[lectureId] || lectureDetails[1];

  const handleSearch = () => {
    setHasSearched(true);
    
    if (!searchQuery.trim()) {
      setFilteredData([
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
      ]);
      return;
    }
    
    const results = filteredData.filter(student => 
      student.studentId.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setFilteredData(results);
  };

  const handleEditClick = (student) => {
    // Store the student data and lectureId in sessionStorage
    sessionStorage.setItem('overrideStudent', JSON.stringify(student));
    sessionStorage.setItem('lectureId', lectureId);
    
    // Redirect to reauthentication page
    window.location.href = '/reauthentication';
  };

  const handleSaveOverride = (newStatus) => {
    setFilteredData(prevData =>
      prevData.map(student =>
        student.studentId === selectedStudent.studentId
          ? { ...student, attendanceStatus: newStatus }
          : student
      )
    );
  };

  return (
    <div className="flex h-screen bg-[#E5E7EB] font-montserrat">
      <div className="w-80 bg-gray-800">
        <Sidebar />
      </div>
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-none">
          <TopPanel />
        </div>
        
        <div className="flex-none bg-[#FACC15] py-5">
          <h1 className="text-center text-xl font-bold text-white">ATTENDANCE</h1>
        </div>
        
        <div className="flex-1 overflow-y-auto flex flex-col">
          <section className="px-10 py-4 bg-white">
            <div className="grid grid-cols-2 gap-x-10 gap-y-2">
              <div className="space-y-2">
                <div className="flex gap-2 items-center">
                  <span className="font-medium text-gray-600 whitespace-nowrap">Module Code:</span>
                  <span className="text-[#1E1E1E]">{currentLecture.module}</span>
                </div>
                <div className="flex gap-2 items-center">
                  <span className="font-medium text-gray-600 whitespace-nowrap">Lecture ID:</span>
                  <span className="text-[#1E1E1E]">{currentLecture.lecturer}</span>
                </div>
                <div className="flex gap-2 items-center">
                  <span className="font-medium text-gray-600 whitespace-nowrap">Date:</span>
                  <span className="text-[#1E1E1E]">{currentLecture.date}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex gap-2 items-center">
                  <span className="font-medium text-gray-600 whitespace-nowrap">Start Time:</span>
                  <span className="text-[#1E1E1E]">{currentLecture.start}</span>
                </div>
                <div className="flex gap-2 items-center">
                  <span className="font-medium text-gray-600 whitespace-nowrap">End Time:</span>
                  <span className="text-[#1E1E1E]">{currentLecture.end}</span>
                </div>
                <div className="flex gap-2 items-center">
                  <span className="font-medium text-gray-600 whitespace-nowrap">Location:</span>
                  <span className="text-[#1E1E1E]">{currentLecture.location}</span>
                </div>
              </div>
            </div>
          </section>
          
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
          
          <main className="px-10 py-6 flex-1">
            <div className="bg-white rounded-lg shadow-lg w-full h-full flex flex-col">
              <div className="overflow-auto flex-1">
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
                            <button 
                              onClick={() => handleEditClick(student)}
                              className="px-8 py-1.5 bg-[#3B82F6] text-white rounded-md text-sm font-medium border-2 border-[#3B82F6] hover:bg-white hover:text-[#3B82F6] transition-colors duration-200"
                            >
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : hasSearched ? (
                      <tr className="h-full">
                        <td colSpan="7" className="h-full py-8 text-center text-lg font-medium text-gray-500">
                          No result found
                        </td>
                      </tr>
                    ) : null}
                  </tbody>
                </table>
              </div>
            </div>
          </main>

          <div className="flex-none">
            <Footer />
          </div>
        </div>
      </div>

      {showOverrideModal && (
        <OverrideAttendanceModal
          student={selectedStudent}
          onClose={() => setShowOverrideModal(false)}
          onSave={handleSaveOverride}
        />
      )}
    </div>
  );
}