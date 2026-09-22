import http from "k6/http";
import { check, sleep } from "k6";
import { SharedArray } from "k6/data";
import { BASE_URL, options as loadOptions } from "./config.js";

export const options = loadOptions;

const users = new SharedArray("login users", () =>
  JSON.parse(open("./data/users.json"))
);

export default function () {
  const user = users[__VU % users.length];
  const payload = JSON.stringify({
    email: user.email,
    password: user.password
  });

  const res = http.post(`${BASE_URL}/login`, payload, {
    headers: {
      "Content-Type": "application/json"
    },
    tags: {
      name: "POST /login"
    }
  });

  check(res, {
    "status is 200": (r) => r.status === 200,
    "message is Login successful": (r) => r.json("message") === "Login successful",
    "response includes a JWT token": (r) =>
      typeof r.json("token") === "string" && r.json("token").length > 0
  });

  sleep(1);
}
