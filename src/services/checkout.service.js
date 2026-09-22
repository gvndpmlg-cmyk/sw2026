const config = require("../config");
const productModel = require("../models/product.model");
const HttpError = require("../middleware/httpError");

const ALLOWED_PAYMENT_METHODS = ["cash", "credit_card"];

function checkout(user, { items, paymentMethod }) {
  if (!Array.isArray(items) || items.length === 0) {
    throw new HttpError(400, "Checkout requires at least one item");
  }

  if (!ALLOWED_PAYMENT_METHODS.includes(paymentMethod)) {
    throw new HttpError(400, "Payment method must be cash or credit_card");
  }

  const lineItems = items.map((item, index) => {
    const productId = Number(item.productId);
    const quantity = Number(item.quantity);

    if (!Number.isInteger(productId) || productId <= 0) {
      throw new HttpError(400, `Item ${index + 1} has an invalid productId`);
    }

    if (!Number.isInteger(quantity) || quantity <= 0) {
      throw new HttpError(400, `Item ${index + 1} has an invalid quantity`);
    }

    const product = productModel.findById(productId);
    if (!product) {
      throw new HttpError(404, `Product ${productId} was not found`);
    }

    if (product.stock < quantity) {
      throw new HttpError(
        400,
        `Insufficient stock for ${product.name}. Available: ${product.stock}`
      );
    }

    const lineTotal = Number((product.price * quantity).toFixed(2));

    return {
      productId: product.id,
      name: product.name,
      unitPrice: product.price,
      quantity,
      lineTotal
    };
  });

  const subtotal = Number(
    lineItems.reduce((sum, item) => sum + item.lineTotal, 0).toFixed(2)
  );
  const discountRate = paymentMethod === "cash" ? config.cashDiscountRate : 0;
  const discount = Number((subtotal * discountRate).toFixed(2));
  const total = Number((subtotal - discount).toFixed(2));

  lineItems.forEach((item) => {
    productModel.decrementStock(item.productId, item.quantity);
  });

  return {
    orderId: Date.now(),
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    },
    items: lineItems,
    paymentMethod,
    subtotal,
    discount,
    discountRate,
    total
  };
}

module.exports = {
  checkout,
  ALLOWED_PAYMENT_METHODS
};
