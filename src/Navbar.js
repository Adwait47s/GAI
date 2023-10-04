import React from 'react';

function Navbar() {
  return (
    <nav className="!bg-white-200 p-4 ">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <a href="/" className="text-indigo-600 text-lg font-semibold">
            Home
          </a>
        </div>
        <div className="flex space-x-4">
          <a href="/about" className="text-indigo-600">
            About Us
          </a>
          <a href="/contact" className="text-indigo-600">
            Contact
          </a>
        </div>


        {/*  more navigation links here */}
      </div>
    </nav>
  );
}

export default Navbar;
