import { createSlice } from '@reduxjs/toolkit';

const stateSlice = createSlice({
  name: 'taskList/state',
  initialState: {
    dropdownDateFilter:false,
    dropdownStatusFilter:false,
    dropdownSortBy:false
  },
  reducers: {
    toggleDateFilter: (state,action) => {
      state.dropdownDateFilter=action.payload;
    },
    toggleStatusFilter: (state,action) => {
      state.dropdownStatusFilter=action.payload;
    },
    toggleSortBy: (state,action) => {
      state.dropdownSortBy=action.payload;
    },
  }
});

export const { toggleDateFilter, toggleStatusFilter, toggleSortBy } = stateSlice.actions;

export default stateSlice.reducer;
