import jwt_decode from 'jwt-decode'

let user = {};
if (localStorage.getItem('user_token')) {
    user = jwt_decode(localStorage.getItem('user_token'));
}


const initState = {
    userDetails: {
        loggedIn: localStorage.getItem('user_token')? true : false,
        username: user.name,
        userAvatar: user.avatar,
        userId: user.id
    },
    toast: {
        display: false,
        message: null,
        type: null
    },
    imageViewer: {
        display: false,
        image: null
    },
    singleQuestion: {
        loading: true,
        errors: {},
        question: {}
    },
    feed: [],
    filteredFeed: []
}

const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ADD_QUESTION':
          return {
            ...state,
            feed: [
              action.payload,
              ...state.feed
            ]
          }
        case 'DELETE_POST':
            return {
                ...state,
                feed: state.feed.filter(feed => feed._id !== action.payload.id)
            }
        case 'DISPLAY_TOAST':
            return {
                ...state,
                toast: {
                    display: true,
                    message: action.payload.message,
                    type: action.payload.type
                }
            }
        case 'HIDE_TOAST':
            return {
                ...state,
                toast: {
                    display: false,
                    message: null,
                    type: null
                }
            }
        case 'DISPLAY_IMAGE_VIEWER':
            return {
                ...state,
                imageViewer: {
                    display: true,
                    image: action.payload.image
                }
            }
        case 'HIDE_IMAGE_VIEWER':
            return {
                ...state,
                imageViewer: {
                    display: false,
                    image: null
                }
            }
        case 'LOG_IN':
            return {
                ...state,
                userDetails: {
                    loggedIn: true,
                    username: action.payload.name,
                    userAvatar: action.payload.avatar,
                    userId: action.payload.id,
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
        case 'LOAD_SINGLE_QUESTION':
            return {
                ...state,
                singleQuestion: action.payload
            }
        case 'LIKE_QUESTION':
            if(state.feed.length < 1) return state;
            const index = state.feed.findIndex(it => it._id === action.payload._id);
            const old = state.feed[index];
            old.likes = action.payload.likes;
            return {
                ...state,
                feed: [
                    ...state.feed,
                    state.feed[index] = action.payload
                ]
            }
        default:
            return state;
    }
}

export default rootReducer
