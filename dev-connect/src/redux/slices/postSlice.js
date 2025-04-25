import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: [],
  loading: false,
  error: null,
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    
    postFetchStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    postFetchSuccess: (state, action) => {
      state.loading = false;
      //post ka state update krra
      state.posts = action.payload;
    },
    postFetchFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    postCreateSuccess: (state, action) => {
      state.posts.unshift(action.payload);
    },
    postDeleteSuccess: (state, action) => {
      state.posts = state.posts.filter(post => post._id !== action.payload);
    },
    postLikeSuccess: (state, action) => {
      const { postId, userId } = action.payload;
      const post = state.posts.find(p => p._id === postId);
      if (post) {
        post.likes.push(userId);
        post.likesCount = post.likes.length;
      }
    },
    postUnlikeSuccess: (state, action) => {
      const { postId, userId } = action.payload;
      const post = state.posts.find(p => p._id === postId);
      if (post) {
        post.likes = post.likes.filter(id => id !== userId);
        post.likesCount = post.likes.length;
      }
    }
  }
});

// Export all action creators
export const { 
  postFetchStart,
  postFetchSuccess,
  postFetchFailure,
  postCreateSuccess,
  postDeleteSuccess,
  postLikeSuccess,
  postUnlikeSuccess
} = postSlice.actions;

export default postSlice.reducer;