import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  roles: [],
};

export const authoritySlice = createSlice({
  name: 'auth/authority',
  initialState,
  reducers: {
    setAuthority: (state, action) => {
      state.roles = action.payload;
    },
  
  }
});

export const { setAuthority } = authoritySlice.actions;

export default authoritySlice.reducer;
