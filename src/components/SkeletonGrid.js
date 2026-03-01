import React from 'react';

function SkeletonGrid() {
  return (
    <div className="product-grid">
      {Array.from({ length: 8 }).map((_, index) => (
        <article key={index} className="product-card skeleton-card">
          <div className="skeleton-image" />
          <div className="product-meta">
            <div className="skeleton-line" />
            <div className="skeleton-line small" />
            <div className="skeleton-line" />
          </div>
        </article>
      ))}
    </div>
  );
}

export default SkeletonGrid;
