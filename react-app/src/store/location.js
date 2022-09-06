const GET_LOCATIONS = "session/GET_LOCATIONS";
const ADD_A_LOCATION = "session/ADD_A_LOCATION";
const ADD_LOCATION = "session/ADD_LOCATION";
const DELETE_LOCATION = "session/DELETE_LOCATION";
const EDIT_LOCATION = "session/EDIT_LOCATION";

const getLocation = (locations) => (
    {
        type: GET_LOCATIONS,
        locations
    }
);

const getALocation = (location) => (
    {
        type: ADD_A_LOCATION,
        location
    }
);

const addLocation = (location) => (
    {
        type: ADD_LOCATION,
        location
    }
);


const editLocation = (location) => (
    {
        type: EDIT_LOCATION,
        location
    }
);

const deleteLocation = (id) => (
    {
        type: DELETE_LOCATION,
        id
    }
);

export const getAllLocationThunk = () => async dispatch => {
    const response = await fetch("/api/locations");
    if (response.ok) {
        const locations = await response.json();
        dispatch(getLocation(locations));
        return locations;
    } else {
        return ["An error occurred. Please try again."]
        // throw new Error("Something went wrong");
    }
}

export const getALocatuinThunk = (id) => async dispatch => {
    const response = await fetch(`/api/locations/${id}`);
    if (response.ok) {
        const location = await response.json();
        dispatch(getALocation(location));
        return location;
    } else {
        return ["An error occurred. Please try again."]
        // throw new Error("Something went wrong");
    }
}

export const addLocationThunk = (location) => async dispatch => {
    const response = await fetch("/api/locations/new", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(location)
    });

    console.log('Thunk', response)
    if (response.ok) {
        const newLocation = await response.json();
        dispatch(addLocation(newLocation));
        return newLocation;
    } else {
        return ["An error occurred. Please try again."]
        // throw new Error("Something went wrong");
    }
}

export const editLocationThunk = (location) => async dispatch => {
    const response = await fetch(`/api/locations/${location.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(location)
    });
    if (response.ok) {
        const newLocation = await response.json();
        console.log("newLocation", newLocation)
        dispatch(editLocation(newLocation));
        return newLocation;
    } else {
        return ["An error occurred. Please try again."]
        // throw new Error("Something went wrong");
    }
}

export const deleteLocationThunk = (id) => async dispatch => {
    const response = await fetch(`/api/locations/${id}`, {
        method: "DELETE"
    });
    if (response.ok) {
        const response = dispatch(deleteLocation(id));
        return response;
    } else {
        return ["An error occurred. Please try again."]
        // throw new Error("Something went wrong");
    }
}

const initialState = {
}

const postReducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {
        case GET_LOCATIONS:
            action.locations.forEach(location => {
                newState[location.id] = location;
            }
            );
            // newState = action.locations;
            return newState;
        case ADD_A_LOCATION:
            newState = {
                ...state,
            }
            newState[action.location.id] = action.location;
            return newState;
        case ADD_LOCATION:
            newState = {
                ...state,
            }
            newState[action.location.id] = action.location;
            return newState;
        case DELETE_LOCATION:
            newState = {
                ...state,
            }
            delete newState.locations[action.id];
            return newState;
        case EDIT_LOCATION:

            newState = {
                ...state,
            }

            console.log("here", action.location)
            newState[action.location.id] = action.location;
            return newState;
        default:
            return state
    }
}

export default postReducer;


