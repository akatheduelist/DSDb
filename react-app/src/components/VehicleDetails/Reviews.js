import ReviewFormModal from "../ReviewFormModal";
import "./VehicleDetails.css";

function Reviews({ OpenModalButton, vehicle, vehicleId, vehicleIsLoaded, sessionUser, DeleteItemModal }) {
	return (
		<>
			<div className="vehicle-user-reviews-container">
				<div className="details-user-reviews border-radius">
					{vehicleIsLoaded &&
						Object.values(vehicle.reviews).reverse().map(({ id, rating, review, user_id, user }) => (
							<div key={id}>
								<div
									style={{
										display: `inline-flex`,
										alignItems: `center`,
										justifyContent: `space-between`,
										width: `100%`,
									}}
								>
									<div>
										<img
											style={{
												width: `2rem`,
												height: `2rem`,
												objectFit: `cover`,
												borderRadius: `50%`,
											}}
											src={user?.profile_image}
										/>
										&nbsp;
										<span
											style={{ paddingBottom: `2rem` }}
											className="amazon-echo mid-bold"
										>
											{user?.username}
										</span>
										&nbsp;<span>wrote:</span>
									</div>
									<div>
										<i
											style={{ fontSize: `12px` }}
											className="green-text fa-solid fa-star"
										/>
										&nbsp;<span style={{ color: `#1f1f1f90` }}>{rating}</span>
										<span style={{ color: `#1f1f1f60` }}>/10</span>
									</div>
								</div>
								<div style={{ padding: `6px 0px` }}>
									<p
										style={{ fontSize: `16px` }}
										className="amazon-echo"
									>
										{review}
									</p>
								</div>
								{sessionUser && sessionUser.id === user_id ? (
									<div style={{ display: `inline-flex`, justifyContent: `flex-end`, width: `100%`, marginBottom: `1rem`}}>
										<OpenModalButton
											buttonText="Update Review"
                                            buttonClass="no-button mid-bold"
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
                                            buttonClass="no-button mid-bold"
											modalComponent={<DeleteItemModal reviewId={id} />}
										/>
									</div>
								) : null}
							</div>
						))}
				</div>
			</div>
		</>
	);
}

export default Reviews;
