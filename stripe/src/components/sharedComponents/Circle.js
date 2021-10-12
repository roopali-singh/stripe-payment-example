import React from "react";
import "../../stylesheets/sharedStylesheet/circle.scss";

function Circle({ circleImg, homeCircle, checkoutCircle }) {
  return (
    <div
      id="homeCircle_width"
      className={`${homeCircle && "homeCircle"} ${
        checkoutCircle && "checkoutCircle"
      }`}
    >
      <img
        className={`circle__img ${homeCircle && "homeCircle__img"}`}
        src={circleImg}
        alt="moon_circle_img"
      />
    </div>
  );
}

export default Circle;
