import React from 'react';
import { formatCurrency } from '../utils/format';

function FreeShippingBar({ subtotal, freeShippingLeft, threshold }) {
  const progress = Math.min(100, (subtotal / threshold) * 100);

  return (
    <div className="free-ship-wrap">
      <p>
        {freeShippingLeft > 0
          ? `Add ${formatCurrency(freeShippingLeft)} more for free shipping`
          : 'You unlocked free shipping!'}
      </p>
      <div className="free-ship-track">
        <span style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}

export default FreeShippingBar;
