import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaCartPlus, FaUser, FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import './Nav.css';

function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar">
      <h1 className="logo">Sparko</h1>

      {/* Hamburger only visible on mobile */}
      <div className="hamburger" onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Everything inside this div will hide/show on mobile */}
      <div className={`menu-container ${isOpen ? "active" : ""}`}>
        <ul className="nav-links">
          <li><NavLink to="/" onClick={closeMenu}>Home</NavLink></li>
          <li><NavLink to="/menu" onClick={closeMenu}>Menu</NavLink></li>
          <li><NavLink to="/about" onClick={closeMenu}>About</NavLink></li>
          <li><NavLink to="/book" onClick={closeMenu}>Book Table</NavLink></li>
        </ul>

        <div className="nav-actions">
          <div className="icon-group">
            <FaSearch className="icon" />
            <FaCartPlus className="icon" />
            <FaUser className="icon" />
          </div>
          <NavLink to="/menu" className="order-btn" onClick={closeMenu}>Order online</NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
