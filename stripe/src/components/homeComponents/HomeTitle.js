import React from "react";
import "../../stylesheets/homeStylesheet/homeTitle.scss";

function HomeTitle() {
  return (
    <div className="homeTitle">
      <h1 className="homeTitle__title--h1">The Moon</h1>
      <p className="homeTitle__para">
        <strong>The only place beyond Earth where humans have set foot.</strong>
      </p>
      <h2 className="homeTitle__title--h2">Which one are you?</h2>
    </div>
  );
}

export default HomeTitle;
