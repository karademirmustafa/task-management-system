import { combineReducers } from 'redux'
import auth from './auth'
import base from './base'

const rootReducer = (asyncReducers) => (state, action) => {
    const combinedReducer = combineReducers({
        base,
        auth,
        ...asyncReducers,
    })
    return combinedReducer(state, action)
}
  
export default rootReducer
