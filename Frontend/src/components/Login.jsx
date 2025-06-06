import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../styles/styles";
import { Link, useNavigate } from "react-router-dom";
import { server } from "../server";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loadUser } from "../redux/actions/user";

const Login = () => {
  const dispatch= useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const navigate= useNavigate();

  const handleSubmit = async (e)=>{
    e.preventDefault();

    console.log("login called");

    try{
      const res= await fetch(`${server}/user/login-user`, {
        method: "POST",
        headers: {
          'Content-Type' : "application/json"
        },
        body: JSON.stringify({
          email,
          password
        }),
        credentials: 'include'
      });

      const data= await res.json();
      if(data.success== true){
        toast.success("Login Success!");
        console.log("success");
        dispatch(loadUser());
        navigate("/");
        window.location.reload();
      }
      if(data.success==false){
        toast.error(data.message);
        console.log("error msg from server:  "+data.message)
      }

    }catch(e){
      console.log("catch Error: "+e.message);
      toast.error(e.message);
    }
  }

  return (
    <div className="min-h-screen bg-green-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Login to your account
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="apperance-none block w-full px-3 py-2 border border-gray-300 rounded-md 
                  shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 
                  sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="apperance-none block w-full px-3 py-2 border border-gray-300 rounded-md 
                  shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 
                  sm:text-sm"
                />
                <div
                  className="absolute right-3 top-3 cursor-pointer"
                  onClick={() => setVisible(!visible)}
                >
                  {visible ? (
                    <AiOutlineEyeInvisible className="text-gray-500" />
                  ) : (
                    <AiOutlineEye className="text-gray-500" />
                  )}
                </div>
              </div>
            </div>

            <div className={`${styles.noramlFlex} justify-between`}>
              <div className={`${styles.noramlFlex}`}>
                <input
                  type="checkbox"
                  name="remember-me"
                  id="remember-me"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a
                  href=".forgot-password"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                Forgot your password?
                </a>
              </div>
            </div>
            <div>
                <button type="submitt" 
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent 
                text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 hover:cursor-pointer">
                    Submit
                </button>
            </div>

            <div className={`${styles.noramlFlex} w-full`}>
              <h4>Not have an account?</h4>
              <Link to ="/sign-up" className="text-blue-600 pl-2 hover:text-blue-500 hover:cursor-pointer">
                Sign Up
              </Link>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
