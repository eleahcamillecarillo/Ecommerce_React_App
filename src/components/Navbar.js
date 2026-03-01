import React from 'react';
import { NavLink } from 'react-router-dom';
import { brand, promoEndDate } from '../content/siteContent';
import PromoCountdown from './PromoCountdown';

function Navbar({ cartCount, wishlistCount, user, onLogout }) {
  const links = [
    { path: '/', label: 'Home' },
    { path: '/shop', label: 'Shop' },
    { path: '/about', label: 'About' },
    { path: '/faq', label: 'FAQ' },
    { path: '/orders', label: 'Orders' },
    { path: '/cart', label: `Cart (${cartCount})` },
    { path: '/wishlist', label: `Wishlist (${wishlistCount})` }
  ];

  return (
    <header className="topbar">
      <p className="announcement">
        {brand.announcement} <PromoCountdown targetDate={promoEndDate} />
      </p>
      <nav className="navbar container">
        <NavLink className="brand" to="/">
          {brand.name}
        </NavLink>
        <div className="nav-links">
          {links.map((link) => (
            <NavLink
              key={link.path}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              to={link.path}
            >
              {link.label}
            </NavLink>
          ))}
          {user ? (
            <>
              <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/account">
                My Account
              </NavLink>
              <button className="nav-link nav-button" onClick={onLogout}>
                Logout
              </button>
            </>
          ) : (
            <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/auth">
              Login / Sign Up
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
