import React from "react";
import styles from "../../../styles/styles";
import { brandingData, categoriesData } from "../../../static/data";
import { useNavigate } from "react-router-dom";

const Categotries = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Branding Section */}
      <div className={`${styles.section} hidden sm:block`}>
        <div
          className="branding my-12 flex justify-between w-full shadow-md bg-white p-6 rounded-xl border border-gray-100"
        >
          {brandingData &&
            brandingData.map((i, index) => (
              <div
                className="flex items-start space-x-3 hover:scale-105 transition-transform duration-300"
                key={index}
              >
                <div className="text-indigo-600 text-2xl">{i.icon}</div>
                <div>
                  <h3 className="font-semibold text-sm md:text-base text-gray-800">
                    {i.title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-500">
                    {i.Description}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Categories Grid */}
      <div
        className={`${styles.section} bg-white p-6 rounded-xl mb-12 shadow-md`}
        id="categories"
      >
        <h2 className="text-xl font-bold text-gray-800 mb-5 border-l-4 border-indigo-500 pl-2">
          Shop by Categories
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {categoriesData &&
            categoriesData.map((i) => {
              const handleSubmit = (i) => {
                navigate(`/products?category=${i.title}`);
              };
              return (
                <div
                  key={i.id}
                  onClick={() => handleSubmit(i)}
                  className="flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-white rounded-lg p-4 cursor-pointer shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  <img
                    src={i.images}
                    className="w-[80px] h-[80px] object-contain mb-2"
                    alt={i.title}
                  />
                  <h5 className="text-[15px] md:text-[16px] font-medium text-gray-700 text-center">
                    {i.title}
                  </h5>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Categotries;
