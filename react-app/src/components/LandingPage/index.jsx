import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllVehicles } from "../../store/vehicle";
import CardList from "./CardList";
import VerticleList from "./VerticleList"
import Hero from "./Hero"

function LandingPage() {
  const dispatch = useDispatch();
  const allVehicles = useSelector((state) => state.vehicle.allVehicles);
  const [isLoaded, setIsLoaded] = useState(false);

  // const randomVehicle = isLoaded
  //   ? Object.values(allVehicles)[
  //   Math.floor(Math.random() * Object.values(allVehicles).length)
  //   ]
  //   : null;

  useEffect(() => {
    // dispatch(getAllVehicles()).then(() => setIsLoaded(true));
    setIsLoaded(true)
  }, [dispatch]);

  return (
    <>
      {isLoaded ? (
        <>
        <Hero />
          <div className="flex">
            <VerticleList isLoaded={isLoaded}
              apiQuery={"/api/dougscores/topten"}
              subQuery={"top_ten"}
              verticleListTitle={"The GOATs"}
              verticleListDescription={"Cars with the highest total Dougscore."} />
            <VerticleList isLoaded={isLoaded}
              apiQuery={"/api/dougscores/worstrating"}
              subQuery={"bottom_ten"}
              verticleListTitle={"Total Stinkers"}
              verticleListDescription={"Cars with the absolute worst Dougscore."} />
          </div>
          <CardList isLoaded={isLoaded}
            cardListTitle={"Zoom Zoom"}
            cardListDescription={"These cars have the highest acceleration rating out of any vehicles reviewed."}
            apiQuery={"/api/dougscores/fastest"}
            subQuery={"fastest"}
          />
          <CardList isLoaded={isLoaded}
            cardListTitle={"Total Stinkers"}
            cardListDescription={"Cars with the absolute worst Dougscore."}
            apiQuery={"/api/dougscores/worstrating"}
            subQuery={"bottom_ten"}
          />
          <CardList isLoaded={isLoaded}
            cardListTitle={"Handy"}
            cardListDescription={"You know whats useful? These cars have the highest practicality rating."}
            apiQuery={"/api/dougscores/mostpractical"}
            subQuery={"most_practical"}
          />
          <CardList isLoaded={isLoaded}
            cardListTitle={"Ice Cold"}
            cardListDescription={"Whats cooler than being cool? These cars have the highest coolfactor rating."}
            apiQuery={"/api/dougscores/coolest"}
            subQuery={"coolest"}
          />
        </>
      ) : (
        <div className="big-title center black-text">Loading...</div>
      )}
    </>
  );
}

export default LandingPage;
