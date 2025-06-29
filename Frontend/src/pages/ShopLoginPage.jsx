import React from 'react'
import ShopLogin from "../components/Shop/ShopLogin.jsx";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';


const ShopLoginPage = () => {


    const { isSeller, seller} = useSelector((state) => state.seller);
    const navigate = useNavigate();
  
  
    useEffect(()=>{
  
      if(isSeller == true) {
        navigate(`/shop/${seller._id}` , { replace: true });
      }
  
    },[isSeller, seller, navigate]);

  return (
    <div>
        <ShopLogin />
    </div>
  )
}

export default ShopLoginPage