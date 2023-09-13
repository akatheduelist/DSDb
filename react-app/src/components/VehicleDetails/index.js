import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getVehicle } from "../../store/vehicle";
import { getTags } from "../../store/tags";
import OpenModalButton from "../OpenModalButton";
import ReviewFormModal from "../ReviewFormModal";
import DeleteItemModal from "../DeleteItemModal";
import Reviews from "./Reviews";
import "./VehicleDetails.css";

function VehicleDetails() {
	const dispatch = useDispatch();
	const history = useHistory();
	const { vehicleId } = useParams();
	const vehicle = useSelector((state) => state.vehicle.currentVehicle);
	const tags = useSelector((state) => state.tags);
	const sessionUser = useSelector((state) => state.session.user);
	const [newQuirk, setNewQuirk] = useState(false);
	const [newQuirkData, setNewQuirkData] = useState("");
	const [newTag, setNewTag] = useState(false);
	const [newTagData, setNewTagData] = useState("");
	const [editQuirk, setEditQuirk] = useState(false);
	const [updateQuirkId, setUpdateQuirkId] = useState();
	const [updateQuirk, setUpdateQuirk] = useState("");
	const [editDescription, setEditDescription] = useState(false);
	const [updateDescription, setUpdateDescription] = useState("");
	const [errors, setErrors] = useState([]);
	const [vehicleIsLoaded, setVehicleIsLoaded] = useState(false);
	const [tagsIsLoaded, setTagsIsLoaded] = useState(false);

	useEffect(() => {
		dispatch(getVehicle(vehicleId)).then(() => setVehicleIsLoaded(true));
		dispatch(getTags()).then(() => setTagsIsLoaded(true));
	}, [dispatch]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		// TO-DO Move to dispatch
		if (editQuirk && sessionUser) {
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

	const handleDescription = async (e) => {
		e.preventDefault();
		// TO-DO Move to dispatch
		if (editDescription && sessionUser) {
			const data = await fetch(`/api/vehicles/${vehicleId}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					description: updateDescription,
				}),
			});
			if (data.errors) {
				setErrors(data.errors);
			} else {
				dispatch(getVehicle(vehicleId));
				setEditDescription(!editDescription);
			}
		}
	};

	const handleTag = async (e) => {
		e.preventDefault();
		// TO-DO Move to dispatch
		if (newTag && sessionUser) {
			const data = await fetch(`/api/vehicles/${vehicleId}/tags`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					tag_id: newTagData,
				}),
			});
			if (data.errors) {
				setErrors(data.errors);
			} else {
				dispatch(getVehicle(vehicleId));
				setNewTag(!newTag);
			}
		}
	};

	// if (sessionUser) return <Redirect to="/" />;

	return (
		<>
			{vehicleIsLoaded && (
				<>
					<div
						style={{
							backgroundImage: vehicle.images[1] ? `url(${vehicle.images[1].image_url})` : `none`,
							backgrounddosition: `center center`,
							backgroundRepeat: `no-repeat`,
							backgroundSize: `cover`,
						}}
						className="vehicle-details-header-container"
					>
						<div
							style={{
								background: `#1f1f1f90`,
								backdropFilter: `blur(40px) saturate(100%)`,
								width: `100%`,
								height: `100%`,
								display: `flex`,
								flexDirection: `column`,
								justifyContent: `center`,
							}}
						>
							<div className="vehicle-details-header">
								<div className="vehicle-details-title">
									<span className="big-title">
										{vehicle?.make} {vehicle?.model}
									</span>
									<span>
										{vehicle?.year} <span>&#183;</span> {vehicle?.vehicle_country}
									</span>
								</div>
								<div className="vehicle-header-rating">
									<div className="rating-title">DOUGS RATING</div>
									<span className="medium-header">{vehicle?.dougscore.dougscore_total}/10</span>
								</div>
								<div className="vehicle-header-rating">
									<div className="rating-title">YOUR RATING</div>
									{sessionUser &&
									vehicle.reviews.find((review) => review.user_id === sessionUser.id) ? (
										<span className="medium-header">
											{vehicle.reviews.find((review) => review.user_id === sessionUser.id).rating}
										</span>
									) : (
										<span>* RATE</span>
									)}
								</div>
								<div className="vehicle-header-rating">
									<div className="rating-title">POPULARITY</div>
									{vehicle.reviews ? (
										<span>{vehicle.reviews.length}</span>
									) : (
										<span>Not enough data...</span>
									)}
								</div>
							</div>
							<div className="vehicle-header-details">
								<div className="header-details-poster">
									{vehicle.images[1] ? (
										<>
											<img
												className="header-poster-img"
												src={vehicle.images[1].image_url}
											/>
											<div className="header-poster-img-text">
												{vehicle.make} &nbsp;
												{vehicle.model}
											</div>
										</>
									) : null}
								</div>
								<div className="header-details-video-pane">
									<img
										className="video-pane-thumbnail"
										src={vehicle?.images[0].image_url}
									/>
								</div>
								<div className="header-details-photos-and-videos">
									<div className="header-details-pv">## VIDEOS</div>
									<div className="header-details-pv">## PHOTOS</div>
								</div>
							</div>
						</div>
					</div>
					<div className="vehicle-details-header-description">
						<div className="tags">
							{vehicleIsLoaded && newTag ? (
								<>
									<form onSubmit={handleTag}>
										{console.log(newTagData)}
										<select
											value={newTagData}
											onChange={(e) => setNewTagData(e.target.value)}
										>
											<option disabled>Select a tag</option>
											{Object.values(tags.vehicle_tags).map(({ tag, id }) => (
												<option
													key={id}
													value={id}
												>
													{tag}
												</option>
											))}
										</select>
										<button type="submit">Submit</button>
									</form>
								</>
							) : (
								Object.values(vehicle.tags).map(({ tag, id }) => <div key={id}>{tag}</div>)
							)}
							{sessionUser ? (
								<button
									onClick={() => {
										setNewTag(!newTag);
									}}
								>
									Add Tag
								</button>
							) : null}
						</div>
						<div className="description">
							{vehicleIsLoaded && editDescription ? (
								<div>
									<form onSubmit={handleDescription}>
										<textarea
											value={updateDescription}
											onChange={(e) => setUpdateDescription(e.target.value)}
										/>
										<button type="submit">Submit</button>
									</form>
								</div>
							) : (
								vehicle.description
							)}
						</div>
						{vehicleIsLoaded && sessionUser ? (
							<button
								onClick={() => {
									setEditDescription(!editDescription);
									setUpdateDescription(vehicle.description);
								}}
							>
								Update Description
							</button>
						) : null}
						<div>WRITER</div>
						<div>DIRECTOR</div>
						<div>STARS</div>
						{/* <h1>Dougscore: </h1>
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
						<p>filming_location: {vehicle?.dougscore.filming_location}</p> */}
					</div>
				</>
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
							modalComponent={<ReviewFormModal vehicleId={vehicleId} />}
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
				</div>
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
		</>
	);
}

export default VehicleDetails;
