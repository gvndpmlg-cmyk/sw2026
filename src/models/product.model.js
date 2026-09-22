const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 120,
    stock: 15
  },
  {
    id: 2,
    name: "USB-C Charger",
    price: 25,
    stock: 40
  },
  {
    id: 3,
    name: "Laptop Stand",
    price: 45,
    stock: 20
  }
];

function findAll() {
  return products;
}

function findById(id) {
  return products.find((product) => product.id === Number(id));
}

function decrementStock(id, quantity) {
  const product = findById(id);
  if (!product) {
    return null;
  }
  product.stock -= quantity;
  return product;
}

module.exports = {
  findAll,
  findById,
  decrementStock
};
