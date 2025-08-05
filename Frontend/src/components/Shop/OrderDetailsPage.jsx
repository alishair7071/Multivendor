import React from 'react'
import Header from '../Layout/Header'
import Footer from '../Layout/Footer'
import UserOrderDetails from "../../components/UserOrderDetails.jsx";

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