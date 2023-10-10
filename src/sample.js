import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import jwtDecode from 'jwt-decode'; // Import jwt-decode
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(true); // Default to login form
  const [isAdmin, setAdmin] = useState(false); // Default to non-admin
  const navigate = useNavigate();

  const handleLoginRegisterToggle = () => {
    // Toggle between login and register forms
    setIsLogin(!isLogin);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Create a data object for the API request
    const data = {
      email,
      password,
    };
  
    // Define the API endpoint URL based on whether it's for login or sign-up
    const apiUrl = isLogin
      ? 'https://word-extractor-apis.onrender.com/login'
      : 'https://word-extractor-apis.onrender.com/register';
  
    try {
      // Make a POST request to the API endpoint
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
  
      if (isLogin) {
        if (response.ok) {
          // Successful login
          const jwtToken = result.token;
  
          // Store the token in local storage
          localStorage.setItem('jwtToken', jwtToken);
  
          // Parse the JWT token to check if the user is admin
          const decodedToken = JSON.parse(atob(jwtToken.split('.')[1]));
  
          if (decodedToken.is_admin) {
            setAdmin(true);
            navigate('/AdminPage');
          } else {
            setAdmin(false);
            navigate('/UserPage');
          }
  
          // Clear the error message
          setError('');
        } else {
          // Handle login API error (e.g., incorrect credentials)
          setError(result.message || 'An error occurred');
        }
      } else {
        // Registration flow
        if (response.ok) {
          // Successful registration
          const jwtToken = result.token;
  
          // Store the token in local storage
          localStorage.setItem('jwtToken', jwtToken);
  
          // Automatically log in after successful registration
          if (result.user && result.user.isadmin) {
            setAdmin(true);
            navigate('/AdminPage');
          } else {
            setAdmin(false);
            navigate('/UserPage');
          }
  
          // Clear the error message
          setError('');
        } else {
          // Handle registration API error (e.g., user already exists)
          setError(result.message || 'An error occurred during registration.');
        }
      }
    } catch (error) {
      // Handle network errors
      setError('Network error. Please try again.');
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Login Form */}
      <div className="flex-grow flex items-center justify-center bg-blue-200">
        <div className="max-w-md w-full p-6 bg-white rounded-md shadow-lg">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
            {isLogin ? 'Login' : 'Register'}
          </h2>
          <form onSubmit={handleSubmit}>
          <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                className={`mt-1 block w-full rounded-md px-4 py-2 ring  focus:ring-indigo-200 focus:ring-opacity-50 ${error && 'border-red-500'
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
                className="mt-1 block w-full rounded-md px-4 py-2 ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="text-center flex-col ">
              <button
                type="submit"
                className="h-12 w-full mb-4 bg-indigo-600 hover:bg-indigo-700 focus:ring focus:ring-indigo-200 text-white rounded-md"
              >
                {isLogin ? 'Login' : 'Register'}
              </button>
              <button
                type="button"
                className="h-12 w-full bg-indigo-400 hover:bg-indigo-700 focus:ring focus:ring-indigo-200 text-white rounded-md"
                onClick={handleLoginRegisterToggle}
              >
                {isLogin ? 'Switch to Register' : 'Switch to Login'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
