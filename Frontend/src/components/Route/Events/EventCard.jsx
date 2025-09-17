import React from "react";
import styles from "../../../styles/styles.js";
import CountDown from "./CountDown.jsx";
import { backend_url } from "../../../server.js";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCartFun } from "../../../redux/actions/cart.js";
import { toast } from "react-toastify";

const EventCard = ({ active, data }) => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  const addToCartHandler = (data) => {
    const isItemExist = cart && cart.find((i) => i._id == data._id);
    if (isItemExist) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addToCartFun(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  return (
    <div
      className={`w-full block bg-white rounded-lg ${
        active ? "unset" : "mb-12"
      } lg:flex p-2 mb-12`}
    >
      <div className="w-full mr-4 lg:w-[50%] m-auto">
        <img
          src={`${data?.images[0]?.url}`}
          alt=""
          className="rounded-lg"
        />
      </div>
      <div className="w-full lg:w-[50%] flex flex-col justify-center">
        <h2 className={`${styles.productTitle}`}>{data && data.name}</h2>
        <p>{data && data.description}</p>
        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
              {data?.originalPrice}$
            </h5>
            <h5 className="font-[bold] text-[20px] text-[#333] font-Roboto">
              {data?.discountPrice}$
            </h5>
          </div>
          <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
            120 sold
          </span>
        </div>
        <CountDown data={data} />
        <br />
        <div className="flex items-center gap-4 mt-5">
          <Link to={`/product/${data?._id}?isEvent=true`}>
            <button className="px-5 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium shadow-md hover:opacity-90 transition">
              See Details
            </button>
          </Link>
          <button
            onClick={() => addToCartHandler(data)}
            className="px-5 py-2 rounded-full bg-gradient-to-r from-teal-600 to-emerald-500 text-white font-medium shadow-md hover:opacity-90 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
