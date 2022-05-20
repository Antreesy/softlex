import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Info, SortDir, SortField } from "../interfaces/interfaces";

export interface DataState extends Info {
  current_page: number,
  sort_field: SortField | undefined,
  sort_dir: SortDir | undefined,
  developerName: string,
}

const initialState: DataState = {
  tasks: [],
  total_task_count: "",
  current_page: 1,
  sort_field: undefined,
  sort_dir: undefined,
  developerName: "Max",
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<Info>) => (
      { ...state, tasks: action.payload.tasks, total_task_count: action.payload.total_task_count }
    ),
    setPage: (state, action: PayloadAction<number>) => (
      { ...state, current_page: action.payload }
    ),
    setSort: (state, action: PayloadAction<SortField>) => {
      if (!state.sort_field || state.sort_field !== action.payload) {
        return { ...state, sort_field: action.payload, sort_dir: SortDir.asc };
      }
      if (state.sort_dir === SortDir.asc) {
        return { ...state, sort_dir: SortDir.desc };
      }
      if (state.sort_dir === SortDir.desc) {
        return { ...state, sort_field: undefined, sort_dir: undefined };
      }
      return state;
    },
  },
});

export const { setData, setPage, setSort } = dataSlice.actions;

export default dataSlice.reducer;
