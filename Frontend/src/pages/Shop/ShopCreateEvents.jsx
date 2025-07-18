import React from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSidebar from "../../components/Shop/Layout/DashboarSidebar";
import CreateEvent from "../../components/Shop/CreateEvent.jsx";

const ShopCreateEvents = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="w-full flex items-center justify-between">
        <div className="w-[80px] md:w-[330px]">
          <DashboardSidebar active={6} />
        </div>
        <div className="flex w-full justify-center">
          <CreateEvent/>
        </div>
      </div>
    </div>
  );
};

export default ShopCreateEvents;
