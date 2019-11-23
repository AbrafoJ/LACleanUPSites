const initState = {
    authError: null
}

const authReducer = (state = initState, action) => {
    switch(action.type){
        case 'LOGIN_ERROR':
            console.log('authReducer says login error >:(');
            return {
                ...state, // ... = spread state to prevent override
                authError: 'Login failed'
            }
        case 'LOGIN_SUCCESS':
            console.log('authReducer says login success :)');
            return{
                ...state,
                authError: null
            }
        case 'LOGOUT_SUCCESS':
            console.log('authReducer says logout success :o');
            return state;
        default:
            return state;
    }
}

export default authReducer