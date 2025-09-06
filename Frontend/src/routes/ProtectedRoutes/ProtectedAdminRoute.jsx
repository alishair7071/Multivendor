import React from "react";
import { Navigate } from "react-router-dom";
import { LoginPage } from "../Routes";
import { useSelector } from "react-redux";
import Loader from "../../components/Layout/Loader";

const ProtectedAdminRoute = ({ children }) => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  if (loading == true) {
    return <Loader />;
  }

  if (loading == false) {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    } else if (user.role !== "Admin") {
      return <Navigate to="/" replace />;
    }

    return children;
  }
};

export default ProtectedAdminRoute;
