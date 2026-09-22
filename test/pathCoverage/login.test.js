const { expect } = require("chai");
const { api } = require("./httpClient");

describe("POST /login", () => {
  it("should authenticate Alice and return a JWT token", async () => {
    const res = await api().post("/login").send({
      email: "alice@shop.com",
      password: "Password123"
    });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("message", "Login successful");
    expect(res.body).to.have.property("token").that.is.a("string").and.is.not.empty;
    expect(res.body).to.have.property("expiresIn", "2h");
    expect(res.body.user).to.include({
      id: 1,
      name: "Alice Shopper",
      email: "alice@shop.com"
    });
    expect(res.body.user).to.not.have.property("password");
  });
});
