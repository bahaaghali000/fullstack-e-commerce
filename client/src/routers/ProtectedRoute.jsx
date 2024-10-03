import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { NotFound } from "../pages";

const ProtectedRoute = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (isAuthenticated) {
    return <Outlet />;
  }
  return <NotFound />;
};

export default ProtectedRoute;
