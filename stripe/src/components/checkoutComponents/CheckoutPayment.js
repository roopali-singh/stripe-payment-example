import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "../../stylesheets/checkoutStylesheet/checkoutPayment.scss";
// import Button from "../sharedComponents/Button";
import "../../stylesheets/sharedStylesheet/button.scss";
import axios from "axios";

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

function CheckoutPayment({ amount }) {
  const history = useHistory();
  const stripe = useStripe();
  const elements = useElements();

  const [clientSecret, setClientSecret] = useState("");
  const [cid, setCid] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState("");

  ///////////////////////////// SESSION STORAGE INITIALIZATION //////////////////////////////////

  function sessionStorageClientSecret() {
    let storedClientSecret = sessionStorage?.getItem("stripe_clientSecret")
      ? JSON?.parse(sessionStorage?.getItem("stripe_clientSecret"))
      : "";
    setClientSecret(storedClientSecret);
  }

  function sessionStorageCid() {
    let storedCid = sessionStorage?.getItem("stripe_cid")
      ? JSON?.parse(sessionStorage?.getItem("stripe_cid"))
      : "";
    setCid(storedCid);
  }

  useEffect(() => {
    sessionStorageClientSecret();
    sessionStorageCid();
  }, []);

  ///////////////////////////// GETTING CLIENT SECRET //////////////////////////////////

  async function getClientSecret(total) {
    try {
      const response = await axios.post(
        `/api/payment/create?total=${total * 100}`
      );
      setClientSecret(response.data.clientSecret);
      setCid(response.data.id);
      //----------------------- SETTING SESSION STORAGE -----------------------
      sessionStorage?.setItem(
        "stripe_clientSecret",
        JSON?.stringify(response.data.clientSecret)
      );
      sessionStorage?.setItem("stripe_cid", JSON?.stringify(response.data.id));
    } catch (error) {
      setErrorMsg(error.message);
    }
  }

  ///////////////////////////// UPDATING CLIENT SECRET //////////////////////////////////

  async function updateClientSecret(total, cid) {
    try {
      const response = await axios.post(
        `/api/payment/update?total=${total * 100}&id=${cid}`
      );
      setClientSecret(response.data.clientSecret);
      setCid(response.data.id);
      //----------------------- SETTING SESSION STORAGE -----------------------
      sessionStorage?.setItem(
        "stripe_clientSecret",
        JSON?.stringify(response.data.clientSecret)
      );
      sessionStorage?.setItem("stripe_cid", JSON?.stringify(response.data.id));
    } catch (error) {
      setErrorMsg(error.message);
    }
  }

  ///////////////////////////// choose GET NEW or UPDATE ?? //////////////////////////////////

  useEffect(() => {
    if (typeof amount === "number" && amount > 0) {
      if (sessionStorage?.length === 0) {
        getClientSecret(amount);
      } else {
        updateClientSecret(amount, cid);
      }
    }
  }, [amount]);

  ///////////////////////////// AFTER PAYMENT SUBMISSION //////////////////////////////////

  useEffect(() => {
    if (success) {
      // history.replace(`/?success=${success}`);
      history.replace({ pathname: "/", state: { success: `${success}` } });
    }
  }, [success, history]);

  ///////////////////////////// PAYMENT CHANGE HANDLER //////////////////////////////////

  function handleChange(event) {
    setDisabled(event.empty);
    setErrorMsg(event.error ? event.error.message : "");
  }

  ///////////////////////////// PAYMENT SUBMIT HANDLER //////////////////////////////////

  async function paymentHandler(e) {
    // history.push("/");
    e.preventDefault();
    if (!stripe || !elements || errorMsg || disabled) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    } else {
      setProcessing(true);
      await stripe
        .confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: "MOON",
              email: "roopali.singh.222@gmail.com",
            },
          },
          //save card info
          // setup_future_usage: "off_session",
        })
        .then(({ paymentIntent }) => {
          setErrorMsg(false);
          setProcessing(false);
          setSuccess(paymentIntent.status ? paymentIntent.status : false);
        })
        .catch((error) => {
          setErrorMsg(error ? error.message : false);
          setProcessing(false);
          setSuccess(false);
        });
      // history.replace("/paymentConfirm");
    }
  }

  return (
    <div className="payment">
      <CardElement
        onChange={handleChange}
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
      {errorMsg && <div className="errorMsg">{errorMsg}</div>}

      {/* /////////////////////// PAYMENT BUTTON //////////////////////// */}

      <div
        className="button paymentButton"
        onClick={paymentHandler}
        // disabled={processing || disabled || success}
        disabled={!stripe || !elements || disabled || processing || success}
      >
        {processing ? "Processing" : success ? "Payment Completed" : "Pay now"}
      </div>
      <p className="payment__para">We are not storing your card info</p>
    </div>
  );
}

export default CheckoutPayment;
