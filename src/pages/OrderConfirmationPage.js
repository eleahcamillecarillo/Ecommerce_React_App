import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { formatCurrency } from '../utils/format';

function OrderConfirmationPage({ orders }) {
  const { orderId } = useParams();
  const order = orders.find((entry) => entry.id === orderId);

  if (!order) {
    return (
      <main className="container section-space">
        <p className="empty-msg">Order not found.</p>
        <Link className="btn btn-secondary" to="/orders">View Orders</Link>
      </main>
    );
  }

  return (
    <main className="container section-space">
      <div className="confirm-box">
        <h1>Order Confirmed</h1>
        <p>Order ID: {order.id}</p>
        <p>Placed: {new Date(order.placedAt).toLocaleString()}</p>
        <p>Total Paid: {formatCurrency(order.totals.total)}</p>
        <div className="form-actions">
          <Link className="btn btn-secondary" to="/orders">Order History</Link>
          <Link className="btn btn-primary" to="/shop">Shop More</Link>
        </div>
      </div>
    </main>
  );
}

export default OrderConfirmationPage;
