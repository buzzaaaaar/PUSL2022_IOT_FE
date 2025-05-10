import React, { useState, useRef, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  LabelList,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import profileIcon from '../images/profile.png';
import logoutIcon from '../images/logOut.png';
import descriptiveAnalyticsIcon from '../images/descriptiveAnalytics.png';
import predictiveAnalyticsIcon from '../images/predictiveAnalytics.png';

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
    <div className="bg-[#4C1D95] p-4 flex justify-between items-center absolute top-0 right-0 left-80 font-montserrat">
      <div className="text-white text-xl">Analytics</div>
      <div className="relative" ref={dropdownRef}>
        <button 
          onClick={() => setShowDropdown(!showDropdown)}
          className="bg-white text-[#4C1D95] h-8 w-8 rounded-full flex items-center justify-center"
        >
          {initial}
        </button>
        {showDropdown && (
          <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg py-1 z-10 font-montserrat">
            <button
              className="w-full text-left px-4 py-2 text-sm text-[#4C1D95] flex items-center group relative"
              onClick={() => console.log("Profile clicked")}
            >
              <img src={profileIcon} alt="Profile" className="w-4 h-4 mr-2" />
              <span>Profile</span>
              <div className="absolute left-0 right-0 bottom-0 h-0.5 bg-[#4C1D95] scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
            </button>
            <button
              className="w-full text-left px-4 py-2 text-sm text-[#4C1D95] flex items-center group relative"
              onClick={() => console.log("Logout clicked")}
            >
              <img src={logoutIcon} alt="Logout" className="w-4 h-4 mr-2" />
              <span>Log Out</span>
              <div className="absolute left-0 right-0 bottom-0 h-0.5 bg-[#4C1D95] scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const WeeklyAttendanceLineChart = () => {
  const data = [
    { day: 'Mon', attendance: 85 },
    { day: 'Tue', attendance: 78 },
    { day: 'Wed', attendance: 82 },
    { day: 'Thu', attendance: 90 },
    { day: 'Fri', attendance: 76 },
    { day: 'Sat', attendance: 65 },
    { day: 'Sun', attendance: 40 }
  ];

  return (
    <div className="bg-white shadow-md mb-6">
      <div className="bg-[#22C55E] text-white w-full py-5 px-4">
        <h2 className="text-2xl">UNIVERSITY ATTENDANCE RATE THIS WEEK</h2>
      </div>
      <div className="p-6">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 15, left: 25, bottom: 25 }}
            >
              <CartesianGrid strokeDasharray="2 2" />
              <XAxis 
                dataKey="day" 
                label={{ 
                  value: 'Day of the week', 
                  position: 'insideBottom', 
                  offset: -20 
                }}
              />
              <YAxis 
                domain={[0, 100]} 
                label={{ 
                  value: 'Overall Attendance%', 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { textAnchor: 'middle' } 
                }}
              />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="attendance"
                stroke="#22C55E"
                strokeWidth={2}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const ProgrammeAttendanceBarChart = () => {
  const data = [
    { 
      name: 'Software Eng', 
      percentage: 88, 
      fullName: 'BSc (Hons) Software Engineering',
      color: '#5D18A0'
    },
    { 
      name: 'Business Analytics', 
      percentage: 72, 
      fullName: 'BSc (Hons) Business Analytics',
      color: '#3B82F6'
    },
    { 
      name: 'Electrical Eng', 
      percentage: 66, 
      fullName: 'BSc (Hons) Electrical & Electronic Engineering',
      color: '#10B981'
    },
    { 
      name: 'IT Foundation', 
      percentage: 91, 
      fullName: 'Foundation in Information Technology',
      color: '#F59E0B'
    },
    { 
      name: 'Mechatronics', 
      percentage: 78, 
      fullName: 'BEng (Hons) Mechatronics',
      color: '#F97316'
    }
  ];

  return (
    <div className="bg-white shadow-md mb-6">
      <div className="bg-[#F97316] text-white w-full py-5 px-4">
        <h2 className="text-2xl">PROGRAMME ATTENDANCE RATE THIS YEAR</h2>
      </div>
      <div className="p-6">
        <div className="mb-4 flex flex-col">
          {data.map((item) => (
            <div key={item.name} className="flex items-center mb-2">
              <div className="w-12 text-right">
                <div className="inline-block w-4 h-4" style={{ backgroundColor: item.color }}></div>
              </div>
              <span className="text-sm ml-2">{item.fullName}</span>
            </div>
          ))}
        </div>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis dataKey="name" />
              <YAxis 
                domain={[0, 100]}
                ticks={[0, 20, 40, 60, 80, 100]}
                label={{ 
                  value: 'Average Annual Attendance %', 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { textAnchor: 'middle' } 
                }}
              />
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Attendance']}
                labelFormatter={(name) => `${name}`}
                contentStyle={{ border: 'none', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
                cursor={false}
              />
              <Bar 
                dataKey="percentage" 
                fill="#ffffff"
                shape={(props) => {
                  const { x, y, width, height, index } = props;
                  const color = data[index].color;
                  return <rect x={x} y={y} width={width} height={height} fill={color} />;
                }}
              >
                <LabelList dataKey="percentage" position="top" formatter={(value) => `${value}`} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="text-center text-sm text-gray-600 mt-2">Programme Name</div>
      </div>
    </div>
  );
};

const ModuleAttendancePieChart = () => {
  const data = [
    { name: 'SE2101', value: 82, color: '#F97316' },
    { name: 'BA1302', value: 75, color: '#5D18A0' },
    { name: 'EE3104', value: 68, color: '#3B82F6' },
    { name: 'CS1203', value: 89, color: '#10B981' },
    { name: 'ME2201', value: 73, color: '#FACC15' }
  ];

  return (
    <div className="bg-white shadow-md mb-6">
      <div className="bg-[#FACC15] text-white w-full py-5 px-4">
        <h2 className="text-2xl">MODULE ATTENDANCE YESTERDAY</h2>
      </div>
      <div className="p-6">
        <div className="text-center mb-4">
          {data.map((item) => (
            <span key={item.name} className="inline-flex items-center mr-4">
              <div className="w-3 h-3 mr-1" style={{ backgroundColor: item.color }}></div>
              <span className="text-sm">{item.name}</span>
            </span>
          ))}
        </div>
        
        <div className="h-96 flex justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={130}
                label={false}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Attendance']}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const PredictiveAnalytics = () => {
  const lectureData = [
    { moduleCode: 'CS2020', lecturerId: 'LEC102', startTime: '09:00 AM', endTime: '10:30 AM', location: 'NB-202', students: 480 },
    { moduleCode: 'SE2035', lecturerId: 'LEC109', startTime: '01:00 PM', endTime: '02:30 PM', location: 'NB-304', students: 390 },
    { moduleCode: 'IT2011', lecturerId: 'LEC101', startTime: '11:00 AM', endTime: '12:00 PM', location: 'NB-110', students: 340 },
    { moduleCode: 'CS2020', lecturerId: 'LEC102', startTime: '09:00 AM', endTime: '10:30 AM', location: 'NB-202', students: 370 }
  ];

  return (
    <div className="bg-white shadow-md mb-6">
      <div className="bg-[#FF6B00] text-white w-full py-5 px-4">
        <h2 className="text-2xl">EXPECTED LECTURE ATTENDANCE TOMORROW</h2>
      </div>
      <div className="p-6 overflow-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="py-3 px-4 text-left text-[#FF6B00] font-semibold">MODULE CODE</th>
              <th className="py-3 px-4 text-left text-[#FF6B00] font-semibold">LECTURER ID</th>
              <th className="py-3 px-4 text-left text-[#FF6B00] font-semibold">START TIME</th>
              <th className="py-3 px-4 text-left text-[#FF6B00] font-semibold">END TIME</th>
              <th className="py-3 px-4 text-left text-[#FF6B00] font-semibold">LOCATION</th>
              <th className="py-3 px-4 text-left text-[#FF6B00] font-semibold">NO. OF STUDENTS</th>
            </tr>
          </thead>
          <tbody>
            {lectureData.map((lecture, index) => (
              <tr key={index} className="border-t border-gray-200">
                <td className="py-4 px-4">{lecture.moduleCode}</td>
                <td className="py-4 px-4">{lecture.lecturerId}</td>
                <td className="py-4 px-4">{lecture.startTime}</td>
                <td className="py-4 px-4">{lecture.endTime}</td>
                <td className="py-4 px-4">{lecture.location}</td>
                <td className="py-4 px-4">{lecture.students}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState('descriptive');

  return (
    <div className="flex flex-col h-screen bg-[#E5E7EB] font-montserrat">
      <div className="fixed left-0 top-0 w-80 h-full">
        <Sidebar />
      </div>

      <div className="ml-80 flex-1 flex flex-col overflow-hidden">
        <TopPanel />

        <div className="bg-white px-6 -mx-6 h-28 flex items-center mt-16 relative">
          <div className="flex w-full">
            <button
              className={`flex items-center justify-center px-6 py-6 text-2xl flex-1 text-[#1E1E1E]`}
              onClick={() => setActiveTab('descriptive')}
            >
              <img 
                src={descriptiveAnalyticsIcon} 
                alt="Descriptive Analytics" 
                className="w-8 h-8 mr-3" 
              />
              <span>DESCRIPTIVE ANALYTICS</span>
            </button>
            <div className="border-r border-gray-300 h-12 my-auto"></div>
            <button
              className={`flex items-center justify-center px-6 py-6 text-2xl flex-1 text-[#1E1E1E]`}
              onClick={() => setActiveTab('predictive')}
            >
              <img 
                src={predictiveAnalyticsIcon} 
                alt="Predictive Analytics" 
                className="w-8 h-8 mr-3" 
              />
              <span>PREDICTIVE ANALYTICS</span>
            </button>
          </div>
          <div 
            className={`absolute bottom-0 h-1 bg-[#22C55E] ${
              activeTab === 'descriptive' ? 'left-0 right-1/2' : 'left-1/2 right-0'
            }`}
          ></div>
        </div>

        <main className="flex-1 overflow-auto bg-[#E5E7EB]">
          <div className="px-6 pt-4">
            <div className="py-4 space-y-6">
              {activeTab === 'descriptive' ? (
                <>
                  <WeeklyAttendanceLineChart />
                  <ProgrammeAttendanceBarChart />
                  <ModuleAttendancePieChart />
                </>
              ) : (
                <PredictiveAnalytics />
              )}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}