import React, { useState, useEffect } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
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
					<div className="review-modal-title">
						<img
							style={{ width: `4rem` }}
							src={vehicle?.images[1]?.image_url}
						/>
                        <div style={{width: `70%`}}>
						<span style={{ fontSize: `18px`, fontWeight: `500`}} className="amazon-echo">{vehicle?.make} {vehicle?.model}</span><span>({vehicle?.year})</span>
                        <hr style={{ marginTop: `.7rem`, marginBottom: `.5rem`, width: `90%`}} />
                        <span className="small-title amazon-echo">Add an Item</span>
                        </div>
						<span>Test</span>
					</div>
                    <div>
                        <span style={{ fontSize: `14px`}} className="amazon-echo">YOUR RATING</span>
                    </div>
					{!sessionUser && <span>You must be logged in to post a review.</span>}
					<form onSubmit={handleSubmit}>
						<label hidden>YOUR RATING</label>
						<input
							type="number"
							min="1"
							max="10"
							value={rating}
							onChange={(e) => setRating(e.target.value)}
							required
						/>
						{errors?.rating ? <span>{errors.rating}</span> : null}
						<span>YOUR REVIEW</span>
						{/* <label hidden>Review Headline</label>
					<input
						type="text"
						placeholder="Write a headline for your review here"
					/>
					{errors?.headline ? <span>{errors.headline}</span> : null} */}
						<span>Required characters: 600</span>
						<label hidden>YOUR REVIEW</label>
						<textarea
							value={review}
							placeholder="Write your review here"
							onChange={(e) => setReview(e.target.value)}
							required
						/>
						{errors?.review ? <span>{errors.review}</span> : null}
						<button
							type="submit"
							disabled={!sessionUser}
						>
							Submit
						</button>
						{!sessionUser && <span>You must be logged in to post a review.</span>}
					</form>
				</div>
				<div></div>
			</div>
		</>
	);
}

export default ReviewFormModal;
