# SW2026 E-commerce REST API

## Description

In-memory e-commerce REST API built with JavaScript and Express. Consumers can register, log in to receive a JWT token, and complete a checkout. All user and product data lives in memory. No database is used.

## Installation

1. Install [Node.js](https://nodejs.org/) 18 or later.
2. Clone this repository and move into the project folder.
3. Install dependencies:

```bash
npm install
```

## How to Run

Start the API:

```bash
npm start
```

The server listens on `http://localhost:3000` by default. Optional environment variables:

- `PORT` — HTTP port (default `3000`)
- `JWT_SECRET` — secret used to sign JWT tokens
- `JWT_EXPIRES_IN` — token lifetime (default `2h`)

Interactive API documentation is available at `http://localhost:3000/api-docs`.

## Rules

- Checkout accepts only `cash` or `credit_card`.
- Paying with `cash` applies a 10% discount on the order subtotal.
- Paying with `credit_card` does not apply a discount.
- Only authenticated users can complete checkout. Send the JWT from `/login` in the `Authorization: Bearer <token>` header.
- Users and products are stored in memory and reset when the process restarts.

## Existent Data

The API starts with 3 users and 3 products.

### Users

All seed users share the password `Password123`.

| ID | Name | Email |
| --- | --- | --- |
| 1 | Alice Shopper | alice@shop.com |
| 2 | Bob Buyer | bob@shop.com |
| 3 | Carol Customer | carol@shop.com |

### Products

| ID | Name | Price | Stock |
| --- | --- | --- | --- |
| 1 | Wireless Headphones | 120 | 15 |
| 2 | USB-C Charger | 25 | 40 |
| 3 | Laptop Stand | 45 | 20 |

## How to Use the Rest API

### Healthcheck

```bash
curl http://localhost:3000/healthcheck
```

### Register

```bash
curl -X POST http://localhost:3000/register ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Dave Shopper\",\"email\":\"dave@shop.com\",\"password\":\"Password123\"}"
```

### Login

```bash
curl -X POST http://localhost:3000/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"alice@shop.com\",\"password\":\"Password123\"}"
```

The response includes a `token`. Use that token for checkout.

### Checkout

Cash checkout (10% discount):

```bash
curl -X POST http://localhost:3000/checkout ^
  -H "Content-Type: application/json" ^
  -H "Authorization: Bearer <token>" ^
  -d "{\"paymentMethod\":\"cash\",\"items\":[{\"productId\":1,\"quantity\":1},{\"productId\":2,\"quantity\":2}]}"
```

Credit card checkout:

```bash
curl -X POST http://localhost:3000/checkout ^
  -H "Content-Type: application/json" ^
  -H "Authorization: Bearer <token>" ^
  -d "{\"paymentMethod\":\"credit_card\",\"items\":[{\"productId\":3,\"quantity\":1}]}"
```

### Swagger UI

Open `http://localhost:3000/api-docs` in a browser to explore and try the API from the OpenAPI file in the project root (`swagger.yaml`).
