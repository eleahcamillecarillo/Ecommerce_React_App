import React from 'react';

function HeroBanner({ onBrowse }) {
  return (
    <section className="hero container">
      <div className="hero-panel">
        <p className="eyebrow">Kramille's Signature Edit</p>
        <h1>Minimal pieces in soft pink hues.</h1>
        <p>
          Build a calm wardrobe with clean shapes, lightweight fabrics, and elegant basics.
        </p>
        <button className="btn btn-primary" onClick={onBrowse}>
          Shop Collection
        </button>
      </div>
    </section>
  );
}

export default HeroBanner;
