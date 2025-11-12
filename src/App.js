// src/App.js
import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

// 전역 axios 설정 (다른 API는 기존대로 상대경로 사용)
axios.defaults.baseURL = "/";
axios.defaults.withCredentials = true;
axios.defaults.validateStatus = (s) => s < 500;

// 혹시 이전에 잘못 들어간 Accept 기본값이 있다면 제거
if (axios.defaults.headers?.common?.Accept === "/") {
  delete axios.defaults.headers.common.Accept;
}

function AppInner() {
  const [isLogin, setIsLogin] = useState(false);
  const [cookies] = useCookies(["accessToken"]);

  useEffect(() => {
    setIsLogin(!!cookies.accessToken);
  }, [cookies.accessToken]);

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
