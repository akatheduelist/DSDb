import ReviewFormModal from "../ReviewFormModal";
import "./VehicleDetails.css"

function Reviews({ OpenModalButton, vehicle, vehicleId, vehicleIsLoaded, sessionUser, DeleteItemModal }) {
	return (
		<>
			<div className="">
				{vehicleIsLoaded &&
					Object.values(vehicle.reviews).map(({ id, rating, review, user_id }) => (
						<div key={id}>
							<h3>rating: {rating}</h3>
							<h3>review: {review}</h3>
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
		</>
	);
}

export default Reviews;
