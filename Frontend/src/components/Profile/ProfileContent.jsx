import React, { act, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { backend_url, server } from "../../server";
import {
  AiOutlineArrowRight,
  AiOutlineCamera,
  AiOutlineDelete,
} from "react-icons/ai";
import styles from "../../styles/styles.js";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { MdOutlineTrackChanges, MdTrackChanges } from "react-icons/md";
import {
  deleteUserAddress,
  updateUserAddresses,
  updateUserInformation,
} from "../../redux/actions/user.js";
import { toast } from "react-toastify";
import axios from "axios";
import { Country, State, City } from "country-state-city";
import { RxCross1 } from "react-icons/rx";
import { getAllOrdersUserFun } from "../../redux/actions/order.js";

const ProfileContent = ({ active }) => {
  const { user, error } = useSelector((state) => state.user);
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(
      updateUserInformation({ name, email, password, phoneNumber })
    );
    if (data.success) {
      toast.success("User information updated successfully!");
    } else {
      toast.error(data.message || "Failed to update user information");
    }
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    const formData = new FormData();
    formData.append("image", file);

    await axios
      .put(`${server}/user/update-avatar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        toast.error(err.response.data.message || "Failed to update avatar");
        console.error(err);
      });
  };

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
                <input
                  type="file"
                  id="image"
                  className="hidden"
                  onChange={handleImage}
                />
                <label htmlFor="image" className="cursor-pointer">
                  <AiOutlineCamera />
                </label>
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
                  <label className="block pt-2">Enter Your Password</label>
                  <input
                    type="password"
                    className={`${styles.input} !w-[90%]`}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

      {/**Change Password */}
      {active == 6 && (
        <div>
          <ChangePassword />
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

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const userId = user && user._id;
  const { orders } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getAllOrdersUserFun(userId));
  }, [dispatch, userId]);

  console.log("orders", orders);

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
        id: item._id,
        itemsQty: item.cart.length,
        total: "US$ " + item.totalPrice,
        status: item.status,
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
  
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const userId = user && user._id;
  const { orders } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getAllOrdersUserFun(userId));
  }, [dispatch, userId]);

  console.log("orders", orders);

  const allRefunds = orders.filter((item) => item.status === "Processing refund");

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

  allRefunds &&
    allRefunds.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "US$ " + item.totalPrice,
        status: item.status,
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

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const userId = user && user._id;
  const { orders } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getAllOrdersUserFun(userId));
  }, [dispatch, userId]);

  console.log("orders", orders);

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
            <Link to={`/user/track/order/${params.id}`}>
              <Button>
                <MdTrackChanges size={20} />
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
        id: item._id,
        itemsQty: item.cart.length,
        total: "US$ " + item.totalPrice,
        status: item.status,
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

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordChangeHandler = async (e) => {
    e.preventDefault();

    await axios
      .put(
        `${server}/user/update-password`,
        {
          oldPassword,
          newPassword,
          confirmPassword,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message);
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }).catch((e) => {
        toast.error(e.response.data.message || "Failed to change password");
      });

    }

    return (
      <div className="w-full px-5">
        <h1 className="text-[25px] text-center font-[600] text-[#000000ba]">
          Change Password
        </h1>

        <div className="w-full">
          <form
            aria-required
            onSubmit={passwordChangeHandler}
            className="flex flex-col items-center"
          >
            <div className="w-full md:w-[50%] mt-3">
              <label className="block pt-2">Enter your old password</label>
              <input
                type="password"
                className={`${styles.input} !w-[90%]`}
                required
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
            <div className="w-full md:w-[50%] ">
              <label className="block pt-2">Enter your new password</label>
              <input
                type="password"
                className={`${styles.input} !w-[90%]`}
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="w-full md:w-[50%] ">
              <label className="block pt-2">Confirm your new password</label>
              <input
                type="password"
                className={`${styles.input} !w-[90%]`}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <input
                className={`w-[90%] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
                value="Update"
                required
                type="submit"
              />
            </div>
          </form>
        </div>
      </div>
    );
  };
  const Address = () => {
    const [open, setOpen] = useState(false);
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [zipCode, setZipCode] = useState();
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [addressType, setAddressType] = useState("");
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const addressTypeData = [
      { name: "Home" },
      { name: "Default" },
      { name: "Office" },
    ];

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (addressType === "" || country === "" || city === "") {
        toast.error("Please fill all the fields");
      } else {
        const data = await dispatch(
          updateUserAddresses({
            country,
            city,
            address1,
            address2,
            zipCode,
            addressType,
          })
        );
        if (data.success) {
          toast.success("User address added successfully!");
        } else {
          toast.error(data.message || "Failed to update user information");
        }
      }
    };

    const handleDelete = async (item) => {
      const data = await dispatch(deleteUserAddress(item._id));
      console.log(data);
      if (data.success) {
        toast.success("User address deleted successfully!");
      } else {
        toast.error(data.message || "Failed to delete user address");
      }
    };

    return (
      <div className="w-full px-5">
        {open && (
          <div className="fixed top-0 left-0 w-full h-screen bg-[#0000004b] flex items-center justify-center z-10">
            <div className="w-[35%] h-[80vh] bg-white rounded shadow relative overflow-y-scroll">
              <div className="flex w-full justify-end p-3">
                <RxCross1
                  size={30}
                  className="cursor-pointer"
                  onClick={() => setOpen(false)}
                />
              </div>
              <h1 className="text-center text-[25px] font-Poppins">
                Add New Address
              </h1>
              <div className="w-full">
                <form aria-required onSubmit={handleSubmit} className="w-full">
                  <div className="w-full block p-4">
                    <div className="w-full pb-2">
                      <label className="block pb-2">Choose Your Country</label>
                      <select
                        name=""
                        id=""
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-[95%] border h-[40px] rounded-[5px]"
                      >
                        <option className="block border pb-2" value="">
                          Select Country
                        </option>
                        {Country &&
                          Country.getAllCountries().map((item) => (
                            <option key={item.isoCode} value={item.isoCode}>
                              {item.name}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div className="w-full pb-2">
                      <label className="block pb-2">Choose Your City</label>
                      <select
                        name=""
                        id=""
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-[95%] border h-[40px] rounded-[5px]"
                      >
                        <option className="block border pb-2" value="">
                          Select City
                        </option>
                        {City &&
                          City.getCitiesOfCountry(country).map((item) => (
                            <option key={item.isoCode} value={item.isoCode}>
                              {item.name}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div className="w-full pb-2">
                      <label className="block pb-2">Address 1</label>
                      <input
                        type="address"
                        className={`${styles.input}`}
                        required
                        value={address1}
                        onChange={(e) => setAddress1(e.target.value)}
                      />
                    </div>

                    <div className="w-full pb-2">
                      <label className="block pb-2">Address 2</label>
                      <input
                        type="address"
                        className={`${styles.input}`}
                        required
                        value={address2}
                        onChange={(e) => setAddress2(e.target.value)}
                      />
                    </div>

                    <div className="w-full pb-2">
                      <label className="block pb-2">Zip Code</label>
                      <input
                        type="number"
                        className={`${styles.input}`}
                        required
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                      />
                    </div>

                    <div className="w-full pb-2">
                      <label className="block pb-2">
                        Choose Your Address Type
                      </label>
                      <select
                        name=""
                        id=""
                        value={addressType}
                        onChange={(e) => setAddressType(e.target.value)}
                        className="w-[95%] border h-[40px] rounded-[5px]"
                      >
                        <option className="block border pb-2" value="">
                          Select Address Type
                        </option>
                        {addressTypeData &&
                          addressTypeData.map((item) => (
                            <option key={item.name} value={item.name}>
                              {item.name}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div className="w-full pb-2">
                      <input
                        type="submit"
                        className={`${styles.input} cursor-pointer mt-5`}
                        required
                        readOnly
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
        <div className="flex w-full items-center justify-between">
          <h1 className="text-[25px] font-[600] text-[#000000ba]">
            My Addresses
          </h1>
          <div
            className={`${styles.button} !rounded-md`}
            onClick={() => setOpen(true)}
          >
            <span className="text-[#fff] ">Add New</span>
          </div>
        </div>
        <br />
        {user &&
          user.addresses.map((item, index) => (
            <div
              className="mb-3 w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10"
              key={index}
            >
              <div className="flex items-center">
                <h5 className="font-[600] pl-5">{item.addressType}</h5>
              </div>
              <div className="pl-8 items-center flex ">
                <h6>
                  {item.address1} , {item.address2}
                </h6>
              </div>
              <div className="pl-8 items-center flex ">
                <h6>{user && user.phoneNumber}</h6>
              </div>
              <div className="min-w-[10%] flex items-center justify-between pl-8">
                <AiOutlineDelete
                  size={25}
                  className="cursor-pointer"
                  onClick={() => handleDelete(item)}
                />
              </div>
            </div>
          ))}

        {user && user.addresses.length === 0 && (
          <h5 className="text-center pt-8 text-[18px]">
            You have not any saved address
          </h5>
        )}
      </div>
    );
  };

export default ProfileContent;
