import React, { useMemo, useState } from 'react';
import ProductCard from '../components/ProductCard';
import CategoryTabs from '../components/CategoryTabs';
import QuickViewModal from '../components/QuickViewModal';
import SkeletonGrid from '../components/SkeletonGrid';

function ShopPage({ products, onAddToCart, onToggleWishlist, wishlistIds }) {
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('featured');
  const [priceCap, setPriceCap] = useState(5000);
  const [tag, setTag] = useState('all');
  const [quickView, setQuickView] = useState(null);

  const categories = useMemo(() => ['All', ...new Set(products.map((p) => p.category))], [products]);
  const tags = useMemo(() => ['all', ...new Set(products.flatMap((p) => p.tags || []))], [products]);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    let result = products.filter((p) => {
      const matchCategory = category === 'All' || p.category === category;
      const matchText = p.name.toLowerCase().includes(normalized);
      const matchPrice = p.price <= priceCap;
      const matchTag = tag === 'all' || (p.tags || []).includes(tag);
      return matchCategory && matchText && matchPrice && matchTag;
    });

    if (sort === 'low') result = [...result].sort((a, b) => a.price - b.price);
    if (sort === 'high') result = [...result].sort((a, b) => b.price - a.price);
    if (sort === 'rating') result = [...result].sort((a, b) => b.rating - a.rating);
    if (sort === 'discount') {
      result = [...result].sort((a, b) => b.originalPrice - b.price - (a.originalPrice - a.price));
    }

    return result;
  }, [products, category, query, sort, priceCap, tag]);

  if (!products.length) {
    return (
      <main className="container section-space">
        <SkeletonGrid />
      </main>
    );
  }

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

      <div className="shop-toolbar stacked">
        <CategoryTabs categories={categories} active={category} onChange={setCategory} />
        <div className="toolbar-row">
          <label className="range-label">
            Max Price Php {priceCap}
            <input
              type="range"
              min="500"
              max="5000"
              value={priceCap}
              onChange={(event) => setPriceCap(Number(event.target.value))}
            />
          </label>
          <select value={tag} onChange={(event) => setTag(event.target.value)}>
            {tags.map((entry) => (
              <option key={entry} value={entry}>
                Tag: {entry}
              </option>
            ))}
          </select>
          <select value={sort} onChange={(event) => setSort(event.target.value)}>
            <option value="featured">Featured</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
            <option value="discount">Biggest Discount</option>
          </select>
        </div>
      </div>

      <div className="product-grid">
        {filtered.map((product) => (
          <div key={product.id} className="shop-card-wrap">
            <ProductCard
              product={product}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              inWishlist={wishlistIds.includes(product.id)}
            />
            <button className="btn btn-secondary quick-btn" onClick={() => setQuickView(product)}>
              Quick View
            </button>
          </div>
        ))}
      </div>
      {filtered.length === 0 && <p className="empty-msg">No items found for your filters.</p>}

      <QuickViewModal
        product={quickView}
        open={Boolean(quickView)}
        onClose={() => setQuickView(null)}
        onAddToCart={onAddToCart}
        onToggleWishlist={onToggleWishlist}
        inWishlist={quickView ? wishlistIds.includes(quickView.id) : false}
      />
    </main>
  );
}

export default ShopPage;
