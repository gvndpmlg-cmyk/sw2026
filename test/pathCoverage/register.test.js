const { expect } = require("chai");
const { api } = require("./httpClient");

describe("POST /register", () => {
  it("should register a new user with README seed data", async () => {
    const payload = {
      name: "Dave Shopper",
      email: `dave.${Date.now()}@shop.com`,
      password: "Password123"
    };

    const res = await api().post("/register").send(payload);

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("message", "User registered successfully");
    expect(res.body.user).to.include({
      name: payload.name,
      email: payload.email
    });
    expect(res.body.user).to.have.property("id").that.is.a("number");
    expect(res.body.user).to.not.have.property("password");
  });
});
