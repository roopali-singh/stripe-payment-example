import React, { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
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
  ///////// FOR SUCCESSFUL PAYMENTS NOTIFICATION /////////////

  const location = useLocation();
  const history = useHistory();

  function paymentConfirm() {
    toast.success("Payment Successful!", {
      duration: 4000,
      style: {
        border: "1px solid #713200",
        padding: "16px",
        color: "#713200",
      },
      iconTheme: {
        primary: "green",
        secondary: "#FFFAEE",
      },
    });
  }

  function paymentFailed() {
    toast.error("Payment Failed!", {
      duration: 4000,
      style: {
        border: "1px solid rgb(207, 66, 66)",
        padding: "16px",
        color: "rgb(207, 66, 66)",
      },
      iconTheme: {
        primary: "rgb(207, 66, 66)",
        secondary: "rgb(231, 201, 201)",
      },
    });
  }

  //////////////////// CHECKING LOCATION STATE ////////////////////////

  useEffect(() => {
    if (location?.state && location?.state?.success) {
      const searchState = location?.state?.success;
      if (searchState === "succeeded") {
        paymentConfirm();
        //----------------- REMOVING SESSION STORAGE ------------------
        sessionStorage.removeItem("stripe_clientSecret");
        sessionStorage.removeItem("stripe_id");
      } else {
        //----------------- REMOVING SESSION STORAGE ------------------
        sessionStorage.removeItem("stripe_clientSecret");
        sessionStorage.removeItem("stripe_id");
        paymentFailed();
      }
    }
  }, [location, location?.state]);

  //////////// REMOVING LOCATION STATE on REFRESH ///////////////////

  useEffect(() => {
    const handleReload = (event) => {
      if (location?.state && location?.state?.success) {
        event.preventDefault();
        history.replace(location.pathname, null);
        // event.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleReload);
    return () => {
      window.removeEventListener("beforeunload", handleReload);
    };
  }, [location, location?.state, history]);

  //////////////////////////////////////////////////////////

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
