import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Redirect } from "react-router-dom";
import "./LandingPage.css";
import { getAllVehicles } from "../../store/vehicle";

function LandingPage() {
	const dispatch = useDispatch();
	const allVehicles = useSelector((state) => state.vehicle.allVehicles);
	const sessionUser = useSelector((state) => state.session.user);
	const [errors, setErrors] = useState([]);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		dispatch(getAllVehicles()).then(() => setIsLoaded(true));
	}, [dispatch]);

	// if (sessionUser) return <Redirect to="/" />;

	return (
		<>
			<h1>LandingPage</h1>
			{isLoaded &&
				Object.values(allVehicles).map((vehicle) => (
					<div key={vehicle.id}>
						<a href={`/vehicles/${vehicle.id}`}>{vehicle.year} {vehicle.make} {vehicle.model} {vehicle.trim} {vehicle.vehicle_country}</a>
						<span>Dougscore: {vehicle.dougscore.dougscore_total}</span>
					</div>
				))}
		</>
	);
}

export default LandingPage;
