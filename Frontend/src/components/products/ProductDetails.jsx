import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { backend_url, server } from "../../server";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop } from "../../redux/actions/product";
import {
  addToWishlistFun,
  removeFromWishlistFun,
} from "../../redux/actions/wishlist";
import { addToCartFun } from "../../redux/actions/cart";
import { toast } from "react-toastify";
import Ratings from "./Ratings";
import axios from "axios";

const ProductDetails = ({ data }) => {
  const [count, setCount] = useState(1);
  const [select, setSelect] = useState(0);
  const [click, setClick] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { user, isAuthenticated } = useSelector((state) => state.user);

  console.log(data);


  useEffect(() => {
    dispatch(getAllProductsShop(data?.shop._id));

    if (wishlist && wishlist.find((item) => item._id === data && data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [dispatch, data]);

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const incrementCount = () => {
    setCount(count + 1);
  };

  const handleMessageSubmit = async () => {
    const groupTitle = data.shop._id + user._id;
    const userId = user._id;
    const sellerId = data.shop._id;

    if (isAuthenticated) {
      await axios
        .post(`${server}/conversation/create-new-conversation`, {
          groupTitle,
          userId,
          sellerId,
        })
        .then((res) => {
          navigate(`/inbox?${res.data.conversation._id}`);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } else {
      toast.error("please login to continue");
    }
  };

  const removeFromWishlistHandler = (data) => {
    console.log("Removing from wishlist", data);
    setClick(!click);
    dispatch(removeFromWishlistFun(data));
  };

  const addToWishlistHandler = (data) => {
    console.log("Adding to wishlist", data);
    setClick(!click);
    dispatch(addToWishlistFun(data));
  };

  const addToCartHandler = (id) => {
    const isItemExist = cart && cart.find((i) => i._id == id);
    if (isItemExist) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("product stock limited!");
      } else {
        const cartData = { ...data, qty: count };
        dispatch(addToCartFun(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  const totalReviewsLength =
    products &&
    products.reduce((acc, product) => acc + product.reviews.length, 0);

  const totalRatings =
    products &&
    products.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    );

  const averageRating =
    totalReviewsLength > 0 ? totalRatings / totalReviewsLength : 0;

  return (
    <div className="bg-white mt-10">
      {data ? (
        <div className={`${styles.section} w-[90%] md:w-[80%]`}>
          <div className="w-full py-5">
            <div className="block w-full md:flex">
              <div className="w-full md:w-[50%]">
                <img
                  src={`${data.images[select]?.url}`}
                  alt=""
                  className="w-[80%] mb-4"
                />
                <div className="w-full flex">
                  <div
                    className={`${
                      select == 0 ? "border" : "null"
                    } cursor-pointer mr-2`}
                  >
                    <img
                      src={`data:image/jpeg;base64,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`}
                      alt=""
                      className="h-[180px]"
                      onClick={() => setSelect(0)}
                    />
                  </div>
                  <div
                    className={`${
                      select == 1 ? "border" : "null"
                    } cursor-pointer`}
                  >
                    <img
                      src={`${data.images && data.images[1].url}`}
                      alt=""
                      className="h-[180px]"
                      onClick={() => setSelect(1)}
                    />
                  </div>
                </div>
              </div>
              <div className="ml-5 w-full md:w-[50%] pt-5">
                <h1 className={`${styles.productTitle}`}>{data.name}</h1>
                <p>{data.description}</p>
                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    {data.discountPrice}$
                  </h4>
                  <h3 className={`${styles.price}`}>
                    {data.originalPrice ? data.originalPrice + "$" : null}
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
                  className={`${styles.button} !mt-6 !rounded !h-11 flex items-center`}
                  onClick={() => addToCartHandler(data._id)}
                >
                  <span className="flex items-center text-white">
                    Add to cart <AiOutlineShoppingCart className="ml-1" />
                  </span>
                </div>

                <div className="flex items-center pt-8">
                  <Link to={`/shop/preview/${data?.shop._id}`}>
                    <img
                      src={`${data?.shop?.avatar?.url}`}
                      className="w-[50px] h-[50px] rounded-full mr-2"
                      alt=""
                    />
                  </Link>
                  <div className="pr-8">
                    <Link to={`/shop/preview/${data?.shop._id}`}>
                      <h3 className={`${styles.shop_name} pt-1 pb-1`}>
                        {data.shop.shopName}
                      </h3>
                    </Link>
                    <h5 className="pb-3 text-[15px]">
                      {averageRating.toFixed(0)}/5 Ratings
                    </h5>
                  </div>

                  <div
                    className={`${styles.button} !bg-[#6443d1] mt-4 !rounded !h-11`}
                    onClick={() => handleMessageSubmit()}
                  >
                    <span className="text-white flex items-center">
                      Send Message <AiOutlineMessage className="ml-1" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ProductDetailsInfo
            data={data}
            totalProducts={products?.length}
            totalReviewsLength={totalReviewsLength}
            averageRating={averageRating}
          />
          <br />
          <br />
        </div>
      ) : null}
    </div>
  );
};

const ProductDetailsInfo = ({
  data,
  totalProducts,
  totalReviewsLength,
  averageRating,
}) => {
  const [active, setActive] = useState(1);

  return (
    <div className="bg-[#f5f6fb] px-3 md:px-10 py-2 rounded">
      <div className="w-full flex justify-between border-b pt-10 pb-2">
        <div className="relative">
          <h5
            className="text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer md:text-[20px]"
            onClick={() => setActive(1)}
          >
            Product Details
          </h5>
          {active == 1 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
        <div className="relative">
          <h5
            className="text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer md:text-[20px]"
            onClick={() => setActive(2)}
          >
            Product Reviews
          </h5>
          {active == 2 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
        <div className="relative">
          <h5
            className="text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer md:text-[20px]"
            onClick={() => setActive(3)}
          >
            Seller Information
          </h5>
          {active == 3 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
      </div>
      {active == 1 ? (
        <>
          <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
            {data.description}
          </p>
        </>
      ) : null}

      {active == 2 ? (
        <div className="justify-center min-h-[40vh] flex flex-col items-center w-full overflow-y-scroll">
          {data &&
            (data.reviews
              ? data.reviews.map((item, index) => (
                  <div className="w-full flex my-2">
                    <img
                      src={`/${item.user.avatar?.url}`}
                      alt=""
                      className="w-[50px] h-[50px] rounded-full"
                    />
                    <div className="pl-2 ">
                      <div className="w-full flex items-center">
                        <h1 className="font-[500] mr-3">{item.user.name}</h1>
                        <Ratings rating={data?.ratings} />
                      </div>
                      <p>{item.comment}</p>
                    </div>
                  </div>
                ))
              : null)}

          <div className="w-full flex justify-center">
            {data && data.reviews && data.reviews.length === 0 && (
              <h5>No Reviews have for this product!</h5>
            )}
          </div>
        </div>
      ) : null}

      {active == 3 && (
        <div className="w-full p-5 block md:flex">
          <div className="w-full md:w-[50%]">
            <Link to={`/shop/preview/${data.shop._id}`}>
              <div className="flex items-center">
                <img
                  src={`${data.shop.avatar?.url}`}
                  className="w-[50px] h-[50px] rounded-full"
                  alt=""
                />
                <div className="pl-3">
                  <h3 className={styles.shop_name}>{data.shop.shopName}</h3>
                  <h5 className="pb-2 text-[15px]">
                    {averageRating.toFixed(0)}/5 Ratings
                  </h5>
                </div>
              </div>
            </Link>
            <p className="pt-2">{data.shop.description} </p>
          </div>
          <div className="w-full md:w-[50%] mt-5 md:mt-0 md:flex flex-col items-end">
            <div className="text-left">
              <h5 className="font-[600]">
                Joined on:{" "}
                <span className="font-[500]">
                  {data.shop.createdAt.slice(0, 10)}
                </span>
              </h5>
              <h5 className="font-[600] pt-3">
                Total Products:{" "}
                <span className="font-[500]">{totalProducts}</span>
              </h5>
              <h5 className="font-[600] pt-3">
                Total Reviews:{" "}
                <span className="font-[500]">{totalReviewsLength}</span>
              </h5>
              <Link to="/">
                <div
                  className={`${styles.button} !rounded-[4px] !h-[39.5px] mt-3`}
                >
                  <h4 className="text-white">Visit Shop</h4>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
