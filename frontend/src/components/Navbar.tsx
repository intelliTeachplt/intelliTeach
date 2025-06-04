import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-xl font-bold">IntelliTeach</h1>
        <div className="space-x-4">
          <button className="text-white">Login</button>
          <button className="bg-white text-blue-600 px-4 py-2 rounded">Sign Up</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
