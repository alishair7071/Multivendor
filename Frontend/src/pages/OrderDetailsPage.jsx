import React from 'react'
import Header from '../components/Layout/Header.jsx'
import Footer from '../components/Layout/Footer.jsx'
import UserOrderDetails from "../components/UserOrderDetails.jsx";

const OrderDetailsPage = () => {
  return (
    <div>
        <Header />
        <UserOrderDetails />
        <Footer />
    </div>
  )
}

export default OrderDetailsPage