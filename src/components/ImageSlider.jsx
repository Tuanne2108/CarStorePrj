import Slider from "react-slick";
import React from "react";

const ImageSlider = ({ arrImgs }) => {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:true,
        autoplaySpeed:3000
    };
    return (
        <Slider {...settings}>
            {arrImgs.map((image)=>{
                return(
                    <img src={image} alt="car image" />
                )
            })}
        </Slider>
    );
};

export default ImageSlider
