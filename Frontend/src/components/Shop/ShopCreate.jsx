import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../styles/styles.js";
import { Link, useNavigate } from "react-router-dom";
import { server } from "../../server.js";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loadUser } from "../../redux/actions/user.js";
import { RxAvatar } from "react-icons/rx";

const ShopCreate = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const [shopName, setShopName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [zipCode, setZipCode] = useState();
  const [address, setAddress] = useState();
  const [avatar, setAvatar] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config= {
      headers: {"Content-Type" : "multipart/form-data"}
    }
    if(avatar==null){
      toast("Please select profile the image");
      return;
    }
   

    const newForm= new FormData();
    newForm.append("file", avatar);
    newForm.append("shopName", shopName);
    newForm.append("email", email);
    newForm.append("password", password);
    newForm.append("zipCode", zipCode);
    newForm.append("address", address);
    newForm.append("phoneNumber", phoneNumber);
    

    axios.post(`${server}/shop/create-shop`, newForm, config)
    .then((res)=>{
      toast.success(res.data.message);
      setShopName("");
      setEmail("");
      setPassword("");
      setAvatar(null);
      setZipCode("");
      setAddress("");
      setPhoneNumber("");
      navigate("/login");
    }).catch((err)=>{
      console.log(err);
      toast.error(err.response.data.message);
    })
  };


  const handleFileInputChange= (e)=>{
    const file = e.target.files[0];
    setAvatar(file);
  }


  return (
    <div className="min-h-screen bg-green-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Register as a seller
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[35rem]">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Shop Name
              </label>
              <div className="mt-1">
                <input
                  type="name"
                  name="name"
                  required
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                  className="apperance-none block w-full px-3 py-2 border border-gray-300 rounded-md 
                  shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 
                  sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="phone-number"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="phone-number"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="apperance-none block w-full px-3 py-2 border border-gray-300 rounded-md 
                  shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 
                  sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="apperance-none block w-full px-3 py-2 border border-gray-300 rounded-md 
                  shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 
                  sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="address"
                  autoComplete="address"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="apperance-none block w-full px-3 py-2 border border-gray-300 rounded-md 
                  shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 
                  sm:text-sm"
                />
              </div>
            </div>

               <div>
              <label
                htmlFor="zip-code"
                className="block text-sm font-medium text-gray-700"
              >
                Zip Code
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="zip-code"
                  autoComplete="email"
                  required
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="apperance-none block w-full px-3 py-2 border border-gray-300 rounded-md 
                  shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 
                  sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="apperance-none block w-full px-3 py-2 border border-gray-300 rounded-md 
                  shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 
                  sm:text-sm"
                />
                <div
                  className="absolute right-3 top-3 cursor-pointer"
                  onClick={() => setVisible(!visible)}
                >
                  {visible ? (
                    <AiOutlineEyeInvisible className="text-gray-500" />
                  ) : (
                    <AiOutlineEye className="text-gray-500" />
                  )}
                </div>
              </div>
            </div>

                        <label className="block text-sm font-medium text-gray-700"></label>
                        <div className="mt-2 flex items-center">
                          <span className="inline-block h-8 w-8 rounded-full overflow-visible">
                            {avatar ? (
                              <img
                                src={URL.createObjectURL(avatar)}
                                alt="Avatar"
                                className="h-full w-full rounded-full object-cover"
                              />
                            ) : (
                              <RxAvatar className="h-full w-full rounded-full object-cover" />
                            )}
                          </span>
                          <label
                            htmlFor="file-input"
                            className="ml-5 flex items-center px-4 py-2 border border-gray-300 
                          rounded-md shadow-sm text-sm font-medium text-gray-700 
                          cursor-pointer bg-white hover:bg-gray-50"
                          >
                            <span>Upload a file</span>
                            <input
                              type="file"
                              name="avatar"
                              id="file-input"
                              accept=".jpg,.jpeg,.png"
                              onChange={handleFileInputChange}
                              className="sr-only"
                            />
                          </label>
                        </div>


            <div>
              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent 
                text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 hover:cursor-pointer"
              >
                Submit
              </button>
            </div>

            <div className={`${styles.noramlFlex} w-full`}>
              <h4>Already have an account?</h4>
              <Link
                to="/shop-login"
                className="text-blue-600 pl-2 hover:text-blue-500 hover:cursor-pointer"
              >
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShopCreate;
