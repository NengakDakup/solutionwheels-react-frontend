import * as types from './ActionTypes'

export const logIn = (payload) => {
    return {
        type: types.LOG_IN,
        payload: payload
    }
}

export const logOut = (payload) => {
    return {
        type: types.LOG_OUT,
        payload: payload
    }
}

export const loadQuestions = (payload) => {
    return {
        type: types.LOAD_QUESTIONS,
        payload: payload
    }
}

export const likeQuestion = (payload) => {
    return {
        type: types.LIKE_QUESTION,
        payload: payload
    }
}