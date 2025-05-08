import { useState } from 'react';
import logo from '../images/iotLogo.png';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempted with:', { username, password });
    // Handle authentication logic here
  };

  return (
    <div className="flex h-screen w-full">
      {/* Left side with logo only */}
      <div className="hidden md:flex md:w-1/2 bg-white items-center justify-center relative">
        <div className="absolute" style={{ top: '130px', left: '130px' }}>
          <img 
            src={logo} 
            alt="Smart University Logo" 
            style={{ width: '450px', height: '450px' }}
          />
        </div>
      </div>

      {/* Right side with login form */}
      <div className="w-full md:w-1/2 bg-[#4C1D95] flex items-center justify-center p-8 pl-10">
        <div className="w-full max-w-md">
          
          <div className="md:hidden flex flex-col items-center mb-8">
            <img 
              src={logo} 
              alt="Smart University Logo" 
              className="h-32 mb-4"
            />
          </div>

          <h1 className="text-white text-4xl font-semibold mb-3">Hello there!</h1>
          <p className="text-[#E5E7EB] text-lg mb-8">Please login to continue</p>
          
          <div>
            <div className="mb-2"> 
              <label htmlFor="username" className="block text-white text-lg font-medium mb-2">
                Username*
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full px-3 py-2 rounded text-white text-sm border border-white bg-[#4C1D95] placeholder:italic placeholder-[#E5E7EB] focus:ring-0 focus:outline-none"
              />
            </div>
            
            <div className="mt-6 mb-8"> 
              <label htmlFor="password" className="block text-white text-lg font-medium mb-2">
                Password*
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-3 py-2 rounded text-white text-sm border border-white bg-[#4C1D95] placeholder:italic placeholder-[#E5E7EB] focus:ring-0 focus:outline-none"
              />
            </div>
            
            <div className="mt-10">
              <button
                onClick={handleSubmit}
                className="w-full py-1.5 bg-[#FACC15] hover:bg-white text-white hover:text-[#FACC15] font-medium rounded transition-colors duration-200 border-2 border-transparent hover:border-[#FACC15]"
              >
                LOG IN
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}