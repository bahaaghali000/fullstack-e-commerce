import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { NotFound } from "../pages";

const ProtectedRoute = () => {
  const { token } = useSelector((state) => state.auth);

  if (token) {
    return <Outlet />;
  }
  return <NotFound />;
};

export default ProtectedRoute;
