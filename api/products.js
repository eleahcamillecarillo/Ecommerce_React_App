const { getProducts } = require('./_lib/products');

module.exports = (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const products = getProducts();
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to load products' });
  }
};
