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

// export const login = (email, password) => async (dispatch) => {
// 	const response = await fetch("/api/vehicle/login", {
// 		method: "POST",
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		body: JSON.stringify({
// 			email,
// 			password,
// 		}),
// 	});

// 	if (response.ok) {
// 		const data = await response.json();
// 		dispatch(setVehicle(data));
// 		return null;
// 	} else if (response.status < 500) {
// 		const data = await response.json();
// 		if (data.errors) {
// 			return data.errors;
// 		}
// 	} else {
// 		return ["An error occurred. Please try again."];
// 	}
// };

// export const logout = () => async (dispatch) => {
// 	const response = await fetch("/api/vehicle/logout", {
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 	});

// 	if (response.ok) {
// 		dispatch(removeVehicle());
// 	}
// };

// export const signUp = (name, email, password) => async (dispatch) => {
// 	const response = await fetch("/api/vehicle/signup", {
// 		method: "POST",
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		body: JSON.stringify({
// 			name,
// 			email,
// 			password,
// 		}),
// 	});

// 	if (response.ok) {
// 		const data = await response.json();
// 		dispatch(setVehicle(data));
// 		return null;
// 	} else if (response.status < 500) {
// 		const data = await response.json();
// 		if (data.errors) {
// 			return data.errors;
// 		}
// 	} else {
// 		return ["An error occurred. Please try again."];
// 	}
// };

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
