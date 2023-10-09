import React from 'react';

function Navbar() {
  return (
    <nav className="!bg-white-200 my-4 first-line:font-sans font-semibold">
      <div className="flex justify-between text-lg">
        <div>
          <a href="/" className="ml-8 text-black hover:text-blue-600">
            Home
          </a>
        </div>
        <div className="flex space-x-6 pr-8">
          <a href="/about" className=" text-black hover:text-blue-600">
            About Us
          </a>
          <a href="/contact" className=" text-black hover:text-blue-600">
            Contact
          </a>
        </div>


        {/*  more navigation links here */}
      </div>
    </nav>
  );
}

export default Navbar;
