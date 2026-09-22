const { expect } = require("chai");
const { api } = require("./httpClient");

describe("GET /healthcheck", () => {
  it("should return the API health status", async () => {
    const res = await api().get("/healthcheck");

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("status", "ok");
    expect(res.body).to.have.property("service", "sw2026-ecommerce-api");
    expect(res.body).to.have.property("timestamp").that.is.a("string");
    expect(res.body).to.have.property("uptime").that.is.a("number");
  });
});
