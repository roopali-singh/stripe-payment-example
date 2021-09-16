import React from "react";
import "../../stylesheets/sharedStylesheet/circle.scss";

function Circle({ circleImg, homeCircle, checkoutCircle }) {
  return (
    <div
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
