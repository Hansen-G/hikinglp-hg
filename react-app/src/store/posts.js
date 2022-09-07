const GET_POSTS = "session/GET_POSTS";
const ADD_POST = "session/ADD_POST";
const DELETE_POST = "session/DELETE_POST";
const EDIT_POST = "session/EDIT_POST";

const getPost = (posts) => (
    {
        type: GET_POSTS,
        posts
    }
);

const addPost = (post) => (
    {
        type: ADD_POST,
        post
    }
);


const editPost = (post) => (
    {
        type: EDIT_POST,
        post
    }
);

const deletePost = (id) => (
    {
        type: DELETE_POST,
        id
    }
);

export const getAllPostThunk = () => async dispatch => {
    const response = await fetch("/api/posts");
    if (response.ok) {
        const posts = await response.json();
        dispatch(getPost(posts));
        return posts;
    } else {
        return ["An error occurred. Please try again."]
        // throw new Error("Something went wrong");
    }
}

// export const getAPostThunk = (id) => async dispatch => {
//     const response = await fetch(`/api/posts/${id}`);
//     if (response.ok) {
//         const post = await response.json();
//         dispatch(getAPost(post));
//         return post;
//     } else {
//         return ["An error occurred. Please try again."]
//         // throw new Error("Something went wrong");
//     }
// }

// export const addPostThunk = (post) => async dispatch => {
//     const response = await fetch("/api/posts/new", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(post)
//     });

//     console.log('Thunk', response)
//     if (response.ok) {
//         const newPost = await response.json();
//         console.log('newPost', newPost)
//         dispatch(addPost(newPost));
//         return newPost;
//     } else {
//         return ["An error occurred. Please try again."]
//         // throw new Error("Something went wrong");
//     }
// }

export const editPostThunk = (post) => async dispatch => {
    const response = await fetch(`/api/posts/${post.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
    });
    if (response.ok) {
        const newLocation = await response.json();
        dispatch(editPost(newLocation));
        return newLocation;
    } else {
        return ["An error occurred. Please try again."]
        // throw new Error("Something went wrong");
    }
}

export const deletePostThunk = (id) => async dispatch => {
    const response = await fetch(`/api/posts/${id}`, {
        method: "DELETE"
    });
    if (response.ok) {
        const response = dispatch(deletePost(id));
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
        case GET_POSTS:
            action.posts.forEach(post => {
                newState[post.id] = post;
            }
            );
            // newState = action.posts;
            return newState;
        // case ADD_A_POST:
        //     newState = {
        //         ...state,
        //     }
        //     newState.location[action.post.locationId].posts.push(action.post)
        //     return newState;
        // case ADD_POST:
        //     newState = {
        //         ...state,
        //     }
        //     console.log('Here')
        //     console.log('Reducer', action.post)
        //     console.log('Reducer', newState)
           
        //     return newState;
        // case DELETE_POST:
        //     newState = {
        //         ...state,
        //     }
        //     delete newState.posts[action.id];
        //     return newState;
        // case EDIT_POST:
        //     newState = {
        //         ...state,
        //         posts: state.posts.map(post => {
        //             if (post.id === action.post.id) {
        //                 return action.post;
        //             } else {
        //                 return post;
        //             }
        //         }),
        //     }
        //     return newState;
        default:
            return state
    }
}

export default postReducer;


