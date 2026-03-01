import React from 'react';

function ShippingReturnsPage() {
  return (
    <main className="container section-space">
      <h1>Shipping and Returns</h1>
      <div className="info-grid">
        <article>
          <h2>Shipping</h2>
          <p>Free shipping over $60. Standard rates apply below threshold.</p>
          <p>Tracking details are sent by email after dispatch.</p>
        </article>
        <article>
          <h2>Returns</h2>
          <p>Request return within 7 days from delivery.</p>
          <p>Items must be unused, unwashed, and with complete tags.</p>
        </article>
      </div>
    </main>
  );
}

export default ShippingReturnsPage;
