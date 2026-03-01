export const SHIPPING_FEE = 99;
export const FREE_SHIPPING_THRESHOLD = 2000;

const COUPONS = {
  WELCOME10: { type: 'percent', value: 10 },
  PINK15: { type: 'percent', value: 15 },
  SAVE5: { type: 'fixed', value: 200 }
};

export const getCoupon = (code) => COUPONS[code?.toUpperCase()] || null;

export const calculateTotals = ({ cart, couponCode = '' }) => {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const coupon = getCoupon(couponCode);
  const discount = coupon
    ? coupon.type === 'percent'
      ? (subtotal * coupon.value) / 100
      : coupon.value
    : 0;
  const boundedDiscount = Math.min(discount, subtotal);
  const shipping = subtotal > 0 && subtotal < FREE_SHIPPING_THRESHOLD ? SHIPPING_FEE : 0;
  const total = Math.max(0, subtotal - boundedDiscount + shipping);

  return {
    subtotal,
    discount: boundedDiscount,
    shipping,
    total,
    freeShippingLeft: Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal),
    coupon
  };
};

export const safeParse = (raw, fallback) => {
  try {
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};
