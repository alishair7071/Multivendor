import React from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSidebar from "../../components/Shop/Layout/DashboarSidebar.jsx";
import CreateProduct from "../../components/Shop/CreateProduct.jsx";

const ShopCreateProduct = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="w-full flex items-center justify-between">
        <div className="w-[80px] md:w-[330px]">
          <DashboardSidebar active={4} />
        </div>
        <div className="flex w-full justify-center">
            <CreateProduct/>
        </div>
      </div>
    </div>
  );
};

export default ShopCreateProduct;
