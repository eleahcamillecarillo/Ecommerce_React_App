import React from 'react';
import ProductCard from '../components/ProductCard';

function WishlistPage({ wishlist, onNavigate, onAddToCart, onToggleWishlist }) {
  return (
    <main className="container section-space">
      <h1>Your Wishlist</h1>
      {!wishlist.length && <p className="empty-msg">No saved items yet.</p>}
      <div className="product-grid">
        {wishlist.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onView={(id) => onNavigate(`/product/${id}`)}
            onAddToCart={onAddToCart}
            onToggleWishlist={onToggleWishlist}
            inWishlist
          />
        ))}
      </div>
    </main>
  );
}

export default WishlistPage;
