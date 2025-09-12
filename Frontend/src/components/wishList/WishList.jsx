import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/styles";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { Link } from "react-router-dom";
import { BsCartPlus } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlistFun } from "../../redux/actions/wishlist";
import { backend_url } from "../../server";
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
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 h-full w-[90%] md:w-[25%] bg-white flex flex-col shadow-sm">
        <div className="w-full flex justify-end pt-5 pr-5">
          <RxCross1
            size={25}
            className="cursor-pointer"
            onClick={() => setOpenWishList(false)}
          />
        </div>
        {/*item length*/}
        <div className={`${styles.noramlFlex} p-4`}>
          <AiOutlineHeart size={25} />
          <h2 className="pl-2 text-[20px] font-[500]">
            {wishlist.length} items
          </h2>
        </div>
        {/*Cart single items*/}
        <br />
        <div className="w-full border-t">
          {wishlist &&
            wishlist.map((i, index) => (
              <CartSingle
                key={index}
                data={i}
                removeFromWishlistHandler={removeFromWishlistHandler}
                addToCartHandler={addToCartHandler}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

const CartSingle = ({ data, removeFromWishlistHandler, addToCartHandler }) => {
  const [value, setValue] = useState(1);
  const totalPrice = data.discountPrice + value;

  return (
    <div className="border-b p-4">
      <div className="w-full md:flex items-center">
        <div className="flex justify-end">
          <RxCross1
            className="cursor-pointer md:mb-['unset'] md:ml-['unset'] mb-2 ml-2"
            onClick={() => removeFromWishlistHandler(data)}
          />
        </div>

        <img
          src={`${data?.images[0]?.url}`}
          alt=""
          className="w-[80px] h-[80px] ml-2"
        />

        <div className="pl-[5px]">
          <h1>{data.name}</h1>
          <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
            US$ {totalPrice}
          </h4>
        </div>
        <div className="ml-auto flex items-center">
          <BsCartPlus
            size={20}
            className="cursor-pointer"
            title="Add to cart"
            onClick={() => addToCartHandler(data)}
          />
        </div>
      </div>
    </div>
  );
};

export default WishList;
