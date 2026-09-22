const express = require("express");
const authenticate = require("../middleware/auth.middleware");
const checkoutController = require("../controllers/checkout.controller");

const router = express.Router();

router.post("/checkout", authenticate, checkoutController.checkout);

module.exports = router;
