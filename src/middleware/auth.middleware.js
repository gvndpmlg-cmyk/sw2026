const jwt = require("jsonwebtoken");
const config = require("../config");
const userModel = require("../models/user.model");
const HttpError = require("./httpError");

function authenticate(req, res, next) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return next(new HttpError(401, "Authentication required"));
  }

  const token = header.slice("Bearer ".length).trim();

  if (!token) {
    return next(new HttpError(401, "Authentication required"));
  }

  try {
    const payload = jwt.verify(token, config.jwtSecret);
    const user = userModel.findById(payload.userId);

    if (!user) {
      return next(new HttpError(401, "Invalid or expired token"));
    }

    req.user = userModel.toPublic(user);
    return next();
  } catch (error) {
    return next(new HttpError(401, "Invalid or expired token"));
  }
}

module.exports = authenticate;
