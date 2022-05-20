import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authSlice from './authSlice';
import dataSlice from './dataSlice'

export const store = configureStore({
  reducer: {
    data: dataSlice,
    auth: authSlice,
  }
})

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
