import React, { useState, useEffect } from 'react';

function Navbar() {
  const [jwtToken, setJwtToken] = useState(localStorage.getItem('jwtToken'));
  //console.log('JWT Token stored:', jwtToken);
  useEffect(() => {
    // Update the JWT token state when it changes in local storage
    const tokenFromStorage = localStorage.getItem('jwtToken');
    setJwtToken(tokenFromStorage);
  }, []);

  const handleLogout = () => {
    // Remove the JWT token from local storage
    localStorage.removeItem('jwtToken');
    // Redirect the user to the login page
    window.location.href = '/login'; // You can use React Router for more elegant navigation
  };

  return (
    <nav className="!bg-white-200 my-4 first-line:font-sans font-semibold">
      <div className="flex justify-between text-lg">
        <div>
          <button className="ml-8 text-black hover:text-blue-600">
            PDF-GenAI
          </button>
        </div>
        <div className="flex space-x-6 pr-8">
          <button className=" text-black hover:text-blue-600">
            About Us
          </button>
          <button className=" text-black hover:text-blue-600">
            Contact
          </button>
          {jwtToken ? ( // Use the dynamic jwtToken state
            <button className="text-black hover:text-blue-600" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <button className="text-black hover:text-blue-600" onClick={() => window.location.href = '/login'}>
              Login
            </button>
          )}
        </div>
        {/* More navigation links here */}
      </div>
    </nav>
  );
}

export default Navbar;
