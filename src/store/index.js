import {createStore} from 'redux'


//initial state
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

//reducer
//reducer interacts with the store

function myReducer(state = initState, action){
    switch(action.type){
        case: 'LOG_OUT' {
            return {
                userDetails: {
                    loggedIn: false
                }
            }
        }
    }
}

//creating an instance of the store and passing a reducer as the parameter
const store = createStore(myReducer)

//create a suscriber so it gets run when store is updated
store.suscribe(() => {
    console.log('store just changed');
})

//action is passed to the reducer

const logOutAction = {
    type: 'LOG_OUT',
    payload: null
}

// to dispatch action to the reducer we use:

store.dispatch(logOutAction);