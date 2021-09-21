import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "./moonData.js";
import dotenv from "dotenv";
import Stripe from "stripe";

dotenv.config();
const stripeSecretPromise = new Stripe(process.env.STRIPE_SECRET_KEY);

const app = express();

app.get("/", (request, response) => {
  response.send("Server is ready");
});

app.get(
  "/api/moonData/seed",
  expressAsyncHandler(async (request, response) => {
    response.status(200).send(data);
  })
);

app.post(
  "/api/payment/create",
  expressAsyncHandler(async (request, response) => {
    // const phase = request.body.paymentInfo;
    const total = request.query.total;

    console.log("Payment Request received for ", total, " rupees.");

    const paymentIntent = await stripeSecretPromise.paymentIntents.create({
      amount: total,
      currency: "inr",
      description: `Payment for ${total}`,
      receipt_email: "roopali.singh.222@gmail.com",
    });

    response.status(201).send({ clientSecret: paymentIntent.client_secret });
  })
);

app.use((error, request, response, next) => {
  response.status(500).send({
    message:
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
  });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
