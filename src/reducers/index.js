import jwt_decode from 'jwt-decode'

let user = {};
if (localStorage.getItem('user_token')) {
    try {
        user = jwt_decode(localStorage.getItem('user_token'));   
    } catch (error) {
        console.log(error);
    }
}


const initState = {
    userDetails: {
        loggedIn: user.name? true: false,
        username: user.name,
        userAvatar: user.avatar,
        userId: user.id,
        status: user.status
    },
    toast: {
        display: false,
        message: null,
        type: null
    },
    mobileSearch: {
        display: false,
        query: null
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
    shareQuestion: {
        display: false,
        question: {}
    },
    notifications: [],
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
            ],
            filteredFeed: [
                action.payload,
                ...state.feed
            ]
          }
        case 'DELETE_POST':
            return {
                ...state,
                feed: state.feed.filter(feed => feed._id !== action.payload.id),
                filteredFeed: state.filteredFeed.filter(feed => feed._id !== action.payload.id)
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
        case 'DISPLAY_MOBILE_SEARCH':
            return {
                ...state,
                mobileSearch: {
                    display: true
                }
            }
        case 'HIDE_MOBILE_SEARCH':
            return {
                ...state, 
                mobileSearch: {
                    display: false
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
                    status: action.payload.status
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
                feed: state.feed.map(item => {
                    if (item._id === action.payload._id) return action.payload;
                    if (item._id !== action.payload._id) return item; 
                }),
                filteredFeed: state.feed.map(item => {
                    if (item._id === action.payload._id) return action.payload;
                    if (item._id !== action.payload._id) return item; 
                })
            }
        case 'LOAD_NOTIFICATIONS':
            return {
                ...state,
                notifications: action.payload
            }
        case 'MARK_SEEN_NOTIFICATION':
            return {
                ...state,
                notifications: state.notifications.map(notify => {
                    notify.seen = true;
                    return notify;
                })
            }
        case 'MARK_ALL_READ':
            return {
                ...state,
                notifications: state.notifications.map(notify => {
                    notify.read = true;
                    return notify;
                })
            }
        case 'SHARE_POST':
            return {
                ...state,
                shareQuestion: {
                    display: true,
                    question: {...action.payload}
                }
            }
        case 'HIDE_SHARE_POST':
            return {
                ...state,
                shareQuestion: {
                    display: false
                }
            }
        case 'RECENT_QUESTIONS':
            return {
                ...state,
                filteredFeed: action.payload
            }
        case 'NO_ANSWERS':
            return {
                ...state,
                filteredFeed: action.payload
            }
        case 'MOST_ANSWERS':
            return {
                ...state,
                filteredFeed: action.payload
            }
        case 'SOLVED_QUESTIONS':
            return {
                ...state,
                filteredFeed: action.payload
            }
        default:
            return state;
    }
}

export default rootReducer
