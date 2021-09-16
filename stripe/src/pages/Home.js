import React from "react";
import "../stylesheets/homeStylesheet/Home.scss";
import HomeBanner from "../components/homeComponents/HomeBanner";
import HomeTitle from "../components/homeComponents/HomeTitle";
import HomeSubscriptions from "../components/homeComponents/HomeSubscriptions";
// cover && circle image references for banner
import coverImg from "../assets/cover.jfif";
import circleImg from "../assets/circle.jfif";

/* 
Home
  - HomeBanner
    -- CoverImg
    -- Circle
  - HomeTitle
  - HomeSubscriptions
    -- HomeSubscriptionModels
*/

function Home() {
  return (
    <div className="home">
      <HomeBanner coverImg={coverImg} circleImg={circleImg} />
      <HomeTitle />
      <HomeSubscriptions />
    </div>
  );
}

export default Home;
