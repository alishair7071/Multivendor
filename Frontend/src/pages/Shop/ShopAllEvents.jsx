import React, { useEffect } from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSidebar from "../../components/Shop/Layout/DashboarSidebar.jsx";
import AllEvents from "../../components/Shop/AllEvents.jsx";

const ShopAllEvents = () => {


  return (
    <div>
      <DashboardHeader />
      <div className="w-full flex justify-between">
        <div className="w-[80px] md:w-[330px]">
          <DashboardSidebar active={5} />
        </div>
        <div className="flex w-full justify-center">
            <AllEvents />
        </div>
      </div>
    </div>
  );
};

export default ShopAllEvents;
