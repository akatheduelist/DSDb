import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getVehicle } from "../../store/vehicle";
import OpenModalButton from "../OpenModalButton";
import DeleteItemModal from "../DeleteItemModal";
import VehicleHeader from "./VehicleHeader";
import Quirks from "./Quirks";
import Comments from "./Comments";
import "./VehicleDetails.css";

function VehicleDetails() {
	const dispatch = useDispatch();
	const { vehicleId } = useParams();
	const [vehicleIsLoaded, setVehicleIsLoaded] = useState(false);

	useEffect(() => {
		dispatch(getVehicle(vehicleId)).then(() => setVehicleIsLoaded(true));
	}, [dispatch]);

	// if (sessionUser) return <Redirect to="/" />;

	return (
		<>
			{vehicleIsLoaded && (
				<>
					<VehicleHeader />
					<Quirks
						OpenModalButton={OpenModalButton}
						DeleteItemModal={DeleteItemModal}
					/>
					{/* <Reviews
						OpenModalButton={OpenModalButton}
						vehicle={vehicle}
						vehicleId={vehicleId}
						vehicleIsLoaded={vehicleIsLoaded}
						sessionUser={sessionUser}
						DeleteItemModal={DeleteItemModal}
					/> */}
					<Comments />
				</>
			)}
		</>
	);
}

export default VehicleDetails;
