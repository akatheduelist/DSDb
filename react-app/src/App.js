import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import LandingPage from "./components/LandingPage";
import Navigation from "./components/Navigation";
import VehicleDetails from "./components/VehicleDetails";
import QuirksFormPage from "./components/QuirksFormPage";

function App() {
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);
	useEffect(() => {
		dispatch(authenticate()).then(() => setIsLoaded(true));
	}, [dispatch]);

	return (
		<>
			<Navigation isLoaded={isLoaded} />
			{isLoaded && (
                <div className="content-container">
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
					<Route exact path="/vehicles/:vehicleId">
						<VehicleDetails />
					</Route>
                    <Route exact path="/vehicles/:vehicleId/quirks">
						<QuirksFormPage />
					</Route>
				</Switch>
                </div>
			)}
		</>
	);
}

export default App;
