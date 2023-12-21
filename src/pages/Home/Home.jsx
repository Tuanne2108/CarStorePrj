import React from "react";
import { ProductType } from "../../components/ProductType/ProductType";
import ImageSlider from "../../components/ImageSlider/ImageSlider";
import img1 from "../../assets/images/img1.jpg";
import img2 from "../../assets/images/img2.jpg";
import img3 from "../../assets/images/img3.png";
import img4 from "../../assets/images/img4.jpg";
import img5 from "../../assets/images/img5.jpg";
import img6 from "../../assets/images/img6.webp";

export const Home = () => {
    const arr = [
        "THERMAL INSULATION FILM",
        "CERAMIC COATING",
        "RUST-PROOF UNDERCOVER",
        "CAR GLASS CARE",
        "CAR BODY CARE",
    ];
    return (
        <>
            <div style={{ padding: "0 100px" }}>
                <div className="productType">
                    {arr.map((item) => {
                        return <ProductType name={item} key={item} />;
                    })}
                </div>
            </div>
            <div className="slider">
                <ImageSlider arrImgs={[img1, img2, img3, img4, img5, img6]} />
            </div>
            Home
        </>
    );
};
