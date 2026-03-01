import React from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../utils/format';

function ProductCard({
  product,
  onAddToCart,
  onToggleWishlist,
  inWishlist,
  showDescription = false,
  className = '',
  linkTo
}) {
  const targetLink = linkTo || `/product/${product.id}`;

  return (
    <article className={`product-card ${className}`.trim()}>
      <Link className="image-wrap" to={targetLink}>
        <img src={product.image} alt={product.name} />
      </Link>
      <div className="product-meta">
        <p className="category">{product.category}</p>
        <Link to={targetLink} className="product-link">
          <h3>{product.name}</h3>
        </Link>
        <p className="price-row">
          <strong>{formatCurrency(product.price)}</strong>
          <span>{formatCurrency(product.originalPrice)}</span>
        </p>
        {showDescription ? <p className="product-desc">{product.description}</p> : null}
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
