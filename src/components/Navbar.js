import React from 'react';
import { brand } from '../content/siteContent';

function Navbar({ route, onNavigate, cartCount, wishlistCount }) {
  const links = [
    { path: '/', label: 'Home' },
    { path: '/shop', label: 'Shop' },
    { path: '/about', label: 'About' },
    { path: '/cart', label: `Cart (${cartCount})` },
    { path: '/wishlist', label: `Wishlist (${wishlistCount})` }
  ];

  return (
    <header className="topbar">
      <p className="announcement">{brand.announcement}</p>
      <nav className="navbar container">
        <button className="brand" onClick={() => onNavigate('/')}>
          {brand.name}
        </button>
        <div className="nav-links">
          {links.map((link) => (
            <button
              key={link.path}
              className={`nav-link ${route === link.path ? 'active' : ''}`}
              onClick={() => onNavigate(link.path)}
            >
              {link.label}
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
