import React from "react";
import ProductType from "../../components/ProductType";
import ImageSlider from "../../components/ImageSlider";
import ItemCard from "../../components/ItemCard";
import img1 from "../../assets/images/img1.jpg";
import img2 from "../../assets/images/img2.jpg";
import img3 from "../../assets/images/img3.png";
import img4 from "../../assets/images/img4.jpg";
import img5 from "../../assets/images/img5.jpg";
import img6 from "../../assets/images/img6.webp";
import { NavBar } from "../../components/NavBar";
import { Button } from "react-bootstrap";

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
            <div style={{ padding: "0 100px", background:'#f8f5f5'}}>
                <div className="productType">
                    {arr.map((item) => {
                        return <ProductType name={item} key={item} />;
                    })}
                </div>

                <div className="slider">
                    <ImageSlider
                        arrImgs={[img1, img2, img3, img4, img5, img6]}
                    />
                </div>
                <div className="productCard">
                    <ItemCard />
                </div>
            </div>
            {/* <div>
                <NavBar/>
            </div> */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    paddingTop: "20px",
                }}>
                <Button style={{ width: "150px" }} variant="outline-primary">
                    See more...
                </Button>
            </div>
        </>
    );
};
