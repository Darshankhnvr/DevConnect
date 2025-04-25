import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const auth = useSelector((state) => state.auth);
  const user = auth?.user;

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;