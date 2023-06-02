# stripe-middleware

![Stripe Logo](https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/320px-Stripe_Logo%2C_revised_2016.svg.png)

ExpressJS middleware for validating and handling Stripe webhooks.

## Installation

Install the package via npm (never yarn):

```sh
npm install --save stripe-middleware
```

## Usage

In your Express application, you can use the `stripe-middleware` to handle incoming Stripe webhook events and validate them using the Stripe Webhook Signing Secret.

Here's an example server setup:

```js
const express = require("express");
const StripeMiddleware = require("stripe-middleware")("YOUR_WEBHOOK_SIGNING_SECRET");

const app = express();

app.use(
  express.json({
    verify: (req, res, buffer) => (req["rawBody"] = buffer),
  })
);

app.post(
  "/stripe-webhook",
  StripeMiddleware,
  (req, res) => {
    console.log(req.stripe);
    res.send("Hello World!");
  }
);

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
```

Replace `"YOUR_WEBHOOK_SIGNING_SECRET"` with your Stripe Webhook Signing Secret, which you can find in your [Stripe Dashboard](https://dashboard.stripe.com/webhooks) under the webhook endpoint details.

When using the middleware, the Express route handler will have access to the validated and constructed Stripe event object through `req.stripe`.

## License

MIT

## Author

Archer Hume