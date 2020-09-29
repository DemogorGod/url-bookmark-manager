
const initialState = {
    user: "apple",
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            const newStateSU = Object.assign({}, state)
            newStateSU.user = action.value
            return newStateSU
        default:
            return state
    }
}

export default userReducer