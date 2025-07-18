import React from "react";
import { Navigate } from "react-router-dom";
import { LoginPage } from "../Routes";
import { useSelector } from "react-redux";
import Loader from "../../components/Layout/Loader";

const ProtectedRoute = ({ children }) => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);

  console.log("login page")

  if(loading==true){
    return <Loader />
  }

  

  if (loading == false) {
    if(!isAuthenticated){
        return <Navigate to="/login" replace />
    }

    return children;
  }
};

export default ProtectedRoute;
