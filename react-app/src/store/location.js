const GET_LOCATIONS = "session/GET_LOCATIONS";
const ADD_A_LOCATION = "session/ADD_A_LOCATION";
const ADD_LOCATION = "session/ADD_LOCATION";
const DELETE_LOCATION = "session/DELETE_LOCATION";
const EDIT_LOCATION = "session/EDIT_LOCATION";

const ADD_POST = "session/ADD_POST";
const EDIT_POST = "session/EDIT_POST";
const DELETE_POST = "session/DELETE_POST";




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
const addPost = (post) => (
    {
        type: ADD_POST,
        post
    }
);


const editLocation = (location) => (
    {
        type: EDIT_LOCATION,
        location
    }
);

const editPost = (post) => (
    {
        type: EDIT_POST,
        post
    }
);



const deleteLocation = (id) => (
    {
        type: DELETE_LOCATION,
        id
    }
);

const deletePost = (location_id, id) => (
    {
        type: DELETE_POST,
        location_id,
        id,
    }
);

export const getAllLocationThunk = () => async dispatch => {
    const response = await fetch("/api/locations");
    if (response.ok) {
        const locations = await response.json();
        dispatch(getLocation(locations));
        return locations;
    } else {
        const error = await response.json();
        return error;
    }
}

export const getALocatuinThunk = (id) => async dispatch => {
    const response = await fetch(`/api/locations/${id}`);
    if (response.ok) {
        const location = await response.json();
        dispatch(getALocation(location));
        return location;
    } else {
        const error = await response.json();
        return error;
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


    if (response.ok) {
        const newLocation = await response.json();
        dispatch(addLocation(newLocation));
        return newLocation;
    } else {
        const error = await response.json();
        return error;
    }
}

export const addPostThunk = (post) => async dispatch => {
    const response = await fetch("/api/posts/new", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
    });

    if (response.ok) {
        const newPost = await response.json();
        dispatch(addPost(newPost));
        return newPost;
    } else {
        const error = await response.json();
        return error;
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
        dispatch(editLocation(newLocation));
        return newLocation;
    } else {
        const error = await response.json();
        return error;
    }
}

export const editPostThunk = (post) => async dispatch => {
    const response = await fetch(`/api/posts/${post.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
    });
    if (response.ok) {
        
        const newPost = await response.json();
        dispatch(editPost(newPost));
        return newPost;
    } else {
        const error = await response.json();
        return error;
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
        const error = await response.json();
        return error;
    }
}

export const deletePostThunk = (location_id, id) => async dispatch => {
    const response = await fetch(`/api/posts/${id}`, {
        method: "DELETE"
    });
    if (response.ok) {
        const response = dispatch(deletePost(location_id, id));
        return response;
    } else {
        const error = await response.json();
        return error;
    }
}





const initialState = {
}

const locationReducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {
        case GET_LOCATIONS:
            action.locations.forEach(location => {
                newState[location.id] = location;
            }
            );
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
            delete newState[action.id];
            return newState;
        case EDIT_LOCATION:
            newState = {
                ...state,
            }

            newState[action.location.id] = action.location;
            return newState;
        case ADD_POST:
            newState = {
                ...state,
            }
            newState[action.post.location_id].posts.push(action.post);
            return newState;
        case EDIT_POST:
            newState = {
                ...state,
            }
            newState[action.post.location_id].posts.forEach(post => {
                if (post.id === action.post.id) {
                    post.post = action.post.post;
                    
                }
            })
          
            return newState;
        case DELETE_POST:
            newState = {
                ...state,
            }
            newState[action.location_id].posts.forEach((post, index) => {
                if (post.id === action.id) {
                    newState[action.location_id].posts.splice(index, 1);
                }
            })
            return newState;
            
        default:
            return state
    }
}

export default locationReducer;


