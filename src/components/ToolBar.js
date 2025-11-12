// src/components/ToolBar.jsx
import React from "react";
import "../styles/ToolBar.css";
import axios from "axios";
import { useCookies } from "react-cookie";

const ToolBar = ({ isLogin, onLoginChange }) => {
  const [cookies, , removeCookie] = useCookies(["accessToken"]);

  // ✅ 프론트 배포 주소
  const FRONT_ORIGIN =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://nana-frontend.netlify.app";

  // ✅ EB(백엔드) 서버 주소 — HTTPS로 유지해야 SameSite=None 쿠키 전달 가능
  const EB_ORIGIN =
    process.env.NODE_ENV === "development"
      ? "http://localhost:8080"
      : "http://sajang-dev-env.eba-cxzcfs22.ap-northeast-2.elasticbeanstalk.com"; // ★ 소문자 정규화

  // -------------------------------
  // 로그아웃 처리
  // -------------------------------
const handleLogout = () => {
        axios
            .delete("/users/logout", {
                headers: {
                    accept: "/",
                    Authorization: Bearer ${cookies.accessToken},
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

  // -------------------------------
  // 로그인 리다이렉트 (카카오 OAuth)
  // -------------------------------
  const handleLoginRedirect = () => {
    const oauthUrl = `${EB_ORIGIN}/oauth2/start/kakao?redirect_uri=${encodeURIComponent(
      FRONT_ORIGIN
    )}`;
    window.location.href = oauthUrl;
  };

  // -------------------------------
  // 스크롤 이동 버튼
  // -------------------------------
  const MoveToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const MoveToBottom = () =>
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });

  // -------------------------------
  // 렌더링
  // -------------------------------
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
