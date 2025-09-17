import React from "react";
import Header from "../components/Layout/Header.jsx";
import Hero from "../components/Route/Hero/Hero.jsx";
import Categories from "../components/Route/Categrories/Categotries.jsx";
import BestDeals from "../components/Route/BestDeals/BestDeals.jsx";
import FeaturedProduct from "../components/Route/FeaturedProduct/FeaturedProduct.jsx";
import Events from "../components/Route/Events/Events.jsx";
import Sponsored from "../components/Route/Sponsored/Sponsored.jsx";
import Footer from "../components/Layout/Footer.jsx";

const HomePage = () => {
  return (
    <div className="bg-gradient-to-br from-gray-50 via-slate-100 to-gray-200">
      {/* Sticky Header with slight shadow */}
      <Header activeHeading={1} />

      {/* Hero Section with full-width background */}
      <section className="relative">
        <Hero />
      </section>

      {/* Categories inside a card-like container */}
      <section className="max-w-7xl mx-auto px-4 mt-10">
        <div className="bg-white shadow-md rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-5 border-l-4 border-emerald-500 pl-3">
            Shop by Categories
          </h2>
          <Categories />
        </div>
      </section>

      {/* Deals + Events stacked vertically */}
      <section className="max-w-7xl mx-auto px-4 mt-12 space-y-8">
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-5 border-l-4 border-indigo-500 pl-3">
            Best Deals
          </h2>
          <BestDeals />
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-5 border-l-4 border-pink-500 pl-3">
            Upcoming Events
          </h2>
          <Events />
        </div>
      </section>

      {/* Featured Products - Full Width */}
      <section className="max-w-7xl mx-auto px-4 mt-12">
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-5 border-l-4 border-purple-500 pl-3">
            Featured Products
          </h2>
          <FeaturedProduct />
        </div>
      </section>

      {/* Sponsored Section with gradient background */}
      <section className="mt-14 py-10 bg-gradient-to-r from-teal-600 to-emerald-500">
        <div className="max-w-7xl mx-auto px-4 text-white">
          <h2 className="text-3xl font-bold mb-6">Sponsored</h2>
          <Sponsored />
        </div>
      </section>

      {/* Footer with extra padding */}
      <Footer />
    </div>
  );
};

export default HomePage;
