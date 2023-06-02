// Import required modules
const express = require("express");
const StripeMiddleware = require("../lib/StripeMiddleware")(
  "WEBHOOK_SIGNING_SECRET"
);

// Initialize an Express app
const app = express();

// Use the json middleware, and capture the raw request body for Stripe Middleware
app.use(
  express.json({
    verify: (req, res, buffer) => (req["rawBody"] = buffer),
  })
);

// Set up the route for the webhook endpoint,
// authenticate and process the event with StripeMiddleware,
// and define the route handler.
app.post("/", StripeMiddleware, (req, res) => {
  // Log the event object received from Stripe
  console.log(req.stripe);

  // Send a response to acknowledge receipt of the event
  res.send("Hello World!");
});

// Start the app, listening on port 3000
app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
