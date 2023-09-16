import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllVehicles } from "../../store/vehicle";
import PageGrid from "./PageGrid";
import TopTen from "./TopTen";
import Header from "./Header";
import "./LandingPage.css";

function LandingPage() {
	const dispatch = useDispatch();
    const history = useHistory();
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
                        history={history}
					/>
				)}
		</>
	);
}

export default LandingPage;
