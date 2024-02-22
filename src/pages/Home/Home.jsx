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
import img7 from "../../assets/images/img7.jpg";
import { Button, Col, Row } from "react-bootstrap";
import * as ProductService from "../../services/ProductService";
import { useQuery } from "@tanstack/react-query";

export const Home = () => {
    const arr = [
        "THERMAL INSULATION FILM",
        "CERAMIC COATING",
        "RUST-PROOF UNDERCOVER",
        "CAR GLASS CARE",
        "CAR BODY CARE",
    ];
    const fetchProductAll = async () => {
        const res = await ProductService.getAllProduct();
        return res;
    };
    const { isLoading, data: products } = useQuery({
        queryKey: ["product"],
        queryFn: fetchProductAll,
        retry: 3,
        retryDelay: 1000,
    });
    console.log("data", products);
    return (
        <>
            <div style={{ padding: "0 100px", background: "#f8f5f5" }}>
                <div className="productType">
                    {arr.map((item) => {
                        return <ProductType name={item} key={item} />;
                    })}
                </div>

                <div className="slider">
                    <ImageSlider
                        arrImgs={[img1, img2, img3, img4, img5, img6, img7]}
                    />
                </div>
                <div className="productCard">
                    <Row xs={1} md={3} className="g-4">
                        {products?.data?.map((product) => (
                            <Col key={product._id}>
                                <ItemCard
                                    countInStock={product.countInStock}
                                    image={product.image}
                                    name={product.name}
                                    price={product.price}
                                    rating={product.rating}
                                    type={product.type}
                                    discount={product.discount}
                                    sold={product.sold}
                                />
                            </Col>
                        ))}
                    </Row>
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
