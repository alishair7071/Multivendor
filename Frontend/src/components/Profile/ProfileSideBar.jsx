import React from "react";
import { AiOutlineCreditCard, AiOutlineLogin, AiOutlineMessage } from "react-icons/ai";
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import { RxPerson } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import {MdOutlineTrackChanges, MdPassword} from "react-icons/md";
import {TbAddressBook} from "react-icons/tb";
import axios from "axios";
import { server } from "../../server";
import {toast} from "react-toastify";
import { logOutUser } from "../../redux/reducers/user";
import { useDispatch } from "react-redux";

const ProfileSideBar = ({ active, setActive }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = ()=>{
    axios.get(`${server}/user/logout`, {withCredentials: true}).then((res)=>{
      toast.success(res.data.message);
      dispatch(logOutUser());
      navigate("/login");
    }).catch((e)=>{
      console.log("catch Error: "+ e.response.data.message);
    });
  }

  return (
    <div className="w-full bg-white shadow-sm rounded-[10px] p-4 pt-8">
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(1)}
      >
        <RxPerson size={20} color={active == 1 ? "red" : ""} />
        <span className={`pl-3 ${active == 1 ? "text-[red]" : ""} hidden md:block`}>
          Profile
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(2)}
      >
        <HiOutlineShoppingBag size={20} color={active == 2 ? "red" : ""} />
        <span className={`pl-3 ${active == 2 ? "text-[red]" : ""}  hidden md:block`}>
          Orders
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(3)}
      >
        <HiOutlineReceiptRefund size={20} color={active == 3 ? "red" : ""} />
        <span className={`pl-3 ${active == 3 ? "text-[red]" : ""}  hidden md:block`}>
          Refunds
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(4) || navigate("/inbox")}
      >
        <AiOutlineMessage size={20} color={active == 4 ? "red" : ""} />
        <span className={`pl-3 ${active == 4 ? "text-[red]" : ""}  hidden md:block`}>Inbox</span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(5)}
      >
        <MdOutlineTrackChanges size={20} color={active == 5 ? "red" : ""} />
        <span className={`pl-3 ${active == 5 ? "text-[red]" : ""}  hidden md:block`}>Track Order</span>
      </div>

       <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(6)}
      >
        <MdPassword size={20} color={active == 6 ? "red" : ""} />
        <span className={`pl-3 ${active == 6 ? "text-[red]" : ""}  hidden md:block`}>Change password</span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(7)}
      >
        <TbAddressBook size={20} color={active == 7 ? "red" : ""} />
        <span className={`pl-3 ${active == 7 ? "text-[red]" : ""}  hidden md:block`}>Address</span>
      </div>

      
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(8) || logoutHandler()}
      >
        <AiOutlineLogin size={20} color={active == 8 ? "red" : ""} />
        <span className={`pl-3 ${active == 8 ? "text-[red]" : ""}  hidden md:block`}>Log Out</span>
      </div>
    </div>
  );
};

export default ProfileSideBar;
