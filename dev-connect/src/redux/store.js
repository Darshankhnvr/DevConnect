import { configureStore } from '@reduxjs/toolkit';
import postReducer from './slices/postSlice';
import authReducer from './slices/authSlice';

// Create the store
const store = configureStore({
  reducer: {
    posts: postReducer,
    auth: authReducer
  }
});

// Named export
export { store };

// Default export (optional - choose one approach)
export default store;