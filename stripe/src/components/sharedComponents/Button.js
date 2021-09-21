import React from "react";
import { useHistory } from "react-router-dom";
import "../../stylesheets/sharedStylesheet/button.scss";

function Button({ amountValue, phaseInfo }) {
  const history = useHistory();

  ///////////////////////////// SUBSCRIPTION HANDLER //////////////////////////////////

  function subscriptionHandler(e) {
    e.preventDefault();
    history.push(
      `/checkout?amount=${amountValue}&phase=${phaseInfo?.phaseName}&phaseE=${phaseInfo?.phaseEmoji}`
    );
  }

  return (
    <div className="button subscribeButton" onClick={subscriptionHandler}>
      Join
    </div>
  );
}

export default Button;
