import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isAdmin, setAdmin] = useState(true); // currently default route is set to adminpage as isAdmin is 1

  const navigate = useNavigate();

  const adminchange = () => {
    // from backend check if the user is admin or not
    setAdmin(!isAdmin);
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    // backend , perform validation and authentication and remember me here
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Remember Me:', rememberMe);

    // Clear the error message
    setError('');

    if (isAdmin) {
      navigate('/AdminPage');
    } 
    else {
      navigate('/UserPage');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Login Form */}
      <div className="p-30 flex-grow flex items-center justify-center bg-blue-300 font-sans">
        <div className='bg-blue-200 py-10 pl-72 pr-72'>
          <div className="px-12 py-24 bg-slate-100 rounded-md shadow-lg">
            <h2 className="text-3xl mb-8 font-bold text-center text-gray-800">Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="email" className="block text-base font-medium text-gray-700 ml-1">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  className={`border-b-2 border-gray-300 block w-full rounded-md px-4 py-2 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${error && 'border-red-500'
                    }`}
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-base font-medium text-gray-700 ml-1">
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  className="border-b-2 border-gray-300 block w-full rounded-md px-4 py-2 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-between space-x-14 items-center mb-4">
                <div>
                  <input
                    type="checkbox"
                    id="rememberMe"
                    className="text-indigo-600 focus:ring-indigo-500 rounded"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                  <label htmlFor="rememberMe" className="text-base ml-2 text-gray-700">
                    Remember Me
                  </label>
                </div>
                <div>
                  <button
                    type="button"
                    className="text-indigo-600 hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
              </div>
              <div className="text-center py-3">
                <button
                  type="submit"
                  className="py-2 px-5 bg-blue-500 hover:bg-blue-700 active:bg-blue-500 focus:ring focus:ring-indigo-200 text-white rounded-md text-center"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default Login;