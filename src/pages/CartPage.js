import React from 'react';
import QuantityControl from '../components/QuantityControl';
import { formatCurrency } from '../utils/format';

function CartPage({ cart, onNavigate, onRemove, onQuantityChange }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!cart.length) {
    return (
      <main className="container section-space">
        <h1>Your Cart</h1>
        <p className="empty-msg">Your cart is empty.</p>
        <button className="btn btn-primary" onClick={() => onNavigate('/shop')}>
          Start Shopping
        </button>
      </main>
    );
  }

  return (
    <main className="container section-space">
      <h1>Your Cart</h1>
      <div className="cart-list">
        {cart.map((item) => (
          <article key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} />
            <div>
              <h2>{item.name}</h2>
              <p>{formatCurrency(item.price)}</p>
            </div>
            <QuantityControl
              value={item.quantity}
              max={item.stock}
              onChange={(qty) => onQuantityChange(item.id, qty)}
            />
            <button className="btn btn-secondary" onClick={() => onRemove(item.id)}>
              Remove
            </button>
          </article>
        ))}
      </div>
      <div className="checkout-box">
        <p>Subtotal</p>
        <h2>{formatCurrency(total)}</h2>
        <button className="btn btn-primary">Proceed to Checkout</button>
      </div>
    </main>
  );
}

export default CartPage;
