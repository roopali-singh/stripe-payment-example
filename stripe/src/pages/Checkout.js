import React from "react";
import "../stylesheets/checkoutStylesheet/Checkout.scss";
import CheckoutHeader from "../components/checkoutComponents/CheckoutHeader";
import CheckoutDetails from "../components/checkoutComponents/CheckoutDetails";

// Amount your'e helping with
/* 
Checkout
  - CheckoutHeader
    -- checkoutHeader__para
    -- Circle
  - CheckoutDetails
*/

function Checkout() {
  return (
    <div className="checkout">
      <CheckoutHeader />
      <CheckoutDetails />
    </div>
  );
}

export default Checkout;
