import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllVehicles } from "../../store/vehicle";
import CardList from "./CardList";
import VirticleList from "./VirticleList"

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
          <div className="flex">
            <VirticleList isLoaded={isLoaded}
              apiQuery={"/api/dougscores/topten"}
              subQuery={"top_ten"} />
            <VirticleList isLoaded={isLoaded}
              apiQuery={"/api/dougscores/topten"}
              subQuery={"top_ten"} />
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
