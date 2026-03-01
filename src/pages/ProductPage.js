import React, { useMemo, useState } from 'react';
import QuantityControl from '../components/QuantityControl';
import { formatCurrency } from '../utils/format';

function ProductPage({ productId, products, onAddToCart, onNavigate }) {
  const [quantity, setQuantity] = useState(1);
  const product = useMemo(() => products.find((item) => item.id === productId), [products, productId]);

  if (!product) {
    return (
      <main className="container section-space">
        <p className="empty-msg">Product unavailable.</p>
        <button className="btn btn-secondary" onClick={() => onNavigate('/shop')}>
          Back to Shop
        </button>
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
