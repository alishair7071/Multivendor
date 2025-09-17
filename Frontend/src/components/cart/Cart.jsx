import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/styles";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCartFun, removeFromCartFun } from "../../redux/actions/cart";
import { toast } from "react-toastify";

const Cart = ({ setOpenCart }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const removeFromCartHandler = (data) => {
    dispatch(removeFromCartFun(data));
  };

  const quantityChangeHandler = (data) => {
    dispatch(addToCartFun(data));
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-black/40 z-30">
      {/* Slide-in panel */}
      <div className="fixed top-0 right-0 min-h-full w-[90%] md:w-[28%] bg-white flex flex-col shadow-lg rounded-l-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-500 to-emerald-600 text-white flex justify-between items-center px-5 py-4">
          <div className="flex items-center space-x-2">
            <IoBagHandleOutline size={24} />
            <h2 className="text-lg font-semibold">
              Cart ({cart.length} items)
            </h2>
          </div>
          <RxCross1
            size={24}
            className="cursor-pointer hover:scale-110 transition"
            onClick={() => setOpenCart(false)}
          />
        </div>

        {/* Cart Items */}
        <div
          className="flex-1 overflow-y-auto p-4 space-y-4"
          style={{ maxHeight: "calc(100vh - 160px)" }}
        >
          {cart && cart.length > 0 ? (
            cart.map((i, index) => (
              <CartSingle
                key={index}
                data={i}
                removeFromCartHandler={removeFromCartHandler}
                quantityChangeHandler={quantityChangeHandler}
              />
            ))
          ) : (
            <div className="text-center text-gray-500 mt-10">
              <IoBagHandleOutline size={40} className="mx-auto mb-3" />
              <p className="text-sm">Your cart is empty.</p>
            </div>
          )}
        </div>

        {/* Checkout Button */}
        {cart.length > 0 && (
          <div className="px-4 mb-4">
            <Link to="/checkout">
              <div className="h-[45px] flex items-center justify-center w-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-md hover:opacity-90 transition">
                <h1 className="text-white text-[16px] font-semibold">
                  Checkout Now (USD${totalPrice})
                </h1>
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

const CartSingle = ({ data, removeFromCartHandler, quantityChangeHandler }) => {
  const [value, setValue] = useState(data.qty);
  const totalPrice = data.discountPrice * value;

  const increament = (data) => {
    if (data.stock < value) {
      toast.error("Product stock limited!");
    } else {
      setValue(value + 1);
      const updateCartData = { ...data, qty: value + 1 };
      quantityChangeHandler(updateCartData);
    }
  };

  const decreament = (data) => {
    setValue(value === 1 ? 1 : value - 1);
    const updateCartData = { ...data, qty: value === 1 ? 1 : value - 1 };
    quantityChangeHandler(updateCartData);
  };

  return (
    <div className="flex items-center bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition p-3">
      {/* Quantity Controls */}
      <div className="flex flex-col items-center space-y-1">
        <button
          className="bg-teal-500 hover:bg-teal-600 text-white rounded-full w-[26px] h-[26px] flex items-center justify-center"
          onClick={() => increament(data)}
        >
          <HiPlus size={16} />
        </button>
        <span className="font-medium">{value}</span>
        <button
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full w-[26px] h-[26px] flex items-center justify-center"
          onClick={() => decreament(data)}
        >
          <HiOutlineMinus size={16} />
        </button>
      </div>

      {/* Product Image */}
      <img
        src={`${data?.images[0]?.url}`}
        alt={data.name}
        className="w-[70px] h-[70px] object-cover rounded-lg mx-3"
      />

      {/* Info */}
      <div className="flex-1">
        <h1 className="font-medium text-gray-800 text-sm truncate">
          {data.name}
        </h1>
        <h4 className="text-[13px] text-gray-500">
          ${data.discountPrice} × {value}
        </h4>
        <h4 className="font-semibold text-[15px] text-indigo-600">
          US${totalPrice}
        </h4>
      </div>

      {/* Remove Button */}
      <button
        className="ml-2 text-red-500 hover:text-red-600"
        onClick={() => removeFromCartHandler(data)}
      >
        <RxCross1 size={18} />
      </button>
    </div>
  );
};

export default Cart;
