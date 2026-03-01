import React, { useEffect, useState } from 'react';

const getRemaining = (targetDate) => {
  const ms = new Date(targetDate).getTime() - Date.now();
  if (ms <= 0) return 'Promo ended';
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
  return `${days}d ${hours}h left`;
};

function PromoCountdown({ targetDate }) {
  const [text, setText] = useState(getRemaining(targetDate));

  useEffect(() => {
    const interval = setInterval(() => setText(getRemaining(targetDate)), 60000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return <span className="countdown-pill">Limited Promo: {text}</span>;
}

export default PromoCountdown;
