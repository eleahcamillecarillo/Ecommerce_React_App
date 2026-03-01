import React from 'react';

function AboutPage() {
  return (
    <main className="container section-space about-page">
      <h1>About Kramille's Closet</h1>
      <p>
        Kramille's Closet is a pink-inspired minimalist fashion shop made for soft, wearable
        pieces that fit every routine.
      </p>
      <p>
        Every collection is curated to mix easily, feel comfortable, and stay elegant over time.
      </p>
      <div className="about-grid">
        <article>
          <h2>Our Style</h2>
          <p>Neutral silhouettes with blush accents and clean details.</p>
        </article>
        <article>
          <h2>Our Promise</h2>
          <p>Quality essentials, transparent pricing, and quick support.</p>
        </article>
        <article>
          <h2>Our Mission</h2>
          <p>Make daily styling calm, confident, and simple.</p>
        </article>
      </div>
    </main>
  );
}

export default AboutPage;
