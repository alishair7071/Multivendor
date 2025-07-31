import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/styles";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { backend_url } from "../../server";
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
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 min-h-full w-[25%] bg-white flex flex-col shadow-sm">
        <div className="w-full flex justify-end pt-5 pr-5">
          <RxCross1
            size={25}
            className="cursor-pointer"
            onClick={() => setOpenCart(false)}
          />
        </div>
        {/*item length*/}
        <div className={`${styles.noramlFlex} p-4`}>
          <IoBagHandleOutline size={25} />
          <h2 className="pl-2 text-[20px] font-[500]">{cart.length} items</h2>
        </div>
        {/*Cart single items*/}
        <br />
        <div
          className="w-full border-t overflow-y-auto flex-1 px-2"
          style={{ maxHeight: "calc(100vh - 200px)" }}
        >
          {cart &&
            cart.map((i, index) => (
              <CartSingle
                key={index}
                data={i}
                removeFromCartHandler={removeFromCartHandler}
                quantityChangeHandler={quantityChangeHandler}
              />
            ))}
        </div>

        <div className="px-4 mb-3 mt-0.5">
          <Link to="/checkout">
            <div
              className={`h-[35px] flex items-center justify-center w-[100%] bg-[#e44343] rounded-[5px]`}
            >
              <h1 className="text-[#fff] text-[18px] font-[600]">
                Checkout Now (USD${totalPrice})
              </h1>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

const CartSingle = ({ data, removeFromCartHandler, quantityChangeHandler }) => {
  const [value, setValue] = useState(data.qty);
  const totalPrice = data.discountPrice * value;

  const increament = (data) => {
    if (data.stock < value) {
      toast.error("product stock limited!");
    } else {
      setValue(value + 1);
      const updateCartData = { ...data, qty: value + 1 };
      quantityChangeHandler(updateCartData);
    }
  };

  const decreament = (data) => {
    setValue(value == 1 ? 1 : value - 1);
    const updateCartData = { ...data, qty: value == 1 ? 1 : value - 1 };
    quantityChangeHandler(updateCartData);
  };

  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center">
        <div>
          <div
            className={`bg-[#e44343] border border-[#e4434373] rounded-full
             w-[25px] h-[25px] ${styles.noramlFlex} justify-center cursor-pointer`}
            onClick={() => increament(data)}
          >
            <HiPlus size={18} color="#fff" />
          </div>
          <span className="pl-[10px]">{data.qty}</span>
          <div
            className="bg-[#a7abb14f] rounded-full w-=[25px] h-[25px] flex items-center justify-center cursor-pointer "
            onClick={() => decreament(data)}
          >
            <HiOutlineMinus size={16} color="#7d379c" />
          </div>
        </div>
        <img
          src={`${backend_url}/${data?.images[0]}`}
          alt=""
          className="w-[80px] h-[80px] ml-2 mr-2 rounded-[5px]"
        />
        <div className="pl-[5px]">
          <h1>{data.name}</h1>
          <h4 className="font-[400] text-[15px] text-[#00000082]">
            ${data.discountPrice} * {value}
          </h4>
          <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
            US${totalPrice}
          </h4>
        </div>
        <div className="ml-auto">
          <RxCross1
            className="cursor-pointer"
            onClick={() => removeFromCartHandler(data)}
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;
