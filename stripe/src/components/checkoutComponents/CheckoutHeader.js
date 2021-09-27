import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../stylesheets/checkoutStylesheet/checkoutHeader.scss";
import Circle from "../sharedComponents/Circle";
// circle image reference
import circleImg from "../../assets/circle.jfif";

function CheckoutHeader() {
  const location = useLocation();
  const [phaseName, setPhaseName] = useState("No");
  const [phaseEmoji, setPhaseEmoji] = useState("🌑");

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    if (searchParams.has("phase") && searchParams.has("phaseE")) {
      const phaseN = searchParams.get("phase");
      const phaseE = searchParams.get("phaseE");

      setPhaseName(phaseN);
      setPhaseEmoji(phaseE);
    } else {
      setPhaseName("No");
      setPhaseEmoji("🌑");
    }
  }, [location]);

  return (
    <div className="checkoutHeader">
      <main className="checkoutHeader__center">
        <p className="checkoutHeader__para">
          Thanks for helping with <span>{phaseName} Moon </span>
          {phaseEmoji}
        </p>
        <Link to="/">
          <Circle circleImg={circleImg} checkoutCircle />
        </Link>
      </main>
    </div>
  );
}

export default CheckoutHeader;
