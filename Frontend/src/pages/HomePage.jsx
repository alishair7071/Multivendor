import React from 'react'
import Header from "../components/Layout/Header.jsx";
import Hero from "../components/Route/Hero/Hero.jsx";
import Categories from "../components/Route/Categrories/Categotries.jsx";
import BestDeals from "../components/Route/BestDeals/BestDeals.jsx";
import FeaturedProduct from "../components/Route/FeaturedProduct/FeaturedProduct.jsx"
import Events from "../components/Route/Events/Events.jsx"
import Sponsored from "../components/Route/Sponsored/Sponsored.jsx"
import Footer from "../components/Layout/Footer.jsx";

const HomePage = () => {
  return (
    <div className='bg-slate-100'><Header activeHeading= {1}/>
     <Hero />
     <Categories />
     <BestDeals/>
     <Events />
     <FeaturedProduct/>
     <Sponsored/>
     <Footer/>
     </div>
   
  )
}

export default HomePage