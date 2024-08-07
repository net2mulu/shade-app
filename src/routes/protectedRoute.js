import { Navigate, Outlet, useLocation } from "react-router-dom";

export const ProtectedRoute = () => {
  const { pathname } = useLocation();
  if (
    localStorage.getItem("access_token") &&
    localStorage.getItem("refresh_token")
  ) {
    return <Outlet />;
  } else {
    localStorage.clear();
    return <Navigate to={`/?redirectTo=${pathname}`} />;
  }
};
