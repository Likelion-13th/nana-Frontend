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

  // 로그인/로그아웃 공용 핸들러 (컴포넌트 내부에 있어야 eslint no-undef 안 뜸)
  const handleAuthClick = async () => {
    if (isLogin) {
      try {
        // 1) DELETE 시도
        const res1 = await axios.delete("/api/users/logout", {
          headers: {
            Authorization: `Bearer ${cookies.accessToken || ""}`,
          },
          withCredentials: true,
          validateStatus: (s) => s < 500, // 4xx도 catch로 던지지 않게
        });

        // 2) 403/405/404면 POST로 폴백
        if (res1.status === 403 || res1.status === 405 || res1.status === 404) {
          await axios.post(
            "/api/users/logout",
            {},
            {
              headers: {
                Authorization: `Bearer ${cookies.accessToken || ""}`,
              },
              withCredentials: true,
              validateStatus: (s) => s < 500,
            }
          );
        }
      } catch (e) {
        // 네트워크 오류 등은 아래 로컬 정리로 마무리
        console.error("LOGOUT API 요청 실패:", e);
      } finally {
        // 서버 응답과 무관하게 클라이언트 상태 정리 (idempotent)
        onLoginChange(false);
        removeCookie("accessToken", { path: "/" });
        window.location.replace("/");
      }
    } else {
      const redirectUrl =
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000"
          : "https://nana-frontend.netlify.app";

      // Netlify 리라이트 통해 백엔드로 전달
      const oauthUrl = `/api/oauth2/authorization/kakao?redirect_uri=${encodeURIComponent(
        redirectUrl
      )}`;

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
