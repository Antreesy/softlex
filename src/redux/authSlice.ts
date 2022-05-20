import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  username: string,
  token: string,
}

const initialState: AuthState = {
  username: localStorage.getItem('username') || '',
  token: localStorage.getItem('token') || '',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload )
    },
    setUser: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
      localStorage.setItem('username', action.payload )
    },
    resetToken: (state) => {
      state.token = '';
      state.username = '';
      localStorage.removeItem('token')
      localStorage.removeItem('username')
    },
  },
})

export const { setToken, setUser, resetToken } = authSlice.actions

export default authSlice.reducer