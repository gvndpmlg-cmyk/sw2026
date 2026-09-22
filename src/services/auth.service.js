const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config");
const userModel = require("../models/user.model");
const HttpError = require("../middleware/httpError");

function validateCredentials({ name, email, password }, { requireName }) {
  if (requireName && (!name || typeof name !== "string" || !name.trim())) {
    throw new HttpError(400, "Name is required");
  }

  if (!email || typeof email !== "string" || !email.trim()) {
    throw new HttpError(400, "Email is required");
  }

  if (!password || typeof password !== "string") {
    throw new HttpError(400, "Password is required");
  }

  if (password.length < 8) {
    throw new HttpError(400, "Password must be at least 8 characters");
  }
}

function register({ name, email, password }) {
  validateCredentials({ name, email, password }, { requireName: true });

  const normalizedEmail = email.trim().toLowerCase();

  if (userModel.findByEmail(normalizedEmail)) {
    throw new HttpError(409, "A user with this email already exists");
  }

  const user = userModel.create({
    name: name.trim(),
    email: normalizedEmail,
    password
  });

  return userModel.toPublic(user);
}

function login({ email, password }) {
  validateCredentials({ email, password }, { requireName: false });

  const user = userModel.findByEmail(email.trim().toLowerCase());
  if (!user) {
    throw new HttpError(401, "Invalid email or password");
  }

  const matches = bcrypt.compareSync(password, user.password);
  if (!matches) {
    throw new HttpError(401, "Invalid email or password");
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    config.jwtSecret,
    { expiresIn: config.jwtExpiresIn }
  );

  return {
    token,
    expiresIn: config.jwtExpiresIn,
    user: userModel.toPublic(user)
  };
}

module.exports = {
  register,
  login
};
