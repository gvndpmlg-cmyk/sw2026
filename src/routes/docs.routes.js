const express = require("express");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

const swaggerDocument = YAML.load(path.join(__dirname, "../../swagger.yaml"));
const router = express.Router();

router.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    customSiteTitle: "SW2026 E-commerce API"
  })
);

module.exports = router;
