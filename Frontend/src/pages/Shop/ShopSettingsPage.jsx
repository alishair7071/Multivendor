import React from "react";
import Footer from "../../components/Layout/Footer";
import Header from "../../components/Layout/Header";
import ShopSettings from "../../components/Shop/ShopSettings.jsx";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader.jsx";
import DashboardSidebar from "../../components/Shop/Layout/DashboarSidebar.jsx";

const ShopSettingsPage = () => {
  return (

      <div>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] md:w-[330px]">
          <DashboardSidebar active={11} />
        </div>
        <ShopSettings />
      </div>
    </div>
  
  );
};

export default ShopSettingsPage;
