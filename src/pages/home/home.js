import React, { useEffect } from "react";
import Menu from "./Menu";
import Banner from "./Banner";
import Info from "./Info";
import "../../styles/Home.css";
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";

const Home = ({ onLoginChange }) => {
    const [/*cookie*/, setCookie] = useCookies(['accessToken']);
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const accessToken = params.get("accessToken");

        if (accessToken) {
            setCookie("accessToken", accessToken, { 
                path: '/',
                maxAge: 60 * 60 * 24 * 7,
            });
            onLoginChange(true);
            navigate("/", { replace: true });
        }
    }, [setCookie, navigate, onLoginChange]);

    return (
        <div className="home-container">
            <Banner />
            <Menu/>
            <Info/>
        </div>
    );
};

export default Home;