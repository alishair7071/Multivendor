import React, { act, useState } from "react";
import { useSelector } from "react-redux";
import { backend_url } from "../../server";
import {
  AiOutlineArrowRight,
  AiOutlineCamera,
  AiOutlineDelete,
} from "react-icons/ai";
import styles from "../../styles/styles.js";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { MdOutlineTrackChanges } from "react-icons/md";

const ProfileContent = ({ active }) => {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const [name, setName] = useState(user && user.name);
  console.log(name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [ZipCode, setZipCode] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  console.log(`${backend_url}${user?.avatar}`);

  return (
    <div className="w-full">
      {/**Profile */}
      {active == 1 && (
        <>
          <div className="w-full flex justify-center">
            <div className="relative">
              <img
                className="rounded-full w-[150px] h-[150px] border-[3px] border-[#3ad132] object-cover"
                src={`${backend_url}/${user?.avatar}`}
                alt=""
              />
              <div
                className="w-[30px] h-[30px] bg-amber-100 rounded-full flex items-center justify-center
            cursor-pointer absolute bottom-[5px] right-[5px]"
              >
                <AiOutlineCamera />
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="w-full px-5">
            <form onSubmit={handleSubmit} aria-required={true}>
              <div className="w-full block md:flex pb-3">
                <div className="w-full md:w-[50%] ">
                  <label className="block pt-2">Full Name</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[90%]`}
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="w-full md:w-[50%]">
                  <label className="block pt-2">Email Address</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[90%]`}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full block md:flex pb-3">
                <div className="w-full md:w-[50%]">
                  <label className="block pt-2">Phone Number</label>
                  <input
                    type="number"
                    className={`${styles.input} !w-[90%]`}
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <div className="w-full md:w-[50%]">
                  <label className="block pt-2">Zip Code</label>
                  <input
                    type="number"
                    className={`${styles.input} !w-[90%]`}
                    required
                    value={ZipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full block md:flex pb-3">
                <div className="w-full md:w-[50%]">
                  <label className="block pt-2">Address 1</label>
                  <input
                    type="address"
                    className={`${styles.input} !w-[90%]`}
                    required
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                  />
                </div>
                <div className="w-full md:w-[50%]">
                  <label className="block pt-2">Address 2</label>
                  <input
                    type="address"
                    className={`${styles.input} !w-[90%]`}
                    required
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                  />
                </div>
              </div>
              <input
                className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 curosr-pointer`}
                value="Update"
                required
                type="submit"
              />
            </form>
          </div>
        </>
      )}

      {/**orders */}
      {active == 2 && (
        <div>
          <AllOrders />
        </div>
      )}

      {/**Refunds */}
      {active == 3 && (
        <div>
          <AllRefundsOrders />
        </div>
      )}

      {/**Track orders */}
      {active == 5 && (
        <div>
          <TrackOrder />
        </div>
      )}

      {/**Payment Methods */}
      {active == 6 && (
        <div>
          <PaymentMethod />
        </div>
      )}

      {/**Payment Methods */}
      {active == 7 && (
        <div>
          <Address />
        </div>
      )}
    </div>
  );
};

const AllOrders = () => {
  const orders = [
    {
      id: "asfkasjfanfljwafiw",
      orderItems: [
        {
          name: "Iphone 14 Pro max",
        },
      ],
      totalPrice: 120,
      orderStatus: "processing",
    },
  ];

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.value === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item.id,
        itemsQty: item.orderItems.length,
        total: "US$ " + item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableRowSelectionOnClick
      />
    </div>
  );
};

const AllRefundsOrders = () => {
  const orders = [
    {
      id: "asfkasjfanfljwafiw",
      orderItems: [
        {
          name: "Iphone 14 Pro max",
        },
      ],
      totalPrice: 120,
      orderStatus: "processing",
    },
  ];

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.value === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item.id,
        itemsQty: item.orderItems.length,
        total: "US$ " + item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        autoHeight
        disableRowSelectionOnClick
        pageSize={10}
      />
    </div>
  );
};

const TrackOrder = () => {
  const orders = [
    {
      id: "asfkasjfanfljwafiw",
      orderItems: [
        {
          name: "Iphone 14 Pro max",
        },
      ],
      totalPrice: 120,
      orderStatus: "processing",
    },
  ];

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.value === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 130,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <MdOutlineTrackChanges size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item.id,
        itemsQty: item.orderItems.length,
        total: "US$ " + item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        autoHeight
        disableRowSelectionOnClick
        pageSize={10}
      />
    </div>
  );
};

const PaymentMethod = () => {
  return (
    <div className="w-full px-5">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000000ba]">
          Payment Methods
        </h1>
        <div className={`${styles.button} !rounded-md`}>
          <span className="text-[#fff] ">Add New</span>
        </div>
      </div>
      <br />
      <div className="w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10">
        <div className="flex items-center">
          <img
            src="https://bonik-react.vercel.app/assets/images/payment-methods/Visa.svg"
            alt=""
          />
          <h5 className="font-[600] pl-5">Ali Shair</h5>
        </div>
        <div className="pl-8 items-center flex ">
          <h6>1234 **** *** **** </h6>
          <h5 className="pl-6">16/2025</h5>
        </div>
        <div className="min-w-[10%] flex items-center justify-between pl-8">
          <AiOutlineDelete size={25} className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

const Address = () => {
  return (
    <div className="w-full px-5">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000000ba]">
          My Addresses
        </h1>
        <div className={`${styles.button} !rounded-md`}>
          <span className="text-[#fff] ">Add New</span>
        </div>
      </div>
      <br />
      <div className="w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10">
        <div className="flex items-center">
          <h5 className="font-[600] pl-5">Ali Shair</h5>
        </div>
        <div className="pl-8 items-center flex ">
          <h6>Township Sector A2, Lahore, Punjab</h6>
        </div>
        <div className="pl-8 items-center flex ">
          <h6>(+92) 3001234567</h6>
        </div>
        <div className="min-w-[10%] flex items-center justify-between pl-8">
          <AiOutlineDelete size={25} className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default ProfileContent;
