const request = require("supertest");

const baseUrl = process.env.API_BASE_URL || "http://localhost:3000";

function api() {
  return request(baseUrl);
}

module.exports = {
  api,
  baseUrl
};
