import React from "react";
import "../styles/ToolBar.css";
import axios from "axios";
import { useCookies } from "react-cookie";

const ToolBar = ({ isLogin, onLoginChange }) => {
  const [cookies, , removeCookie] = useCookies(["accessToken"]);

  const handleLogout = async () => {
    try {
      // Netlify 프록시 경유
      const res1 = await axios.delete("/api/users/logout", {
        headers: { Authorization: `Bearer ${cookies.accessToken || ""}` },
        withCredentials: true,
        validateStatus: (s) => s < 500,
      });
      if (res1.status === 403 || res1.status === 405 || res1.status === 404) {
        await axios.post(
          "/api/users/logout",
          {},
          {
            headers: { Authorization: `Bearer ${cookies.accessToken || ""}` },
            withCredentials: true,
            validateStatus: (s) => s < 500,
          }
        );
      }
    } catch (e) {
      console.error("LOGOUT API 요청 실패:", e);
    } finally {
      onLoginChange(false);
      removeCookie("accessToken", { path: "/" });
      window.location.replace("/");
    }
  };

  const handleLoginRedirect = () => {
    // ✅ 로그인 후 돌아올 프론트 주소: nana (고정)
    const redirectUrl =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://nana-frontend.netlify.app";

    // ✅ 절대 EB 주소 사용 (세션 깨짐 방지)
    const ebBase =
      process.env.NODE_ENV === "development"
        ? "http://localhost:8080"
        : "http://sajang-dev.ap-northeast-2.elasticbeanstalk.com";

    // 강의 기본 엔드포인트 스타일
    const oauthUrl = `${ebBase}/oauth2/authorization/kakao?redirect_uri=${encodeURIComponent(
      redirectUrl
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
