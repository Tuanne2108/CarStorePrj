import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
const ItemCard = () => {
    return (
        <div className="cardContainer">
            <Row xs={1} md={3} className="g-4">
                {Array.from({ length: 1 }).map((_, idx) => (
                    <Col key={idx}>
                        <Card style={{ width: "20rem" }}>
                            <div className="badgeContainer">
                                <span className="onSale">5% off</span>
                            </div>
                            <Card.Img
                                variant="top"
                                src="https://carshopjapan.vn/wp-content/uploads/2022/10/S142_1k-800x800.jpg"
                            />
                            <Card.Body style={{ backgroundColor: "#c0c0c0" }}>
                                <Card.Text style={{ fontWeight: "bold" }}>
                                    Car Wash
                                </Card.Text>
                                <Card.Title>
                                    WAX car wash and shine conditioner
                                </Card.Title>
                                <Card.Text>
                                    <span
                                        style={{
                                            display: "flex",
                                        }}>
                                        5.0
                                        <box-icon
                                            name="star"
                                            flip="horizontal"></box-icon>
                                        | Sold: 1000
                                    </span>
                                    <div
                                        style={{
                                            paddingTop: "10px",
                                            fontSize: "20px",
                                        }}>
                                        <span>$10.31</span>
                                    </div>
                                </Card.Text>
                                <div className="buyBtn text-end">
                                    <Button style={{ backgroundColor: "#ff8000", borderColor: "#ff8000" }}>
                                        <a href="">Add to cart</a>
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default ItemCard;
