// src/components/ToolBar.jsx
import React from "react";
import "../styles/ToolBar.css";
import axios from "axios";
import { useCookies } from "react-cookie";

const ToolBar = ({ isLogin, onLoginChange }) => {
  const [cookies, , removeCookie] = useCookies(["accessToken"]);

  const MoveToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const MoveToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  // -------------------------------
  // 로그인 리다이렉트 (카카오 OAuth)
  // -------------------------------
  const handleLoginRedirect = () => {
    // 개발/배포에 따라 돌아올 프론트 주소 분기
    const redirect_url =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://nana-frontend.netlify.app";

    // ★ 친구 코드 패턴 그대로: EB는 http 로 호출
    const oauthUrl =
      "https://sajang-dev-env.eba-cxzcfs22.ap-northeast-2.elasticbeanstalk.com/oauth2/start/kakao" +
      `?redirect_uri=${encodeURIComponent(redirect_url)}`;

    window.location.href = oauthUrl;
  };

  // -------------------------------
  // 로그아웃 처리
  // -------------------------------
  const handleLogout = () => {
    axios
      .delete("/users/logout", {
        headers: {
          accept: "*/*",
          Authorization: `Bearer ${cookies.accessToken}`,
        },
      })
      .then(() => {
        onLoginChange(false);
        removeCookie("accessToken", { path: "/" });
      })
      .catch((err) => {
        console.log("LOGOUT API 요청 실패:", err);
      });
  };

  return (
    <div className="toolbar-container">
      <img
        src={
          isLogin
            ? `${process.env.PUBLIC_URL}/icon/icon_logout.svg`
            : `${process.env.PUBLIC_URL}/icon/icon_login.svg`
        }
        alt="login"
        className="toolbar-icon"
        onClick={isLogin ? handleLogout : handleLoginRedirect}
      />
      <img
        src={`${process.env.PUBLIC_URL}/icon/icon_recent.svg`}
        alt="recent"
        className="toolbar-icon"
      />
      <img
        src={`${process.env.PUBLIC_URL}/icon/icon_up.svg`}
        alt="up"
        className="toolbar-icon"
        onClick={MoveToTop}
      />
      <img
        src={`${process.env.PUBLIC_URL}/icon/icon_down.svg`}
        alt="down"
        className="toolbar-icon"
        onClick={MoveToBottom}
      />
    </div>
  );
};

export default ToolBar;
