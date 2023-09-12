import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteVehicleReview, deleteVehicleQuirk, getVehicleQuirks } from "../../store/vehicle";

function DeleteItemModal({ reviewId, quirkId }) {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
        if (reviewId) dispatch(deleteVehicleReview(reviewId));
        if (quirkId) dispatch(deleteVehicleQuirk(quirkId));
        closeModal()
	};

	return (
		<>
			<h1>DELETE ITEM</h1>
			{errors && (
					<ul>
						{errors.map((error, idx) => (
							<li key={idx}>{error}</li>
						))}
					</ul>
				)}
			<p>Are you sure you want to delete your Review?</p>
			<p>
				Once pressing "confirm", your review will be removed from DSDb. Changes may take a couple of hours to
				complete.
			</p>
			<button onClick={handleSubmit}>Confirm</button>
		</>
	);
}

export default DeleteItemModal;
