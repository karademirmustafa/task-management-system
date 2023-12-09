import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  currentRouteKey: '',
  sidebarOpen:true,
  avatarOpen:false
};

export const commonSlice = createSlice({
  name: 'base/common',
  initialState,
  reducers: {
    setCurrentRouteKey: (state, action) => {
      state.currentRouteKey = action.payload;
    },
    setSidebarOpen: (state,action) => {
      state.sidebarOpen=action.payload;
    },
    setAvatarOpen:(state,action) => {
      state.avatarOpen=action.payload;
    }
  }
});

export const { setCurrentRouteKey,setSidebarOpen,setAvatarOpen } = commonSlice.actions;

export default commonSlice.reducer;
