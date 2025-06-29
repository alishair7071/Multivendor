import { useNavigate } from "react-router-dom";
import SignUp from "../components/SignUp"
import { useSelector } from "react-redux";
import { useEffect } from "react";

const SignupPage = () => {

  const { isAuthenticated} = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(()=>{
    if(isAuthenticated == true) {
      navigate("/");
    }
  },[])

  return (
    <div>
        <SignUp/>
    </div>
  )
}

export default SignupPage