import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVehicle } from "../../store/vehicle";
import { useModal } from "../../context/Modal";
import "./ReviewForm.css";

function ReviewFormModal({ vehicle, vehicleId, isEdit = false, reviewId }) {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const currentReview = useSelector((state) =>
		state.vehicle.currentVehicle.reviews.find((review) => review.id === reviewId)
	);
	const [rating, setRating] = useState(isEdit ? currentReview.rating : 1);
	const [review, setReview] = useState(isEdit ? currentReview.review : "");
	const [errors, setErrors] = useState([]);
	// const [starRating, setStarRating] = useState(0);
	const [hover, setHover] = useState(0);
	const { closeModal } = useModal();

	useEffect(() => {
		document.body.style.overflow = "hidden";
		return () => (document.body.style.overflow = "unset");
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		// TO-DO Move to dispatch store
		if (!isEdit && sessionUser) {
			const newReview = await fetch(`/api/vehicles/${vehicleId}/reviews`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					rating,
					review,
					user_id: sessionUser.id,
					vehicle_id: vehicleId,
				}),
			});
			const data = await newReview.json();
			if (data.errors) {
				setErrors(data.errors);
			} else {
				dispatch(getVehicle(vehicleId)).then(closeModal());
			}
		}

		if (isEdit && sessionUser) {
			console.log("PUT");
			const updateReview = await fetch(`/api/reviews/${currentReview.id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					rating,
					review,
					user_id: sessionUser.id,
					vehicle_id: vehicleId,
				}),
			});
			const data = await updateReview.json();
			if (data.errors) {
				setErrors(data.errors);
			} else {
				dispatch(getVehicle(vehicleId)).then(closeModal());
			}
		}
	};

	return (
		<>
			<div className="review-modal-container mid-grey-background">
				<div className="review-modal-top">
					<i
						style={{ marginRight: `1.2rem`, marginTop: `.5rem` }}
						className="fa-solid fa-x cursor-pointer"
						onClick={() => closeModal()}
					></i>
				</div>
				<div className="review-modal-content white-background">
					<div className="review-modal-title light-grey-background">
						<img
							style={{ width: `4rem` }}
							src={vehicle?.images[1]?.image_url}
                            alt={vehicle?.model}
						/>
						<div style={{ width: `70%` }}>
							<span
								style={{ fontSize: `18px`, fontWeight: `500` }}
								className="amazon-echo"
							>
								{vehicle?.make} {vehicle?.model}
							</span>
							<span>({vehicle?.year})</span>
							<hr style={{ marginTop: `.7rem`, marginBottom: `.5rem`, width: `90%` }} />
							<span className="small-title amazon-echo">Add an Item</span>
						</div>
						<span>Test</span>
					</div>
					<div
						style={{ width: `100%` }}
						className="light-grey-background"
					>
						<span
							style={{ fontSize: `14px` }}
							className="amazon-echo"
						>
							YOUR RATING
						</span>
					</div>
					<form onSubmit={handleSubmit}>
						<label hidden>YOUR RATING</label>
						<div className="rating-stars margin-vertical">
							{[...Array(10)].map((star, idx) => {
								idx += 1;
								return (
									<button
										type="button"
										key={idx}
										style={{
											border: `none`,
											background: `none`,
											cursor: `pointer`,
											fontSize: `18px`,
										}}
										className={idx <= (hover || rating) ? "on" : "off"}
										onClick={() => setRating(idx)}
										onMouseEnter={() => setHover(idx)}
										onMouseLeave={() => setHover(rating)}
									>
										<span className="star">&#9733;</span>
									</button>
								);
							})}
							<span>{hover}</span>
						</div>
						{errors?.rating ? <span className="small-bold amazon-echo error">{errors.rating}</span> : null}
						{/* <label hidden>Review Headline</label>
                        <input
                            type="text"
                            placeholder="Write a headline for your review here"
                        />
                        {errors?.headline ? <span>{errors.headline}</span> : null} */}
						<div
							style={{ width: `100%` }}
							className="light-grey-background"
						>
							<span
								style={{ fontSize: `14px` }}
								className="amazon-echo"
							>
								YOUR REVIEW
							</span>
						</div>
						<div className="right-text">
							<span className="small-bold amazon-echo error">Required characters: {review?.length}/200</span>
						</div>
						<label hidden>YOUR REVIEW</label>
						<textarea
							value={review}
							style={{ height: `24rem` }}
							className="amazon-echo"
							placeholder="Write your review here"
							onChange={(e) => setReview(e.target.value)}
							required
						/>
						<br /> 
                        {!sessionUser && (
							<span className="small-bold amazon-echo error">You must be logged in to post a review.</span>
						)}
						{errors?.review ? <span className="small-bold amazon-echo error">{errors.review}</span> : null}
						<button
                            className="small-bold amazon-echo"
							type="submit"
							disabled={!sessionUser}
						>
							Submit
						</button>
					</form>
				</div>
			</div>
		</>
	);
}

export default ReviewFormModal;
