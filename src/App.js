// src/App.js
import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // ← useLocation/useNavigate 제거
import { CookiesProvider, useCookies } from "react-cookie";
import axios from "axios";

import Home from "./pages/home/home";
import MyPage from "./pages/Mypage/Mypage";
import Diffuser from "./pages/ProductPage/Diffuser";
import Perfume from "./pages/ProductPage/Perfume";
import New from "./pages/ProductPage/New";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ToolBar from "./components/ToolBar";

// 전역 axios 설정
axios.defaults.baseURL = "/";
axios.defaults.withCredentials = true;
axios.defaults.validateStatus = (s) => s < 500;

// ★ 추가: EB 절대주소(쿠키 필요한 엔드포인트는 반드시 이 도메인으로 직접 호출)
// const EB_ORIGIN =
//   process.env.NODE_ENV === "development"
//     ? "http://localhost:8080"
//     : "http://sajang-dev-env.eba-cxzcfs22.ap-northeast-2.elasticbeanstalk.com";

function AppInner() {
  const [isLogin, setIsLogin] = useState(false);
  const [cookies] = useCookies(["accessToken"]);

  // // ★ 추가: 쿠키의 accessToken을 Axios Authorization 헤더에 자동 주입/제거
  // useEffect(() => {
  //   const t = cookies.accessToken;
  //   if (t) {
  //     axios.defaults.headers.common["Authorization"] = `Bearer ${t}`;
  //   } else {
  //     delete axios.defaults.headers.common["Authorization"];
  //   }
  // }, [cookies.accessToken]);

  // // URL/해시에서 accessToken 회수 → 쿠키 저장
  // useEffect(() => {
  //   const url = new URL(window.location.href);
  //   let token = url.searchParams.get("accessToken");

  //   if (!token && window.location.hash) {
  //     const hash = window.location.hash;
  //     const qIndex = hash.indexOf("accessToken=");
  //     if (qIndex >= 0) {
  //       const queryPart = hash.slice(hash.indexOf("?") + 1);
  //       const params = new URLSearchParams(queryPart);
  //       token = params.get("accessToken");
  //     }
  //   }

  //   if (token) {
  //     setCookie("accessToken", token, {
  //       path: "/",
  //       secure: true,
  //       sameSite: "None",
  //     });
  //     url.searchParams.delete("accessToken");
  //     window.history.replaceState({}, "", url.pathname + url.search + url.hash);
  //     setIsLogin(true);
  //   }
  // }, [setCookie]);

  // // ★ 추가: URL에 토큰이 없으면 서버에서 발급(/token/generate) 시도 — EB 절대주소로 호출해야 쿠키가 붙음
  // useEffect(() => {
  //   (async () => {
  //     if (cookies.accessToken) return; // 이미 있으면 스킵

  //     try {
  //       const res = await axios.post(
  //         `${EB_ORIGIN}/token/generate`,
  //         {}, // 스펙상 바디 필요 시 채워 넣기
  //         {
  //           withCredentials: true,
  //           validateStatus: (s) => s < 500,
  //         }
  //       );

  //       const token =
  //         res?.data?.accessToken ||
  //         res?.data?.result?.accessToken ||
  //         res?.data?.result?.token;

  //       if (token) {
  //         setCookie("accessToken", token, { path: "/", secure: true, sameSite: "None" });
  //         setIsLogin(true);
  //       }
  //     } catch (e) {
  //       // 필요 시 콘솔 확인
  //       // console.error("[token/generate] failed:", e);
  //     }
  //   })();
  // }, [cookies.accessToken, setCookie]);

  // 쿠키 기반 로그인 상태 반영
  useEffect(() => {
    setIsLogin(!!cookies.accessToken);
  }, [cookies.accessToken]);

  // // 선택: 401 응답 시 로그인 해제
  // useEffect(() => {
  //   const id = axios.interceptors.response.use(
  //     (res) => {
  //       if (res?.status === 401) {
  //         setIsLogin(false);
  //         // removeCookie("accessToken", { path: "/" });
  //       }
  //       return res;
  //     },
  //     (err) => Promise.reject(err)
  //   );
  //   return () => axios.interceptors.response.eject(id);
  // }, [setIsLogin, removeCookie]);

  return (
    <>
      <Header />
      <ToolBar isLogin={isLogin} onLoginChange={setIsLogin} />
      <Routes>
        <Route path="/" element={<Home onLoginChange={setIsLogin} />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/diffuser" element={<Diffuser />} />
        <Route path="/perfume" element={<Perfume />} />
        <Route path="/new" element={<New />} />
      </Routes>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <CookiesProvider>
      <Router>
        <AppInner />
      </Router>
    </CookiesProvider>
  );
}
