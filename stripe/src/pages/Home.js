import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../stylesheets/homeStylesheet/Home.scss";
import HomeBanner from "../components/homeComponents/HomeBanner";
import HomeTitle from "../components/homeComponents/HomeTitle";
import HomeSubscriptions from "../components/homeComponents/HomeSubscriptions";
import toast, { Toaster } from "react-hot-toast";
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
  const location = useLocation();
  const [getSuccess, setGetSuccess] = useState(false);

  ///////// FOR SUCCESSFUL PAYMENTS NOTIFICATION /////////////

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    if (searchParams.has("success")) {
      const success = searchParams.get("success");
      setGetSuccess(success);
    } else {
      setGetSuccess(false);
    }
  });

  useEffect(() => {
    function notify() {
      toast.success("Payment Successfully!", {
        duration: 4000,
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "#713200",
        },
        iconTheme: {
          primary: "#713200",
          secondary: "#FFFAEE",
        },
      });
    }

    if (getSuccess) {
      notify();
    }
  }, [getSuccess]);

  //////////////////////////////////////////////

  return (
    <div className="home">
      <Toaster /> {/* /// for notification */}
      <HomeBanner coverImg={coverImg} circleImg={circleImg} />
      <HomeTitle />
      <HomeSubscriptions />
    </div>
  );
}

export default Home;
