const API_BASE = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

export const fetchProducts = async () => {
  const response = await fetch(`${API_BASE}/api/products`);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
};

export const fetchProductById = async (id) => {
  const response = await fetch(`${API_BASE}/api/products/${id}`);
  if (!response.ok) {
    throw new Error('Product not found');
  }
  return response.json();
};
