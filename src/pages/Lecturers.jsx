import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import searchIcon from '../images/search.png';

const Lecturers = () => {
  const [searchId, setSearchId] = useState('');

  const lecturers = [
    { id: 'LOO1', name: 'Mr. Ashan De Silva', email: 'ashan.desilva@nsbm.ac.lk' },
    { id: 'LOO2', name: 'Dr. Harsha Gunawardena', email: 'harsha.gunawardena@nsbm.ac.lk' },
    { id: 'LOO3', name: 'Ms. Kavesha Ranasinghe', email: 'kavesha.ranasinghe@nsbm.ac.lk' },
    { id: 'LOO4', name: 'Dr. Nimal Perera', email: 'nimal.perera@nsbm.ac.lk' },
    { id: 'LOO5', name: 'Mr. Sanduni Fernando', email: 'sanduni.fernando@nsbm.ac.lk' },
  ];

  const filteredLecturers = searchId
    ? lecturers.filter(lecturer => lecturer.id.toLowerCase().includes(searchId.toLowerCase()))
    : lecturers;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8 overflow-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-8">Lecturers</h1>
          
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-lg font-semibold mb-4">Search by lecturer ID</h2>
            <div className="flex">
              <input
                type="text"
                placeholder="Enter lecturer ID"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="flex-1 p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-blue-600 text-white px-6 py-3 rounded-r-lg hover:bg-blue-700 flex items-center">
                <img src={searchIcon} alt="Search" className="w-5 h-5 mr-2" />
                <span>SEARCH</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200">LECTURER ID</h3>
              <ul className="divide-y divide-gray-200">
                {filteredLecturers.map((lecturer, index) => (
                  <li key={index} className="py-3">
                    <span className="font-bold text-gray-800">{lecturer.id}</span>
                    <p className="text-gray-600 mt-1">{lecturer.name}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200">LECTURER NAME</h3>
              <ul className="divide-y divide-gray-200">
                {filteredLecturers.map((lecturer, index) => (
                  <li key={index} className="py-3 text-gray-800">
                    {lecturer.name}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200">LECTURER EMAIL</h3>
              <ul className="divide-y divide-gray-200">
                {filteredLecturers.map((lecturer, index) => (
                  <li key={index} className="py-3 text-gray-800">
                    {lecturer.email}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 font-medium">
              *ADD LECTURER*
            </button>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {filteredLecturers.map((lecturer, index) => (
                <div key={index} className="flex space-x-2">
                  <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 flex-1">
                    EDIT
                  </button>
                  <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex-1">
                    DELETE
                  </button>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Lecturers;