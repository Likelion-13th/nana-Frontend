import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Header.css";

const Header = () => {
  const location = useLocation();
  const currentPage = location.pathname;

  const isMypage = currentPage === "/mypage";

  return (
    <div className={`header-container ${isMypage ? "solid" : "transparent"}`}>
      <div className="header-section">
      <div className="header-logo">
        <Link to="/" className="logo-link">LIKELION</Link>
      </div>
        <div className="header-menu">
          <div className="menu-link">
            <Link
              to="/new"
              className={currentPage === "/new" ? "active" : ""}
            >
              New
            </Link>
          </div>
          <div className="menu-link">
            <Link
              to="/perfume"
              className={currentPage === "/perfume" ? "active" : ""}
            >
              Perfume
            </Link>
          </div>
          <div className="menu-link">
            <Link
              to="/diffuser"
              className={currentPage === "/diffuser" ? "active" : ""}
            >
              Diffuser
            </Link>
          </div>
          <div className="menu-link">
            <Link
              to="/mypage"
              className={currentPage === "/mypage" ? "active" : ""}
            >
              Mypage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
