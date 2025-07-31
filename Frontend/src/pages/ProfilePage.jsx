import React, { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import styles from "../styles/styles";
import ProfileSideBar from "../components/Profile/ProfileSideBar.jsx";
import ProfileContent from "../components/Profile/ProfileContent.jsx";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [active, setActive] = useState(1);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
        <div>
          <Header />
          <div className={`${styles.section} flex bg-[#f5f5f5] py-10 mt-10 md:mt-0`}>
            <div className="w-[50px] md:w-[335px] md:mt-0 mt-[18%]">
              <ProfileSideBar active={active} setActive={setActive} />
            </div>
            <ProfileContent active={active} />
          </div>
        </div>
  );
};

export default ProfilePage;
