import React from 'react'
import AdminSidebar from '../components/Admin/Layout/AdminSidebar'
import AdminHeader from '../components/Admin/Layout/AdminHeader'
import AllProducts from '../components/Admin/AllProducts.jsx';

const AdminDashboardProducts = () => {
  return (
    
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="w-full flex items-start justify-between">
          <div className="w-[80px] md:w-[330px]">
            <AdminSidebar active={5} />
          </div>
          <AllProducts />
        </div>
      </div>
    </div>
  )
}

export default AdminDashboardProducts