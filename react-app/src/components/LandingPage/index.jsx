import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllVehicles } from "../../store/vehicle";
import PageGrid from "./PageGrid";
import TopTen from "./TopTen";
import WorstRating from "./WorstRating";
import MostPractical from "./MostPractical";
import Coolest from "./Coolest";
import Fastest from "./Fastest";
import "./LandingPage.css";
import CardList from "./CardList";

function LandingPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const allVehicles = useSelector((state) => state.vehicle.allVehicles);
  const [isLoaded, setIsLoaded] = useState(false);

  const randomVehicle = isLoaded
    ? Object.values(allVehicles)[
        Math.floor(Math.random() * Object.values(allVehicles).length)
      ]
    : null;

  useEffect(() => {
    dispatch(getAllVehicles()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {isLoaded ? (
        <>
          {/* <PageGrid
            allVehicles={allVehicles}
            isLoaded={isLoaded}
            randomVehicle={randomVehicle}
            history={history}
          /> */}
          {/* <TopTen allVehicles={allVehicles} isLoaded={isLoaded} />
          <WorstRating isLoaded={isLoaded} />
          <Fastest isLoaded={isLoaded} />
          <MostPractical isLoaded={isLoaded} /> */}
          <CardList isLoaded={isLoaded} 
          cardListTitle={"Ice Cold"} 
          cardListDescription={"Whats cooler than being cool? These cars have the highest coolfactor rating."}
          apiQuery={"/api/dougscores/coolest"}
          subQuery={"coolest"}
          />
          <Coolest isLoaded={isLoaded} />
        </>
      ) : (
        <div className="big-title center black-text">Loading...</div>
      )}
    </>
  );
}

export default LandingPage;
