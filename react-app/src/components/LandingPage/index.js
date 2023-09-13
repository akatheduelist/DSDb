import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Redirect } from "react-router-dom";
import "./LandingPage.css";
import { getAllVehicles } from "../../store/vehicle";
import TopTen from "./TopTen";
import PageGrid from "./PageGrid";
import Header from "./Header";

function LandingPage() {
	const dispatch = useDispatch();
	const allVehicles = useSelector((state) => state.vehicle.allVehicles);
	const sessionUser = useSelector((state) => state.session.user);
	const [errors, setErrors] = useState([]);
	const [isLoaded, setIsLoaded] = useState(false);
	const randomVehicle = isLoaded
		? Object.values(allVehicles)[Math.floor(Math.random() * Object.values(allVehicles).length)]
		: null;

	useEffect(() => {
		dispatch(getAllVehicles()).then(() => setIsLoaded(true));
	}, [dispatch]);

	// if (sessionUser) return <Redirect to="/" />;

	return (
		<>
				{isLoaded && (
					<PageGrid
						allVehicles={allVehicles}
						isLoaded={isLoaded}
						randomVehicle={randomVehicle}
					/>
				)}
		</>
	);
}

export default LandingPage;
