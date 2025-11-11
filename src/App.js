import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CookiesProvider, useCookies } from "react-cookie";

import Home from "./pages/home/home";
import MyPage from "./pages/Mypage/Mypage";
import Diffuser from "./pages/ProductPage/Diffuser";
import Perfume from "./pages/ProductPage/Perfume";
import New from "./pages/ProductPage/New";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ToolBar from "./components/ToolBar";

function AppInner() {
  const [isLogin, setIsLogin] = useState(false);
  const [cookies] = useCookies(["accessToken"]);

  // 쿠키 기준으로 초기 로그인 상태 동기화
  useEffect(() => {
    if (cookies.accessToken) setIsLogin(true);
    else setIsLogin(false);
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
