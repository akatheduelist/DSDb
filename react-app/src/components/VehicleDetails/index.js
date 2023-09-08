import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { getVehicle } from "../../store/vehicle";

function VehicleDetails() {
	const dispatch = useDispatch();
    const { vehicleId } = useParams()
	const vehicle = useSelector((state) => state.vehicle.singleVehicle);
	const currentUser = useSelector((state) => state.session.user);
	const [errors, setErrors] = useState([]);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		dispatch(getVehicle(vehicleId)).then(() => setIsLoaded(true));
        
	}, [dispatch]);

	// if (sessionUser) return <Redirect to="/" />;

	return (
		<>
			<h1>VehicleDetails id: {vehicleId}</h1>
			{isLoaded && 
                <>
                <h1>Year: {vehicle.year}</h1>
                <h1>Make: {vehicle.make}</h1>
                <h1>Model: {vehicle.model}</h1>
                <h1>Trim: {vehicle.trim}</h1>
                <h1>Dougscore: {vehicle.dougscore.dougscore_total}</h1>
                </>
            }
		</>
	);
}

export default VehicleDetails;
