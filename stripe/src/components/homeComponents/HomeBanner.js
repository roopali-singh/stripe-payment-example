import React from "react";
import "../../stylesheets/homeStylesheet/homeBanner.scss";
import Circle from "../sharedComponents/Circle";

function HomeBanner({ coverImg, circleImg }) {
  return (
    <div className="homeBanner">
      <img className="homeCover__img" src={coverImg} alt="moon_cover_img" />
      <Circle circleImg={circleImg} homeCircle/>
    </div>
  );
}

export default HomeBanner;
