const initState = {
    authError: null
}

const authReducer = (state = initState, action) => {
    switch(action.type){
        case 'LOGIN_ERROR':
            console.log('authReducer says login error >:(');
            return {
                ...state, // ... = spread state to prevent override
                auth: false,
                authError: 'Login failed'
            }
        case 'LOGIN_SUCCESS':
            console.log('authReducer says login success :)');
            return{
                ...state,
                auth: true,
                first_name: action.first_name, 
                last_name: action.last_name, 
                favs: action.favs,
                authError: null
            }
        case 'REG_SUCCESS':
            return{
                ...state,
                auth: true,
                first_name: action.first_name, 
                last_name: action.last_name, 
                authError: null
            }
        case 'REG_ERROR':
            return{
                ...state,
                auth: false,
                authError: 'Sign up failed'
            }
        case 'LOGOUT_SUCCESS':
            console.log('authReducer says logout success :o');
            return {
                ...state,
                auth: false
            }
        default:
            return state;
    }
}

export default authReducer