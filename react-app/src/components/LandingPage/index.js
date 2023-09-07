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
				Object.values(allVehicles).map(({ id, year, make, model, trim, vehicle_country, dougscore }) => (
                    <>
                        <h4>{id}</h4>
                        <h4>{year}</h4>
                        <h4>{make}</h4>
                        <h4>{model}</h4>
                        <h4>{trim}</h4>
                        <h4>{vehicle_country}</h4>
                        <h4>{dougscore}</h4>
                    </>
				))}
		</>
	);
}

export default LandingPage;
