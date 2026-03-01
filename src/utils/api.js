const API_BASE =
  process.env.REACT_APP_API_BASE_URL ||
  (typeof window !== 'undefined' && window.location.hostname !== 'localhost' ? '' : 'http://localhost:5000');

const FALLBACK_PRODUCTS_PATH = '/data/products.json';

const fetchJson = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  return response.json();
};

const fetchFallbackProducts = async () => fetchJson(FALLBACK_PRODUCTS_PATH);

const productsEndpoint = () => `${API_BASE}/api/products`;
const productEndpoint = (id) => `${API_BASE}/api/products/${id}`;

export const fetchProducts = async () => {
  try {
    return await fetchJson(productsEndpoint());
  } catch (error) {
    return fetchFallbackProducts();
  }
};

export const fetchProductById = async (id) => {
  try {
    return await fetchJson(productEndpoint(id));
  } catch (error) {
    const products = await fetchFallbackProducts();
    const product = products.find((item) => item.id === id);

    if (!product) {
      throw new Error('Product not found');
    }

    return product;
  }
};
