import React from 'react';
import ProductCard from './ProductCard';

function QuickViewModal({ product, open, onClose, onAddToCart, onToggleWishlist, inWishlist, onViewFull }) {
  if (!open || !product) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="button" tabIndex={0}>
      <div className="modal-panel" onClick={(event) => event.stopPropagation()}>
        <div className="section-head">
          <h2>Quick View</h2>
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
        <ProductCard
          product={product}
          onView={onViewFull}
          onAddToCart={onAddToCart}
          onToggleWishlist={onToggleWishlist}
          inWishlist={inWishlist}
        />
      </div>
    </div>
  );
}

export default QuickViewModal;
