
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader.jsx";
import DashboardSidebar from "../../components/Shop/Layout/DashboarSidebar.jsx";


const ShopDashboardPage = () => {
  return (
    <div>
        <DashboardHeader />
        <div className="w-full flex items-center justify-between">
            <div className="w-[80px] md:w-[330px]">
                <DashboardSidebar active={1}/>
            </div>
        </div>
    </div>
  )
}

export default ShopDashboardPage;