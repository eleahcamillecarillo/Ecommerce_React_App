# Kramille's Closet

A full-featured pink minimalist e-commerce website built with React.

## Features

- Home, Shop, Product, Cart, Wishlist, About pages
- Product detail upgrades: gallery, size/color selection, related products
- Smart shop experience: search, category filter, tag filter, price slider, sorting
- Quick View modal
- Cart upgrades: coupon codes, shipping progress bar, continue-shopping suggestions
- Checkout flow: Shipping -> Payment -> Review -> Order confirmation
- Order history persisted in localStorage
- Account mock (signup/login style profile)
- Support pages: FAQ, Shipping and Returns, Contact with validation
- Recently viewed products
- Animated skeleton loading states
- Router-based multi-page navigation

## Tech

- React + React Router DOM
- CSS modules by section (`src/styles/*`)
- localStorage-based persistence

## Scripts

```bash
npm start
npm test
npm run build
```

## Deploy (Vercel)

1. Push to GitHub.
2. Import repo to Vercel.
3. Framework: Create React App.
4. Build command: `npm run build`
5. Output directory: `build`

SPA route handling is configured in `vercel.json`.
