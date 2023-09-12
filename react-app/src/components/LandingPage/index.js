import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Redirect } from "react-router-dom";
import "./LandingPage.css";
import { getAllVehicles } from "../../store/vehicle";
import TopTen from "./TopTen";
import PageGrid from "./PageGrid";
import FeaturedToday from "./FeaturedToday";
import Header from "./Header";

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
			    <Header />
				<PageGrid allVehicles={allVehicles} isLoaded={isLoaded} />
				<FeaturedToday />
				<TopTen />
		</>
	);
}

export default LandingPage;
