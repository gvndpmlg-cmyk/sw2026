module.exports = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "sw2026-ecommerce-secret",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "2h",
  cashDiscountRate: 0.1
};
