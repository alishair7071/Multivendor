import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/styles";
import { AiOutlineHeart } from "react-icons/ai";
import { BsCartPlus } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlistFun } from "../../redux/actions/wishlist";
import { addToCartFun } from "../../redux/actions/cart";

const WishList = ({ setOpenWishList }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const removeFromWishlistHandler = (data) => {
    dispatch(removeFromWishlistFun(data));
  };

  const addToCartHandler = (data) => {
    const newData = { ...data, qty: 1 };
    dispatch(addToCartFun(newData));
  };

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-black/40 z-10">
      {/* Slide Panel */}
      <div className="fixed top-0 right-0 h-full w-[90%] md:w-[28%] bg-white shadow-lg flex flex-col rounded-l-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex justify-between items-center px-5 py-4">
          <div className="flex items-center space-x-2">
            <AiOutlineHeart size={24} />
            <h2 className="text-lg font-semibold">
              Wishlist ({wishlist.length})
            </h2>
          </div>
          <RxCross1
            size={24}
            className="cursor-pointer hover:scale-110 transition"
            onClick={() => setOpenWishList(false)}
          />
        </div>

        {/* Wishlist Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {wishlist && wishlist.length > 0 ? (
            wishlist.map((item, index) => (
              <CartSingle
                key={index}
                data={item}
                removeFromWishlistHandler={removeFromWishlistHandler}
                addToCartHandler={addToCartHandler}
              />
            ))
          ) : (
            <div className="text-center text-gray-500 mt-10">
              <AiOutlineHeart size={40} className="mx-auto mb-3" />
              <p className="text-sm">Your wishlist is empty.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CartSingle = ({ data, removeFromWishlistHandler, addToCartHandler }) => {
  const [value] = useState(1);
  const totalPrice = data.discountPrice + value;

  return (
    <div className="flex items-center bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition p-3">
      {/* Remove Button */}
      <button
        className="text-red-500 hover:text-red-600 mr-2"
        onClick={() => removeFromWishlistHandler(data)}
      >
        <RxCross1 size={20} />
      </button>

      {/* Product Image */}
      <img
        src={`${data?.images[0]?.url}`}
        alt={data.name}
        className="w-[70px] h-[70px] object-cover rounded-lg"
      />

      {/* Info */}
      <div className="flex-1 pl-3">
        <h1 className="font-medium text-gray-800 text-sm truncate">
          {data.name}
        </h1>
        <h4 className="font-semibold text-[16px] text-indigo-600 mt-1">
          US$ {totalPrice}
        </h4>
      </div>

      {/* Add to Cart */}
      <button
        className="ml-auto bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-2 rounded-lg hover:opacity-90 transition"
        title="Add to Cart"
        onClick={() => addToCartHandler(data)}
      >
        <BsCartPlus size={18} />
      </button>
    </div>
  );
};

export default WishList;
