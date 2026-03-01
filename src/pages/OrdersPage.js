import React from 'react';
import EmptyState from '../components/EmptyState';
import { formatCurrency } from '../utils/format';

function OrdersPage({ orders }) {
  return (
    <main className="container section-space">
      <h1>Order History</h1>
      {!orders.length ? (
        <EmptyState
          title="No orders yet"
          text="Your completed orders will appear here."
          actionLabel="Start Shopping"
          onAction={() => (window.location.href = '/shop')}
        />
      ) : (
        <div className="order-list">
          {orders.map((order) => (
            <article className="order-card" key={order.id}>
              <h2>{order.id}</h2>
              <p>{new Date(order.placedAt).toLocaleString()}</p>
              <p>{order.items.length} items</p>
              <p>Total: {formatCurrency(order.totals.total)}</p>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

export default OrdersPage;
