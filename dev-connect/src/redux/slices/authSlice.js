
import { createSlice } from "@reduxjs/toolkit";

const getStoredAuth = () => {
  try {
    const auth = localStorage.getItem('auth');
    return auth ? JSON.parse(auth) : null;
  } catch (error) {
    console.error("Failed to parse auth data:", error);
    return null;
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState: getStoredAuth() || {
    user: null,
    username: null,
    token: null
  },
  reducers: {
    setCredentials: (state, action) => {
      const { user, username, token } = action.payload;
      state.user = user;
      state.username = username;
      state.token = token;
      localStorage.setItem('auth', JSON.stringify({ user, username, token }));
    },
    logout: (state) => {
      state.user = null;
      state.username = null;
      state.token = null;
      localStorage.removeItem('auth');
    },

    loadAuth: (state) => {
      const auth = getStoredAuth();
      if (auth) {
        state.user = auth.user;
        state.username = auth.username;
        state.token = auth.token;
      }
    }
  }
});


export const { setCredentials, logout, loadAuth } = authSlice.actions;
export default authSlice.reducer;