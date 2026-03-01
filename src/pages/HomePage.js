import React from 'react';
import HeroBanner from '../components/HeroBanner';
import ProductCard from '../components/ProductCard';
import { brand, homeHighlights } from '../content/siteContent';

function HomePage({ products, onNavigate, onAddToCart, onToggleWishlist, wishlistIds }) {
  const featured = products.slice(0, 4);

  return (
    <main>
      <HeroBanner onBrowse={() => onNavigate('/shop')} />
      <section className="container highlights">
        {homeHighlights.map((item) => (
          <article key={item.title}>
            <h2>{item.title}</h2>
            <p>{item.text}</p>
          </article>
        ))}
      </section>
      <section className="container section-space">
        <div className="section-head">
          <h2>Featured Picks</h2>
          <button className="btn btn-secondary" onClick={() => onNavigate('/shop')}>
            View All
          </button>
        </div>
        <div className="product-grid">
          {featured.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onView={(id) => onNavigate(`/product/${id}`)}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              inWishlist={wishlistIds.includes(product.id)}
            />
          ))}
        </div>
      </section>
      <section className="container about-strip">
        <h2>{brand.tagline}</h2>
      </section>
    </main>
  );
}

export default HomePage;
