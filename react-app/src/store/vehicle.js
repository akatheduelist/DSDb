// constants
const READ_ALL_VEHICLES = "session/READ_ALL_VEHICLES";
// const REMOVE_VEHICLE = "session/REMOVE_VEHICLE";

const readAllVehicles = (vehicles) => {
	return {
		type: READ_ALL_VEHICLES,
		vehicles,
	};
};

// const removeVehicle = () => ({
// 	type: REMOVE_VEHICLE,
// });

const initialState = { vehicle: null };

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

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case READ_ALL_VEHICLES:
			const allVehicles = {}
            action.vehicles.forEach((vehicle) => {
                allVehicles[vehicle.id] = vehicle;
            })
            return {
				...state,
				allVehicles
			};
		// return { vehicle: action.payload };
		// case REMOVE_VEHICLE:
		// 	return { vehicle: null };
		default:
			return state;
	}
}
