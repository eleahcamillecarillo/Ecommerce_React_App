import React, { useEffect, useMemo, useState } from 'react';
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
import { fetchProducts } from './utils/api';

const getPath = () => window.location.pathname || '/';

function App() {
  const [route, setRoute] = useState(getPath());
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');

  const [cart, setCart] = useState(() => {
    const raw = localStorage.getItem('kramille_cart');
    return raw ? JSON.parse(raw) : [];
  });

  const [wishlistIds, setWishlistIds] = useState(() => {
    const raw = localStorage.getItem('kramille_wishlist');
    return raw ? JSON.parse(raw) : [];
  });

  useEffect(() => {
    fetchProducts()
      .then((items) => {
        setProducts(items);
        setError('');
      })
      .catch(() => setError('Unable to load products right now. Please try again later.'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    localStorage.setItem('kramille_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('kramille_wishlist', JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  useEffect(() => {
    const onPop = () => setRoute(getPath());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  useEffect(() => {
    if (!toast) return undefined;
    const timeout = setTimeout(() => setToast(''), 1800);
    return () => clearTimeout(timeout);
  }, [toast]);

  const navigate = (next) => {
    if (next === route) return;
    window.history.pushState({}, '', next);
    setRoute(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const wishlist = useMemo(
    () => products.filter((product) => wishlistIds.includes(product.id)),
    [products, wishlistIds]
  );

  const addToCart = (product, quantity = 1) => {
    setCart((current) => {
      const index = current.findIndex((item) => item.id === product.id);
      if (index > -1) {
        const updated = [...current];
        const nextQty = Math.min(product.stock, updated[index].quantity + quantity);
        updated[index] = { ...updated[index], quantity: nextQty };
        return updated;
      }
      return [...current, { ...product, quantity }];
    });
    setToast(`${product.name} added to cart`);
  };

  const removeFromCart = (id) => {
    setCart((current) => current.filter((item) => item.id !== id));
    setToast('Item removed from cart');
  };

  const updateCartQuantity = (id, quantity) => {
    setCart((current) =>
      current.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item))
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

  const productMatch = route.match(/^\/product\/([A-Za-z0-9-]+)$/);

  const renderPage = () => {
    if (loading) {
      return (
        <main className="container section-space">
          <p className="empty-msg">Loading store...</p>
        </main>
      );
    }

    if (error) {
      return (
        <main className="container section-space">
          <p className="empty-msg">{error}</p>
        </main>
      );
    }

    if (route === '/') {
      return (
        <HomePage
          products={products}
          onNavigate={navigate}
          onAddToCart={addToCart}
          onToggleWishlist={toggleWishlist}
          wishlistIds={wishlistIds}
        />
      );
    }

    if (route === '/shop') {
      return (
        <ShopPage
          products={products}
          onNavigate={navigate}
          onAddToCart={addToCart}
          onToggleWishlist={toggleWishlist}
          wishlistIds={wishlistIds}
        />
      );
    }

    if (route === '/about') {
      return <AboutPage />;
    }

    if (route === '/cart') {
      return (
        <CartPage
          cart={cart}
          onNavigate={navigate}
          onRemove={removeFromCart}
          onQuantityChange={updateCartQuantity}
        />
      );
    }

    if (route === '/wishlist') {
      return (
        <WishlistPage
          wishlist={wishlist}
          onNavigate={navigate}
          onAddToCart={addToCart}
          onToggleWishlist={toggleWishlist}
        />
      );
    }

    if (productMatch) {
      return <ProductPage productId={productMatch[1]} onAddToCart={addToCart} onNavigate={navigate} />;
    }

    return (
      <main className="container section-space">
        <p className="empty-msg">Page not found.</p>
      </main>
    );
  };

  return (
    <div className="app-shell">
      <Navbar
        route={route}
        onNavigate={navigate}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        wishlistCount={wishlistIds.length}
      />
      {renderPage()}
      <Footer />
      <Toast message={toast} />
    </div>
  );
}

export default App;
