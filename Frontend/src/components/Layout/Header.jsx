import React, { useState } from "react";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { categoriesData, productData } from "../../static/data.jsx";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import DropDown from "./DropDown.jsx";
import Navbar from "./Navbar.jsx";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";
import { backend_url } from "../../server.js";
import Cart from "../cart/Cart.jsx";
import WishList from "../wishList/WishList.jsx";
import { RxCross1 } from "react-icons/rx";

const Header = ({ activeHeading }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState("");
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishList, setOpenWishList] = useState(false);
  const [open, setOpen] = useState(false);

  //handle the typing in search bar
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filteredProducts =
      productData &&
      productData.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    setSearchData(filteredProducts);
  };

  return (
    <>
      {/*header*/}
      <div className={`${styles.section}`}>
        <div className="hidden md:h-[50px] md:my-[20px] md:flex items-center justify-between">
          <div>
            <Link to="/">
              <img
                src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                alt=""
              />
            </Link>
          </div>
          {/*search bar*/}
          <div className="w-[50%] relative">
            <input
              type="text"
              placeholder="Search Product..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
            />
            <AiOutlineSearch
              size={30}
              className="absolute right-2 top-1.5 cursor-pointer"
            />
            {searchData && searchTerm.length != 0 && searchData.length != 0 ? (
              <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-30 p-4">
                {searchData &&
                  searchData.map((i, index) => {
                    const d = i.name;

                    const Product_name = d.replace(/\s+/g, "-");

                    return (
                      <Link to={`/product/${Product_name}`}>
                        <div className="w-full flex items-start py-3 ">
                          <img
                            src={i.image_Url[0].url}
                            alt=""
                            className="w-[40px] h-[40px] mr-[10px]"
                          />
                          <h1>{i.name}</h1>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            ) : null}
          </div>

          <div className={`${styles.button}`}>
            <Link to="/shop-login">
            <h1 className="text-[#fff] flex items-center">
              Become Seller <IoIosArrowForward className="ml-1" />
            </h1>
            </Link>
          </div>
        </div>
      </div>

      <div
        className={`
          shadow-sm sticky top-0 left-0 z-10
      transition hidden md:flex items-center justify-between w-full bg-[#3321c8] h-[70px]`}
      >
        <div
          className={`${styles.section} relative ${styles.noramlFlex} justify-between`}
        >
          {/*catagory*/}
          <div>
            <div className="relative h-[60px] mt-[10px] w-[270px] hidden lg:block">
              <BiMenuAltLeft size={30} className="absolute top-3 left-2" />

              <button
                className={`h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md`}
              >
                All Categories
              </button>
              <IoIosArrowDown
                size={20}
                className="absolute right-2 top-4 cursor-pointer"
                onClick={() => setDropDown(!dropDown)}
              />

              {dropDown ? (
                <DropDown
                  categoriesData={categoriesData}
                  setDropDown={setDropDown}
                />
              ) : null}
            </div>
          </div>
          {/*navitems*/}
          <div className={`${styles.activeStatus.noramlFlex}`}>
            <Navbar active={activeHeading} />
          </div>

          <div className="flex">
            <div>
              <div className={styles.noramlFlex}>
                <div
                  className="relative cursor-pointer mr-[15px]"
                  onClick={() => setOpenWishList(true)}
                >
                  <AiOutlineHeart color="rgb(255 255 255 /83%)" size={30} />
                  <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top top right m-0 p-0 text-white font-mono text-[12px] leading-tight text-center ">
                    0
                  </span>
                </div>
              </div>
            </div>

            <div>
              <div className={styles.noramlFlex}>
                <div
                  className="relative cursor-pointer mr-[15px]"
                  onClick={() => setOpenCart(true)}
                >
                  <AiOutlineShoppingCart
                    color="rgb(255 255 255 /83%)"
                    size={30}
                  />
                  <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top top right m-0 p-0 text-white font-mono text-[12px] leading-tight text-center ">
                    1
                  </span>
                </div>
              </div>
            </div>
            <div>
              <div className={styles.noramlFlex}>
                <div className="relative cursor-pointer mr-[15px]">
                  {isAuthenticated ? (
                    <Link to="/profile">
                      <img
                        className="rounded-full w-[35px] h-[35px]"
                        src={`${backend_url}/${user.avatar}`}
                        alt=""
                      />
                    </Link>
                  ) : (
                    <Link to="/login">
                      <CgProfile color="rgb(255 255 255 /83%)" size={30} />
                    </Link>
                  )}
                </div>
              </div>
              {/*Cart popup */}
              {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

              {/*WishList popup */}
              {openWishList ? (
                <WishList setOpenWishList={setOpenWishList} />
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {/**mobile header */}
      <div className="w-full h-[60px] fixed z-50 bg-white top-0 left-0 md:hidden">
        <div className="w-full flex items-center justify-between">
          <div>
            <BiMenuAltLeft
              size={40}
              className="ml-4"
              onClick={() => setOpen(true)}
            />
          </div>

          <div>
            <Link to="/">
              <img
                src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                alt=""
                className="mt-3 cursor-pointer"
              />
            </Link>
          </div>

          <div>
            <div className="mr-[20px] relative">
              <AiOutlineShoppingCart size={30} />
              <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top top right m-0 p-0 text-white font-mono text-[12px] leading-tight text-center ">
                1
              </span>
            </div>
          </div>
        </div>

        {/**header sidebar */}
        {open && (
          <div className="fixed w-full h-full bg-[#0000005f] z-20 top-0 left-0">
            <div className="fixed bg-white w-[60%] h-screen z-10 top-0 left-0 overflow-y-scroll">
              <div className="w-full flex justify-between pr-3">
                <div>
                  <div className="relative mr-[15px]">
                    <AiOutlineHeart size={30} className="mt-5 ml-3" />
                    <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top top right m-0 p-0 text-white font-mono text-[12px] leading-tight text-center ">
                      0
                    </span>
                  </div>
                </div>
                <RxCross1
                  size={30}
                  className="ml-4 mt-5"
                  onClick={() => setOpen(false)}
                />
              </div>

              <div className="my-8 w-[92%] m-auto h-[40px]">
                <input
                  type="search"
                  placeholder="Search Products..."
                  className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />

                {searchData &&
                searchTerm.length != 0 &&
                searchData.length != 0 ? (
                  <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                    {searchData &&
                      searchData.map((i, index) => {
                        const d = i.name;

                        const Product_name = d.replace(/\s+/g, "-");

                        return (
                          <Link to={`/product/${Product_name}`}>
                            <div className="w-full flex items-start py-3">
                              <img
                                src={i.image_Url[0].url}
                                alt=""
                                className="w-[40px] h-[40px] mr-[10px]"
                              />
                              <h1>{i.name}</h1>
                            </div>
                          </Link>
                        );
                      })}
                  </div>
                ) : null}
              </div>

              <Navbar active={activeHeading} />
              <div className={`${styles.button} ml-4`}>
                <Link to="/shop-login">
                <h1 className="text-[#fff] flex items-center">
                  Become Seller <IoIosArrowForward className="ml-1" />
                </h1>
                </Link>
              </div>

              <br />
              <br />
              <br />
              {isAuthenticated ? (
                <div className="flex w-full justify-center">
                  <Link to="/profile">
                    {" "}
                    <img
                      className="h-[60px] w-[60px] rounded-full border-[3px] border-[#16c0b2]"
                      src={`${backend_url}/${user.avatar}`}
                      alt=""
                    />
                  </Link>
                </div>
              ) : (
                <>
                  <div className="flex w-full justify-center">
                    <Link
                      to="/login"
                      className="text-[18px] pr-[10px] text-[#000000b7]"
                    >
                      Login/{" "}
                    </Link>
                    <Link
                      to="/sign-up"
                      className="text-[18px] text-[#000000b7]"
                    >
                      Sign up
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
