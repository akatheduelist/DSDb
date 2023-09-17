import ReviewFormModal from "../ReviewFormModal";
import "./VehicleDetails.css";

function Reviews({ OpenModalButton, vehicle, vehicleId, vehicleIsLoaded, sessionUser, DeleteItemModal }) {
	return (
		<>
			<div className="vehicle-user-reviews-container">
				<div className="details-user-reviews border-radius">
					{vehicleIsLoaded &&
						Object.values(vehicle.reviews).map(({ id, rating, review, user_id }) => (
							<div key={id}>
                                <div style={{ display: `inline-flex`, justifyContent: `flex-end`, width: `100%`}}>
									<span>{rating}</span>
                                </div>
								<div>
									<span style={{ fontSize: `16px`}} className="amazon-echo">{review}</span>
								</div>
								{sessionUser && sessionUser.id === user_id ? (
									<>
										<OpenModalButton
											buttonText="Update Review"
											modalComponent={
												<ReviewFormModal
													vehicleId={vehicleId}
													isEdit={true}
													reviewId={id}
												/>
											}
										/>
										<OpenModalButton
											buttonText="Delete Review"
											modalComponent={<DeleteItemModal reviewId={id} />}
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

export default Reviews;
