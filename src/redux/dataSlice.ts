import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Info, SortDir, SortField } from '../interfaces/interfaces'

interface DataState extends Info {
  current_page: number,
  sort_field: SortField | undefined,
  sort_dir: SortDir | undefined,
  developerName: string,
  modifiedId: number,
}

const initialState: DataState = {
  tasks: [],
  total_task_count: '',
  current_page: 1,
  sort_field: undefined,
  sort_dir: undefined,
  developerName: 'Max',
  modifiedId: 0,
}

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<Info>) => {
      state.tasks = action.payload.tasks;
      state.total_task_count = action.payload.total_task_count;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.current_page = action.payload;
    },
    setSort: (state, action: PayloadAction<SortField>) => {
      if (!state.sort_field || state.sort_field !== action.payload) {
        state.sort_field = action.payload;
        state.sort_dir = SortDir.asc;
      } else if (state.sort_dir === SortDir.asc) {
        state.sort_dir = SortDir.desc;
      } else if (state.sort_dir === SortDir.desc) {
        state.sort_field = undefined;
        state.sort_dir = undefined;
      }
    },
    setModify: (state, action: PayloadAction<number>) => {
      state.modifiedId = action.payload;
    },
    resetModify: (state) => {
      state.modifiedId = 0;
    },
  },
})

export const { setData, setPage, setSort, setModify, resetModify } = dataSlice.actions

export default dataSlice.reducer