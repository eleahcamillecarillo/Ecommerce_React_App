import { calculateTotals, getCoupon } from './store';

describe('store totals', () => {
  test('applies percentage coupon', () => {
    const result = calculateTotals({
      cart: [{ price: 50, quantity: 1 }, { price: 20, quantity: 1 }],
      couponCode: 'WELCOME10'
    });

    expect(result.subtotal).toBe(70);
    expect(result.discount).toBe(7);
    expect(result.shipping).toBe(0);
    expect(result.total).toBe(63);
  });

  test('applies fixed coupon with shipping', () => {
    const result = calculateTotals({
      cart: [{ price: 20, quantity: 1 }],
      couponCode: 'SAVE5'
    });

    expect(result.discount).toBe(5);
    expect(result.shipping).toBe(6);
    expect(result.total).toBe(21);
  });

  test('returns null for invalid coupon', () => {
    expect(getCoupon('NOTVALID')).toBeNull();
  });
});
