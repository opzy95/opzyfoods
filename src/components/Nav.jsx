import React, { useState, useContext, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaCartPlus, FaUser, FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import './Nav.css';
import { CartContext } from "./CartContext";
import Cart from "./Cart";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { cart } = useContext(CartContext);
  const navRef = useRef(null);

  const toggleMenu = () => setIsOpen(prev => !prev);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        closeMenu();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav className="navbar" ref={navRef}>

        {/* 1. Logo — far left */}
        <img className="logo" src="/pp.jpeg" alt="" />

        {/* 2. Nav links — center, hidden on mobile */}
        <div className={`menu-container ${isOpen ? "active" : ""}`}>
          <ul className="nav-links">
            <li><NavLink to="/" onClick={closeMenu}>Home</NavLink></li>
            <li><NavLink to="/menu" onClick={closeMenu}>Menu</NavLink></li>
            <li><NavLink to="/about" onClick={closeMenu}>About</NavLink></li>
            <li><NavLink to="/book" onClick={closeMenu}>Book Table</NavLink></li>
          </ul>
          <NavLink to="/menu" className="order-btn" onClick={closeMenu}>
            Order online
          </NavLink>
        </div>

        {/* 3. Icons + hamburger — far right, ALWAYS visible */}
        <div className="nav-right">
          <div className="icon-group">
            <FaSearch className="icon, menu-container" />

            <div className="cart-wrapper" onClick={() => { setCartOpen(true); closeMenu(); }}>
              <FaCartPlus className="icon" />
              {cart.length > 0 && (
                <span className="cart-badge">{cart.length}</span>
              )}
            </div>

            <FaUser className="icon, menu-container" />
          </div>

          <div className="hamburger" onClick={toggleMenu}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>

      </nav>

      {cartOpen && <Cart onClose={() => setCartOpen(false)} />}
    </>
  );
}

export default Nav;