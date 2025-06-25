const express = require("express");

module.exports = (app) => {
    const sControllers = require("../controllers/stripeController.js");

    // Create Stripe customer
    app
        .route("/edutechs-create-stripe-customer")
        .post(sControllers.create_stripe_customer);

    // Create payment intent (used for payment sheet or checkout)
    app
        .route("/edutechs-create-payment-intent")
        .post(sControllers.create_payment_intent);

      // Stripe webhook listener (must use raw body parser)
      app
        .route("/edutechs-stripe-webhook")
        .post(
          express.raw({ type: "application/json" }),
          sControllers.stripe_webhook
        );
};
