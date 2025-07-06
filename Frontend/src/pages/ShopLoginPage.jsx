import React from 'react'
import ShopLogin from "../components/Shop/ShopLogin.jsx";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';


const ShopLoginPage = () => {


    const { isSeller, isLoading} = useSelector((state) => state.seller);
    const navigate = useNavigate();
  
  
    useEffect(()=>{
  
      if(isSeller == true) {
        navigate("/dashboard");
      }
  
    },[isSeller, isLoading]);

  return (
    <div>
        <ShopLogin />
    </div>
  )
}

export default ShopLoginPage