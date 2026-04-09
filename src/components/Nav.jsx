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
  
  // ✅ Ref wraps the ENTIRE navbar, not just the menu
  const navRef = useRef(null);

  const toggleMenu = () => setIsOpen(prev => !prev);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // ✅ If click is outside the whole navbar, close menu
      if (navRef.current && !navRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []); // ✅ Empty dependency array — listener stays active always

  return (
    <>
      {/* ✅ ref is on the whole <nav>, not just menu-container */}
      <nav className="navbar" ref={navRef}>
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
              <FaSearch className="icon" onClick={closeMenu} />

              {/* ✅ Removed e.stopPropagation() — it was blocking outside-click */}
              <div
                style={{ position: "relative", cursor: "pointer" }}
                onClick={() => {
                  setCartOpen(true); // open cart drawer
                  closeMenu();       // close mobile menu
                }}
              >
                <FaCartPlus className="icon" style={{ fontSize: "30px" }} />
                {cart.length > 0 && (
                  <span style={{
                    position: "absolute", top: "-8px", right: "-8px",
                    background: "red", color: "white", borderRadius: "50%",
                    padding: "2px 6px", fontSize: "12px"
                  }}>
                    {cart.length}
                  </span>
                )}
              </div>

              <FaUser className="icon" onClick={closeMenu} />
            </div>
            <NavLink to="/menu" className="order-btn" onClick={closeMenu}>Order online</NavLink>
          </div>
        </div>
      </nav>

      {cartOpen && <Cart onClose={() => setCartOpen(false)} />}
    </>
  );
}

export default Nav;