import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiGetTasks } from 'services/TaskService';
import createQueryString from './utils/createQueryString';

export const getTasks = createAsyncThunk('taskList/data/getTask', async (query) => {
  const queryString = createQueryString(query);
  const response = await apiGetTasks(query ? `?${queryString}` : "");
  return response.data;
});

export const initialTableData = {
  total: 0,
  pageCount: 0,
  pageIndex: 1,
  pageSize: 10,
  sort: {},
  filter: {}
};

export const initialFilterData = {
  orderBy: -1,
  page: 1,
  size: 10,
  sort: { createdAt: 'asc' },
  filter: {}
};

const dataSlice = createSlice({
  name: 'taskList/data',
  initialState: {
    loading: false,
    taskList: [],
    tableData: initialTableData,
    filterData: initialFilterData,
    countFormExt1: 0
  },
  reducers: {
    updateTaskList: (state, action) => {
      state.taskList = action.payload;
    },
    setTaskData: (state, action) => {
      state.tableData = action.payload;
    },
    setFilter: (state, action) => {
      state.filterData.filter = { ...state.filterData.filter, ...action.payload };
    },
    setSort: (state, action) => {
      state.filterData.filter.sort = { ...state.filterData.filter.sort, ...action.payload };
    },
    setFilterData: (state, action) => {
      state.filterData = action.payload;
    },
    setCountFormExt1: (state, action) => {
      state.countFormExt1 = action.payload;
    }
  },
  extraReducers: {
    [getTasks.fulfilled]: (state, action) => {
      state.taskList = action.payload;
      state.tableData.pageSize = action.payload.meta.pageSize;
      state.tableData.pageCount = action.payload.meta.pageCount;
      state.tableData.pageIndex = action.payload.meta.pageIndex;
      state.tableData.total = action.payload.meta.total;
      state.loading = false;
    },
    [getTasks.pending]: (state) => {
      state.loading = true;
    }
  }
});

export const {
  updateTaskList,
  setTableData,
  setFilterDatas,
  setFilter,
  setSort,
  setCountFormExt1
} = dataSlice.actions;

export default dataSlice.reducer;
