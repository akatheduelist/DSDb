import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getVehicle, getVehicleReviews, getVehicleQuirks } from "../../store/vehicle";
import OpenModalButton from "../OpenModalButton";
import ReviewFormModal from "../ReviewFormModal";
import DeleteItemModal from "../DeleteItemModal";

function VehicleDetails() {
	const dispatch = useDispatch();
    const history = useHistory();
	const { vehicleId } = useParams();
	const vehicle = useSelector((state) => state.vehicle.currentVehicle);
	const vehicleReviews = useSelector((state) => state.vehicle.vehicleReviews);
	const vehicleQuirks = useSelector((state) => state.vehicle.vehicleQuirks);
	const currentUser = useSelector((state) => state.session.user);
	const [errors, setErrors] = useState([]);
	const [vehicleIsLoaded, setVehicleIsLoaded] = useState(false);
	const [reviewIsLoaded, setReviewIsLoaded] = useState(false);
	const [quirksIsLoaded, setQuirksIsLoaded] = useState(false);

	useEffect(() => {
		dispatch(getVehicle(vehicleId)).then(() => setVehicleIsLoaded(true));
		dispatch(getVehicleReviews(vehicleId)).then(() => setReviewIsLoaded(true));
		dispatch(getVehicleQuirks(vehicleId)).then(() => setQuirksIsLoaded(true));
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
            {vehicleIsLoaded && 
                Object.values(vehicle.images).map(( {image_id, image_url} ) => (
                    <div key={image_id}>
                        <img src={image_url} />
                    </div>
                ))}
			<h1>Quirks and Features</h1>
			{quirksIsLoaded &&
				Object.values(vehicleQuirks).map(({ id, quirk }) => (
					<div key={id}>
						<h3>quirk: {quirk}</h3>
						<button onClick={() => history.push(`/vehicles/${vehicleId}/quirks`)}>Update Quirk</button>
						<OpenModalButton
							buttonText="Delete Quirk"
							modalComponent={<DeleteItemModal quirkId={id} />}
						/>
					</div>
				))}

			<h1>Reviews</h1>
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
