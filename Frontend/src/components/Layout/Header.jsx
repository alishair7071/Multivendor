import React, { useState } from "react";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { categoriesData } from "../../static/data.jsx";
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
import Cart from "../cart/Cart.jsx";
import WishList from "../wishList/WishList.jsx";
import { RxCross1 } from "react-icons/rx";

const Header = ({ activeHeading }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { isSeller } = useSelector((state) => state.seller);
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { allProducts } = useSelector((state) => state.product);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState("");
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishList, setOpenWishList] = useState(false);
  const [open, setOpen] = useState(false);

  // search filter
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filteredProducts =
      allProducts &&
      allProducts.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    setSearchData(filteredProducts);
  };

  return (
    <>
      {/* Top header */}
      <div className={`${styles.section}`}>
        <div className="hidden md:flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAABL1BMVEX88fUUCAwAAAD/9Pj/9/v4dA//+f0SBAn6OzD5ODP6Wx/3WCD5VyD4VCH3Wx34NjP4eAz4egz4Mzb//v/84OT4Fhv4cAAMAAD74db4OSxiXV73UQD6XVP4bAA5NTb719P3TBn4el/5jFLx6Ov4bhL5aBb5YRj2TiT6Sin4RCza0dSvqKuYkpS5sbSIgYOMhojEvL/n3uH4YAB7dXf6tKktJinSys2fmZtuaGr4ZQD6uadAOzwiHR76rKVSTU76vqb5OhgdFhf6qKZNSEn76eX4gSD5ijr5roP6zbj5kUz749v61cX6tZb4fjb6pH/5g0n6wrP5qZH3ajX4dEn5m4L4j3f5nIr5hGz4QAD3dFj3Zkf5Vzf6o575NR75hH34RkP7zc/5h4j6vL35bXD5DxQoZdBgAAAL3klEQVR4nO2cCXvTRhqA5ZnpGNqyAZTEjUJMumITVrJsCWHZwcYhB4WFPcoubSnbAGX5/79h55I0kqxEjuUG7O99eBJ0WB69mnu+yDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACA1QVTSgnGhP+86rR8HmDqdydWJ3A6ltWLTLBiGDQao+GgM0JoNOhYqO/Qq07RlUMHqGdQ00HDIYpMandRZ9WlMCU+NUiEBqbpIpeybIPC1ZZCfBRRAwdMCfPjI4/5CVDXvOp0XSHY5lnDIOOhsEA95GAuxV3hnEJPLJ4/eg3V2NAesjHPL87Ktj7E4wpYyYliBXRksSxCu83VdYIG3IBlJUWFFSaPsF1H3RUtPWSA2P1jBwVprqAuMsS+FS09GLk8T1hDPU/QNm+KadheyYzCahOeTQI9m6TZRpShlYOOOqI+nWR7I3TIqxdZrlYNlSEw8rM1B8s4vC4homAtNbhQZZIezyDYR/kjNDzhGUVUtksMpi9fGpRkHjyVra5VGN3gYMx/kf5yNz2nTzc3d3549vyUKi0YY+KJn36AC5jpz6tN9wKhf7t5i3Fzc/Pps1OWA4wX3zHEjws5XdJa5XTzVszmU4M8Z3Kq82w5pWhObm0+P925NQubh0sp5XTzZsLm4aG2VYUflrJHO5+Tp8uZT3a+SuBOvpqJzdOrTv8i0J3sHB7ulN//NHaW08nBXE5eLmEvBb+Yz8mPS1ih4O/mc/J3cJLj3sFS5pO7B/cSuJN7OjsXcPCPJaxODPxSc3JweKht3TvY+fMFvLrq5C+ErJNHj/Stf9KLWMKCwyAvH5Q4OfjXUvbbK0CelzpZxialEszJXxK4k3RjOce8FSA/ak4e6E4egBPl5IG2cSknPPLNNM1i+BsRFBPAmdKiYyyuM+VC8lt0ap4GrdkJIdFgOOr3+ydd16Z6UokrKHxC7PXyN4Wp7fWsNrvQpOsFhfYN+66G50d2nRGItTrBeDBGCLU47Lelh7+ZSJBPuS329rNfRag3QepC/PfIxdkT6ATlaHfs2prJOp1Q5wi1GikIddNLmKjZaDSnOGEnttr6V2HTY2a16zSYmEEm01Erc1ye0jVqyirk0YO9BO5E25jRCfEzRoSVSZLMyk6wbRWuwz7YDrRzik74lx0F9Ugpd7I9oxPs8LsWT4zTlOlMwleqOiFOA8XZTL9Si8cbxignadFRp9Qjpb58Qtri6aK+6wSB31XpRHH1WdEJcWQmaSI06Xi+7w0sFO/xEinSCep4spLtWPLbUD1BIORVTfkE+zJZHR6JzhpSeyK2W32VzGpOcCAFsAqENSU8pp1Qwz1CUkoUn6acOFQ1xtRWGaeWtX3yantP0/Aw3dp+PZN0OhTJHMbBGZiO5N2pleWKTvryQ5ahfTnBoZJix/GGyklyNWwO5YXqyCjlTvb2TmlxubhA4mTczCUzQk0GGpDqTmhXPu4ezZ5nDlCmdio44cF24ow6ahTm5E8J2w8falt7e4/uXsiL+MHYoi7Ug3WIrP5UbEIVJ6zkiBsLC3HJZkceUfEwRSe8y6JXXwtywrYr8O9TrDvJhL+ZonNuVHYiy19rPKVSkLfcGtFSJ6J8xblyPievz3FShe3/qFSgZj6ZGao4UV79KfcVZyEZrTvFCenJpqgeJ18ncCdfz8obuexljluZOjZPBSfEPaeeVBpkbO60fCLr+DoaHvp6+5sE7uSbWdm+Kx+dbBvQEE8fjVVwou50evaXbX1rXOpEPpOohvqE/rQ7rxO5nMGaGdlJaw6mDlKnO8GZfCKLTknTYWtHi06oh0RrPb8R4eTbBO7k21nZfqhXkLIHOghIrjWNnRTvNHEiq4xmsySlZj/NCHknmMqBBRrW0T+pwcnPcRzcKB6YsRZ4HPpZLcIJF5ajmTqJ9KalmFKtwlBOgnj9wOnJUVE9Ax7m5EYCd3JjVnZ/UTeBsTag5SPBrqP9UaV00mjmaaRORI2BJmVOwryTZl8yjgeKrK9Xg5I6nLxNh2b+KB7Gyjxh2Ul9aaYHCmScWGVOunknjaaYvWpJsez7aik57Oq/aE52Hz7eLb/5i/KJwSfInO4RSieEUDpsU05aeebIJ1lQbX/AyZzs79/g/9iPN8zJvoDvubG/W4U3dzN/psAK92CizXrE9aCqT9p5WpevT9KCWJjpnM/J98oCZzdxIjf3v7+Yn9YLE8iscvXDeJ4n7qirdsfMra4ahXanVZLSYruTVNjjkzA3Iz6fk181C28yTt78fOF6MWdqUjA1Oqre8yqPi8m5wwNbXiDTPyFqcF7viwPo2zInu7/OlxdpJG/RqjwunqsfWyP0rV5YMk4ezzl0oK4sC5XnlOYa79QIc3I/4cnDx0/SjRmdZKeYBHIEVH2eTc0LnTcudsrGxTVC/3s/zSfcSboxmxPbE9jaLtwXhUduzDB/0p/yxRfOn9QIc6Llk8eXzifsOQoyfxjW1DRUnGcTFosvRaCDi+bZaoTu36+p7BRuBzv6o51pPraTm4UxXbl/UjofWyf0vu7k8vlEZW7ePmb3xGOQ2ebth4Y+sSvn0M6bt6+V2pwQT3UtHcpqWr4wM8zMpFde35G9moZryIUi1gH0+mpqJql8F+vEfHL/rwncibZxqXXAFgqjwLCdwVjNwc+05sXfthKvAw7dyHEiN2zEe9I3aiw4n6QS5nQSP+J4FVetlMaHq68Xo2RuKrtenC6NXp2T41njCqJshARP9TiuAWaJK5gUpxWa2Xc5/YFOzh4fn6UbszoxSDDKREm0kJUomSX+hHrZOBYRf5LpDl6Zk9n79uxu2iK8SI7e21p0xGxxStgbieInr4PGAyPbY2FOOAtyQsqd/HaJMSAxg8HwpN8Yn1gDJ/M6N9oR5D9g9/jeQf7m2HXc7qR9dNSehG5g5p8OccXFaorBKXC2lcKdpFt3LjUu5nGPU0fv58U9ThvgkPPeH4hLPlUP5U7O3hmVJlBKplC+XE7PrqVwJ/rm2Z1KvCtMtX3ZrJ/j5Nq1rWqcVf9LSSwKJMafs8Wsk+Ock4qc/Vb1FrHXNcRstPv5ljdci5Otd3L2a8I6bayJjNfA9O9Rv2koXlMVXbz+T7qIDY5JB9nl5yzGK17fqMOJbKJw5Luo58tQIWoENA6kpzhQQfW0K6aYWGsifhFqx/PtOP2v/Ix00pNOtKP8Q4b6hoU0PXj90/UU7uT6Jbj2Xs0J0YCNSkTSccgnmGSIDLsxhDwxGpROWD7h4uh4wvpeI9HXxQ7r7R1ps47SCZVO1FEu0kRDS7z/yh4iJN4hVzv0zlZ6bxvHx1vld34OG7FiRy1dsDLSjQZIOGH3FUYuEtPLqRN2wGyLA3yiCNuoHUUTrWfKnRBiyrLDjvqRJY6aPHCWCz1BntOrJVYrD15/v7F1fU3Cnaxdhk/rOOvERkOT9fRlPkEW+7+vO3GUk7GJTbGH1xumaWrTdOzMMaPBnehHTdTm3Vqule2yFvIGMEw//H59Y2vt9tra7Y2Pl3Sy8YFknLAUi2LAnbB9vELFU/JJ36L8xWa2mJ0+arX0QGh2Jg+RttTRRnxUeSMu/0CzOICqB0LJx3dbG2trW+/J8cbty1Bw4vAJIBwIJwFf3GaFo5hPNCch8lzX8/ypZUc/qpxgj0eWe14dsZ9lWoyP/3v/u03WN9YuoWTttkpZUnYw6rOBQSjKDum3bMqKyHlO2C36pulYWSdxu6MfjZ0wx6ZpDOuIczxHC49kJR/WPm3Myqf36wUnPkLD/lg4YSUFDdtyCS/pnwgn40nshI/+rSEap+nJtMXy6BHfH9c5dIBG4cKmULJqzPXZSSYFcBCqwEPqhJOOEYrnToNw0sPiXrAbpqfRHms1sB/KD3iWNdB6YdgT53v5ozRUXWAahZPuomYLclSIsS8JuRcpTcPuKJFb2PdNSm3ZBqnxjjyNpHtEPy5TDuIz80eTs2qOJvhDYeXFNWxrVd86W4KYKfQW0eX8cqFBFBmLbCC+RJb55ZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAjPwfrHlIJ3safmkAAAAASUVORK5CYII="
              alt="logo"
              className="h-[64px] rounded-full"
            />
          </Link>

          {/* Search Bar */}
          <div className="w-[50%] relative">
            <input
              type="text"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="h-[45px] w-full pl-5 pr-12 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
            <button className="absolute right-1 top-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:opacity-90 text-white rounded-full w-[38px] h-[38px] flex items-center justify-center transition">
              <AiOutlineSearch size={22} />
            </button>

            {/* Search results */}
            {searchData && searchTerm.length > 0 && searchData.length > 0 && (
              <div className="absolute min-h-[30vh] w-full bg-white rounded-lg shadow-md mt-2 p-4 z-30">
                {searchData.map((i) => (
                  <Link to={`/product/${i._id}`} key={i._id}>
                    <div className="flex items-center gap-3 py-2 hover:bg-gray-100 rounded-md px-2">
                      <img
                        src={`${i.images[0]?.url}`}
                        alt=""
                        className="w-[40px] h-[40px] object-cover rounded"
                      />
                      <h1 className="text-gray-700">{i.name}</h1>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Seller button */}
          <Link
            to={`${isSeller ? "/dashboard" : "/shop-login"}`}
            className="ml-4"
          >
            <button className="px-5 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium flex items-center hover:opacity-90 transition">
              {isSeller ? "Dashboard" : "Become Seller"}
              <IoIosArrowForward className="ml-2" />
            </button>
          </Link>
        </div>
      </div>

      {/* Main nav */}
      <div
        className="shadow-sm sticky top-0 left-0 z-10 hidden md:flex items-center w-full h-[70px] bg-gradient-to-r from-emerald-500 to-teal-600
"
      >
        <div
          className={`${styles.section} flex items-center justify-between h-full`}
        >
          {/* Categories */}
          <div className="relative h-[60px] hidden lg:block">
            <BiMenuAltLeft size={28} className="absolute top-4 left-3" />
            <button
              className="h-full w-[250px] flex justify-between items-center pl-10 pr-4 bg-white text-gray-700 text-[16px] font-medium rounded-md shadow-sm"
              onClick={() => setDropDown(!dropDown)}
            >
              All Categories
              <IoIosArrowDown size={18} />
            </button>
            {dropDown && (
              <DropDown
                categoriesData={categoriesData}
                setDropDown={setDropDown}
              />
            )}
          </div>

          {/* Nav items */}
          <Navbar active={activeHeading} />

          {/* Icons */}
          <div className="flex items-center gap-6">
            {/* Wishlist */}
            <div
              className="relative cursor-pointer hover:scale-110 transition"
              onClick={() => setOpenWishList(true)}
            >
              <AiOutlineHeart size={28} className="text-white" />
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {wishlist?.length}
              </span>
            </div>

            {/* Cart */}
            <div
              className="relative cursor-pointer hover:scale-110 transition"
              onClick={() => setOpenCart(true)}
            >
              <AiOutlineShoppingCart size={28} className="text-white" />
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cart?.length}
              </span>
            </div>

            {/* Profile */}
            <div className="cursor-pointer hover:scale-110 transition">
              {isAuthenticated ? (
                <Link to="/profile">
                  <img
                    src={user?.avatar?.url}
                    alt=""
                    className="w-[35px] h-[35px] rounded-full border-2 border-white"
                  />
                </Link>
              ) : (
                <Link to="/login">
                  <CgProfile size={30} className="text-white" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Cart & Wishlist popups */}
      {openCart && <Cart setOpenCart={setOpenCart} />}
      {openWishList && <WishList setOpenWishList={setOpenWishList} />}

      {/* Mobile header */}
      <div className="w-full h-[60px] fixed z-20 bg-white top-0 left-0 md:hidden flex items-center justify-between px-4 shadow">
        <BiMenuAltLeft
          size={35}
          className="cursor-pointer"
          onClick={() => setOpen(true)}
        />

        <Link to="/">
          <img
            src="data:image/png;base64,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"
            alt="logo"
            className="h-[40px] rounded-full"
          />
        </Link>

        <div
          className="relative cursor-pointer"
          onClick={() => setOpenCart(true)}
        >
          <AiOutlineShoppingCart size={28} />
          <span className="absolute -top-1 -right-2 bg-green-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {cart?.length}
          </span>
        </div>
      </div>

      {/* Mobile sidebar */}
      {open && (
        <div className="fixed w-full h-full bg-black/50 z-40 top-0 left-0">
          <div className="fixed bg-white w-[70%] h-screen z-50 top-0 left-0 p-5 overflow-y-auto transition-transform">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Menu</h2>
              <RxCross1
                size={28}
                className="cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>

            <Navbar active={activeHeading} />

            <Link to="/shop-login" className="block mt-6">
              <button className="w-full py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium">
                {isSeller ? "Dashboard" : "Become Seller"}
              </button>
            </Link>

            <div className="mt-8 flex justify-center">
              {isAuthenticated ? (
                <Link to="/profile">
                  <img
                    src={user?.avatar?.url}
                    alt=""
                    className="w-[60px] h-[60px] rounded-full border-2 border-indigo-500"
                  />
                </Link>
              ) : (
                <div className="flex gap-4 text-gray-700">
                  <Link to="/login">Login</Link>
                  <span>/</span>
                  <Link to="/sign-up">Sign up</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
