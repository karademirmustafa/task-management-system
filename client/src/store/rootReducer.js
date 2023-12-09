import { combineReducers } from 'redux'

const rootReducer = (asyncReducers) => (state, action) => {
    const combinedReducer = combineReducers({
        ...asyncReducers,
    })
    return combinedReducer(state, action)
}
  
export default rootReducer
