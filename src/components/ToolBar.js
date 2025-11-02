import React from "react";
import "../styles/ToolBar.css";

const ToolBar = () => {
    return (
        <div className="toolbar-container">
          <img
            src={`${process.env.PUBLIC_URL}/icon/icon_login.svg`}
            alt="login"
            className="toolbar-icon"
            onClick={handleLoginRedirect}
          ></img>
          <img
            src={`${process.env.PUBLIC_URL}/icon/icon_recent.svg`}
            alt="recent"
            className="toolbar-icon"
          ></img>
          <img
            src={`${process.env.PUBLIC_URL}/icon/icon_up.svg`}
            alt="up"
            className="toolbar-icon"
            onClick={MoveToTop}
          ></img>
          <img
            src={`${process.env.PUBLIC_URL}/icon/icon_down.svg`}
            alt="down"
            className="toolbar-icon"
            onClick={MoveToBottom}
          ></img>
        </div>
      );
};

const MoveToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
};

const MoveToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
};

const handleLoginRedirect = () => {
  const redirectUrl = "https://nana-frontend.netlify.app/";

  const oauthUrl = `http://sajang-dev.ap-northeast-2.elasticbeanstalk.com/oauth2/authorization/kakao?redirect_uri=${redirectUrl}`;

  window.location.href = oauthUrl;
}

export default ToolBar;