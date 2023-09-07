import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Redirect } from "react-router-dom";
import "./LandingPage.css";
import { getAllVehicles } from "../../store/vehicle";

function LandingPage() {
	const dispatch = useDispatch();
	const allVehicles = useSelector((state) => state.vehicle.allVehicles);
	const currentUser = useSelector((state) => state.session.user);
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
						<h4>{vehicle.id}</h4>
						<h4>{vehicle.year}</h4>
						<h4>{vehicle.make}</h4>
						<h4>{vehicle.model}</h4>
						<h4>{vehicle.trim}</h4>
						<h4>{vehicle.vehicle_country}</h4>
                        <h1>{vehicle.dougscore.daily_comfort}</h1>
					</div>
				))}
		</>
	);
}

export default LandingPage;
