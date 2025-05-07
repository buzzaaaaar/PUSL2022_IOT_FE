import React, { useState, useRef, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import searchIcon from '../images/search.png';
import profileIcon from '../images/profile.png';
import logoutIcon from '../images/logOut.png';
import saveSuccessfulIcon from '../images/saveSuccessful.png';

const Programmes = () => {
  const [searchName, setSearchName] = useState('');
  const [programmes, setProgrammes] = useState([
    { id: 'P001', name: 'BSc (Hons) Business Analytics', faculty: 'Business', duration: '3 years' },
    { id: 'P002', name: 'BSc (Hons) Software Engineering', faculty: 'Computing', duration: '3 years' },
    { id: 'P003', name: 'Foundation in Information Technology', faculty: 'Computing', duration: '1 year' },
    { id: 'P004', name: 'BEng (Hons) Mechatronics', faculty: 'Engineering', duration: '4 years' },
    { id: 'P005', name: 'BSc (Hons) Electrical & Electronic Engineering', faculty: 'Engineering', duration: '4 years' }
  ]);
  const [filteredProgrammes, setFilteredProgrammes] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeButtons, setActiveButtons] = useState({
    addProgramme: false,
    search: false,
    edit: {},
    delete: {},
    deleteYes: false,
    deleteNo: false
  });
  const [showPanel, setShowPanel] = useState(false);
  const [panelMode, setPanelMode] = useState('add');
  const [currentProgramme, setCurrentProgramme] = useState(null);
  const [newProgramme, setNewProgramme] = useState({
    id: '',
    name: '',
    faculty: '',
    duration: ''
  });
  const [errors, setErrors] = useState({
    id: '',
    name: '',
    faculty: '',
    duration: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [programmeToDelete, setProgrammeToDelete] = useState(null);
  const dropdownRef = useRef(null);
  const userName = "Admin";
  const initial = userName[0];

  // Faculty and duration options
  const facultyOptions = ['Business', 'Computing', 'Engineering'];
  const durationOptions = ['1 year', '2 years', '3 years', '4 years'];

  // Initialize with all programmes
  useEffect(() => {
    setFilteredProgrammes(programmes);
  }, [programmes]);

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
    const newErrors = { id: '', name: '', faculty: '', duration: '' };
    let isValid = true;

    if (!newProgramme.id.trim()) {
      newErrors.id = 'Programme ID is required';
      isValid = false;
    }

    if (!newProgramme.name.trim()) {
      newErrors.name = 'Programme Name is required';
      isValid = false;
    }

    if (!newProgramme.faculty.trim()) {
      newErrors.faculty = 'Faculty is required';
      isValid = false;
    }

    if (!newProgramme.duration.trim()) {
      newErrors.duration = 'Duration is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSearch = () => {
    setActiveButtons(prev => ({...prev, search: !prev.search}));
    if (searchName.trim() === '') {
      setFilteredProgrammes(programmes);
    } else {
      const filtered = programmes.filter(programme => 
        programme.name.toLowerCase().includes(searchName.toLowerCase())
      );
      setFilteredProgrammes(filtered);
    }
  };

  const openAddPanel = () => {
    setPanelMode('add');
    setNewProgramme({ id: '', name: '', faculty: '', duration: '' });
    setErrors({ id: '', name: '', faculty: '', duration: '' });
    setShowPanel(true);
    setActiveButtons(prev => ({...prev, addProgramme: true}));
  };

  const openEditPanel = (programme) => {
    setPanelMode('edit');
    setCurrentProgramme(programme);
    setNewProgramme({ ...programme });
    setErrors({ id: '', name: '', faculty: '', duration: '' });
    setShowPanel(true);
  };

  const openDeleteConfirm = (programme) => {
    setProgrammeToDelete(programme);
    setShowDeleteConfirm(true);
  };

  const handleClosePanel = () => {
    setShowPanel(false);
    setNewProgramme({ id: '', name: '', faculty: '', duration: '' });
    setErrors({ id: '', name: '', faculty: '', duration: '' });
    setActiveButtons(prev => ({...prev, addProgramme: false}));
  };

  const handleCloseDeleteConfirm = () => {
    setShowDeleteConfirm(false);
    setProgrammeToDelete(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProgramme(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSave = () => {
    if (!validateForm()) return;

    if (panelMode === 'add') {
      setProgrammes(prev => [...prev, newProgramme]);
      setFilteredProgrammes(prev => [...prev, newProgramme]);
    } else {
      setProgrammes(prev => prev.map(p => 
        p.id === currentProgramme.id ? newProgramme : p
      ));
      setFilteredProgrammes(prev => prev.map(p => 
        p.id === currentProgramme.id ? newProgramme : p
      ));
    }

    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      handleClosePanel();
    }, 2000);
  };

  const handleDelete = () => {
    setProgrammes(prev => prev.filter(p => p.id !== programmeToDelete.id));
    setFilteredProgrammes(prev => prev.filter(p => p.id !== programmeToDelete.id));
    handleCloseDeleteConfirm();
  };

  const handleEditClick = (id) => {
    const programme = programmes.find(p => p.id === id);
    openEditPanel(programme);
    setActiveButtons(prev => ({
      ...prev,
      edit: {...prev.edit, [id]: !prev.edit[id]}
    }));
  };

  const handleDeleteClick = (id) => {
    const programme = programmes.find(p => p.id === id);
    openDeleteConfirm(programme);
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
              Programmes
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
                  <a href="#" className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
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
                    {panelMode === 'add' ? 'Add Programme' : 'Edit Programme'}
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
                    <label className="block text-sm font-medium text-[#22C55E] mb-2">Programme ID</label>
                    <input
                      type="text"
                      name="id"
                      value={newProgramme.id}
                      onChange={handleInputChange}
                      className={`w-full p-3 border-2 border-[#22C55E] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#22C55E] ${
                        errors.id ? 'border-red-500' : ''
                      }`}
                    />
                    {errors.id && <p className="text-red-500 text-xs mt-1">{errors.id}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#22C55E] mb-2">Programme Name</label>
                    <input
                      type="text"
                      name="name"
                      value={newProgramme.name}
                      onChange={handleInputChange}
                      className={`w-full p-3 border-2 border-[#22C55E] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#22C55E] ${
                        errors.name ? 'border-red-500' : ''
                      }`}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#22C55E] mb-2">Faculty</label>
                    <select
                      name="faculty"
                      value={newProgramme.faculty}
                      onChange={handleInputChange}
                      className={`w-full p-3 border-2 border-[#22C55E] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#22C55E] ${
                        errors.faculty ? 'border-red-500' : ''
                      }`}
                    >
                      <option value="">Select Faculty</option>
                      {facultyOptions.map((faculty) => (
                        <option key={faculty} value={faculty}>{faculty}</option>
                      ))}
                    </select>
                    {errors.faculty && <p className="text-red-500 text-xs mt-1">{errors.faculty}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#22C55E] mb-2">Duration</label>
                    <select
                      name="duration"
                      value={newProgramme.duration}
                      onChange={handleInputChange}
                      className={`w-full p-3 border-2 border-[#22C55E] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#22C55E] ${
                        errors.duration ? 'border-red-500' : ''
                      }`}
                    >
                      <option value="">Select Duration</option>
                      {durationOptions.map((duration) => (
                        <option key={duration} value={duration}>{duration}</option>
                      ))}
                    </select>
                    {errors.duration && <p className="text-red-500 text-xs mt-1">{errors.duration}</p>}
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
            {/* Add Programme Button */}
            <div className="flex justify-end p-4">
              <button 
                onClick={openAddPanel}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeButtons.addProgramme 
                    ? 'bg-white text-green-500 border-2 border-green-500' 
                    : 'bg-green-500 text-white hover:bg-green-600'
                }`}
              >
                + ADD PROGRAMME
              </button>
            </div>

            {/* Search Section */}
            <div className="px-4 mb-6">
              <div className="flex items-center gap-2 w-1/2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Search by programme name"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
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

            {/* Programmes Table */}
            <div className="bg-white mx-4 rounded-lg shadow-md overflow-hidden">
              <div className="grid grid-cols-12 p-3 font-bold text-[#22C55E]">
                <div className="col-span-4">PROGRAMME NAME</div>
                <div className="col-span-3">FACULTY</div>
                <div className="col-span-3">DURATION</div>
                <div className="col-span-2"></div>
              </div>
              
              {filteredProgrammes.length > 0 ? (
                filteredProgrammes.map((programme) => (
                  <div key={programme.id} className="grid grid-cols-12 p-3 border-t border-gray-200 items-center">
                    <div className="col-span-4 truncate">{programme.name}</div>
                    <div className="col-span-3 truncate">{programme.faculty}</div>
                    <div className="col-span-3 truncate">{programme.duration}</div>
                    <div className="col-span-2 flex justify-end gap-2">
                      <button 
                        onClick={() => handleEditClick(programme.id)}
                        className={`px-5 py-2 rounded text-sm transition-colors ${
                          activeButtons.edit[programme.id] 
                            ? 'bg-white text-blue-500 border-2 border-blue-500' 
                            : 'bg-blue-500 text-white hover:bg-blue-600'
                        }`}
                      >
                        EDIT
                      </button>
                      <button 
                        onClick={() => handleDeleteClick(programme.id)}
                        className={`px-5 py-2 rounded text-sm transition-colors ${
                          activeButtons.delete[programme.id] 
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

export default Programmes;