import React from 'react';

function CheckoutSteps({ step }) {
  const steps = ['Shipping', 'Payment', 'Review'];
  return (
    <div className="step-track">
      {steps.map((label, index) => (
        <div key={label} className={`step-item ${index + 1 <= step ? 'active' : ''}`}>
          <span>{index + 1}</span>
          <p>{label}</p>
        </div>
      ))}
    </div>
  );
}

export default CheckoutSteps;
