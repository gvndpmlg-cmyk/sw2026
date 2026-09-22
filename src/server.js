const app = require("./app");
const config = require("./config");

app.listen(config.port, () => {
  console.log(`E-commerce API running on http://localhost:${config.port}`);
  console.log(`Swagger UI available at http://localhost:${config.port}/api-docs`);
});
