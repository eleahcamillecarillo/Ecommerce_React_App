const fs = require('fs');
const path = require('path');

const productsPath = path.join(process.cwd(), 'public', 'data', 'products.json');

const getProducts = () => {
  const raw = fs.readFileSync(productsPath, 'utf8');
  return JSON.parse(raw);
};

module.exports = { getProducts };
