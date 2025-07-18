import React, { useEffect } from 'react'
import Login from '../components/Login.jsx';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Layout/Loader.jsx';

const LoginPage= ()=> {

  const { isAuthenticated, loading} = useSelector((state) => state.user);
  const navigate = useNavigate();



  useEffect(()=>{

    if(isAuthenticated == true) {
      navigate("/");
    }

  },[isAuthenticated])

  return (
    <div>
      <Login/>
    </div>
  )
}

export default LoginPage;
