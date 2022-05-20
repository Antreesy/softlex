import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  username: string,
  token: string,
}

const initialState: AuthState = {
  username: localStorage.getItem("username") || "",
  token: localStorage.getItem("token") || "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      localStorage.setItem("token", action.payload);
      return { ...state, token: action.payload };
    },
    setUser: (state, action: PayloadAction<string>) => {
      localStorage.setItem("username", action.payload);
      return { ...state, username: action.payload };
    },
    resetToken: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      return { ...state, username: "", token: "" };
    },
  },
});

export const { setToken, setUser, resetToken } = authSlice.actions;

export default authSlice.reducer;
