import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2>React CRUD App</h2>
      <Link to="/">Home</Link>
    </nav>
  );
};

export default Navbar;
