import React from 'react';

function FreeShippingBar({ subtotal, freeShippingLeft, threshold }) {
  const progress = Math.min(100, (subtotal / threshold) * 100);

  return (
    <div className="free-ship-wrap">
      <p>
        {freeShippingLeft > 0
          ? `Add $${freeShippingLeft.toFixed(2)} more for free shipping`
          : 'You unlocked free shipping!'}
      </p>
      <div className="free-ship-track">
        <span style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}

export default FreeShippingBar;
