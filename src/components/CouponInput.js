import React, { useState } from 'react';

function CouponInput({ couponCode, onApply }) {
  const [value, setValue] = useState(couponCode || '');

  return (
    <form
      className="coupon-form"
      onSubmit={(event) => {
        event.preventDefault();
        onApply(value);
      }}
    >
      <input
        value={value}
        onChange={(event) => setValue(event.target.value.toUpperCase())}
        placeholder="Coupon code (WELCOME10)"
      />
      <button className="btn btn-secondary" type="submit">
        Apply
      </button>
    </form>
  );
}

export default CouponInput;
