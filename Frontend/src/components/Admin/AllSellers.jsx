import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  AiOutlineArrowRight,
  AiOutlineDelete,
  AiOutlineEye,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersAdminFun } from "../../redux/actions/user";
import { DataGrid } from "@mui/x-data-grid";
import styles from "../../styles/styles";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { getAllSellersAdminFun } from "../../redux/actions/sellers";
import { Link } from "react-router-dom";

const AllSellers = () => {
  const { allSellers, allSellersLoading } = useSelector(
    (state) => state.seller
  );
  const { user } = useSelector((state) => state.user);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();
  const [open, setOpen] = useState();

  useEffect(() => {
    dispatch(getAllSellersAdminFun());
  }, []);

  const handleDeleteSeller = async (sellerId) => {
    axios
      .delete(`${server}/shop/delete-seller/${sellerId}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.message);
        toast.success("Seller deleted successfully");
        dispatch(getAllSellersAdminFun());
        setOpen(null);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
        setOpen(null);
      });
  };

  const columns = [
    { field: "id", headerName: "Seller ID", minWidth: 150, flex: 0.7 },

    {
      field: "name",
      headerName: "Shop Name",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "email",
      headerName: "Email",
      type: "text",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "address",
      headerName: "Seller Address",
      type: "text",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "joinedAt",
      headerName: "Joined At",
      type: "text",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: "  ",
      flex: 1,
      minWidth: 150,
      headerName: "Delete Seller",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/shop/preview/${params.id}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "Delete Seller",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            {user._id !== params.id && (
              <Button onClick={() => setOpen(params.id)}>
                <AiOutlineDelete size={20} />
              </Button>
            )}
          </>
        );
      },
    },
  ];

  const row = [];

  allSellers &&
    allSellers.forEach((item) => {
      row.push({
        id: item._id,
        name: `${item._id === user._id ? "You" : item.shopName}`,
        email: item.email,
        address: item.address,
        joinedAt: item.createdAt.slice(0, 10),
      });
    });

  return (
    <div className="w-full flex justify-center pt-5 h-full bg-slate-100">
      <div className="w-[97%]">
        <h3 className="text-[22px] font-Poppins pb-2">All Sellers</h3>
        <div className="w-full min-h-[45vh] bg-white rounded">
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={4}
            disableSelectionOnClick
            autoHeight
          />
        </div>

        {open && (
          <div className="w-full fixed top-0 left-0 flex z-[999] bg-[#00000039] items-center justify-center h-screen">
            <div className="w-[95%] md:w-[40%] min-h-[20vh] bg-white rounded shadow p-5">
              <div className="flex justify-end">
                <RxCross1
                  className="cursor-pointer"
                  size={25}
                  onClick={() => setOpen(null)}
                />
              </div>
              <h3 className="text-center text-[25px] py-5">Delete Seller?</h3>
              <div className="w-full flex justify-center items-center">
                <div
                  className={`${styles.button} text-white text-[18px] !h-[42px] mr-4`}
                  onClick={() => setOpen(null)}
                >
                  Cancel
                </div>
                <div
                  className={`${styles.button} text-white text-[18px] !h-[42px] ml-4 bg`}
                  onClick={() => handleDeleteSeller(open)}
                >
                  Confirm
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllSellers;
