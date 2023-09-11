import React, { useState, useEffect } from "react";
import { useHistory, useParams, Redirect } from "react-router-dom";
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
	const sessionUser = useSelector((state) => state.session.user);
	const [editQuirk, setEditQuirk] = useState(false);
    const [updateQuirkId, setUpdateQuirkId] = useState()
	const [updateQuirk, setUpdateQuirk] = useState("");
	const [errors, setErrors] = useState([]);
	const [vehicleIsLoaded, setVehicleIsLoaded] = useState(false);

	useEffect(() => {
		dispatch(getVehicle(vehicleId)).then(() => setVehicleIsLoaded(true));
	}, [dispatch]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = await fetch(`/api/quirks/${updateQuirkId}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				user_id: sessionUser.id,
                vehicle_id: vehicleId,
                quirk: updateQuirk
			}),
		});
		if (data.errors) {
			setErrors(data.errors);
		} else {
			dispatch(getVehicle(vehicleId))
            setEditQuirk(!editQuirk)
		}
	};

	// if (sessionUser) return <Redirect to="/" />;

	return (
		<>
			<div key={vehicleId}>
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
				Object.values(vehicle.images).map(({ id, image_url }) => (
                    <div key={id}>
						<img src={image_url} />
					</div>
				))}
			<h1>Quirks and Features</h1>
			{vehicleIsLoaded &&
				Object.values(vehicle.quirks).map(({ id, quirk }) => (
					<div key={id}>
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
						<button onClick={() => {setEditQuirk(!editQuirk); setUpdateQuirkId(id); setUpdateQuirk(quirk);}}>Update Quirk</button>
                        <OpenModalButton
							buttonText="Delete Quirk"
							modalComponent={<DeleteItemModal quirkId={id} />}
						/>
					</div>
				))}

			<h1>Reviews</h1>
			{vehicleIsLoaded &&
				Object.values(vehicle.reviews).map(({ id, rating, review }) => (
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
