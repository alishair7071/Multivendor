import React, { useEffect } from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSidebar from "../../components/Shop/Layout/DashboarSidebar.jsx";
import AllProducts from "../../components/Shop/AllProducts.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop } from "../../redux/actions/product.js";


const ShopAllProducts = () => {


  return (
    <div>
      <DashboardHeader />
      <div className="w-full flex justify-between">
        <div className="w-[80px] md:w-[330px]">
          <DashboardSidebar active={3} />
        </div>
        <div className="flex w-full justify-center">
            <AllProducts />
        </div>
      </div>
    </div>
  );
};

export default ShopAllProducts;
