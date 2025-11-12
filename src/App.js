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

function AppInner() {
  const [isLogin, setIsLogin] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);

  // URL/해시에서 accessToken 회수 → 쿠키 저장
  useEffect(() => {
    const url = new URL(window.location.href);
    let token = url.searchParams.get("accessToken");

    if (!token && window.location.hash) {
      const hash = window.location.hash;
      const qIndex = hash.indexOf("accessToken=");
      if (qIndex >= 0) {
        const queryPart = hash.slice(hash.indexOf("?") + 1);
        const params = new URLSearchParams(queryPart);
        token = params.get("accessToken");
      }
    }

    if (token) {
      setCookie("accessToken", token, {
        path: "/",
        secure: true,
        sameSite: "None",
      });
      url.searchParams.delete("accessToken");
      window.history.replaceState({}, "", url.pathname + url.search + url.hash);
      setIsLogin(true);
    }
  }, [setCookie]);

  // 쿠키 기반 로그인 상태 반영
  useEffect(() => {
    setIsLogin(!!cookies.accessToken);
  }, [cookies.accessToken]);

  // 선택: 401 응답 시 로그인 해제
  useEffect(() => {
    const id = axios.interceptors.response.use(
      (res) => {
        if (res?.status === 401) {
          setIsLogin(false);
          // removeCookie("accessToken", { path: "/" });
        }
        return res;
      },
      (err) => Promise.reject(err)
    );
    return () => axios.interceptors.response.eject(id);
  }, [setIsLogin, removeCookie]);

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
