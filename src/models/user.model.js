const bcrypt = require("bcryptjs");

const users = [
  {
    id: 1,
    name: "Alice Shopper",
    email: "alice@shop.com",
    password: bcrypt.hashSync("Password123", 10)
  },
  {
    id: 2,
    name: "Bob Buyer",
    email: "bob@shop.com",
    password: bcrypt.hashSync("Password123", 10)
  },
  {
    id: 3,
    name: "Carol Customer",
    email: "carol@shop.com",
    password: bcrypt.hashSync("Password123", 10)
  }
];

let nextUserId = 4;

function findAll() {
  return users;
}

function findByEmail(email) {
  return users.find((user) => user.email.toLowerCase() === email.toLowerCase());
}

function findById(id) {
  return users.find((user) => user.id === id);
}

function create({ name, email, password }) {
  const user = {
    id: nextUserId++,
    name,
    email,
    password: bcrypt.hashSync(password, 10)
  };
  users.push(user);
  return user;
}

function toPublic(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email
  };
}

module.exports = {
  findAll,
  findByEmail,
  findById,
  create,
  toPublic
};
