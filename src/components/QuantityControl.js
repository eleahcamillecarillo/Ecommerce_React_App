import React from 'react';

function QuantityControl({ value, onChange, max }) {
  return (
    <div className="qty-control">
      <button onClick={() => onChange(Math.max(1, value - 1))}>-</button>
      <span>{value}</span>
      <button onClick={() => onChange(Math.min(max, value + 1))}>+</button>
    </div>
  );
}

export default QuantityControl;
