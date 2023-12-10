import { createSlice } from '@reduxjs/toolkit';

const stateSlice = createSlice({
  name: 'taskList/state',
  initialState: {
    deleteConfirmation: false,
    selectedTask: '',
    sortedColumn: () => {}
  },
  reducers: {
    toggleDeleteConfirmation: (state, action) => {
      state.deleteConfirmation = action.payload;
    },
    setSortedColumn: (state, action) => {
      state.sortedColumn = action.payload;
    },
    setSelectedTask: (state, action) => {
      state.selectedTask = action.payload;
    }
  }
});

export const { toggleDeleteConfirmation, setSortedColumn, setSelectedBonus } = stateSlice.actions;

export default stateSlice.reducer;
