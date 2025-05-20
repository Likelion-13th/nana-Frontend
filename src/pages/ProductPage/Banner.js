import React from "react";
import "../../styles/ProductPage.css";

const Banner = ({title, imagePath}) => {
    return (
        <div className = "banner">
            <img src={`${process.env.PUBLIC_URL}/img/${imagePath}`}
            alt={title}
            className="banner-image"
            />
            <div className="banner-title">{title}</div>
        </div>
    )
}

export default Banner;