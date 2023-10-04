import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isAdmin, setAdmin] = useState(false);

  const navigate = useNavigate();

  const adminchange = () => {
    // from backend check if the user is admin or not
    setAdmin(!isAdmin);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a data object for the API request
    const data = {
      email,
      password,
    };

    // Define the API endpoint URL based on whether it's for login or sign-up
    const apiUrl = isAdmin
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

      if (response.ok) {
        // Successful login or sign-up
        const result = await response.json();
        const jwtToken = result.token;

        // Store the token in local storage
        localStorage.setItem('jwtToken', jwtToken);

        // Clear the error message
        setError('');

        // Redirect to the appropriate page
        if (isAdmin) {
          navigate('/AdminPage');
        } else {
          navigate(`/UserPage/${12}`);
        }
      } else {
        // Handle API error (e.g., incorrect credentials)
        const errorData = await response.json();
        setError(errorData.message || 'An error occurred');
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
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                className={`mt-1 block w-full rounded-md px-4 py-2 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${error && 'border-red-500'
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
            {/* <div className="flex justify-between items-center mb-4">
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
            </div> */}
            <div className="text-center">
              <button
                type="submit"
                className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring focus:ring-indigo-200 text-white rounded-md"
              >
                Login
              </button>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring focus:ring-indigo-200 text-white rounded-md"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;