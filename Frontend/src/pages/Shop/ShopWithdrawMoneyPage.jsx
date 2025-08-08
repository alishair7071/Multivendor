import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import DashboardSidebar from '../../components/Shop/Layout/DashboarSidebar.jsx'
import WithdrawMoney from '../../components/Shop/WithdrawMoney.jsx'

const ShopWithdrawMoneyPage = () => {
  return (

      <div>
    <DashboardHeader />
    <div className="flex items-start justify-between w-full">
      <div className="w-[80px] md:w-[330px]">
        <DashboardSidebar active={7} />
      </div>
       <WithdrawMoney />
    </div>
  </div>
  )
}

export default ShopWithdrawMoneyPage