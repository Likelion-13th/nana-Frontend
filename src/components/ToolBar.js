import React from "react";
import "../styles/ToolBar.css";
import axios from "axios";
import { useCookies } from "react-cookie";

const ToolBar = ({ isLogin, onLoginChange }) => {
  // [cookies, setCookie, removeCookie] 순서이므로 가운데는 버리고 받기
  const [cookies, , removeCookie] = useCookies(["accessToken"]);

  const handleLogout = async () => {
    try {
      // ✅ Netlify 프록시 경유
      const res1 = await axios.delete("/api/users/logout", {
        headers: {
          Authorization: `Bearer ${cookies.accessToken || ""}`,
        },
        withCredentials: true,
        validateStatus: (s) => s < 500,
      });

      // 서버가 DELETE를 막거나 라우트가 다르면 POST 폴백
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
    } catch (err) {
      console.log("LOGOUT API 요청 실패", err);
    } finally {
      // 서버 응답과 무관하게 클라이언트 상태 정리
      onLoginChange(false);
      removeCookie("accessToken", { path: "/" });
      window.location.replace("/");
    }
  };

  const handleLoginRedirect = () => {
    // 프론트 최종 리다이렉트 목적지
    const redirectUrl =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://nana-frontend.netlify.app";

    // ✅ 절대 URL(프로토콜 포함) 사용! (대소문자, 하이픈/호스트 정확히)
    const ebBase =
      process.env.NODE_ENV === "development"
        ? "http://localhost:8080"
        : "http://sajang-dev.ap-northeast-2.elasticbeanstalk.com";

    // 스프링 기본 엔드포인트는 보통 /oauth2/authorization/{registrationId}
    const oauthUrl = `${ebBase}/oauth2/authorization/kakao?redirect_uri=${encodeURIComponent(
      redirectUrl
    )}`;

    window.location.href = oauthUrl;
  };

  const MoveToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const MoveToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
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
