import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getVehicle } from "../../store/vehicle";
import { getTags } from "../../store/tags";
import OpenModalButton from "../OpenModalButton";
import ReviewFormModal from "../ReviewFormModal";
import DeleteItemModal from "../DeleteItemModal";
import VehicleHeader from "./VehicleHeader";
import VehiclePhotos from "./VehiclePhotos";
import Quirks from "./Quirks";
import Reviews from "./Reviews";
import "./VehicleDetails.css";

function VehicleDetails() {
	const dispatch = useDispatch();
	const history = useHistory();
	const { vehicleId } = useParams();
	const vehicle = useSelector((state) => state.vehicle.currentVehicle);
	const sessionUser = useSelector((state) => state.session.user);
	const [errors, setErrors] = useState({});
	const [vehicleIsLoaded, setVehicleIsLoaded] = useState(false);

	useEffect(() => {
		dispatch(getVehicle(vehicleId)).then(() => setVehicleIsLoaded(true));
	}, [dispatch]);

	// if (sessionUser) return <Redirect to="/" />;

	return (
		<>
			{vehicleIsLoaded && (
				<VehicleHeader
					vehicle={vehicle}
					sessionUser={sessionUser}
				/>
			)}

			{vehicleIsLoaded && (
				<div className="page-grid-container white-background">
					<div className="vehicle-details-container">
						DOUGSCORE SPREAD
						<div
							style={{ justifyContent: `flex-start` }}
							className="vehicle-details-title"
						>
							<span className="title green-text mid-bold">|</span>&nbsp;
							<span className="title">Photos</span>&nbsp;&nbsp;
							<span style={{ fontSize: `12px` }}>{vehicle?.images?.length}</span>
                            <i style={{fontSize: `32px`}} className="fa-solid fa-angle-right" />						</div>
						<div className="vehicle-user-reviews-container">
							{vehicleIsLoaded && <VehiclePhotos vehicle={vehicle} />}
						</div>
						<div className="vehicle-details-title">
							<div style={{ display: `inline-flex`, alignItems: `center` }}>
								<span className="title green-text mid-bold">|</span>&nbsp;
								<span className="title">UserReviews</span>&nbsp;&nbsp;
								<span style={{ fontSize: `12px` }}>{vehicle?.reviews?.length}</span>
                                <i style={{fontSize: `32px`}} className="fa-solid fa-angle-right" />							</div>
							<div>
								<OpenModalButton
									buttonText="+ New Review"
									buttonClass="no-button green-link"
									modalComponent={
										<ReviewFormModal
											vehicleId={vehicleId}
											vehicle={vehicle}
										/>
									}
								/>
							</div>
						</div>
						<Reviews
							OpenModalButton={OpenModalButton}
							vehicle={vehicle}
							vehicleId={vehicleId}
							vehicleIsLoaded={vehicleIsLoaded}
							sessionUser={sessionUser}
							DeleteItemModal={DeleteItemModal}
						/>
						<Quirks
							OpenModalButton={OpenModalButton}
							vehicleIsLoaded={vehicleIsLoaded}
							sessionUser={sessionUser}
							vehicle={vehicle}
							vehicleId={vehicleId}
							DeleteItemModal={DeleteItemModal}
						/>
					</div>
				</div>
			)}
		</>
	);
}

export default VehicleDetails;
