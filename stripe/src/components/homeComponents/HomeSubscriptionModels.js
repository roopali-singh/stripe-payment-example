import React, { useState } from "react";
import "../../stylesheets/homeStylesheet/homeSubscriptionModels.scss";
import Button from "../sharedComponents/Button";

function HomeSubscriptionModels({ phase }) {
  const [amountInput, setAmountInput] = useState(30);

  const phaseInfo = {
    phaseName: phase?.name,
    phaseEmoji: phase?.emoji,
  };

  return (
    <main className="homeSubsModels">
      <p className="homeSubsModels__title">
        <strong>{phase?.name}</strong>
      </p>
      <img
        className="homeSubsModels__img"
        src={phase?.image}
        alt={phase?.name}
      />
      {phase?.amount ? (
        <p className="homeSubsModels__amount">${phase?.amount}</p>
      ) : (
        <p className="homeSubsModels__amount">
          ₹
          <input
            className="homeSubsModels__amount--input"
            type="number"
            value={amountInput}
            step="0.01"
            min="30"
            onChange={(e) => setAmountInput(e.target.value)}
          />
        </p>
      )}
      <Button
        amountValue={phase?.amount ? phase?.amount : amountInput}
        phaseInfo={phaseInfo}
      />
    </main>
  );
}

export default HomeSubscriptionModels;
