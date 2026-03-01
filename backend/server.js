const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 5000;
const dataFile = path.join(__dirname, 'data', 'products.json');

const sendJson = (res, status, payload) => {
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(JSON.stringify(payload));
};

const getProducts = () => {
  const raw = fs.readFileSync(dataFile, 'utf8');
  return JSON.parse(raw);
};

const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    return res.end();
  }

  if (method !== 'GET') {
    return sendJson(res, 405, { error: 'Method not allowed' });
  }

  if (url === '/api/health') {
    return sendJson(res, 200, { status: 'ok' });
  }

  if (url === '/api/products') {
    try {
      const products = getProducts();
      return sendJson(res, 200, products);
    } catch (error) {
      return sendJson(res, 500, { error: 'Failed to load products' });
    }
  }

  const productMatch = url.match(/^\/api\/products\/([A-Za-z0-9-]+)$/);
  if (productMatch) {
    try {
      const products = getProducts();
      const product = products.find((item) => item.id === productMatch[1]);
      if (!product) {
        return sendJson(res, 404, { error: 'Product not found' });
      }
      return sendJson(res, 200, product);
    } catch (error) {
      return sendJson(res, 500, { error: 'Failed to load product' });
    }
  }

  return sendJson(res, 404, { error: 'Route not found' });
});

server.listen(PORT, () => {
  console.log(`Kramille's Closet API running on http://localhost:${PORT}`);
});
