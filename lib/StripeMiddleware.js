const stripe = require("stripe")();
const express = require("express");

/**
 * This Express middleware validates and constructs Stripe webhook events before passing them along to the next middleware or route handler.
 * @module stripe-middleware
 * @author Archer Hume
 * @license MIT
 * @param {string} signingSecret - The Stripe Webhook Signing Secret for the registered webhook endpoint.
 * @returns {function} Express middleware to authenticate, construct, and pass along Stripe webhook events.
 * @throws Will throw an error if `signingSecret` is missing, or if there is a problem with the stripe event object construction.
 * @example
 * const express = require("express");
 * const StripeMiddleware = require('stripe-middleware')("WEBHOOK_SIGNING_SECRET");
 * 
 * app.use(
 *   express.json({
 *    verify: (req, res, buffer) => (req["rawBody"] = buffer),
 *   })
 * );
 * 
 * app.post('/webhook', StripeMiddleware, (req, res) => {
 *  // The Stripe webhook event object can be accessed as `req.stripe`
 *  console.log(`Received Stripe event: ${req.stripe.id}`);
 *  res.sendStatus(200);
 * });
 */
module.exports = function (signingSecret) {
  return async (req, res, next) => {
    const sig = req.headers["stripe-signature"];
    let event;
    try {
        event = stripe.webhooks.constructEvent(req["rawBody"], sig, signingSecret);
        req["stripe"] = event;
    } catch (err) {
        throw new Error(`Webhook Error: ${err.type}`);
    }
    next();
  };
};