const initState = {
    userDetails: {
        loggedIn: true,
        username: 'Dakup Nengak',
        userImage: 'path/to/image.png',
        userId: '2i8y9',
        userToken: '897tyhg87t8b878'
    },
    feed: []
}

const rootReducer = (state = initState, action) => {
    switch (action.type) {
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