import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "./moonData.js";
import path from "path";
import dotenv from "dotenv";
import Stripe from "stripe";

dotenv.config();
const stripeSecretPromise = new Stripe(process.env.STRIPE_SECRET_KEY);

const app = express();

// ---------------- AFTER HOSTING => NOT NEEDED ------------------------
// app.get("/", (request, response) => {
//   response.send("Server is ready");
// });
//----------------------------------------------------------------------

////// Getting the data for the webapp //////
app.get(
  "/api/moonData/seed",
  expressAsyncHandler(async (request, response) => {
    response.status(200).send(data);
  })
);

////// Getting client secret //////
app.post(
  "/api/payment/create",
  expressAsyncHandler(async (request, response) => {
    const total = request.query.total;

    const paymentIntent = await stripeSecretPromise.paymentIntents.create({
      amount: total,
      currency: "inr",
      description: `Payment for ${total}`,
      receipt_email: "roopali.singh.222@gmail.com",
    });

    response.status(201).send({ clientSecret: paymentIntent.client_secret });
  })
);

////// Required for publishing to heroku //////
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/stripe/build")));

app.get("*", (request, response) => {
  response.sendFile(path.join(__dirname, "/stripe/build/index.html"));
});

////// Error Handling //////
app.use((error, request, response, next) => {
  response.status(500).send({
    message:
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
  });
});

////// Listen API for port //////
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
