import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../../stylesheets/checkoutStylesheet/checkoutDetails.scss";
import CheckoutPayment from "./CheckoutPayment";

/* 
CheckoutDetails
  - checkoutDetails__box
    -- chechoutDetails__box--section * 2
      --- checkoutDetails__box--heading
      --- checkoutDetails__box--info
          -- -- <CheckoutPayment />
*/

function CheckoutDetails() {
  const location = useLocation();
  const [amountValue, setAmountValue] = useState();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    if (searchParams.has("amount")) {
      const amount = searchParams.get("amount");
      setAmountValue(parseFloat(amount, 10));
    } else {
      setAmountValue(null);
    }
  }, [location]);

  return (
    <div className="checkoutDetails">
      <main className="checkoutDetails__box">
        <div className="chechoutDetails__box--section">
          <section className="checkoutDetails__box--heading">Amount</section>
          <section className="checkoutDetails__box--info">
            ${amountValue}
          </section>
        </div>

        <div className="chechoutDetails__box--section">
          <section className="checkoutDetails__box--heading">
            Payment Details
          </section>
          <section className="checkoutDetails__box--info checkoutDetails__box--info--payment">
            <CheckoutPayment amount={amountValue} />
          </section>
        </div>
      </main>
    </div>
  );
}

export default CheckoutDetails;
