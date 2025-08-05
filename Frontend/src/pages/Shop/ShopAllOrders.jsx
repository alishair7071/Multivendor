import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import DashboardSidebar from '../../components/Shop/Layout/DashboarSidebar.jsx'
import AllOrders from '../../components/Shop/AllOrders.jsx'

const ShopAllOrders = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="w-full flex justify-between">
        <div className="w-[80px] md:w-[330px]">
          <DashboardSidebar active={2} />
        </div>
        <div className="flex w-full justify-center">
            <AllOrders />
        </div>
      </div>
    </div>
  )
}

export default ShopAllOrders