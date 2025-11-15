// src/pages/Home/Home.jsx
import React, { useEffect } from "react";
import Menu from "./Menu";
import Banner from "./Banner";
import Info from "./Info";
import "../../styles/Home.css";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";

const Home = ({ onLoginChange }) => {
  // useCookies는 [cookies, setCookie, removeCookie]를 반환하지만
  // 여기서는 setCookie만 쓰기 때문에 나머지는 버림 처리
  const [, setCookie] = useCookies(["accessToken"]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // 현재 URL의 쿼리스트링에서 accessToken 추출
    const params = new URLSearchParams(location.search);
    const accessToken = params.get("accessToken");

    if (accessToken) {
      // 쿠키에 accessToken 저장 (로컬 개발용: secure, sameSite 옵션은 생략)
      setCookie("accessToken", accessToken, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7일
      });

      // 상위(AppInner)에서 isLogin 상태 true로 반영
      onLoginChange(true);

      // 쿼리스트링 제거해서 URL 깔끔하게 정리
      navigate("/", { replace: true });
    }
  }, [location.search, setCookie, navigate, onLoginChange]);

  return (
    <div className="home-container">
      <Banner />
      <Menu />
      <Info />
    </div>
  );
};

export default Home;
