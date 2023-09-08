import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getVehicle, getVehicleReviews } from "../../store/vehicle";
import OpenModalButton from "../OpenModalButton";
import ReviewFormModal from "../ReviewFormModal";
import DeleteItemModal from "../DeleteItemModal"

function VehicleDetails() {
	const dispatch = useDispatch();
	const { vehicleId } = useParams();
	const vehicle = useSelector((state) => state.vehicle.currentVehicle);
	const vehicleReviews = useSelector((state) => state.vehicle.vehicleReviews);
	const currentUser = useSelector((state) => state.session.user);
	const [errors, setErrors] = useState([]);
	const [vehicleIsLoaded, setVehicleIsLoaded] = useState(false);
	const [reviewIsLoaded, setReviewIsLoaded] = useState(false);

	useEffect(() => {
		dispatch(getVehicle(vehicleId)).then(() => setVehicleIsLoaded(true));
		dispatch(getVehicleReviews(vehicleId)).then(() => setReviewIsLoaded(true));
	}, [dispatch]);

	// if (sessionUser) return <Redirect to="/" />;

	return (
		<>
			<div>
				<h1>VehicleDetails id: {vehicleId}</h1>
				<h1>Year: {vehicle?.year}</h1>
				<h1>Make: {vehicle?.make}</h1>
				<h1>Model: {vehicle?.model}</h1>
				<h1>Trim: {vehicle?.trim}</h1>
				<h1>Dougscore: {vehicle?.dougscore.dougscore_total}</h1>
				<OpenModalButton
					buttonText="New Review"
					modalComponent={<ReviewFormModal vehicleId={vehicleId} />}
				/>
			</div>

			{reviewIsLoaded &&
				Object.values(vehicleReviews).map(({ id, rating, review }) => (
					<div key={id}>
						<h3>rating: {rating}</h3>
						<h3>review: {review}</h3>
						<OpenModalButton
							buttonText="Update Review"
							modalComponent={
								<ReviewFormModal
									vehicleId={vehicleId}
									isEdit={true}
									reviewId={id}
								/>
							}
						/>
						<OpenModalButton
							buttonText="Delete Review"
							modalComponent={<DeleteItemModal reviewId={id} />}
						/>
					</div>
				))}
		</>
	);
}

export default VehicleDetails;
