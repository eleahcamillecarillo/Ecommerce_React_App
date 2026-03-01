import React from 'react';
import { NavLink } from 'react-router-dom';
import { brand, promoEndDate } from '../content/siteContent';
import PromoCountdown from './PromoCountdown';

function Navbar({ cartCount, wishlistCount }) {
  const links = [
    { path: '/', label: 'Home' },
    { path: '/shop', label: 'Shop' },
    { path: '/about', label: 'About' },
    { path: '/faq', label: 'FAQ' },
    { path: '/account', label: 'Account' },
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
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
