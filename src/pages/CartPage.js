import React from 'react';
import { Link } from 'react-router-dom';
import QuantityControl from '../components/QuantityControl';
import CouponInput from '../components/CouponInput';
import FreeShippingBar from '../components/FreeShippingBar';
import EmptyState from '../components/EmptyState';
import { formatCurrency } from '../utils/format';
import { FREE_SHIPPING_THRESHOLD } from '../utils/store';

function CartPage({
  cart,
  couponCode,
  totals,
  products,
  onRemove,
  onQuantityChange,
  onApplyCoupon
}) {
  if (!cart.length) {
    return (
      <main className="container section-space">
        <h1>Your Cart</h1>
        <EmptyState
          title="Your cart is empty"
          text="Add your favorite blush pieces to start checkout."
          actionLabel="Browse Shop"
          onAction={() => (window.location.href = '/shop')}
        />
      </main>
    );
  }

  const suggestions = products.filter((product) => !cart.some((item) => item.id === product.id)).slice(0, 4);

  return (
    <main className="container section-space">
      <h1>Your Cart</h1>
      <FreeShippingBar
        subtotal={totals.subtotal}
        freeShippingLeft={totals.freeShippingLeft}
        threshold={FREE_SHIPPING_THRESHOLD}
      />
      <div className="cart-list">
        {cart.map((item) => (
          <article key={item.cartId} className="cart-item">
            <img src={item.image} alt={item.name} />
            <div>
              <h2>{item.name}</h2>
              <p>{formatCurrency(item.price)}</p>
              {item.selectedSize && <p className="mini-meta">Size: {item.selectedSize}</p>}
              {item.selectedColor && <p className="mini-meta">Color: {item.selectedColor}</p>}
            </div>
            <QuantityControl
              value={item.quantity}
              max={item.stock}
              onChange={(qty) => onQuantityChange(item.cartId, qty)}
            />
            <button className="btn btn-secondary" onClick={() => onRemove(item.cartId)}>
              Remove
            </button>
          </article>
        ))}
      </div>
      <div className="checkout-box checkout-grid">
        <CouponInput couponCode={couponCode} onApply={onApplyCoupon} />
        <p>Subtotal: {formatCurrency(totals.subtotal)}</p>
        <p>Discount: -{formatCurrency(totals.discount)}</p>
        <p>Shipping: {formatCurrency(totals.shipping)}</p>
        <h2>Total: {formatCurrency(totals.total)}</h2>
        <Link className="btn btn-primary" to="/checkout">
          Proceed to Checkout
        </Link>
      </div>

      <section className="section-space">
        <div className="section-head">
          <h2>Continue Shopping</h2>
          <Link className="btn btn-secondary" to="/shop">
            View more
          </Link>
        </div>
        <div className="product-grid">
          {suggestions.map((item) => (
            <article className="mini-suggest" key={item.id}>
              <img src={item.image} alt={item.name} />
              <h3>{item.name}</h3>
              <p>{formatCurrency(item.price)}</p>
              <Link className="btn btn-secondary" to={`/product/${item.id}`}>
                View
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default CartPage;
