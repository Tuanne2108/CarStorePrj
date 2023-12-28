import { InputNumber } from "antd";
import React from "react";
import { Button, Col, Image, Row } from "react-bootstrap";

export const ProductDetail = () => {
    const onChange = () => {};
    return (
        <div>
            <Row style={{ padding: "25px 100px" }}>
                <Col sm={6}>
                    <Image
                        src="https://carshopjapan.vn/wp-content/uploads/2022/10/S142_1k-600x600.jpg"
                        style={{ width: "600px", height: "600" }}
                    />
                </Col>
                <Col sm={6}>
                    <div>
                        <nav style={{ gap: "5px", display: "flex" }}>
                            <a href="/">Home</a>
                            <span>/</span>
                            <a href="/product-type">Products</a>
                            <span>/</span>
                            <a href="/">Car Wash</a>
                        </nav>
                        <h2>WAX car wash and shine conditioner</h2>
                        <div className="priceWrapper">
                            <del>
                                <span>$15.30</span>
                            </del>
                            <span>$10.31</span>
                        </div>
                        <div className="product-description">
                            <strong>Uses:</strong>
                            <ul>
                                <li>Type for direct use, undiluted.</li>
                                <li>
                                    Silicone polymer adheres to the paint
                                    surface, creating a water-repellent,
                                    dirt-repellent effect and maintaining a
                                    beautiful shine.
                                </li>
                                <li>Non-abrasive, TP neutral.</li>
                                <li>
                                    Easy to use, safe for paint and consumer
                                    health.
                                </li>
                            </ul>
                            <div style={{ display: "flex", gap: "5px" }}>
                                <strong>Applicable place:</strong>
                                <p>car body</p>
                            </div>
                        </div>
                        <div className="product-quantity">
                            <Button>
                                <box-icon name="minus" size="xs"></box-icon>
                            </Button>
                            <InputNumber
                                defaultValue={3}
                                min={1}
                                onChange={onChange}
                                style={{
                                    height: "37.33px",
                                    width: "40px",
                                    borderRadius: "0px",
                                }}
                            />
                            <Button>
                                <box-icon name="plus" size="xs"></box-icon>
                            </Button>
                            <div style={{ paddingLeft: "20px" }}>
                                <a href="/order">
                                    <Button style={{ background: "#cc6600" }}>
                                        PURCHASE
                                    </Button>
                                </a>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
              
            </Row>
        </div>
    );
};
