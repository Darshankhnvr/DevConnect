import axios from '../../api/axiosInstance';
import { 
  postFetchStart,
  postFetchSuccess,
  postFetchFailure,
  postCreateSuccess,
  postDeleteSuccess,
  postLikeSuccess,
  postUnlikeSuccess
} from '../slices/postSlice';

// Fetch all posts
export const fetchPosts = () => async (dispatch) => {
  dispatch(postFetchStart());
  try {
    const { data } = await axios.get('/posts');
    dispatch(postFetchSuccess(data));
  } catch (error) {
    dispatch(postFetchFailure(error.response?.data?.message || 'Failed to fetch posts'));
  }
};

// Create new post
export const createPost = (formData) => async (dispatch) => {
  try {
    const { data } = await axios.post('/posts/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    dispatch(postCreateSuccess(data.post));
    return data.post;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to create post';
  }
};

// Delete post
export const deletePost = (postId) => async (dispatch) => {
  try {
    await axios.delete(`/posts/${postId}`);
    dispatch(postDeleteSuccess(postId));
  } catch (error) {
    throw error.response?.data?.message || 'Failed to delete post';
  }
};

// Like a post
export const likePost = (postId) => async (dispatch, getState) => {
  const { auth } = getState();
  const userId = auth.user?._id;
  
  if (!userId) return;

  try {
    await axios.post(`/like/${postId}/toggle`);
    dispatch(postLikeSuccess({ postId, userId }));
  } catch (error) {
    console.error('Like failed:', error);
    throw error.response?.data?.message || 'Failed to like post';
  }
};

// Unlike a post
export const unlikePost = (postId) => async (dispatch, getState) => {
  const { auth } = getState();
  const userId = auth.user?._id;
  
  if (!userId) return;

  try {
    await axios.post(`/like/${postId}/toggle`);
    dispatch(postUnlikeSuccess({ postId, userId }));
  } catch (error) {
    console.error('Unlike failed:', error);
    throw error.response?.data?.message || 'Failed to unlike post';
  }
};

// Toggle like (combines like/unlike)
export const toggleLike = (postId) => async (dispatch, getState) => {
  const { posts } = getState();
  const post = posts.posts.find(p => p._id === postId);
  const isLiked = post?.likes?.includes(getState().auth.user?._id);

  try {
    if (isLiked) {
      await dispatch(unlikePost(postId));
    } else {
      await dispatch(likePost(postId));
    }
  } catch (error) {
    console.error('Toggle like failed:', error);
    throw error;
  }
};