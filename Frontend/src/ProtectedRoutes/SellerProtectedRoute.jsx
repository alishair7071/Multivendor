import React from "react";
import { Navigate } from "react-router-dom";

const SellerProtectedRoute = ({ children, isSeller }) => {
  if (!isSeller) {
    return <Navigate to={`/shop-login`}/>;
  }

  return children;
};

export default SellerProtectedRoute;
