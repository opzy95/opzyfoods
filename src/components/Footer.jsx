import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <div>
    <footer className="footer">
      <div className="footer-content">
        <p>Delicious meals served with love 🍔🍟</p>
        <p>Email: <a href="mailto:opzyenterprise@gmail.com">opzyenterprise@gmail.com</a></p>
        <p>&copy; {new Date().getFullYear()} Opzy Enterprise. All Rights Reserved.</p>
      </div>
    </footer>
    </div>
  );
}

export default Footer;