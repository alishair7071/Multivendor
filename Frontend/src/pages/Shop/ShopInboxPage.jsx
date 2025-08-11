import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import DashboardMessages from "../../components/Shop/DashboardMessages.jsx";
import DashboarSidebar from '../../components/Shop/Layout/DashboarSidebar.jsx';

const ShopInboxPage = () => {
  return (
    <div>
    <DashboardHeader />
    <div className="flex items-start justify-between w-full">
      <div className="w-[80px] md:w-[330px]">
        <DashboarSidebar active={8} />
      </div>
       <DashboardMessages />
    </div>
  </div>
  )
}

export default ShopInboxPage