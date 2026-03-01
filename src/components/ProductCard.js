import React from 'react';
import { formatCurrency } from '../utils/format';

function ProductCard({ product, onView, onAddToCart, onToggleWishlist, inWishlist }) {
  return (
    <article className="product-card">
      <div className="image-wrap" onClick={() => onView(product.id)} role="button" tabIndex={0}>
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-meta">
        <p className="category">{product.category}</p>
        <h3 onClick={() => onView(product.id)}>{product.name}</h3>
        <p className="price-row">
          <strong>{formatCurrency(product.price)}</strong>
          <span>{formatCurrency(product.originalPrice)}</span>
        </p>
        <p className="rating">{product.rating} star ({product.reviews} reviews)</p>
        <div className="card-actions">
          <button className="btn btn-primary" onClick={() => onAddToCart(product)}>
            Add to Cart
          </button>
          <button
            className={`btn btn-secondary ${inWishlist ? 'active' : ''}`}
            onClick={() => onToggleWishlist(product)}
          >
            {inWishlist ? 'Saved' : 'Save'}
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
