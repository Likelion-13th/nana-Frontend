import React, { useEffect } from "react";
import Menu from "./Menu";
import Banner from "./Banner";
import Info from "./Info";
import "../../styles/Home.css";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Home = ({ onLoginChange }) => {
  const [, setCookie] = useCookies(["accessToken"]);
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("accessToken");

    if (accessToken) {
      // 토큰을 쿠키로 저장
      setCookie("accessToken", accessToken, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7일
      });

      // 앱 전역 로그인 상태 반영
      onLoginChange(true);

      // 쿼리스트링 제거
      navigate("/", { replace: true });
    }
  }, [setCookie, navigate, onLoginChange]);

  return (
    <div className="home-container">
      <Banner />
      <Menu />
      <Info />
    </div>
  );
};

export default Home;
