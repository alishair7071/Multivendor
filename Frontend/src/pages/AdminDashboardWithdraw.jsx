import React from "react";
import AdminSidebar from "../components/Admin/Layout/AdminSidebar";
import AdminHeader from "../components/Admin/Layout/AdminHeader";
import AllWithdrawRequests from "../components/Admin/AllWithdrawRequests.jsx";

const AdminDashboardWithdraw = () => {
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="w-full flex items-start justify-between">
          <div className="w-[80px] md:w-[330px]">
            <AdminSidebar active={7} />
          </div>
          <AllWithdrawRequests />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardWithdraw;
