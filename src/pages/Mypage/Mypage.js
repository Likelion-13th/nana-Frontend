import React, { useState, useEffect } from 'react';
import "../../styles/Mypage.css";
import Profile from "./Profile";
import Status from "./Status";
import Address from "./Address";
import History from "./History";
import axios from "axios";
import { useCookies } from "react-cookie";

  const Mypage = () => {
    const [cookies] = useCookies(["accessToken"]);

    const [profileData, setProfileData] = useState({});
    const [orderStatusData, setOrderStatusData] = useState({});

    useEffect(() => {
      axios
        .get("/users/profile", {
          headers: {
            accept: "*/*",
            Authorization: `Bearer ${cookies.accessToken}`,
          },
        })
        .then((response) => {
            // 데이터 넣기!!    
            setProfileData({
                usernickname: response.data.result.usernickname,
                recentTotal: response.data.result.recentTotal,
                maxMileage: response.data.result.maxMileage,
            });
            setOrderStatusData(response.data.result.orderStatusCounts);
            
        })
        .catch((err) => {
          console.log("API 요청 실패:", err);
        });
    }, [cookies.accessToken]);





    return (
      <div className="page-container">
        <Profile profileData={profileData} />
        <Status orderStatusData={orderStatusData} />
        <Address />
        <History />
      </div>
    );
  };
  export default Mypage;