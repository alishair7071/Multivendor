import React, { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import ProductDetails from "../components/products/ProductDetails.jsx";
import { useParams, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import SuggestedProduct from "../components/products/SuggestedProduct.jsx";

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
      const eventData = allEvents?.find((i) => i._id === id);
      setData(eventData);
    } else {
      const productData = allProducts?.find((i) => i._id === id);
      setData(productData);
    }
  }, [id, allProducts, allEvents, isEvent]);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Sticky Header */}
      <Header />

      {/* Product Section */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {data ? (
            <div className="bg-white shadow-md rounded-2xl p-6">
              <ProductDetails data={data} />
            </div>
          ) : (
            <div className="flex justify-center items-center py-20">
              <p className="text-gray-500 text-lg">Loading product...</p>
            </div>
          )}
        </div>

        {/* Suggested Products (only for non-events) */}
        {!isEvent && data && (
          <div className="max-w-7xl mx-auto px-4 py-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              You may also like
            </h2>
            <SuggestedProduct data={data} />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
