import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getVehicle } from "../../store/vehicle";
import { getTags } from "../../store/tags";
import OpenModalButton from "../OpenModalButton";
import ReviewFormModal from "../ReviewFormModal";
import DeleteItemModal from "../DeleteItemModal";
import VehicleHeader from "./VehicleHeader";
import Reviews from "./Reviews";
import "./VehicleDetails.css";

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
    const [errors, setErrors] = useState({});
	
	const [vehicleIsLoaded, setVehicleIsLoaded] = useState(false);


	useEffect(() => {
		dispatch(getVehicle(vehicleId)).then(() => setVehicleIsLoaded(true));
	}, [dispatch]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		// TO-DO Move to dispatch
		if (editQuirk && sessionUser) {
			const editQuirk = await fetch(`/api/quirks/${updateQuirkId}`, {
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
			const data = await editQuirk.json();
			if (data.errors) {
				setErrors(data.errors);
			} else {
				dispatch(getVehicle(vehicleId));
				setEditQuirk(!editQuirk);
			}
		}

		if (!editQuirk && sessionUser) {
			const newQuirk = await fetch(`/api/vehicles/${vehicleId}/quirks`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					quirk: newQuirkData,
				}),
			});
			const data = newQuirk.json();
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

			{vehicleIsLoaded && (
					<VehicleHeader
						vehicle={vehicle}
						sessionUser={sessionUser}
                        />
			)}

			<div className="page-grid-container white-background">
				{/* {vehicleIsLoaded &&
					Object.values(vehicle.images).map(({ id, image_url }) => (
                        <div key={id}>
                        <img src={image_url} />
						</div>
					))} */}
				<div className="details-container">
					<div className="details-title">
						<h1>Photos #-- </h1>
					</div>
					<div className="details-content photos-carosel">PHOTOS CAROSEL</div>
					<div className="details-title">
						<span className="title">UserReviews #--</span>
						<OpenModalButton
							buttonText="+ New Review"
							buttonClass="no-button green-link"
							modalComponent={
                                <ReviewFormModal
                                vehicleId={vehicleId}
                                vehicle={vehicle}
								/>
							}
                            />
					</div>
					<Reviews
						OpenModalButton={OpenModalButton}
						vehicle={vehicle}
						vehicleId={vehicleId}
						vehicleIsLoaded={vehicleIsLoaded}
						sessionUser={sessionUser}
						DeleteItemModal={DeleteItemModal}
                        />

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
									{errors?.quirk ? <span>{errors.quirk}</span> : null}
								</form>
							</div>
						) : null}
						{vehicleIsLoaded &&
							Object.values(vehicle.quirks).map(({ id, quirk, user_id }) => (
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
												{errors?.quirk ? <span>{errors.quirk}</span> : null}
											</form>
										) : (
                                            quirk
                                            )}
									</h3>
									{sessionUser && sessionUser.id === user_id ? (
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
										</>
									) : null}
								</div>
							))}
					</div>
				</div>
			</div>
</>
	);
}

export default VehicleDetails;
