import { combineReducers } from 'redux'
import auth from './auth'
import base from './base'
// import tasks from './tasks'

const rootReducer = (asyncReducers) => (state, action) => {
    const combinedReducer = combineReducers({
        // tasks,
        base,
        auth,
        ...asyncReducers,
    })
    return combinedReducer(state, action)
}
  
export default rootReducer
