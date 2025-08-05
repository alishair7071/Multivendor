import React, { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import ProductDetails from "../components/products/ProductDetails.jsx";
import { useParams, useSearchParams } from "react-router-dom";
import { productData } from "../static/data.jsx";
import SuggestedProduct from "../components/products/SuggestedProduct.jsx";
import { useSelector } from "react-redux";

const ProductDetailsPage = () => {
  const { allProducts } = useSelector((state) => state.product);
  const { allEvents } = useSelector((state) => state.event);

  const { id } = useParams();
  const [data, setData] = useState(null);
  const [searchParams] = useSearchParams();
  const isEvent = searchParams.get("isEvent");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (isEvent != null) {
      const data = allEvents && allEvents.find((i) => i._id == id);
      setData(data);
    } else {
      const data = allProducts && allProducts.find((i) => i._id == id);
      setData(data);
    }
  }, [data?._id, allProducts, id, allEvents, isEvent]);

  return (
    <div>
      <Header />
      <ProductDetails data={data} />
      {!isEvent && <>{data && <SuggestedProduct data={data} />}</>}
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
