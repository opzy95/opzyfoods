import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { FaCartPlus, FaUser, FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import './Nav.css';
import { CartContext } from "./CartContext";
import Cart from "./Cart"; // 👈 import it

function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false); // 👈 new
  const { cart } = useContext(CartContext);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <nav className="navbar">
        <img className='logo' src="/pp.jpeg" alt="" />

        <div className="hamburger" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>

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

              {/* 👇 cart icon now opens the drawer */}
              <div style={{ position: "relative" }} onClick={() => setCartOpen(true)}>
                <FaCartPlus className="icon" style={{ fontSize: "30px", cursor: "pointer" }} />
                {cart.reduce((t, i) => t + i.quantity, 0) > 0 && (
                  <span style={{
                    position: "absolute", top: "-8px", right: "-8px",
                    background: "red", color: "white", borderRadius: "50%",
                    padding: "2px 6px", fontSize: "12px",
                  }}>
                    {cart.reduce((t, i) => t + i.quantity, 0)}
                  </span>
                )}
              </div>

              <FaUser className="icon" />
            </div>
            <NavLink to="/menu" className="order-btn" onClick={closeMenu}>Order online</NavLink>
          </div>
        </div>
      </nav>

      {/* 👇 Cart drawer renders here, outside <nav> */}
      {cartOpen && <Cart onClose={() => setCartOpen(false)} />}
    </>
  );
}

export default Nav;