import AdminHeader from "../components/Admin/Layout/AdminHeader.jsx";
import AdminSidebar from "../components/Admin/Layout/AdminSidebar.jsx";
import AdminDashboardMain from "../components/Admin/AdminDashboardMain.jsx";


const AdminDashboardPage = () => {
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="w-full flex items-start justify-between">
          <div className="w-[80px] md:w-[330px]">
            <AdminSidebar active={1} />
          </div>
          <AdminDashboardMain />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
