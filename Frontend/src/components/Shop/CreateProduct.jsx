import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { categoriesData } from "../../static/data";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { createProduct } from "../../redux/actions/product";
import { toast } from "react-toastify";

const CreateProduct = () => {
  const { seller } = useSelector((state) => state.seller);
  const {error } = useSelector((state) => state.product);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [stock, setStock] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newForm = new FormData();
    images.forEach((image) => {
      newForm.append("images", image);
    });

    newForm.append("name", name);
    newForm.append("description", description);
    newForm.append("category", category);
    newForm.append("tags", tags);
    newForm.append("originalPrice", originalPrice);
    newForm.append("discountPrice", discountPrice);
    newForm.append("stock", stock);
    newForm.append("shopId", seller._id);

    const success= await dispatch(createProduct(newForm));

    
    if (success) {
      toast.success("Product created successfully");
      navigate("/dashboard");
    } else {
      toast.error(error);
    }

  };

  const handleImageChange = (e) => {
    e.preventDefault();
    let files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  

  return (
    <div className="w-[90%] md:w-[50%] bg-white shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
      <h5 className="text-[30px] font-Poppins text-center">Create Product</h5>
      {/**create product form */}
      <form onSubmit={handleSubmit}>
        <br />
        <div>
          <label className="pb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={name}
            className="mt-2 appearance-none block w-full px-3 h-35px border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focuc:ring-blue-500 sm:text-sm"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your product name..."
          />
        </div>

        <br />
        <div>
          <label className="pb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            type="text"
            cols={32}
            rows={8}
            name="description"
            value={description}
            className="mt-2 appearance-none block w-full pt-2 px-3 h-35px border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focuc:ring-blue-500 sm:text-sm"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter your product description..."
          />
        </div>

        <br />
        <div>
          <label className="pb-2">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full mt-2 border h-[35px] rounded[5px]"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Choose a category">Choose a category</option>
            {categoriesData &&
              categoriesData.map((i, index) => (
                <option value={i.title} key={index}>
                  {i.title}
                </option>
              ))}
          </select>
        </div>

        <br />
        <div>
          <label className="pb-2">Tags</label>
          <input
            type="text"
            name="tags"
            value={tags}
            className="mt-2 appearance-none block w-full px-3 h-35px border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focuc:ring-blue-500 sm:text-sm"
            onChange={(e) => setTags(e.target.value)}
            placeholder="Enter your product tags..."
          />
        </div>

        <br />
        <div>
          <label className="pb-2">OriginalPrice </label>
          <input
            type="number"
            name="price"
            value={originalPrice}
            className="mt-2 appearance-none block w-full px-3 h-35px border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focuc:ring-blue-500 sm:text-sm"
            onChange={(e) => setOriginalPrice(e.target.value)}
            placeholder="Enter your product price..."
          />
        </div>

        <br />
        <div>
          <label className="pb-2">
            Price (with discount)<span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="price"
            value={discountPrice}
            className="mt-2 appearance-none block w-full px-3 h-35px border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focuc:ring-blue-500 sm:text-sm"
            onChange={(e) => setDiscountPrice(e.target.value)}
            placeholder="Enter your product price..."
          />
        </div>

        <br />
        <div>
          <label className="pb-2">
            Product Stock<span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="stock"
            value={stock}
            className="mt-2 appearance-none block w-full px-3 h-35px border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focuc:ring-blue-500 sm:text-sm"
            onChange={(e) => setStock(e.target.value)}
            placeholder="Enter your product stock..."
          />
        </div>

        <br />
        <div>
          <label className="pb-2" htmlFor="upload">
            {" "}
            Upload Images
            <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            name=""
            id="upload"
            className="hidden"
            multiple
            onChange={handleImageChange}
          />
          <label htmlFor="upload">
            <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
          </label>
          <div className="w-full flex items-center flex-wrap">
            {images &&
              images.map((i, index) => (
                <img
                  src={URL.createObjectURL(i)}
                  alt=""
                  key={index}
                  className="h-[120px] w-[120px] object-cover m-2"
                />
              ))}
          </div>

          <br />
          <div>
            <input
              type="submit"
              value="Create"
              className="mt-2 appearance-none block w-full px-3 h-35px border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focuc:ring-blue-500 sm:text-sm"
            ></input>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
