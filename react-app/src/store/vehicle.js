// constants
const READ_ALL_VEHICLES = "session/READ_ALL_VEHICLES";
const READ_VEHICLE = "session/READ_VEHICLE";
const REMOVE_VEHICLE_REVIEW = "session/REMOVE_VEHICLE_REVIEW";
const REMOVE_VEHICLE_TAG = "session/REMOVE_VEHICLE_TAG";
const REMOVE_VEHICLE_QUIRK = "session/REMOVE_VEHICLE_QUIRK";

const readAllVehicles = (vehicles) => {
  return {
    type: READ_ALL_VEHICLES,
    vehicles,
  };
};

const readVehicle = (vehicle) => {
  return {
    type: READ_VEHICLE,
    vehicle,
  };
};

const removeVehicleReview = (review) => {
  return {
    type: REMOVE_VEHICLE_REVIEW,
    review,
  };
};

const removeVehicleTag = (vehicle) => {
  return {
    type: REMOVE_VEHICLE_TAG,
    vehicle,
  };
};

const removeVehicleQuirk = (quirk) => {
  return {
    type: REMOVE_VEHICLE_QUIRK,
    quirk,
  };
};

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

// POST a new Quirk for a vehicle
export const postVehicleQuirk =
  (vehicleId, newQuirkData) => async (dispatch) => {
    const response = await fetch(`/api/vehicles/${vehicleId}/quirks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quirk: newQuirkData,
      }),
    });
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    } else {
      dispatch(getVehicle(vehicleId));
    }
  };

export const deleteVehicleTag = (vehicleId, tagId) => async (dispatch) => {
  const response = await fetch(`/api/vehicles/${vehicleId}/tags/${tagId}`, {
    method: "DELETE",
  });
  const data = await response.json();
  if (data.errors) {
    return data.errors;
  } else {
    dispatch(removeVehicleTag(data));
  }
}

// Deletes a specific review by reviewId and removes review from slice of state
export const deleteVehicleReview = (reviewId) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  });
  const data = await response.json();
  if (data.errors) {
    return;
  } else {
    dispatch(removeVehicleReview(data));
  }
}

// Deletes a specific quirk by quirkId and removes quirk from slice of state
export const deleteVehicleQuirk = (quirkId) => async (dispatch) => {
  const response = await fetch(`/api/quirks/${quirkId}`, {
    method: "DELETE",
  });
  const data = await response.json();
  if (data.errors) {
    return;
  } else {
    dispatch(removeVehicleQuirk(data));
  }
}

const initialState = {};

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
    case REMOVE_VEHICLE_REVIEW:
      return {
        ...state,
        currentVehicle: {
          ...state.currentVehicle,
          reviews: state.currentVehicle.reviews.filter(
            (review) => review.id !== action.review.id,
          ),
        },
      };
    case REMOVE_VEHICLE_QUIRK:
      return {
        ...state,
        currentVehicle: {
          ...state.currentVehicle,
          quirks: state.currentVehicle.quirks.filter(
            (quirk) => quirk.id !== action.quirk.id,
          ),
        },
      };
    case REMOVE_VEHICLE_TAG:
      return {
        ...state,
        currentVehicle: action.vehicle
      };
    default:
      return state;
  }
}
