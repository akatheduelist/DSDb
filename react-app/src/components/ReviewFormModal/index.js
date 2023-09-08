import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVehicle, getVehicleReviews } from "../../store/vehicle";
import { useModal } from "../../context/Modal";
import "./ReviewForm.css";

function ReviewFormModal({ vehicleId }) {
	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.session.user);
	const [rating, setRating] = useState(1);
	const [review, setReview] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = await fetch(`/api/vehicles/${vehicleId}/reviews`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				rating,
				review,
			}),
		});
		if (data.errors) {
			setErrors(data.errors);
		} else {
            dispatch(getVehicleReviews(vehicleId))
			.then(closeModal());
		}
	};

	return (
		<>
			<h1>TITLE</h1>
			<form onSubmit={handleSubmit}>
				{/* {errors && (
					<ul>
						{errors.map((error, idx) => (
							<li key={idx}>{error}</li>
						))}
					</ul>
				)} */}
				<label>
					YOUR RATING
					<input
						type="number"
						min="1"
						max="10"
						value={rating}
						onChange={(e) => setRating(e.target.value)}
						required
					/>
				</label>
				<label>
					YOUR REVIEW
					<input
						type="text"
						value={review}
						onChange={(e) => setReview(e.target.value)}
						required
					/>
				</label>
				<button type="submit">Submit</button>
			</form>
		</>
	);
}

export default ReviewFormModal;
