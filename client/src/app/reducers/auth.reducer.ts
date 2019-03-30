const user = JSON.parse(localStorage.getItem('user'));
const authToken = JSON.parse(localStorage.getItem('authToken'));
const initialState = ((user && authToken)) ? {
    loggedIn: true,
    user,
    authToken,
} : {
    loggedIn: false,
    user: null,
    authToken: null,
    rememberMe: null
};
export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_AUTH_TOKEN':
            return {
                ...state,
                authToken: action.payload
            }

        case 'SET_USER':
            return {
                ...state,
                user: action.payload
            }
        case 'CLEAR_AUTH':
            return {
                ...state,
                loggedIn: false,
                authToken: null,
                user: null
            }
        default:
            return state;
    }
}