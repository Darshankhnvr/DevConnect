// AuthInitializer.jsx
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadAuth } from '../redux/slices/authSlice';

const AuthInitializer = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAuth());
  }, [dispatch]);

  return children;
};

export default AuthInitializer;