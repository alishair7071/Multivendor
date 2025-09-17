import React from "react";
import { useNavigate } from "react-router-dom";

const DropDown = ({ categoriesData, setDropDown }) => {
  const navigate = useNavigate();

  const submitHandle = (i) => {
    navigate(`/products?category=${i.title}`);
    setDropDown(false);
    window.location.reload(true);
  };

  return (
    <div className="absolute z-30 mt-2 w-[250px] bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden animate-fadeIn">
      {categoriesData &&
        categoriesData.map((i, index) => (
          <div
            key={index}
            onClick={() => submitHandle(i)}
            className="flex items-center gap-3 px-4 py-3 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 cursor-pointer transition"
          >
            <img
              src={i.images}
              alt={i.name}
              className="w-7 h-7 object-contain select-none"
            />
            <h3 className="text-gray-700 font-medium select-none">{i.title}</h3>
          </div>
        ))}
    </div>
  );
};

export default DropDown;
