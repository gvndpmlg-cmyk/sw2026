const { expect } = require("chai");
const { api } = require("./httpClient");

describe("POST /checkout", () => {
  it("should complete a cash checkout for an authenticated user", async () => {
    const loginRes = await api().post("/login").send({
      email: "alice@shop.com",
      password: "Password123"
    });

    expect(loginRes.status).to.equal(200);
    expect(loginRes.body.token).to.be.a("string");

    const res = await api()
      .post("/checkout")
      .set("Authorization", `Bearer ${loginRes.body.token}`)
      .send({
        paymentMethod: "cash",
        items: [
          { productId: 1, quantity: 1 },
          { productId: 2, quantity: 2 }
        ]
      });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("message", "Checkout completed");
    expect(res.body.order).to.include({
      paymentMethod: "cash",
      subtotal: 170,
      discount: 17,
      discountRate: 0.1,
      total: 153
    });
    expect(res.body.order.user).to.include({
      id: 1,
      name: "Alice Shopper",
      email: "alice@shop.com"
    });
    expect(res.body.order.items).to.have.lengthOf(2);
  });
});
