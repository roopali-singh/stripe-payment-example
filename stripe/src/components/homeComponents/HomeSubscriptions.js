import React, { useEffect, useState } from "react";
import "../../stylesheets/homeStylesheet/homeSubscriptions.scss";
import HomeSubscriptionModels from "./HomeSubscriptionModels";
import axios from "axios";

function HomeSubscriptions() {
  const [moonPhase, setMoonPhase] = useState();
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    async function listPhases() {
      try {
        const { data } = await axios.get("/api/moonData/seed");
        setMoonPhase(data);
      } catch (error) {
        setErrorMsg(error);
        console.log("error => ", error);
        console.log("errorMsg => ", errorMsg);
      }
    }
    listPhases();
  }, []);

  return (
    <div className="homeSubs">
      {moonPhase?.moonPhase?.map((phase) => (
        <HomeSubscriptionModels key={phase?._id} phase={phase} />
      ))}
    </div>
  );
}

export default HomeSubscriptions;
