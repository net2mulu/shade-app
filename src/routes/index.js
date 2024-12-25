import { Route } from "react-router-dom";
import { ProtectedRoute } from "./protectedRoute";
import Auth from "../pages/Auth";
import Dashboard from "../pages/Dashboard";
import Shade from "../pages/Shade";
import Enterprise from "../pages/Enterprise";

const routes = (
  <>
    <Route path="/" element={<Auth />} />
    <Route
      path="/dashboard"
      element={
        <>
          <ProtectedRoute />
          <Dashboard />
        </>
      }
    />
    <Route
      path="/shade"
      element={
        <>
          <ProtectedRoute />
          <Shade />
        </>
      }
    />
     <Route
      path="/enterprise"
      element={
        <>
          <ProtectedRoute />
          <Enterprise />
        </>
      }
    />
  </>
);

export default routes;
