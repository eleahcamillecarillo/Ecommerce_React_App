import React, { useEffect, useState } from 'react';
import QuantityControl from '../components/QuantityControl';
import { fetchProductById } from '../utils/api';
import { formatCurrency } from '../utils/format';

function ProductPage({ productId, onAddToCart, onNavigate }) {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;

    fetchProductById(productId)
      .then((item) => {
        if (mounted) {
          setProduct(item);
          setError('');
        }
      })
      .catch(() => {
        if (mounted) setError('Product unavailable.');
      });

    return () => {
      mounted = false;
    };
  }, [productId]);

  if (error) {
    return (
      <main className="container section-space">
        <p className="empty-msg">{error}</p>
        <button className="btn btn-secondary" onClick={() => onNavigate('/shop')}>
          Back to Shop
        </button>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="container section-space">
        <p className="empty-msg">Loading product...</p>
      </main>
    );
  }

  return (
    <main className="container section-space product-page">
      <img src={product.image} alt={product.name} className="product-detail-image" />
      <section>
        <p className="category">{product.category}</p>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p className="price-row detail-price">
          <strong>{formatCurrency(product.price)}</strong>
          <span>{formatCurrency(product.originalPrice)}</span>
        </p>
        <p className="rating">{product.rating} star ({product.reviews} reviews)</p>
        <p className="stock">{product.stock} pieces available</p>

        <div className="detail-actions">
          <QuantityControl value={quantity} onChange={setQuantity} max={product.stock} />
          <button className="btn btn-primary" onClick={() => onAddToCart(product, quantity)}>
            Add {quantity} to Cart
          </button>
        </div>
      </section>
    </main>
  );
}

export default ProductPage;
