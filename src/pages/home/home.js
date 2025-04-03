import React from 'react';
import Menu from "./Menu"
import Banner from './Banner';
import "../../styles/Home.css";

const Home = () => {
    return(
        <div className='home-container'>
            <Banner/>
            <Menu/>
        </div>
    );
};

export default Home;