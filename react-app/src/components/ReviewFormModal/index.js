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
            console.log("PUT")
			const data = await fetch(`/api/reviews/${currentReview.id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					user_id: sessionUser.id,
					vehicle_id: vehicleId,
					rating,
					review,
				}),
			});
			if (data) {
				setErrors(data.errors);
			} else {
				dispatch(getVehicle(vehicleId)).then(closeModal());
			}
		}
	};

	return (
		<>
			<div className="light-grey-background">
				<span>
					{vehicle?.year} {vehicle?.make} {vehicle?.model}
				</span>
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
					<button type="submit" disabled={!sessionUser}>Submit</button>
                    {!sessionUser && <span>You must be logged in to post a review.</span>}
				</form>
			</div>
		</>
	);
}

export default ReviewFormModal;
