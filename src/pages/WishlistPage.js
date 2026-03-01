import React from 'react';
import ProductCard from '../components/ProductCard';
import EmptyState from '../components/EmptyState';

function WishlistPage({ wishlist, onAddToCart, onToggleWishlist }) {
  return (
    <main className="container section-space">
      <h1>Your Wishlist</h1>
      {!wishlist.length ? (
        <EmptyState
          title="No saved items yet"
          text="Use the Save button on products you love."
          actionLabel="Explore Shop"
          onAction={() => (window.location.href = '/shop')}
        />
      ) : (
        <div className="product-grid">
          {wishlist.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              inWishlist
            />
          ))}
        </div>
      )}
    </main>
  );
}

export default WishlistPage;
