import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVehicle } from "../../store/vehicle";
import { getTags } from "../../store/tags";

function VehicleHeader({ vehicle, sessionUser }) {
	const dispatch = useDispatch();
	const tags = useSelector((state) => state.tags);
	const [newTag, setNewTag] = useState(false);
	const [newTagData, setNewTagData] = useState("");
	const [editDescription, setEditDescription] = useState(false);
	const [updateDescription, setUpdateDescription] = useState("");
	const [tagsIsLoaded, setTagsIsLoaded] = useState(false);
	const [errors, setErrors] = useState({});

	useEffect(() => {
		dispatch(getTags()).then(() => setTagsIsLoaded(true));
	}, [dispatch]);

	const handleDescription = async (e) => {
		e.preventDefault();
		// TO-DO Move to dispatch
		if (editDescription && sessionUser) {
			const data = await fetch(`/api/vehicles/${vehicle?.id}`, {
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
				dispatch(getVehicle(vehicle?.id));
				setEditDescription(!editDescription);
			}
		}
	};

	const handleTag = async (e) => {
		e.preventDefault();
		// TO-DO Move to dispatch
		if (newTag && sessionUser) {
			const data = await fetch(`/api/vehicles/${vehicle?.id}/tags`, {
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
                {console.log(vehicle?.tags)}
				dispatch(getVehicle(vehicle?.id));
				setNewTag(!newTag);
			}
		}
	};

	return (
		<>
			<div
				style={{
					display: `flex`,
					flexDirection: `column`,
					backgroundImage: vehicle?.images[1] ? `url(${vehicle?.images[1]?.image_url})` : `none`,
				}}
				className="vehicle-header-container"
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
					<div className="vehicle-header-content">
						<div className="vehicle-header-title">
							<span className="big-title">
								{vehicle?.make} {vehicle?.model}
							</span>
							<span className="mid-grey mid-bold">
								{vehicle?.year} <span>&#183;</span> {vehicle?.vehicle_country}
							</span>
						</div>
						<div className="vehicle-header-rating">
							<div className="rating-title mid-grey mid-bold">DOUGS RATING</div>
							<div className="vehicle-header-rating-content">
								<i
									style={{ fontSize: `22px`, marginRight: `6px` }}
									className="green-text fa-solid fa-star"
								/>
								<span
									style={{ fontSize: `22px` }}
									className="mid-bold"
								>
									{vehicle?.dougscore?.dougscore_total}
								</span>
								<span className="mid-grey">/10</span>
							</div>
						</div>
						<div className="vehicle-header-rating">
							<div className="rating-title mid-grey mid-bold">YOUR RATING</div>
							{sessionUser && vehicle?.reviews?.find((review) => review?.user_id === sessionUser?.id) ? (
								<div className="vehicle-header-rating-content">
									<i
										style={{ fontSize: `22px`, marginRight: `6px` }}
										className="green-text fa-solid fa-star"
									/>
									<span
										style={{ fontSize: `22px` }}
										className="mid-bold"
									>
										{vehicle?.reviews?.find((review) => review?.user_id === sessionUser?.id).rating}
									</span>
									<span className="mid-grey">/10</span>
								</div>
							) : (
								<div
									style={{ fontSize: `22px`, padding: `6px` }}
									className="green-text mid-bold"
								>
									<i class="fa-regular fa-star" /> <span style={{ fontWeight: `500` }}>Rate</span>
								</div>
							)}
						</div>
						<div className="vehicle-header-rating">
							<div className="rating-title mid-grey mid-bold">POPULARITY</div>
							{vehicle?.reviews ? (
								<div
									style={{ fontSize: `22px`, padding: `6px` }}
									className="mid-bold"
								>
									<i className="green-text fa-solid fa-fire" />{" "}
									<span>{vehicle?.reviews?.length}</span>
								</div>
							) : (
								<div
									style={{ fontSize: `22px`, padding: `6px` }}
									className="mid-bold"
								>
									<i className="green-text fa-regular fa-face-meh" />
									<span>Not enough data...</span>
								</div>
							)}
						</div>
					</div>
					<div className="vehicle-header-details">
						<div className="vehicle-header-details-poster">
							{vehicle.images[1] ? (
								<>
									<img
										className="vehicle-header-poster-img light-border-radius"
										src={vehicle?.images[1]?.image_url}
									/>
									<div className="vehicle-header-poster-img-text">
										<div
											style={{
												color: `#1f1f1f88`,
												position: `absolute`,
												top: `25%`,
												fontSize: `22px`,
												textAlign: `center`,
											}}
										>
											<span className="title">{vehicle?.model}</span>
										</div>
									</div>
								</>
							) : null}
						</div>
						<div className="vehicle-header-video-pane light-border-radius">
							<img
								className="vehicle-header-video-thumbnail"
								src={vehicle?.images[0].image_url}
							/>
						</div>
						<div className="vehicle-header-pv-container">
							<div className="header-details-pv border-radius hover-background cursor-pointer">
								<i
									style={{ fontSize: `26px`, marginBottom: `1rem` }}
									class="fa-solid fa-film"
								/>
								<span style={{ fontSize: ` 12px`, letterSpacing: `.15rem` }}>
									{vehicle?.dougscore?.video_link.length}VIDEOS
								</span>
							</div>
							<div className="header-details-pv border-radius hover-background cursor-pointer">
								<i
									style={{ fontSize: `26px`, marginBottom: `1rem` }}
									class="fa-solid fa-photo-film"
								/>
								<span style={{ fontSize: ` 12px`, letterSpacing: `.15rem` }}>
									{vehicle?.images?.length}PHOTOS
								</span>
							</div>
						</div>
					</div>

					<div className="vehicle-header-description-container">
						<div className="vehicle-header-tags">
							{Object.values(vehicle?.tags).map(({ tag, id }) => (
								<div
									className="hover-background"
									key={id}
								>
									{tag}
								</div>
							))}
							{newTag ? (
								<>
									<form
										style={{ display: `inline-flex`, alignItems: `center`, paddingLeft: `12px` }}
										onSubmit={handleTag}
									>
										<select
											value={newTagData}
											onChange={(e) => setNewTagData(e.target.value)}
										>
											<option
												style={{ height: `100%` }}
												disabled
											>
												Select a tag
											</option>
											{Object.values(tags.vehicle_tags).map(({ tag, id }) => (
												<option
													key={id}
													value={id}
												>
													{tag}
												</option>
											))}
										</select>
										<button
											style={{ marginLeft: `4px` }}
											className="green-background small-bold"
											type="submit"
										>
											Submit
										</button>
									</form>
								</>
							) : null}
							{sessionUser && !newTag ? (
								<button
									style={{ marginLeft: `1rem` }}
									className="no-button white-text small-bold"
									onClick={() => {
										setNewTag(!newTag);
									}}
								>
									+ Add Tag
								</button>
							) : null}
						</div>
						<div className="vehicle-header-description">
							{editDescription ? (
									<form style={{ display: `inline-flex`, alignItems: `flex-end`}} onSubmit={handleDescription}>
										<textarea
                                            style={{ width: `40.5rem` }}
											value={updateDescription}
											onChange={(e) => setUpdateDescription(e.target.value)}
										/>
										<button style={{width: `4rem`, height: `2rem`, margin: `0px 6px`}} className="green-background small-bold" type="submit">Submit</button>
									</form>
							) : <span>{vehicle?.description}</span> }
						{sessionUser && !editDescription ? (
                            <button
                            className="no-button white-text small-bold"
                            onClick={() => {
                                setEditDescription(!editDescription);
                                setUpdateDescription(vehicle.description);
                            }}
							>
								Update Desc
							</button>
						) : null}
                        </div>
                        </div>
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
			</div>
		</>
	);
}

export default VehicleHeader;
