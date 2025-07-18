import React, { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import ProductDetails from "../components/products/ProductDetails.jsx";
import { useParams } from "react-router-dom";
import { productData } from "../static/data.jsx";
import SuggestedProduct from "../components/products/SuggestedProduct.jsx";
import { useSelector } from "react-redux";

const ProductDetailsPage = () => {

  const {allProducts}= useSelector((state)=> state.product);

  const { name } = useParams();
  const [data, setData] = useState(null);
  const productName = name.replace(/-/g, " ");

  useEffect(() => {

    const data = allProducts && allProducts.find((i) => i.name == productName);
    setData(data);
  }, [allProducts]);

  return (
    <div>
      <Header />
      <ProductDetails data={data}/>
      {data && <SuggestedProduct data={data} />}
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
