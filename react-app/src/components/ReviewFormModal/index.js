import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./ReviewForm.css";

function ReviewFormModal() {
	const dispatch = useDispatch();
	const [rating, setRating] = useState("");
	const [review, setReview] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
        console.log(rating, review)
		// const data = await dispatch(login(rating, review));
		// if (data) {
		// 	setErrors(data);
		// } else {
		// 	closeModal();
		// }
	};

	return (
		<>
			<h1>TITLE</h1>
			<form onSubmit={handleSubmit}>
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
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
