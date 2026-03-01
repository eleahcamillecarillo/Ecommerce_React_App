import { calculateTotals, getCoupon } from './store';

describe('store totals', () => {
  test('applies percentage coupon', () => {
    const result = calculateTotals({
      cart: [{ price: 2500, quantity: 1 }, { price: 700, quantity: 1 }],
      couponCode: 'WELCOME10'
    });

    expect(result.subtotal).toBe(3200);
    expect(result.discount).toBe(320);
    expect(result.shipping).toBe(0);
    expect(result.total).toBe(2880);
  });

  test('applies fixed coupon with shipping', () => {
    const result = calculateTotals({
      cart: [{ price: 1000, quantity: 1 }],
      couponCode: 'SAVE5'
    });

    expect(result.discount).toBe(200);
    expect(result.shipping).toBe(99);
    expect(result.total).toBe(899);
  });

  test('returns null for invalid coupon', () => {
    expect(getCoupon('NOTVALID')).toBeNull();
  });
});
