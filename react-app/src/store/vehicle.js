// constants
const READ_ALL_VEHICLES = "session/READ_ALL_VEHICLES";
const READ_VEHICLE = "session/READ_VEHICLE";
// const REMOVE_VEHICLE = "session/REMOVE_VEHICLE";

const readAllVehicles = (vehicles) => {
	return {
		type: READ_ALL_VEHICLES,
		vehicles,
	};
};

const readVehicle = (vehicle) => {
    console.log("VEHICLE ==> ", vehicle)
	return {
		type: READ_VEHICLE,
        vehicle
	};
};

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
                singleVehicle: action.vehicle,
            };
        // case REMOVE_VEHICLE:
		// 	return { vehicle: null };
		default:
			return state;
	}
}
