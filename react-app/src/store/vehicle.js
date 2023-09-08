// constants
const READ_ALL_VEHICLES = "session/READ_ALL_VEHICLES";
const READ_VEHICLE = "session/READ_VEHICLE";
const READ_VEHICLE_REVIEWS = "session/READ_VEHICLE_REVIEWS"
const REMOVE_VEHICLE_REVIEW = "session/REMOVE_VEHICLE_REVIEW"
// const REMOVE_VEHICLE = "session/REMOVE_VEHICLE";

const readAllVehicles = (vehicles) => {
	return {
		type: READ_ALL_VEHICLES,
		vehicles,
	};
};

const readVehicle = (vehicle) => {
	return {
		type: READ_VEHICLE,
        vehicle
	};
};

const readVehicleReviews = (reviews) => {
    return {
        type: READ_VEHICLE_REVIEWS,
        reviews
    }
}

const removeVehicleReview = (review) => {
    return {
        type: REMOVE_VEHICLE_REVIEW,
        review
    }
}

// const removeVehicle = () => ({
// 	type: REMOVE_VEHICLE,
// });

const initialState = {};

// TO-DO: Paginate All Vehicles
export const getAllVehicles = () => async (dispatch) => {
	const response = await fetch("/api/vehicles");
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(readAllVehicles(data.vehicles));
	}
};

export const getVehicle = (vehicleId) => async (dispatch) => {
	const response = await fetch(`/api/vehicles/${vehicleId}`);
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(readVehicle(data));
	}
};

export const getVehicleReviews = (vehicleId) => async (dispatch) => {
    const response = await fetch(`/api/vehicles/${vehicleId}/reviews`);
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }

        dispatch(readVehicleReviews(data))
    }
}

// Deletes a specific review by reviewId and removes review from slice of state
export const deleteVehicleReview = (reviewId) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${reviewId}`, {
        method: "DELETE"
    });
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }

        dispatch(removeVehicleReview(data))
}
}

export default function reducer(state = initialState, action) {
	switch (action.type) {
        case READ_ALL_VEHICLES:
            const allVehicles = {};
			action.vehicles.forEach((vehicle) => {
                allVehicles[vehicle.id] = vehicle;
			});
			return {
                ...state,
				allVehicles,
			};
        case READ_VEHICLE:
            return {
                ...state,
                currentVehicle: action.vehicle,
            };
        case READ_VEHICLE_REVIEWS:
            return {
                ...state,
                vehicleReviews: action.reviews
            }
        case REMOVE_VEHICLE_REVIEW:
            return {
                ...state,
                vehicleReviews: state.vehicleReviews.filter((review) => review.id !== action.review.id)
            }
        // case REMOVE_VEHICLE:
		// 	return { vehicle: null };
		default:
			return state;
	}
}
