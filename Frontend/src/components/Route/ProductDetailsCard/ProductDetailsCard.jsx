import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";
import styles from "../../../styles/styles";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { backend_url } from "../../../server";
import { useDispatch, useSelector } from "react-redux";
import { addToCartFun } from "../../../redux/actions/cart";
import { addToWishlistFun, removeFromWishlistFun } from "../../../redux/actions/wishlist";

const ProductDetailsCard = ({ setOpen, data }) => {
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);

  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const dispatch = useDispatch();
  //  const [select, setSelect] = useState(false);

  const handleMessageSubmit = () => {};

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const incrementCount = () => {
    setCount(count + 1);
  };

  const addToCartHandler = (id) => {
    const isItemExist = cart && cart.find((i) => i._id == id);
    if (isItemExist) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < count) {
        toast.error("product stock limited!");
      } else {
        const cartData = { ...data, qty: count };
        dispatch(addToCartFun(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };


   useEffect(()=>{
      if(wishlist && wishlist.find((item) => item._id === data._id)){
        setClick(true);
      }else{
        setClick(false);
      }
    }, [wishlist, data._id]);
  
    const removeFromWishlistHandler = (data) => {
      setClick(!click);
      dispatch(removeFromWishlistFun(data))
    }
  
    const addToWishlistHandler = (data) => {
      setClick(!click);
      dispatch(addToWishlistFun(data));
    }
  

  return (
    <div className="bg-[#fff]">
      {data ? (
        <div className="w-full fixed h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center">
          <div
            className="w-[90%] md:w-[60%] h-[90vh] overflow-y-scroll
                     md:h-[75vh] bg-white rounded-md shadow-sm relative p-4"
          >
            <RxCross1
              size={30}
              className="absolute right-3 top-3 z-50"
              onClick={() => setOpen(false)}
            />

            <div className="w-full block md:flex">
              <div className="w-full md:w-[50%]">
                <img src={`${data && data.images[0]?.url}`} alt="" />
                <Link to={`/shop/preview/${data.shop._id}`} className="flex">
                  <img
                    src={`${data && data.shop.avatar?.url}`}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full mr-2"
                  />
                  <div>
                    <h3 className={styles.shop_name}>{data.shop.name}</h3>
                    <h5 className="pb-3 text-[15px]">
                      ({data.shop.ratings}) Ratings
                    </h5>
                  </div>
                </Link>

                <div
                  className={`${styles.button} bg-[#000] mt-4 h-11`}
                  onClick={handleMessageSubmit}
                >
                  <span className="text-[#fff] flex items-center">
                    Send Message <AiOutlineMessage className="ml-1" />
                  </span>
                </div>
                <h5 className="text-[16px] text-[red] mt-5">
                  ({data.total_sell}) Sold out
                </h5>
              </div>

              <div className="w-full md:w-[50%] pt-5 pl-[5px] pr-[5px]">
                <h1 className={`${styles.productTitle}`}>{data.name}</h1>
                <p>{data.description}</p>
                <div className="pt-3 flex">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    {data.discount_price}$
                  </h4>
                  <h3 className={`${styles.price}`}>
                    {data.price ? data.price : null}
                  </h3>
                </div>
                <div className="flex items-center mt-12 justify-between pr-3">
                  <div>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={decrementCount}
                    >
                      -
                    </button>

                    <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
                      {count}
                    </span>

                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-r px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={incrementCount}
                    >
                      +
                    </button>
                  </div>

                  <div>
                    {click ? (
                      <AiFillHeart
                        size={22}
                        className="cursor-pointer"
                        onClick={() => removeFromWishlistHandler(data)}
                        color={click ? "red" : "#333"}
                        title="Remove from wishlist"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={22}
                        className="cursor-pointer"
                        onClick={() => addToWishlistHandler(data)}
                        color={click ? "red" : "#333"}
                        title="Add to wishlist"
                      />
                    )}
                  </div>
                </div>

                <div
                  className={`${styles.button} mt-6 flex items-center h-11`}
                  onClick={() => addToCartHandler(data._id)}
                >
                  <span className="text-[#fff] flex items-center">
                    Add to Cart <AiOutlineShoppingCart className="ml-1" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetailsCard;
