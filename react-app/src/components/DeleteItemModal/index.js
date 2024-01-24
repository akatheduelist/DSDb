import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteVehicleReview, deleteVehicleQuirk } from "../../store/vehicle";
import "./DeleteItem.css";

function DeleteItemModal({ reviewId, quirkId }) {
	const dispatch = useDispatch();
	// const sessionUser = useSelector((state) => state.session.user);
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (reviewId) dispatch(deleteVehicleReview(reviewId)).then(closeModal());
		if (quirkId) dispatch(deleteVehicleQuirk(quirkId)).then(closeModal());
		closeModal();
	};

	return (
		<>
			<div className="delete-item-container">
				<span className="title amazon-echo">DELETE ITEM</span>
				{errors && (
					<ul>
						{errors.map((error, idx) => (
							<li key={idx}>{error}</li>
						))}
					</ul>
				)}
				<p className="amazon-echo">
					Are you sure you want to delete your Review?
				</p>
				<p className="amazon-echo">
					Once pressing "confirm", your review will be removed from DSDb.
					Changes may take a couple of hours to complete.
				</p>
				<button
					style={{
						backgroundColor: `#c40000`,
						padding: `.2rem .6rem`,
						border: `none`,
						fontSize: `14px`,
						fontWeight: `500`,
					}}
					className="hover-background border-radius cursor-pointer"
					onClick={handleSubmit}
				>
					Confirm
				</button>
			</div>
		</>
	);
}

export default DeleteItemModal;
