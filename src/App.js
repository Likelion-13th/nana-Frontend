// src/App.js
import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CookiesProvider, useCookies } from "react-cookie";
import axios from "axios"; // ★ 추가

import Home from "./pages/home/home";
import MyPage from "./pages/Mypage/Mypage";
import Diffuser from "./pages/ProductPage/Diffuser";
import Perfume from "./pages/ProductPage/Perfume";
import New from "./pages/ProductPage/New";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ToolBar from "./components/ToolBar";

// ★ 추가: Netlify 프록시 & 쿠키 전역 설정
axios.defaults.baseURL = "/";               // 상대경로 → Netlify가 EB로 프록시
axios.defaults.withCredentials = true;      // 쿠키 교환 필수
axios.defaults.validateStatus = (s) => s < 500; // 4xx는 throw (필요 없으면 지워도 됨)

function AppInner() {
  const [isLogin, setIsLogin] = useState(false);
  const [cookies, , removeCookie] = useCookies(["accessToken"]);

  // ✅ 새로고침/직접접속 시에도 쿠키로 로그인 상태 반영
  useEffect(() => {
    setIsLogin(!!cookies.accessToken);
  }, [cookies.accessToken]);

  // ★ 추가(선택): 401 응답 시 로그인 해제
  useEffect(() => {
    const id = axios.interceptors.response.use(
      (res) => {
        if (res?.status === 401) {
          setIsLogin(false);
          // 필요 시 쿠키도 정리
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
