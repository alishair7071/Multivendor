import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AiOutlineArrowRight, AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersAdminFun } from "../../redux/actions/user";
import { DataGrid } from "@mui/x-data-grid";
import styles from "../../styles/styles";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";

const AllUsers = () => {
  const { allUsers, allUsersLoading } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [open, setOpen] = useState();

  useEffect(() => {
    dispatch(getAllUsersAdminFun());
  }, []);

  const handleDeleteUser = async (userId) => {
    axios
      .delete(`${server}/user/delete-user/${userId}`, { withCredentials: true })
      .then((res) => {
        console.log(res.data.message);
        toast.success("User deleted successfully");
        dispatch(getAllUsersAdminFun());
        setOpen(null)
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
        setOpen(null)
      });
  };

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 150, flex: 0.7 },

    {
      field: "name",
      headerName: "Name",
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
      field: "role",
      headerName: "User role",
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
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "Delete User",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
          {
            user._id !== params.id && (
              <Button onClick={() => setOpen(params.id)}>
                <AiOutlineDelete size={20} />
              </Button>
            )
          }
          </>
        );
      },
    },
  ];

  const row = [];

  allUsers &&
    allUsers.forEach((item) => {
      row.push({
        id: item._id,
        name: `${item._id === user._id ? "You" : item.name}`,
        email: item.email,
        role: item.role,
        joinedAt: item.createdAt.slice(0, 10),
      });
    });

  return (
    <div className="w-full flex justify-center pt-5 h-full bg-slate-100">
      <div className="w-[97%]">
        <h3 className="text-[22px] font-Poppins pb-2">All Users</h3>
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
              <h3 className="text-center text-[25px] py-5">Delete User?</h3>
              <div className="w-full flex justify-center items-center">
                <div
                  className={`${styles.button} text-white text-[18px] !h-[42px] mr-4`}
                  onClick={()=> setOpen(null)}
                >
                  Cancel
                </div>
                <div
                  className={`${styles.button} text-white text-[18px] !h-[42px] ml-4 bg`}
                  onClick={() => handleDeleteUser(open)}
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

export default AllUsers;
