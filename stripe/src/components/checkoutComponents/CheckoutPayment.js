import React from "react";
import "../../stylesheets/checkoutStylesheet/checkoutPayment.scss";
import Button from "../sharedComponents/Button";
import { CardElement } from "@stripe/react-stripe-js";

function CheckoutPayment({ amount }) {
  return (
    <div className="payment">
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <Button title="Pay now" />
      <p className="payment__para">Stripe Payment</p>
    </div>
  );
}

export default CheckoutPayment;
