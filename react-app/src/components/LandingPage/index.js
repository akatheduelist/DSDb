import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Redirect } from "react-router-dom";
import "./LandingPage.css";
import { getAllVehicles } from "../../store/vehicle";
import ReviewFormModal from "../ReviewFormModal";
import OpenModalButton from "../OpenModalButton";

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
			<OpenModalButton
				buttonText="New Review"
				// onItemClick={closeMenu}
				modalComponent={<ReviewFormModal />}
			/>
			{isLoaded &&
				Object.values(allVehicles).map((vehicle) => (
					<div key={vehicle.id}>
						<h2>Year: {vehicle.year}</h2>
						<h2>Make: {vehicle.make}</h2>
						<h4>Model: {vehicle.model}</h4>
						<h4>Trim: {vehicle.trim}</h4>
						<h4>Country: {vehicle.vehicle_country}</h4>
						<h2>Dougscore: {vehicle.dougscore.dougscore_total}</h2>
					</div>
				))}
		</>
	);
}

export default LandingPage;
