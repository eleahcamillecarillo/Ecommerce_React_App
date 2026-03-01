import React, { useMemo, useState } from 'react';
import ProductCard from '../components/ProductCard';
import CategoryTabs from '../components/CategoryTabs';

function ShopPage({ products, onNavigate, onAddToCart, onToggleWishlist, wishlistIds }) {
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('featured');

  const categories = useMemo(() => ['All', ...new Set(products.map((p) => p.category))], [products]);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    let result = products.filter((p) => {
      const matchCategory = category === 'All' || p.category === category;
      const matchText = p.name.toLowerCase().includes(normalized);
      return matchCategory && matchText;
    });

    if (sort === 'low') result = [...result].sort((a, b) => a.price - b.price);
    if (sort === 'high') result = [...result].sort((a, b) => b.price - a.price);
    if (sort === 'rating') result = [...result].sort((a, b) => b.rating - a.rating);

    return result;
  }, [products, category, query, sort]);

  return (
    <main className="container section-space">
      <div className="section-head shop-head">
        <h1>Shop</h1>
        <input
          className="search-input"
          type="search"
          placeholder="Search pieces..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>

      <div className="shop-toolbar">
        <CategoryTabs categories={categories} active={category} onChange={setCategory} />
        <select value={sort} onChange={(event) => setSort(event.target.value)}>
          <option value="featured">Featured</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      <div className="product-grid">
        {filtered.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onView={(id) => onNavigate(`/product/${id}`)}
            onAddToCart={onAddToCart}
            onToggleWishlist={onToggleWishlist}
            inWishlist={wishlistIds.includes(product.id)}
          />
        ))}
      </div>
      {filtered.length === 0 && <p className="empty-msg">No items found for your filters.</p>}
    </main>
  );
}

export default ShopPage;
