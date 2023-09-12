import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getVehicle } from "../../store/vehicle";
import OpenModalButton from "../OpenModalButton";
import ReviewFormModal from "../ReviewFormModal";
import DeleteItemModal from "../DeleteItemModal";

function VehicleDetails() {
	const dispatch = useDispatch();
	const history = useHistory();
	const { vehicleId } = useParams();
	const vehicle = useSelector((state) => state.vehicle.currentVehicle);
	const sessionUser = useSelector((state) => state.session.user);
	const [newQuirk, setNewQuirk] = useState(false);
	const [newQuirkData, setNewQuirkData] = useState("");
	const [editQuirk, setEditQuirk] = useState(false);
	const [updateQuirkId, setUpdateQuirkId] = useState();
	const [updateQuirk, setUpdateQuirk] = useState("");
	const [errors, setErrors] = useState([]);
	const [vehicleIsLoaded, setVehicleIsLoaded] = useState(false);

	useEffect(() => {
		dispatch(getVehicle(vehicleId)).then(() => setVehicleIsLoaded(true));
	}, [dispatch]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		// TO-DO Move to dispatch
		if (editQuirk) {
			const data = await fetch(`/api/quirks/${updateQuirkId}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					user_id: sessionUser.id,
					vehicle_id: vehicleId,
					quirk: updateQuirk,
				}),
			});
			if (data.errors) {
				setErrors(data.errors);
			} else {
				dispatch(getVehicle(vehicleId));
				setEditQuirk(!editQuirk);
			}
		} else {
			const data = await fetch(`/api/vehicles/${vehicleId}/quirks`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					quirk: newQuirkData,
				}),
			});
			if (data.errors) {
				setErrors(data.errors);
			} else {
				dispatch(getVehicle(vehicleId));
				setNewQuirk(!newQuirk);
			}
		}
	};

	// if (sessionUser) return <Redirect to="/" />;

	return (
		<>
			<div className="grey-background">
				<h1>VehicleDetails id: {vehicleId}</h1>
				<h1>Year: {vehicle?.year}</h1>
				<h1>Make: {vehicle?.make}</h1>
				<h1>Model: {vehicle?.model}</h1>
				<h1>Trim: {vehicle?.trim}</h1>
				<h1>Dougscore: {vehicle?.dougscore.dougscore_total}</h1>
				<p>daily_comfort: {vehicle?.dougscore.daily_comfort}</p>
				<p>daily_features: {vehicle?.dougscore.daily_features}</p>
				<p>daily_practicality: {vehicle?.dougscore.daily_practicality}</p>
				<p>daily_quality: {vehicle?.dougscore.daily_quality}</p>
				<p>daily_total: {vehicle?.dougscore.daily_total}</p>
				<p>weekend_acceleration: {vehicle?.dougscore.weekend_acceleration}</p>
				<p>weekend_coolfactor: {vehicle?.dougscore.weekend_coolfactor}</p>
				<p>weekend_funfactor: {vehicle?.dougscore.weekend_funfactor}</p>
				<p>weekend_handling: {vehicle?.dougscore.weekend_handling}</p>
				<p>weekend_styling: {vehicle?.dougscore.weekend_styling}</p>
				<p>weekend_total: {vehicle?.dougscore.weekend_total}</p>
				<p>video_link: {vehicle?.dougscore.video_link}</p>
				<p>location_id: {vehicle?.dougscore.location_id}</p>
			</div>
			<div className="grey-background">
				{vehicleIsLoaded &&
					Object.values(vehicle.images).map(({ id, image_url }) => (
						<div key={id}>
							<img src={image_url} />
						</div>
					))}
			</div>
			<h1>Quirks and Features</h1>
			<button
				onClick={() => {
					setNewQuirk(!newQuirk);
				}}
			>
				New Quirk or Feature
			</button>
			<div className="grey-background">
				{vehicleIsLoaded && newQuirk ? (
					<div>
						<form onSubmit={handleSubmit}>
							<input
								value={newQuirkData}
								onChange={(e) => setNewQuirkData(e.target.value)}
							></input>
							<button type="submit">Submit</button>
						</form>
					</div>
				) : null}
				{vehicleIsLoaded &&
					Object.values(vehicle.quirks).map(({ id, quirk, user_id }) => (
						<div
							key={id}
						>
							<h3>
								quirk:
								{editQuirk && updateQuirkId === id ? (
									<form onSubmit={handleSubmit}>
										<input
											id={id}
											value={updateQuirk}
											onChange={(e) => setUpdateQuirk(e.target.value)}
										></input>
										<button type="submit">Submit</button>
									</form>
								) : (
									quirk
								)}
							</h3>
                            {sessionUser.id === user_id ?
                            <>
							<button
								onClick={() => {
									setEditQuirk(!editQuirk);
									setUpdateQuirkId(id);
									setUpdateQuirk(quirk);
								}}
							>
								Update Quirk
							</button>
							<OpenModalButton
								buttonText="Delete Quirk"
								modalComponent={<DeleteItemModal quirkId={id} />}
							/>
                            </> : null} 
						</div>
					))}
			</div>

			<h1>Reviews</h1>
			<OpenModalButton
				buttonText="New Review"
				modalComponent={<ReviewFormModal vehicleId={vehicleId} />}
			/>
			<div className="grey-background">
				{vehicleIsLoaded &&
					Object.values(vehicle.reviews).map(({ id, rating, review, user_id }) => (
						<div key={id}>
							<h3>rating: {rating}</h3>
							<h3>review: {review}</h3>
                            {sessionUser.id === user_id ? 
							<>
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
                            </> : null}
						</div>
					))}
			</div>
		</>
	);
}

export default VehicleDetails;
