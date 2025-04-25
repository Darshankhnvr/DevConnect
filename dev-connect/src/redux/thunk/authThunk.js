import axiosInstance from "../../api/axiosInstance"
export const logout = () => async (dispatch) => {
    try {
      dispatch({ type: 'auth/logout' });
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  
  export const updateProfile = (profileData) => async (dispatch) => {
    try {
      dispatch({ type: 'auth/updateProfileRequest' });
  
      const response = await axiosInstance.put('/user/profile', profileData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const updatedUser = response.data.user;
  
      dispatch({
        type: 'auth/updateProfileSuccess',
        payload: updatedUser,
      });
  
      // Optionally update localStorage if user info is stored there
      localStorage.setItem('user', JSON.stringify(updatedUser));
  
      return updatedUser;
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "An unexpected error occurred";
  
      dispatch({
        type: 'auth/updateProfileFailure',
        payload: errorMsg,
      });
  
      throw new Error(errorMsg);
    }
  };