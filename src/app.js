const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const errorHandler = require("./middleware/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

app.use(errorHandler);

module.exports = app;
