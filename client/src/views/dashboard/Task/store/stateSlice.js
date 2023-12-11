import { createSlice } from '@reduxjs/toolkit';

const stateSlice = createSlice({
  name: 'taskList/state',
  initialState: {
    dropdownDateFilter:false,
    dropdownStatusFilter:false,
    dropdownSortBy:false,
    historyPopup: {
      isOpen: false, // HistoryPopup başlangıçta kapalı
      taskId: null, // Açık olan HistoryPopup hangi görev için
    },
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
    openHistoryPopup: (state, action) => {
      state.historyPopup.isOpen = true;
      state.historyPopup.taskId = action.payload.taskId;
    },
    closeHistoryPopup: (state) => {
      state.historyPopup.isOpen = false;
      state.historyPopup.taskId = null;
    },
  }
});

export const { toggleDateFilter, toggleStatusFilter, toggleSortBy,openHistoryPopup,closeHistoryPopup } = stateSlice.actions;

export default stateSlice.reducer;
