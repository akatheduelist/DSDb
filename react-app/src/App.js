import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import LandingPage from "./components/LandingPage";
import Navigation from "./components/Navigation";
import Search from "./components/Search";
import VehicleDetails from "./components/VehicleDetails";
import QuirksFormPage from "./components/QuirksFormPage";
import Footer from "./components/Footer/Footer";
import ProfilePage from "./components/ProfilePage";
import ReactGA from "react-ga";
import SettingsPage from "./components/SettingsPage";

// Main app for the project
function App() {
  const dispatch = useDispatch();
  
  const sessionUser = useSelector((state) => state.session.user);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  // Google Analytics integration for React App
  // TODO Move to env variable?
  ReactGA.initialize("G-ZG0SMLWZ64");
  ReactGA.pageview(window.location.pathname + window.location.search);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <>
          {/* <div className="content-container"> */}
          <Switch>
            <Route exact path="/">
              <LandingPage />
            </Route>
            <Route path="/login">
              <LoginFormPage />
            </Route>
            <Route path="/signup">
              <SignupFormPage />
            </Route>
            <Route path="/search">
              <Search />
            </Route>
            <Route path="/profile">
              <ProfilePage sessionUser={sessionUser} />
            </Route>
            <Route path="/settings">
              <SettingsPage />
            </Route>
            <Route exact path="/vehicles/:vehicleId">
              <VehicleDetails />
            </Route>
            <Route exact path="/vehicles/:vehicleId/quirks">
              <QuirksFormPage />
            </Route>
          </Switch>
          <Footer />
          {/* </div> */}
        </>
      )}
    </>
  );
}

export default App;
