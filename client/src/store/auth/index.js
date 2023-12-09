import { combineReducers } from '@reduxjs/toolkit';
import session from './sessionSlice';
import user from './userSlice';
import authority from './authoritySlice';

const reducer = combineReducers({
  session,
  user,
  authority
});

export default reducer;
