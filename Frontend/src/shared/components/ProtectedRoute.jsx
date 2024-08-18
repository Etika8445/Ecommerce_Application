import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const isLoggedIn = useSelector((state) => state.user.isloggedin);
  //putting check
  return isLoggedIn ? <Outlet/> : <Navigate to="/" />;
};

export default ProtectedRoute;