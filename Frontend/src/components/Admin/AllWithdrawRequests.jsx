import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../../server";
import { DataGrid } from "@mui/x-data-grid";
import { BsPencil } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/styles";
import { toast } from "react-toastify";

const AllWithdrawRequests = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(null);
  const [withdrawStatus, setWithdrawStatus] = useState("Processing");

  useEffect(() => {
    axios
      .get(`${server}/withdraw/get-all-withdraw-requests`, {
        withCredentials: true,
      })
      .then((res) => {
        setData(res.data.withdraws);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const columns = [
    { field: "id", headerName: "Withdraw Id", minWidth: 150, flex: 0.7 },
    { field: "name", headerName: "Shop Name", minWidth: 180, flex: 1.4 },
    { field: "shopId", headerName: "Shop ID", minWidth: 180, flex: 1.4 },
    { field: "amount", headerName: "Amount", minWidth: 180, flex: 0.6 },
    {
      field: "status",
      type: "text",
      headerName: "Status",
      minWidth: 80,
      flex: 0.5,
    },
    {
      field: "createdAt",
      type: "text",
      headerName: "Created At",
      minWidth: 130,
      flex: 0.6,
    },

    {
      field: " ",
      type: "text",
      headerName: "Updated Status",
      minWidth: 130,
      flex: 0.6,
      renderCell: (params) => {
        return (
          <BsPencil
            size={20}
            className={`${params.row.status == "Succeed" ? "hidden" : "block"} cursor-pointer ml-3 mt-3`}
            onClick={() => setOpen(params.row)}
          />
        );
      },
    },
  ];

  const row = [];

  data &&
    data.forEach((item) => {
      row.push({
        id: item._id,
        shopId: item.seller._id,
        name: item.seller.shopName,
        amount: "US$ " + item.amount,
        status: item.status,
        createdAt: item.createdAt.slice(0, 10),
      });
    });

  const handleUpdate = () => {
    axios
      .put(
        `${server}/withdraw/update-withdraw-request/${open.id}`,
        {
          sellerId: open.shopId,
          status: withdrawStatus,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Withdraw status updated successfully");
        setOpen(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="w-full flex justify-center pt-5 items-start bg-slate-100 h-full">
      <div className="w-[95%]">
        <DataGrid
          rows={row}
          columns={columns}
          autoHeight
          pageSize={10}
          disableSelectionOnClick
        />
      </div>

      {open && (
        <div className="z-[999] w-full flex h-screen fixed top-0 left-0 bg-[#00000080] items-center justify-center">
          <div className="w-[50%] min-h-[40vh] rounded bg-white shadow p-4">
            <div className="w-full flex justify-end">
              <RxCross1
                size={20}
                className="cursor-pointer"
                onClick={() => setOpen(null)}
              />
            </div>
            <h1 className="text-[25px] text-center">Update withdraw status</h1>
            <br />
            <select name="" id="" className="w-[200px] h-[32px] border rounded"
            onChange={(e) => setWithdrawStatus(e.target.value)}>
              <option value="Processing">Processing</option>
              <option value="Succeed">Succeed</option>
            </select>
            <button
              className={`${styles.button} block text-white text-[18px] !h-[40px] mt-4`}
              type="submit"
              onClick={handleUpdate}
            >
              Update
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllWithdrawRequests;
