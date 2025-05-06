  import React from "react";
  import "../../styles/Mypage.css";
  import Profile from "./Profile";
  import Status from "./Status";
  import Address from "./Address";
  import History from "./History";

  const Mypage = () => {
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