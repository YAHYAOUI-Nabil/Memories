import { AUTH } from '../constants/actionTypes';
import * as api from '../api'

export const signin = (formData, history) => async(dispatch) => {
    try {
        api.signin(formData)
        history.push('/')
    } catch (error) {
        console.log(error)
    }
}

export const signup = (formData, history) => async(dispatch) => {
    try {
        await api.signup(formData)
        history.push('/')
    } catch (error) {
        console.log(error)
    }
}