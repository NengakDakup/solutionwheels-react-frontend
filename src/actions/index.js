import * as types from './ActionTypes'

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