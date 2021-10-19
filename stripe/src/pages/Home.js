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
  ///////// FOR PAYMENTS STATUS NOTIFICATION /////////////

  const location = useLocation();
  const history = useHistory();

  // //--------------------- CHECKING YOUR DEVICE --------------------------//

  // var isOnIOS =
  //   // navigator.userAgent.match(/Safari/) ||
  //   navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPhone/i);
  // var eventName = isOnIOS ? "pagehide" : "beforeunload";

  //--------------- PAYMENT REFUND FUNCTION ------------------//
  function paymentRefund() {
    alert("Going ahead will refund your amount");
    
  }

  //--------------- PAYMENT CONFIRM OR FAILED SCENARIOS ------------------//

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

    //--------------- PAYMENT REFUND TOAST ------------------//
    toast(
      (t) => (
        <main className="homeToast_refund_main">
          <section>
            <b>For Refund</b>
          </section>
          <section className="homeToast_refund_btn--section">
            <button
              className="homeToast_refund_btn"
              onClick={() => paymentRefund()}
            >
              Contact
            </button>
            <button
              className="homeToast_refund_btn"
              onClick={() => toast.dismiss(t.id)}
            >
              Dismiss
            </button>
          </section>
        </main>
      ),
      {
        duration: 10000,
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "#713200",
        },
        iconTheme: {
          primary: "green",
          secondary: "#FFFAEE",
        },
      }
    );
  }

  function paymentFailed() {
    toast.error("Payment Failed!", {
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

  //-------------------------- CHECKING LOCATION STATE -----------------------------//

  useEffect(() => {
    if (location?.state && location?.state?.success) {
      const searchState = location?.state?.success;

      if (searchState === "succeeded") {
        paymentConfirm();
        //----------------- REMOVING SESSION STORAGE ------------------

        sessionStorage.removeItem("stripe_clientSecret");
        sessionStorage.removeItem("stripe_cid");
      } else {
        paymentFailed();

        //----------------- REMOVING SESSION STORAGE ------------------

        sessionStorage.removeItem("stripe_clientSecret");
        sessionStorage.removeItem("stripe_cid");
      }
    }
  }, [location, location?.state]);

  //--------------------------- REMOVING LOCATION STATE on REFRESH -------------------//

  const handleReload = (event) => {
    if (location?.state && location?.state?.success) {
      event.preventDefault();
      history.replace(location.pathname, null);
      // event.returnValue = "";
    }
  };

  //----------- EVENT-LISTENER FOR 'beforeunload' || 'pagehide' -----------------

  useEffect(() => {
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
