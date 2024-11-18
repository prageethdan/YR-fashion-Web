const functions = require("firebase-functions"); // Use firebase-functions directly
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51QIVUnD51c2XO9u44JieZlfTv1vVQWvC91B6JRJZj3TwbaIp3MGrS9jnU4iMpUinz65HUCc3TI5OLCkMZwbwHbVT00nfevDWTq"
);

const app = express();

app.use(cors({ origin: true }));

app.use(express.json());

// Basic route to confirm function is deployed
app.get("/", (req, res) => {
  res.status(200).send("Hello World1");
});

// Payments route
app.post("/payments/create", async (req, res) => {
  const total = req.query.total;

  console.log("Payment request received for amount:", total);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });

    res.status(201).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).send({ error: error.message });
  }
});

// Export the app as an HTTP function
exports.api = functions.https.onRequest(app);
