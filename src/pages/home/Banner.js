import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./../../styles/CustomBanner.css";


const Banner = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        prevArrow: <CustomArrow direction="prev" />, // 커스텀 이전 화살표
        nextArrow: <CustomArrow direction="next" />, // 커스텀 다음 화살표
    };

    const images = [
        `${process.env.PUBLIC_URL}/img/banner_background_1.jpg`,
        `${process.env.PUBLIC_URL}/img/banner_background_2.jpg`,
        `${process.env.PUBLIC_URL}/img/banner_background_3.jpg`,
    ];
    return (
        <div className="banner-container">
            <Slider {...settings}>
                {images.map((image, index)=>(
                    <div key={index}>
                        <img
                        src={image}
                        alt={`slide-${index +1}`}
                        style={{width: "100%", height: "90vh", objectFit: "cover"}}
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );

};

const CustomArrow = ({ onClick, direction }) => {
    const isPrev = direction === "prev";
    const arrowStyle = {
      width: "fit-content",
      height: "fit-content",
      position: "absolute",
      top: "50%",
      transform: isPrev ? "translateY(-50%)" : "translateY(-50%) rotate(180deg)",
      zIndex: 1,
      [isPrev ? "left" : "right"]: "25px",
    };
  
    return (
      <button
        type="button"
        data-role="none"
        className={`slick-arrow slick-${direction}`}
        onClick={onClick}
        style={arrowStyle}
      >
        <img
          src={`${process.env.PUBLIC_URL}/icon/icon_banner_arrow.svg`}
          alt={isPrev ? "Previous" : "Next"}
          style={{ width: "144px", height: "144px" }}
        />
      </button>
    );
  };

export default Banner;