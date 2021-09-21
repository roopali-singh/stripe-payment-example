import React, { useEffect, useState } from "react";
import "../../stylesheets/checkoutStylesheet/checkoutPayment.scss";
// import Button from "../sharedComponents/Button";
import "../../stylesheets/sharedStylesheet/button.scss";
import axios from "axios";

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

function CheckoutPayment({ amount }) {
  const stripe = useStripe();
  const elements = useElements();

  const [clientSecret, setClientSecret] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    function getClientSecret(total) {
      try {
        const response = axios.post(`/api/payment/create?total=${total * 100}`);

        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.log("error payment 🍎 🍎 🍎 🍎 🍎  => ", error.message);
        setErrorMsg(error.message);
      }
    }
    getClientSecret(amount);
  }, [amount]);

  console.log("THE SECRET IS 1111111 >>>> ", clientSecret);

  ///////////////////////////// PAYMENT HANDLER //////////////////////////////////

  async function paymentHandler(e) {
    // history.push("/");
    console.log("clicked");
    e.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }
    setProcessing(true);
    console.log("THE SECRET IS 2222222 >>>> ", clientSecret);
    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        console.log("🍎 REACHED TILL HERE 🍏 ");
        console.log(paymentIntent.amount);
        console.log(paymentIntent.created);
        setErrorMsg(null);
        setProcessing(false);
        setSuccess(true);
      });
  }

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
      <div
        className="button paymentButton"
        onClick={paymentHandler}
        // disabled={processing || disabled || success}
        disabled={!stripe || !elements}
      >
        Pay now
      </div>
      <p className="payment__para">Stripe Payment</p>
    </div>
  );
}

export default CheckoutPayment;
