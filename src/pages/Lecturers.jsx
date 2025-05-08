import React, { useState, useRef, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import searchIcon from '../images/search.png';
import profileIcon from '../images/profile.png';
import logoutIcon from '../images/logOut.png';
import saveSuccessfulIcon from '../images/saveSuccessful.png';

const Lecturers = () => {
  const [searchId, setSearchId] = useState('');
  const [lecturers, setLecturers] = useState([
    { id: 'L001', name: 'Dr. Nimal Perera', email: 'nimal.perera@nsbm.ac.lk' },
    { id: 'L002', name: 'Ms. Sanduni Fernando', email: 'sanduni.fernando@nsbm.ac.lk' },
    { id: 'L003', name: 'Mr. Ashan De Silva', email: 'ashan.desilva@nsbm.ac.lk' },
    { id: 'L004', name: 'Dr. Harsha Gunawardena', email: 'harsha.gunawardena@nsbm.ac.lk' },
    { id: 'L005', name: 'Ms. Kavesha Ranasinghe', email: 'kavesha.ranasinghe@nsbm.ac.lk' }
  ]);
  const [filteredLecturers, setFilteredLecturers] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeButtons, setActiveButtons] = useState({
    addLecturer: false,
    search: false,
    edit: {},
    delete: {},
    deleteYes: false,
    deleteNo: false
  });
  const [showPanel, setShowPanel] = useState(false);
  const [panelMode, setPanelMode] = useState('add');
  const [currentLecturer, setCurrentLecturer] = useState(null);
  const [newLecturer, setNewLecturer] = useState({
    id: '',
    name: '',
    email: ''
  });
  const [errors, setErrors] = useState({
    id: '',
    name: '',
    email: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [lecturerToDelete, setLecturerToDelete] = useState(null);
  const dropdownRef = useRef(null);
  const userName = "Admin";
  const initial = userName[0];

  // Initialize with all lecturers
  useEffect(() => {
    setFilteredLecturers(lecturers);
  }, [lecturers]);

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
    const newErrors = { id: '', name: '', email: '' };
    let isValid = true;

    if (!newLecturer.id.trim()) {
      newErrors.id = 'Lecturer ID is required';
      isValid = false;
    }

    if (!newLecturer.name.trim()) {
      newErrors.name = 'Lecturer Name is required';
      isValid = false;
    }

    if (!newLecturer.email.trim()) {
      newErrors.email = 'Lecturer Email is required';
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(newLecturer.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSearch = () => {
    setActiveButtons(prev => ({...prev, search: !prev.search}));
    if (searchId.trim() === '') {
      setFilteredLecturers(lecturers);
    } else {
      const filtered = lecturers.filter(lecturer => 
        lecturer.id.toLowerCase().includes(searchId.toLowerCase())
      );
      setFilteredLecturers(filtered);
    }
  };

  const openAddPanel = () => {
    setPanelMode('add');
    setNewLecturer({ id: '', name: '', email: '' });
    setErrors({ id: '', name: '', email: '' });
    setShowPanel(true);
    setActiveButtons(prev => ({...prev, addLecturer: true}));
  };

  const openEditPanel = (lecturer) => {
    setPanelMode('edit');
    setCurrentLecturer(lecturer);
    setNewLecturer({ ...lecturer });
    setErrors({ id: '', name: '', email: '' });
    setShowPanel(true);
  };

  const openDeleteConfirm = (lecturer) => {
    setLecturerToDelete(lecturer);
    setShowDeleteConfirm(true);
  };

  const handleClosePanel = () => {
    setShowPanel(false);
    setNewLecturer({ id: '', name: '', email: '' });
    setErrors({ id: '', name: '', email: '' });
    setActiveButtons(prev => ({...prev, addLecturer: false}));
  };

  const handleCloseDeleteConfirm = () => {
    setShowDeleteConfirm(false);
    setLecturerToDelete(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLecturer(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSave = () => {
    if (!validateForm()) return;

    if (panelMode === 'add') {
      setLecturers(prev => [...prev, newLecturer]);
      setFilteredLecturers(prev => [...prev, newLecturer]);
    } else {
      setLecturers(prev => prev.map(l => 
        l.id === currentLecturer.id ? newLecturer : l
      ));
      setFilteredLecturers(prev => prev.map(l => 
        l.id === currentLecturer.id ? newLecturer : l
      ));
    }

    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      handleClosePanel();
    }, 2000);
  };

  const handleDelete = () => {
    setLecturers(prev => prev.filter(l => l.id !== lecturerToDelete.id));
    setFilteredLecturers(prev => prev.filter(l => l.id !== lecturerToDelete.id));
    handleCloseDeleteConfirm();
  };

  const handleEditClick = (id) => {
    const lecturer = lecturers.find(l => l.id === id);
    openEditPanel(lecturer);
    setActiveButtons(prev => ({
      ...prev,
      edit: {...prev.edit, [id]: !prev.edit[id]}
    }));
  };

  const handleDeleteClick = (id) => {
    const lecturer = lecturers.find(l => l.id === id);
    openDeleteConfirm(lecturer);
    setActiveButtons(prev => ({
      ...prev,
      delete: {...prev.delete, [id]: !prev.delete[id]}
    }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#E5E7EB] font-sans">
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 ml-80 overflow-auto relative">
          {/* Page Header */}
          <div className="bg-[#4C1D95] p-4 flex justify-between items-center">
            <div className="text-white font-bold text-xl">
              Lecturers
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
                  <a href="#" className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
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
        onClick={() => {
          setShowSuccess(false);
          handleClosePanel();
        }}
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

          {/* Delete Confirmation Dialog */}
{showDeleteConfirm && (
  <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-30">
    <div className="bg-white p-8 rounded-lg shadow-lg w-100 relative">
      <button 
        onClick={handleCloseDeleteConfirm}
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-3xl font-light w-8 h-8 flex items-center justify-center"
      >
        &times;
      </button>

      <h3 className="text-lg font-medium mb-4 text-[#013024] pr-6">
        Are you sure you want to delete this item?
      </h3>
      

      <div className="flex justify-center space-x-4">
        <button
          onClick={handleDelete}
          className={`px-8 py-2 rounded-lg font-medium transition-colors ${
            activeButtons.deleteYes
              ? 'bg-white text-[#22C55E] border-2 border-[#22C55E]'
              : 'bg-[#22C55E] text-white hover:bg-[#1eaa50]'
          }`}
          onMouseDown={() => setActiveButtons(prev => ({...prev, deleteYes: true}))}
          onMouseUp={() => setActiveButtons(prev => ({...prev, deleteYes: false}))}
        >
          YES
        </button>
        <button
          onClick={handleCloseDeleteConfirm}
          className={`px-8 py-2 rounded-lg font-medium transition-colors ${
            activeButtons.deleteNo
              ? 'bg-white text-[#22C55E] border-2 border-[#22C55E]'
              : 'bg-[#22C55E] text-white hover:bg-[#1eaa50]'
          }`}
          onMouseDown={() => setActiveButtons(prev => ({...prev, deleteNo: true}))}
          onMouseUp={() => setActiveButtons(prev => ({...prev, deleteNo: false}))}
        >
          NO
        </button>
      </div>
    </div>
  </div>
)}

          {/* Add/Edit Panel - Right Side Panel */}
          {showPanel && (
            <div className="fixed inset-0 bg-black bg-opacity-30 z-20">
              <div className="absolute right-0 top-0 h-full w-96 bg-white border-l border-[#D4D4D4] shadow-lg">
                <div className="p-4 flex justify-between items-center border-b border-[#E5E7EB]">
                  <h2 className="text-xl font-bold text-[#1E1E1E]">
                    {panelMode === 'add' ? 'Add Lecturer' : 'Edit Lecturer'}
                  </h2>
                  <button 
                    onClick={handleClosePanel} 
                    className="text-gray-500 hover:text-gray-700 text-2xl font-light"
                  >
                    &times;
                  </button>
                </div>
                
                <div className="p-6 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-[#22C55E] mb-2">Lecturer ID</label>
                    <input
                      type="text"
                      name="id"
                      value={newLecturer.id}
                      onChange={handleInputChange}
                      className={`w-full p-3 border-2 border-[#22C55E] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#22C55E] ${
                        errors.id ? 'border-red-500' : ''
                      }`}
                    />
                    {errors.id && <p className="text-red-500 text-xs mt-1">{errors.id}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#22C55E] mb-2">Lecturer Name</label>
                    <input
                      type="text"
                      name="name"
                      value={newLecturer.name}
                      onChange={handleInputChange}
                      className={`w-full p-3 border-2 border-[#22C55E] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#22C55E] ${
                        errors.name ? 'border-red-500' : ''
                      }`}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#22C55E] mb-2">Lecturer Email</label>
                    <input
                      type="email"
                      name="email"
                      value={newLecturer.email}
                      onChange={handleInputChange}
                      className={`w-full p-3 border-2 border-[#22C55E] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#22C55E] ${
                        errors.email ? 'border-red-500' : ''
                      }`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                  
                  <div className="flex space-x-4 pt-4">
                    <button
                      onClick={handleSave}
                      className="px-6 py-2 bg-[#22C55E] text-white rounded-lg font-medium hover:bg-[#1eaa50]"
                    >
                      SAVE
                    </button>
                    <button
                      onClick={handleClosePanel}
                      className="px-6 py-2 bg-[#22C55E] text-white rounded-lg font-medium hover:bg-[#1eaa50]"
                    >
                      CANCEL
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className={`${showPanel || showDeleteConfirm || showSuccess ? 'blur-sm' : ''}`}>
            {/* Add Lecturer Button */}
            <div className="flex justify-end p-4">
              <button 
                onClick={openAddPanel}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeButtons.addLecturer 
                    ? 'bg-white text-green-500 border-2 border-green-500' 
                    : 'bg-green-500 text-white hover:bg-green-600'
                }`}
              >
                + ADD LECTURER
              </button>
            </div>

            {/* Search Section */}
            <div className="px-4 mb-6">
              <div className="flex items-center gap-2 w-1/2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Search by lecturer ID"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="w-full p-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4C1D95] bg-white"
                  />
                  <img 
                    src={searchIcon} 
                    alt="Search" 
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4" 
                  />
                </div>
                <button 
                  onClick={handleSearch}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    activeButtons.search 
                      ? 'bg-white text-green-500 border-2 border-green-500' 
                      : 'bg-green-500 text-white hover:bg-green-600'
                  }`}
                >
                  SEARCH
                </button>
              </div>
            </div>

            {/* Lecturers Table */}
<div className="bg-white mx-4 rounded-lg shadow-md overflow-hidden">
  <div className="grid grid-cols-12 p-3 font-bold text-[#22C55E]">
    <div className="col-span-2">LECTURER ID</div>
    <div className="col-span-3">LECTURER NAME</div>
    <div className="col-span-4">LECTURER EMAIL</div>
    <div className="col-span-2"></div>
  </div>
  
  {filteredLecturers.length > 0 ? (
    filteredLecturers.map((lecturer) => (
      <div key={lecturer.id} className="grid grid-cols-12 p-3 border-t border-gray-200 items-center">
        <div className="col-span-2 truncate">{lecturer.id}</div>
        <div className="col-span-3 truncate">{lecturer.name}</div>
        <div className="col-span-4 truncate">{lecturer.email}</div>
        <div className="col-span-2 flex justify-end gap-2">
          <button 
            onClick={() => handleEditClick(lecturer.id)}
            className={`px-5 py-2 rounded text-sm transition-colors ${
              activeButtons.edit[lecturer.id] 
                ? 'bg-white text-blue-500 border-2 border-blue-500' 
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            EDIT
          </button>
          <button 
            onClick={() => handleDeleteClick(lecturer.id)}
            className={`px-5 py-2 rounded text-sm transition-colors ${
              activeButtons.delete[lecturer.id] 
                ? 'bg-white text-red-500 border-2 border-red-500' 
                : 'bg-red-500 text-white hover:bg-red-600'
            }`}
          >
            DELETE
          </button>
        </div>
      </div>
    ))
  ) : (
    <div className="p-4 text-center text-[#1E1E1E]">
      No results found
    </div>
  )}
</div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Lecturers;