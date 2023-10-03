import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the email contains the "@" symbol

    // Perform validation and authentication here
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Remember Me:', rememberMe);

    // Clear the error message
    setError('');
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation Bar */}
      {/* <nav className="bg-indigo-600 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <a href="/" className="text-white text-lg font-semibold">
              Home
            </a>
            <a href="/about" className="text-white ml-4">
              About Us
            </a>
            <a href="/contact" className="text-white ml-4">
              Contact
            </a>
          </div>
        </div>
      </nav> */}

      {/* Login Form */}
      <div className="flex-grow flex items-center justify-center bg-blue-200">
        <div className="max-w-md w-full p-6 bg-white rounded-md shadow-lg">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                className={`mt-1 block w-full rounded-md px-4 py-2 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
                  error && 'border-red-500'
                }`}
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 block w-full rounded-md px-4 py-2 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-between items-center mb-4">
              <div>
                <input
                  type="checkbox"
                  id="rememberMe"
                  className="text-indigo-600 focus:ring-indigo-500 rounded"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <label htmlFor="rememberMe" className="text-sm ml-2 text-gray-700">
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
            <div className="text-center">
              <button
                type="submit"
                className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring focus:ring-indigo-200 text-white rounded-md"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
