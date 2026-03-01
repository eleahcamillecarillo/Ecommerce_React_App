import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './styles/base.css';
import './styles/layout.css';
import './styles/components.css';
import './styles/pages.css';
import './styles/animations.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';
import AboutPage from './pages/AboutPage';
import CheckoutPage from './pages/CheckoutPage';
import AccountPage from './pages/AccountPage';
import OrdersPage from './pages/OrdersPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import FAQPage from './pages/support/FAQPage';
import ShippingReturnsPage from './pages/support/ShippingReturnsPage';
import ContactPage from './pages/support/ContactPage';
import EmptyState from './components/EmptyState';
import { useShop } from './context/ShopContext';

function App() {
  const {
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
    addToCart,
    removeFromCart,
    updateCartQuantity,
    toggleWishlist,
    applyCoupon,
    placeOrder,
    login,
    logout,
    trackRecentlyViewed
  } = useShop();

  return (
    <div className="app-shell">
      <Navbar
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        wishlistCount={wishlistIds.length}
      />

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              products={products}
              recentlyViewed={recentlyViewed}
              onAddToCart={addToCart}
              onToggleWishlist={toggleWishlist}
              wishlistIds={wishlistIds}
            />
          }
        />
        <Route
          path="/shop"
          element={
            <ShopPage
              products={products}
              onAddToCart={addToCart}
              onToggleWishlist={toggleWishlist}
              wishlistIds={wishlistIds}
            />
          }
        />
        <Route
          path="/product/:productId"
          element={
            <ProductPage
              products={products}
              onAddToCart={addToCart}
              onToggleWishlist={toggleWishlist}
              wishlistIds={wishlistIds}
              onTrackRecentlyViewed={trackRecentlyViewed}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <CartPage
              cart={cart}
              couponCode={couponCode}
              totals={totals}
              products={products}
              onRemove={removeFromCart}
              onQuantityChange={updateCartQuantity}
              onApplyCoupon={applyCoupon}
            />
          }
        />
        <Route
          path="/checkout"
          element={<CheckoutPage cart={cart} totals={totals} onPlaceOrder={placeOrder} />}
        />
        <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage orders={orders} />} />
        <Route path="/wishlist" element={<WishlistPage wishlist={wishlist} onAddToCart={addToCart} onToggleWishlist={toggleWishlist} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/shipping-returns" element={<ShippingReturnsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/account" element={<AccountPage user={user} onLogin={login} onLogout={logout} />} />
        <Route path="/orders" element={<OrdersPage orders={orders} />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route
          path="*"
          element={
            <main className="container section-space">
              <EmptyState title="Page not found" text="This page does not exist." actionLabel="Back Home" onAction={() => (window.location.href = '/')} />
            </main>
          }
        />
      </Routes>

      <Footer />
      <Toast message={toast} />
    </div>
  );
}

export default App;
