import React from "react";
import { useHistory } from "react-router-dom";
import "../../stylesheets/sharedStylesheet/button.scss";

function Button({ title, amountValue, phaseInfo, subscribe }) {
  const history = useHistory();

  function paymentHandler() {
    history.push("/");
  }

  function subscriptionHandler() {
    history.push(
      `/checkout?amount=${amountValue}&phase=${phaseInfo?.phaseName}&phaseE=${phaseInfo?.phaseEmoji}`
    );
  }

  function buttonHandler(e) {
    e.preventDefault();
    if (subscribe && amountValue) {
      subscriptionHandler();
    } else {
      paymentHandler();
    }
  }

  return (
    <div
      className={`button ${subscribe ? "subscribeButton" : "paymentButton"}`}
      onClick={buttonHandler}
    >
      {title}
    </div>
  );
}

export default Button;
