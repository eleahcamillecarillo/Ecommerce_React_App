import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import productsData from '../data/products.json';
import { calculateTotals, safeParse } from '../utils/store';

const ShopContext = createContext(null);

const STORAGE_KEYS = {
  cart: 'kramille_cart',
  wishlist: 'kramille_wishlist',
  orders: 'kramille_orders',
  user: 'kramille_user',
  recentlyViewed: 'kramille_recently_viewed'
};

export function ShopProvider({ children }) {
  const [products] = useState(productsData);
  const [cart, setCart] = useState(() => safeParse(localStorage.getItem(STORAGE_KEYS.cart), []));
  const [wishlistIds, setWishlistIds] = useState(() =>
    safeParse(localStorage.getItem(STORAGE_KEYS.wishlist), [])
  );
  const [orders, setOrders] = useState(() => safeParse(localStorage.getItem(STORAGE_KEYS.orders), []));
  const [user, setUser] = useState(() => safeParse(localStorage.getItem(STORAGE_KEYS.user), null));
  const [recentlyViewedIds, setRecentlyViewedIds] = useState(() =>
    safeParse(localStorage.getItem(STORAGE_KEYS.recentlyViewed), [])
  );
  const [couponCode, setCouponCode] = useState('');
  const [toast, setToast] = useState('');

  useEffect(() => localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cart)), [cart]);
  useEffect(
    () => localStorage.setItem(STORAGE_KEYS.wishlist, JSON.stringify(wishlistIds)),
    [wishlistIds]
  );
  useEffect(() => localStorage.setItem(STORAGE_KEYS.orders, JSON.stringify(orders)), [orders]);
  useEffect(() => localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user)), [user]);
  useEffect(
    () => localStorage.setItem(STORAGE_KEYS.recentlyViewed, JSON.stringify(recentlyViewedIds)),
    [recentlyViewedIds]
  );

  useEffect(() => {
    if (!toast) return undefined;
    const timeout = setTimeout(() => setToast(''), 1600);
    return () => clearTimeout(timeout);
  }, [toast]);

  const totals = useMemo(() => calculateTotals({ cart, couponCode }), [cart, couponCode]);
  const wishlist = useMemo(
    () => products.filter((product) => wishlistIds.includes(product.id)),
    [products, wishlistIds]
  );
  const recentlyViewed = useMemo(
    () => recentlyViewedIds.map((id) => products.find((item) => item.id === id)).filter(Boolean),
    [products, recentlyViewedIds]
  );

  const addToCart = (product, quantity = 1, selection = {}) => {
    setCart((current) => {
      const id = `${product.id}-${selection.size || 'default'}-${selection.color || 'default'}`;
      const index = current.findIndex((item) => item.cartId === id);
      if (index > -1) {
        const updated = [...current];
        const nextQty = Math.min(product.stock, updated[index].quantity + quantity);
        updated[index] = { ...updated[index], quantity: nextQty };
        return updated;
      }

      return [
        ...current,
        {
          ...product,
          cartId: id,
          quantity: Math.min(quantity, product.stock),
          selectedSize: selection.size || null,
          selectedColor: selection.color || null
        }
      ];
    });
    setToast(`${product.name} added to cart`);
  };

  const removeFromCart = (cartId) => {
    setCart((current) => current.filter((item) => item.cartId !== cartId));
    setToast('Item removed from cart');
  };

  const updateCartQuantity = (cartId, quantity) => {
    setCart((current) =>
      current.map((item) =>
        item.cartId === cartId
          ? { ...item, quantity: Math.max(1, Math.min(item.stock, quantity)) }
          : item
      )
    );
  };

  const toggleWishlist = (product) => {
    setWishlistIds((current) => {
      if (current.includes(product.id)) {
        setToast(`${product.name} removed from wishlist`);
        return current.filter((id) => id !== product.id);
      }
      setToast(`${product.name} saved to wishlist`);
      return [...current, product.id];
    });
  };

  const trackRecentlyViewed = (productId) => {
    setRecentlyViewedIds((current) => {
      const next = [productId, ...current.filter((id) => id !== productId)].slice(0, 8);
      return next;
    });
  };

  const applyCoupon = (code) => {
    setCouponCode(code.trim().toUpperCase());
  };

  const clearCart = () => {
    setCart([]);
    setCouponCode('');
  };

  const placeOrder = ({ shipping, payment }) => {
    const order = {
      id: `ORD-${Date.now()}`,
      placedAt: new Date().toISOString(),
      items: cart,
      totals,
      shipping,
      payment
    };
    setOrders((current) => [order, ...current]);
    clearCart();
    return order;
  };

  const login = (payload) => {
    setUser(payload);
    setToast(`Welcome, ${payload.firstName}`);
  };

  const logout = () => setUser(null);

  const value = {
    products,
    cart,
    wishlist,
    wishlistIds,
    orders,
    user,
    recentlyViewed,
    couponCode,
    totals,
    toast,
    setToast,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    toggleWishlist,
    applyCoupon,
    clearCart,
    placeOrder,
    login,
    logout,
    trackRecentlyViewed
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) throw new Error('useShop must be used within ShopProvider');
  return context;
}
