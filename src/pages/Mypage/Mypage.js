import React, { useEffect } from 'react';
import "../../styles/Mypage.css";
import Profile from "./Profile";
import Status from "./Status";
import Address from "./Address";
import History from "./History";
import axios from "axios";
import { useCookies } from "react-cookie";

  const Mypage = () => {
        const [cookies] = useCookies(["accessToken"]);

    useEffect(() => {
	    axios
	      .get("/users/profile", {
	        headers: {
	          accept: "*/*",
	          Authorization: `Bearer ${cookies.accessToken}`,
	        },
	      })
	      .then((response) => {
	        console.log(response); // 일단 이렇게 해두고 확인 먼저하기!!
	      })
	      .catch((err) => {
	        console.log("API 요청 실패:", err);
	      });
    }, [cookies.accessToken]);





    return (
      <div className="page-container">
        <Profile />
        <Status />
        <Address />
        <History />
      </div>
    );
  };
  export default Mypage;