import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  username: string | null;
  isGuest: boolean;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  username: null,
  isGuest: false,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ username: string; isGuest: boolean }>
    ) => {
      state.username = action.payload.username;
      state.isGuest = action.payload.isGuest;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.username = null;
      state.isGuest = false;
      state.isAuthenticated = false;
    },
    signup: (
      state,
      action: PayloadAction<{ username: string; isGuest: boolean }>
    ) => {
      // After successful signup, we can treat the user as authenticated
      state.username = action.payload.username;
      state.isGuest = action.payload.isGuest;
      state.isAuthenticated = true;
    },
  },
});

// Export actions
export const { login, logout, signup } = authSlice.actions;

// Export the reducer
export default authSlice.reducer;
