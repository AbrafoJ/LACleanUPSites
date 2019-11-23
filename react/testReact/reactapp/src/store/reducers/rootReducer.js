import authReducer from './authReducer'
import projectReducer from './projectReducer'

import { combineReducers } from 'redux'

// rootReducer is the main dude that manages all the reducers that we want in the future
// for now we only have an authentication reducer
const rootReducer = combineReducers({
    auth: authReducer
    //project: projectReducer
    //data: dataReducer (for example)
})

export default rootReducer