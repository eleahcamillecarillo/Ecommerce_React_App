import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <p>Designed with blush minimalism.</p>
        <div className="footer-links">
          <Link to="/faq">FAQ</Link>
          <Link to="/shipping-returns">Shipping and Returns</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <p>2026 Kramille's Closet. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
