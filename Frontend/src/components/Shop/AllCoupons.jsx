import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  getAllProductsShop,
} from "../../redux/actions/product.js";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import Loader from "../Layout/Loader.jsx";
import { DataGrid } from "@mui/x-data-grid";
import styles from "../../styles/styles.js";
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { categoriesData } from "../../static/data.jsx";
import axios from "axios";
import { server } from "../../server.js";
import { toast } from "react-toastify";

const AllCoupons = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [value, setValue] = useState(null);
  const [minAmount, setMinAmount] = useState(null);
  const [maxAmount, setMaxAmount] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [coupons, setCoupons] = useState([]);

  const { products } = useSelector((state) => state.product);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);

    axios
      .get(`${server}/coupon/get-coupon/${seller._id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setIsLoading(false);
        console.log("entered in then");
        console.log(res.data);
        setCoupons(res.data.couponCodes);
      })
      .catch((e) => {
        console.log("entered in catch");

        console.log("e: " + e.message);
        setIsLoading(false);
      });
  }, [dispatch]);

  const handleProductDelete = (id) => {

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(
        `${server}/coupon/create-coupon-code`,
        {
          name,
          value,
          minAmount,
          maxAmount,
          selectedProduct,
          shop: seller,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Coupon code created Successfully!");
        setOpen(false);
        window.location.reload();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const columns = [
    { field: "id", headerName: "Product Id", minWidth: 150, flex: 0.7 },
    { field: "name", headerName: "Name", minWidth: 180, flex: 1.4 },
    { field: "price", headerName: "Price", minWidth: 180, flex: 0.6 },

    {
      field: "delete",
      flex: 0.8,
      minWidth: 120,
      headerName: "Delete",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button>
              <AiOutlineDelete
                size={20}
                onClick={() => handleProductDelete(params.id)}
              />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];

  coupons &&
    coupons.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: item.value + " %",
      });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
          <div className="w-full flex justify-end">
            <div
              className={`${styles.button} !w-max !h-[45px] px-3 !rounded-[5px] mr-3 mb-3`}
              onClick={() => setOpen(true)}
            >
              <span className="text-white">Create Coupon Code</span>
            </div>
          </div>
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
          {open && (
            <div className="w-full h-screen bg-[#00000062] fixed top-0 left-0 z-[2000] flex items-center justify-center">
              <div className="w-[90%] md:w-[40%] h-[95vh] md:h-[82vh] bg-white shadow rounded-md p-4">
                <div className="w-full flex justify-end">
                  <RxCross1
                    className="cursor-pointer"
                    size={30}
                    onClick={() => setOpen(false)}
                  />
                </div>

                <h5 className="text-[30px] font-Poppins text-center">
                  Create Coupon Code
                </h5>
                {/**create coupon code */}
                <form onSubmit={handleSubmit} aria-required={true}>
                  <div>
                    <label className="pb-2">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={name}
                      required={true}
                      className="mt-1 appearance-none block w-full px-3 h-35px border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focuc:ring-blue-500 sm:text-sm"
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your coupon code name..."
                    />
                  </div>
                  <br />

                  <div>
                    <label className="pb-2">
                      Discount Percentage{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="value"
                      value={value}
                      required
                      className="mt-1 appearance-none block w-full px-3 h-35px border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focuc:ring-blue-500 sm:text-sm"
                      onChange={(e) => setValue(e.target.value)}
                      placeholder="Enter your coupon code value..."
                    />
                  </div>

                  <br />

                  <div>
                    <label className="pb-2">Min Amount </label>
                    <input
                      type="number"
                      name="min-amount"
                      value={minAmount}
                      className="mt-1 appearance-none block w-full px-3 h-35px border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focuc:ring-blue-500 sm:text-sm"
                      onChange={(e) => setMinAmount(e.target.value)}
                      placeholder="Enter your coupon code min amount..."
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">Max Amount </label>
                    <input
                      type="number"
                      name="max-amount"
                      value={maxAmount}
                      className="mt-1 appearance-none block w-full px-3 h-35px border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focuc:ring-blue-500 sm:text-sm"
                      onChange={(e) => setMaxAmount(e.target.value)}
                      placeholder="Enter your coupon code max amount..."
                    />
                  </div>
                  <br />

                  <div>
                    <label className="pb-2">Selected Product</label>
                    <select
                      className="w-full mt-1 border h-[35px] rounded[5px]"
                      value={selectedProduct}
                      onChange={(e) => setSelectedProduct(e.target.value)}
                    >
                      <option value="Choose a your selected product">
                        Selected a selected product
                      </option>
                      {products &&
                        products.map((i, index) => (
                          <option value={i.name} key={index}>
                            {i.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <br />

                  <div>
                    <input
                      type="submit"
                      name="create"
                      className="mt-2 appearance-none block w-full px-3 h-35px border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focuc:ring-blue-500 sm:text-sm"
                    />
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AllCoupons;
