import React, { useEffect } from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSidebar from "../../components/Shop/Layout/DashboarSidebar.jsx";
import AllCoupons from "../../components/Shop/AllCoupons.jsx";

const ShopAllCoupouns = () => {


  return (
    <div>
      <DashboardHeader />
      <div className="w-full flex justify-between">
        <div className="w-[80px] md:w-[330px]">
          <DashboardSidebar active={9} />
        </div>
        <div className="flex w-full justify-center">
            <AllCoupons />
        </div>
      </div>
    </div>
  );
};

export default ShopAllCoupouns;
