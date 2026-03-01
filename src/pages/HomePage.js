import React from 'react';
import { Link } from 'react-router-dom';
import HeroBanner from '../components/HeroBanner';
import ProductCard from '../components/ProductCard';
import { brand, homeHighlights } from '../content/siteContent';

function HomePage({ products, recentlyViewed, onAddToCart, onToggleWishlist, wishlistIds }) {
  const featured = products.slice(0, 4);

  return (
    <main>
      <HeroBanner />
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
          <Link className="btn btn-secondary" to="/shop">
            View All
          </Link>
        </div>
        <div className="featured-grid">
          {featured.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              inWishlist={wishlistIds.includes(product.id)}
              showDescription
              className="featured-card"
            />
          ))}
        </div>
      </section>

      {recentlyViewed.length > 0 && (
        <section className="container section-space">
          <div className="section-head">
            <h2>Recently Viewed</h2>
          </div>
          <div className="product-grid">
            {recentlyViewed.slice(0, 4).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist}
                inWishlist={wishlistIds.includes(product.id)}
              />
            ))}
          </div>
        </section>
      )}

      <section className="container about-strip">
        <h2>{brand.tagline}</h2>
      </section>
    </main>
  );
}

export default HomePage;
