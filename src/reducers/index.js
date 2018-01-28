const initState = {
    userDetails: {
        loggedIn: localStorage.getItem('user_token')? true : false,
        username: 'Dakup Nengak',
        userAvatar: 'path/to/image.png',
        userId: '2i8y9'
    },
    feed: []
}

const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOG_IN':
            return {
                ...state,
                userDetails: {
                    loggedIn: true,
                    username: action.payload.username,
                    // userAvatar: action.payload.userAvatar,
                    // userId: action.payload.userId,
                    // userToken: action.payload.token
                }
            }
        case 'LOG_OUT':
            return {
                ...state,
                userDetails: {
                    ...state.userDetails,
                    loggedIn: !state.userDetails.loggedIn,
                }
            }
        case 'LOAD_QUESTIONS':
            return {
                ...state,
                feed: [
                    ...action.payload
                ]
            }
        default:
            return state;
    }
}

export default rootReducer