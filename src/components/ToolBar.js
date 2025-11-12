// src/components/ToolBar.jsx
import React from "react";
import "../styles/ToolBar.css";
import axios from "axios";
import { useCookies } from "react-cookie";

const ToolBar = ({ isLogin, onLoginChange }) => {
  const [cookies, , removeCookie] = useCookies(["accessToken"]);

  // 프런트 배포 주소
  const FRONT_ORIGIN =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://nana-frontend.netlify.app";

  // ✅ 백엔드 HTTPS 도메인(예: Gateway/ALB/CloudFront)
  // EB에 https가 없다면 valuebid.site 같은 HTTPS 도메인을 사용하세요.
  const EB_ORIGIN =
    process.env.NODE_ENV === "development"
      ? "http://localhost:8080"
      : "https://valuebid.site";

  // 로그아웃: 절대경로 + withCredentials, Accept 헤더 제거
  const handleLogout = async () => {
    try {
      await axios.delete(`${EB_ORIGIN}/users/logout`, {
        headers: {
          ...(cookies.accessToken
            ? { Authorization: `Bearer ${cookies.accessToken}` }
            : {}),
          // Accept 명시 불필요(기본값 사용). 필요시 아래 한 줄:
          // Accept: "application/json",
        },
        withCredentials: true,
        validateStatus: (s) => s < 500,
      });

      onLoginChange(false);
      removeCookie("accessToken", { path: "/" });
    } catch (err) {
      console.log("LOGOUT API 요청 실패:", err);
    }
  };

  // 카카오 OAuth 시작
  const handleLoginRedirect = () => {
    const oauthUrl = `http://sajang-dev-env.eba-cxzcfs22.ap-northeast-2.elasticbeanstalk.com/oauth2/start/kakao?redirect_uri=${encodeURIComponent(
      FRONT_ORIGIN
    )}`;
    window.location.href = oauthUrl;
  };

  const MoveToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const MoveToBottom = () =>
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });

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
