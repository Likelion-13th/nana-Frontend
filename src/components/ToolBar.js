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

  // 로그인/로그아웃 공용 클릭 핸들러
  const handleAuthClick = async () => {
    if (isLogin) {
      try {
        await axios.delete("/api/users/logout", {
          headers: { Authorization: `Bearer ${cookies.accessToken || ""}` },
          withCredentials: true,
        });
        onLoginChange(false);
        removeCookie("accessToken", { path: "/" });
        window.location.href = "/";
      } catch (err) {
        console.error("LOGOUT API 요청 실패", err);
        alert("로그아웃 중 오류가 발생했습니다.");
      }
    } else {
      // 🔑 로그인도 프록시로 (혼합콘텐츠 방지)
      const redirectUrl =
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000"
          : "https://nana-frontend.netlify.app/";

      // ✅ http 절대주소 대신 /api 경유
      const oauthUrl =
        `/api/oauth2/start/kakao?redirect_uri=${encodeURIComponent(redirectUrl)}`;

      window.location.href = oauthUrl;
    }
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
        onClick={handleAuthClick}
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
