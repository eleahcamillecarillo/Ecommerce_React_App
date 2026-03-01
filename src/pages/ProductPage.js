import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import QuantityControl from '../components/QuantityControl';
import ProductCard from '../components/ProductCard';
import { formatCurrency } from '../utils/format';

const defaultSizes = ['XS', 'S', 'M', 'L'];
const defaultColors = ['Blush', 'Rose', 'Ivory'];

function ProductPage({ products, onAddToCart, onToggleWishlist, wishlistIds, onTrackRecentlyViewed }) {
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState('');
  const product = useMemo(() => products.find((item) => item.id === productId), [products, productId]);

  const sizes = product?.sizes || defaultSizes;
  const colors = product?.colors || defaultColors;
  const [size, setSize] = useState(sizes[1] || sizes[0]);
  const [color, setColor] = useState(colors[0]);

  useEffect(() => {
    if (product) {
      setSelectedImage(product.image);
      onTrackRecentlyViewed(product.id);
    }
  }, [product, onTrackRecentlyViewed]);

  const related = useMemo(() => {
    if (!product) return [];
    return products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 4);
  }, [products, product]);

  if (!product) {
    return (
      <main className="container section-space">
        <p className="empty-msg">Product unavailable.</p>
        <Link className="btn btn-secondary" to="/shop">
          Back to Shop
        </Link>
      </main>
    );
  }

  return (
    <main className="container section-space">
      <section className="product-page">
        <div>
          <img src={selectedImage || product.image} alt={product.name} className="product-detail-image" />
          <div className="thumb-row">
            {[product.image, ...(product.gallery || [])].slice(0, 4).map((img) => (
              <button key={img} className="thumb-btn" onClick={() => setSelectedImage(img)}>
                <img src={img} alt={product.name} />
              </button>
            ))}
          </div>
        </div>
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

          <div className="selector-wrap">
            <p>Size</p>
            <div className="selector-row">
              {sizes.map((entry) => (
                <button
                  key={entry}
                  className={`chip ${size === entry ? 'active' : ''}`}
                  onClick={() => setSize(entry)}
                >
                  {entry}
                </button>
              ))}
            </div>
          </div>

          <div className="selector-wrap">
            <p>Color</p>
            <div className="selector-row">
              {colors.map((entry) => (
                <button
                  key={entry}
                  className={`chip ${color === entry ? 'active' : ''}`}
                  onClick={() => setColor(entry)}
                >
                  {entry}
                </button>
              ))}
            </div>
          </div>

          <div className="detail-actions">
            <QuantityControl value={quantity} onChange={setQuantity} max={product.stock} />
            <button className="btn btn-primary" onClick={() => onAddToCart(product, quantity, { size, color })}>
              Add {quantity} to Cart
            </button>
            <button className="btn btn-secondary" onClick={() => onToggleWishlist(product)}>
              {wishlistIds.includes(product.id) ? 'Saved' : 'Save'}
            </button>
          </div>
          <div className="review-box">
            <h3>Rating Breakdown</h3>
            <p>5 stars: 72% | 4 stars: 18% | 3 stars: 7% | 2 stars: 2% | 1 star: 1%</p>
          </div>
        </section>
      </section>

      <section className="section-space">
        <div className="section-head">
          <h2>Related Products</h2>
        </div>
        <div className="product-grid">
          {related.map((item) => (
            <ProductCard
              key={item.id}
              product={item}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              inWishlist={wishlistIds.includes(item.id)}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default ProductPage;
