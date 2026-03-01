import React from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../utils/format';

function ProductCard({ product, onAddToCart, onToggleWishlist, inWishlist }) {
  return (
    <article className="product-card">
      <Link className="image-wrap" to={`/product/${product.id}`}>
        <img src={product.image} alt={product.name} />
      </Link>
      <div className="product-meta">
        <p className="category">{product.category}</p>
        <Link to={`/product/${product.id}`} className="product-link">
          <h3>{product.name}</h3>
        </Link>
        <p className="price-row">
          <strong>{formatCurrency(product.price)}</strong>
          <span>{formatCurrency(product.originalPrice)}</span>
        </p>
        <p className="rating">{product.rating} star ({product.reviews} reviews)</p>
        {product.tags?.length ? (
          <p className="tag-row">{product.tags.map((tag) => `#${tag}`).join(' ')}</p>
        ) : null}
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
