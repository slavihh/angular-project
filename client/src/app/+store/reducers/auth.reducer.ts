import { IAuth } from 'src/app/core/services/models/IAuth';

const user = JSON.parse(localStorage.getItem('user'));
const authToken = JSON.parse(localStorage.getItem('authToken'));
const rememberMe = JSON.parse(localStorage.getItem('rememberMe'));
const initialState: IAuth = (user && authToken || rememberMe) ? {
    loggedIn: true,
    user,
    authToken,
    rememberMe,
} : {
        loggedIn: false,
        user: null,
        authToken: null,
        rememberMe: null,
    };
export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case '[AUTH] SET_AUTH_TOKEN':
            return {
                ...state,
                authToken: action.payload
            }

        case '[AUTH] SET_USER':
            return {
                ...state,
                user: action.payload
            }
        case '[AUTH] CLEAR_AUTH':
            return {
                ...state,
                loggedIn: false,
                authToken: null,
                user: null
            };
        case '[AUTH] REMEMBER_ME':
            return {
                ...state,
                rememberMe: action.payload
            }
        default:
            return state;
    }
}