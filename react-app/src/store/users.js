//consts
const GET_USER = "/GET_USER"

const getOneUserAction = (user) => {
    return {
        type: GET_USER,
        user
    }
}

export const getOneUserThunk = (userId) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}`);
    console.log("response ", response);

    if (response.ok) {
        const user = await response.json();
        console.log("user ", user);
        dispatch(getOneUserAction(user))
        return user
    }
};

const initState = {};
function userReducer(state = initState, action) {
    let newState;
    switch (action.type) {
        case GET_USER:
            newState = {...state}
            console.log("user ", action.user)
            newState[action.user.id] = action.user
            return newState
        default:
            return state
    }
}

export default userReducer;