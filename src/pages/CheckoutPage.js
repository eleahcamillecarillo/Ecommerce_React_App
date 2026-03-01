import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/checkout/CheckoutSteps';
import EmptyState from '../components/EmptyState';
import { formatCurrency } from '../utils/format';

function CheckoutPage({ cart, totals, onPlaceOrder }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [shipping, setShipping] = useState({ fullName: '', email: '', address: '', city: '', country: '' });
  const [payment, setPayment] = useState({ method: 'Card', cardName: '', cardLast4: '' });

  if (!cart.length) {
    return (
      <main className="container section-space">
        <EmptyState
          title="Cart is empty"
          text="Add products before checkout."
          actionLabel="Go to Shop"
          onAction={() => navigate('/shop')}
        />
      </main>
    );
  }

  const submitOrder = () => {
    const order = onPlaceOrder({ shipping, payment });
    navigate(`/order-confirmation/${order.id}`);
  };

  return (
    <main className="container section-space checkout-page">
      <h1>Checkout</h1>
      <CheckoutSteps step={step} />

      {step === 1 && (
        <section className="form-card">
          <h2>Shipping</h2>
          <input placeholder="Full Name" value={shipping.fullName} onChange={(e) => setShipping({ ...shipping, fullName: e.target.value })} />
          <input placeholder="Email" value={shipping.email} onChange={(e) => setShipping({ ...shipping, email: e.target.value })} />
          <input placeholder="Address" value={shipping.address} onChange={(e) => setShipping({ ...shipping, address: e.target.value })} />
          <input placeholder="City" value={shipping.city} onChange={(e) => setShipping({ ...shipping, city: e.target.value })} />
          <input placeholder="Country" value={shipping.country} onChange={(e) => setShipping({ ...shipping, country: e.target.value })} />
          <button className="btn btn-primary" onClick={() => setStep(2)} disabled={!shipping.fullName || !shipping.email || !shipping.address}>
            Continue to Payment
          </button>
        </section>
      )}

      {step === 2 && (
        <section className="form-card">
          <h2>Payment</h2>
          <select value={payment.method} onChange={(e) => setPayment({ ...payment, method: e.target.value })}>
            <option>Card</option>
            <option>Cash on Delivery</option>
            <option>GCash</option>
          </select>
          <input placeholder="Card Holder Name" value={payment.cardName} onChange={(e) => setPayment({ ...payment, cardName: e.target.value })} />
          <input placeholder="Last 4 Digits" value={payment.cardLast4} onChange={(e) => setPayment({ ...payment, cardLast4: e.target.value })} maxLength={4} />
          <div className="form-actions">
            <button className="btn btn-secondary" onClick={() => setStep(1)}>Back</button>
            <button className="btn btn-primary" onClick={() => setStep(3)}>Review Order</button>
          </div>
        </section>
      )}

      {step === 3 && (
        <section className="form-card">
          <h2>Review</h2>
          <p>Items: {cart.length}</p>
          <p>Ship to: {shipping.fullName}, {shipping.address}</p>
          <p>Payment: {payment.method}</p>
          <h3>Total: {formatCurrency(totals.total)}</h3>
          <div className="form-actions">
            <button className="btn btn-secondary" onClick={() => setStep(2)}>Back</button>
            <button className="btn btn-primary" onClick={submitOrder}>Place Order</button>
          </div>
        </section>
      )}
    </main>
  );
}

export default CheckoutPage;
