export const BASE_URL = __ENV.BASE_URL || "http://localhost:3000";

export const options = {
  stages: [
    { duration: "5s", target: 10 },
    { duration: "20s", target: 30 },
    { duration: "5s", target: 0 }
  ],
  thresholds: {
    http_req_duration: ["p(95)<500"]
  }
};
