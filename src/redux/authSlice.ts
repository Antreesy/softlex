import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  username: string,
  password: string,
  token: string,
}

const initialState: AuthState = {
  username: localStorage.getItem('username') || '',
  password: '',
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
    setPass: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    resetToken: (state) => {
      state.token = '';
      localStorage.removeItem('token')
      localStorage.removeItem('username')
    },
  },
})

export const { setToken, setUser, setPass, resetToken } = authSlice.actions

export default authSlice.reducer