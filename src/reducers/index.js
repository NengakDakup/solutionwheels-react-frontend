const initState = {
    userDetails: {
        loggedIn: true,
        username: 'Dakup Nengak',
        userImage: 'path/to/image.png',
        userId: '2i8y9',
        userToken: '897tyhg87t8b878'
    },
    Questions: [
        {
            name: 'hiljoijoijoi'
        }
    ]
}

const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOG_OUT':
            return {
                ...state,
                userDetails: {
                    ...state.userDetails,
                    loggedIn: !state.userDetails.loggedIn
                }
            }
            break;
    
        default:
            return state;
            break;
    }
}

export default rootReducer