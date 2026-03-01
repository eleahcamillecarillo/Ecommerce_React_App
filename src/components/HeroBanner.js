import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function HeroBanner() {
  const navigate = useNavigate();

  return (
    <section className="hero container">
      <div className="hero-panel">
        <p className="eyebrow">Kramille's Signature Edit</p>
        <h1>Minimal pieces in soft pink hues.</h1>
        <p>
          Build a calm wardrobe with clean shapes, lightweight fabrics, and elegant basics.
        </p>
        <div className="form-actions">
          <button className="btn btn-primary" onClick={() => navigate('/shop')}>
            Shop Collection
          </button>
          <Link className="btn btn-secondary" to="/shipping-returns">
            Shipping Info
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;
