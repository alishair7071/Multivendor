import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./Routes.js";
import {
  SignupPage,
  ActivationPage,
  HomePage,
  ProductsPage,
  BestSellingPage,
  EventsPage,
  FAQPage,
} from "./Routes.js";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { server } from "./server.js";
import Store from "./redux/store.js";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./redux/actions/user.js";
//import 'react-toastify/dist/ReactToastify.css';

function App() {
  const dispatch = useDispatch();
  const {loading}= useSelector((state)=> state.user);


  useEffect(() => {
    dispatch(loadUser());
  }, []);

  return (
    <> {
      loading ? (
        null
      ) : (
        <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route
          path="/activation/:activation_token"
          element={<ActivationPage />}
        />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/best-selling" element={<BestSellingPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/faq" element={<FAQPage />} />
      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
      )
    }
    </>
  );
}

export default App;
