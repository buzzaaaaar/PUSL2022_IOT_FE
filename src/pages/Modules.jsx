import React, { useState, useRef, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import searchIcon from '../images/search.png';
import profileIcon from '../images/profile.png';
import logoutIcon from '../images/logOut.png';
import saveSuccessfulIcon from '../images/saveSuccessful.png';

const Modules = () => {
  const [searchCode, setSearchCode] = useState('');
  const [modules, setModules] = useState([
    { code: 'CS101', name: 'Introduction to Programming', programme: 'BSc (Hons) Software Engineering', year: '1 year' },
    { code: 'CS201', name: 'Data Structures and Algorithms', programme: 'BSc (Hons) Software Engineering', year: '2 years' },
    { code: 'CN301', name: 'Network Security', programme: 'BSc (Hons) Computer Networks and Security', year: '3 years' },
    { code: 'EC401', name: 'Embedded Systems', programme: 'BEng (Hons) Electronics and Computer Engineering', year: '4 years' },
    { code: 'BM101', name: 'Principles of Management', programme: 'BSc (Hons) Business Management', year: '1 year' }
  ]);
  const [filteredModules, setFilteredModules] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [panelMode, setPanelMode] = useState('add');
  const [currentModule, setCurrentModule] = useState(null);
  const [newModule, setNewModule] = useState({
    code: '',
    name: '',
    programme: '',
    year: ''
  });
  const [errors, setErrors] = useState({
    code: '',
    name: '',
    programme: '',
    year: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [moduleToDelete, setModuleToDelete] = useState(null);
  const dropdownRef = useRef(null);
  const userName = "Admin";
  const initial = userName[0];

  // Programme and year options
  const programmeOptions = [
    'BEng (Hons) Electronics and Computer Engineering',
    'BSc (Hons) Computer Networks and Security',
    'BSc (Hons) Software Engineering',
    'BSc (Hons) Business Management',
    'Foundation in Computing and Technology'
  ];
  const yearOptions = ['1 year', '2 years', '3 years', '4 years'];

  // Initialize with all modules
  useEffect(() => {
    setFilteredModules(modules);
  }, [modules]);

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
    const newErrors = { code: '', name: '', programme: '', year: '' };
    let isValid = true;

    if (!newModule.code.trim()) {
      newErrors.code = 'Module Code is required';
      isValid = false;
    }

    if (!newModule.name.trim()) {
      newErrors.name = 'Module Name is required';
      isValid = false;
    }

    if (!newModule.programme.trim()) {
      newErrors.programme = 'Programme is required';
      isValid = false;
    }

    if (!newModule.year.trim()) {
      newErrors.year = 'Programme Year is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSearch = () => {
    if (searchCode.trim() === '') {
      setFilteredModules(modules);
    } else {
      const filtered = modules.filter(module => 
        module.code.toLowerCase().includes(searchCode.toLowerCase())
      );
      setFilteredModules(filtered);
    }
  };

  const openAddPanel = () => {
    setPanelMode('add');
    setNewModule({ code: '', name: '', programme: '', year: '' });
    setErrors({ code: '', name: '', programme: '', year: '' });
    setShowPanel(true);
  };

  const openEditPanel = (module) => {
    setPanelMode('edit');
    setCurrentModule(module);
    setNewModule({ ...module });
    setErrors({ code: '', name: '', programme: '', year: '' });
    setShowPanel(true);
  };

  const openDeleteConfirm = (module) => {
    setModuleToDelete(module);
    setShowDeleteConfirm(true);
  };

  const handleClosePanel = () => {
    setShowPanel(false);
    setNewModule({ code: '', name: '', programme: '', year: '' });
    setErrors({ code: '', name: '', programme: '', year: '' });
  };

  const handleCloseDeleteConfirm = () => {
    setShowDeleteConfirm(false);
    setModuleToDelete(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewModule(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSave = () => {
    if (!validateForm()) return;

    if (panelMode === 'add') {
      setModules(prev => [...prev, newModule]);
      setFilteredModules(prev => [...prev, newModule]);
    } else {
      setModules(prev => prev.map(m => 
        m.code === currentModule.code ? newModule : m
      ));
      setFilteredModules(prev => prev.map(m => 
        m.code === currentModule.code ? newModule : m
      ));
    }

    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      handleClosePanel();
    }, 2000);
  };

  const handleDelete = () => {
    setModules(prev => prev.filter(m => m.code !== moduleToDelete.code));
    setFilteredModules(prev => prev.filter(m => m.code !== moduleToDelete.code));
    handleCloseDeleteConfirm();
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#E5E7EB] font-sans">
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 ml-80 overflow-auto relative">
          {/* Page Header */}
          <div className="bg-[#4C1D95] p-4 flex justify-between items-center">
            <div className="text-white font-bold text-xl">
              Modules
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
                    className="px-8 py-2 bg-[#22C55E] text-white rounded-lg font-medium hover:bg-[#1eaa50]"
                  >
                    YES
                  </button>
                  <button
                    onClick={handleCloseDeleteConfirm}
                    className="px-8 py-2 bg-[#22C55E] text-white rounded-lg font-medium hover:bg-[#1eaa50]"
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
                    {panelMode === 'add' ? 'Add Module' : 'Edit Module'}
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
                    <label className="block text-sm font-medium text-[#22C55E] mb-2">Module Code</label>
                    <input
                      type="text"
                      name="code"
                      value={newModule.code}
                      onChange={handleInputChange}
                      className={`w-full p-3 border-2 border-[#22C55E] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#22C55E] ${
                        errors.code ? 'border-red-500' : ''
                      }`}
                    />
                    {errors.code && <p className="text-red-500 text-xs mt-1">{errors.code}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#22C55E] mb-2">Module Name</label>
                    <input
                      type="text"
                      name="name"
                      value={newModule.name}
                      onChange={handleInputChange}
                      className={`w-full p-3 border-2 border-[#22C55E] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#22C55E] ${
                        errors.name ? 'border-red-500' : ''
                      }`}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#22C55E] mb-2">Programme Name</label>
                    <select
                      name="programme"
                      value={newModule.programme}
                      onChange={handleInputChange}
                      className={`w-full p-3 border-2 border-[#22C55E] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#22C55E] ${
                        errors.programme ? 'border-red-500' : ''
                      }`}
                    >
                      <option value="">Select Programme</option>
                      {programmeOptions.map((programme) => (
                        <option key={programme} value={programme}>{programme}</option>
                      ))}
                    </select>
                    {errors.programme && <p className="text-red-500 text-xs mt-1">{errors.programme}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#22C55E] mb-2">Programme Year</label>
                    <select
                      name="year"
                      value={newModule.year}
                      onChange={handleInputChange}
                      className={`w-full p-3 border-2 border-[#22C55E] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#22C55E] ${
                        errors.year ? 'border-red-500' : ''
                      }`}
                    >
                      <option value="">Select Year</option>
                      {yearOptions.map((year) => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                    {errors.year && <p className="text-red-500 text-xs mt-1">{errors.year}</p>}
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
            {/* Add Module Button */}
            <div className="flex justify-end p-4">
              <button 
                onClick={openAddPanel}
                className="px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600"
              >
                + ADD MODULE
              </button>
            </div>

            {/* Search Section */}
            <div className="px-4 mb-6">
              <div className="flex items-center gap-2 w-1/2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Search by module code"
                    value={searchCode}
                    onChange={(e) => setSearchCode(e.target.value)}
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
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  SEARCH
                </button>
              </div>
            </div>

            {/* Modules Table */}
            <div className="bg-white mx-4 rounded-lg shadow-md overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-[#22C55E] font-bold">
                    <th className="p-3">MODULE CODE</th>
                    <th className="p-3">MODULE NAME</th>
                    <th className="p-3">PROGRAMME NAME</th>
                    <th className="p-3">PROGRAMME YEAR</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredModules.length > 0 ? (
                    filteredModules.map((module) => (
                      <tr key={module.code} className="border-t border-gray-200">
                        <td className="p-3">{module.code}</td>
                        <td className="p-3">{module.name}</td>
                        <td className="p-3">{module.programme}</td>
                        <td className="p-3">{module.year}</td>
                        <td className="p-3 text-right">
                          <div className="flex justify-end gap-2">
                            <button 
                              onClick={() => openEditPanel(module)}
                              className="px-5 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                            >
                              EDIT
                            </button>
                            <button 
                              onClick={() => openDeleteConfirm(module)}
                              className="px-5 py-2 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                            >
                              DELETE
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="p-4 text-center text-[#1E1E1E]">
                        No results found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Modules;