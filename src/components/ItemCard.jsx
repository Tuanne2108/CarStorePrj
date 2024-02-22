import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
const ItemCard = (props) => {
    const { name, image, type, price, countInStock, rating, discount, sold } =
        props;
    return (
        <div className="cardContainer">
            <Card style={{ width: "40rem" }}>
                <div className="badgeContainer">
                    <span className="onSale">{discount}</span>
                </div>
                <Card.Img
                    variant="top"
                    src={image}
                    style={{
                        objectFit: "cover",
                    }}
                />
                <Card.Body style={{ backgroundColor: "#c0c0c0" }}>
                    <Card.Text style={{ fontWeight: "bold" }}>{type}</Card.Text>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>
                        <span
                            style={{
                                display: "flex",
                            }}>
                            {rating}
                            <box-icon name="star" flip="horizontal"></box-icon>|
                            Sold: {sold}
                        </span>
                        <div
                            style={{
                                paddingTop: "10px",
                                fontSize: "20px",
                            }}>
                            <span>{price}</span>
                        </div>
                    </Card.Text>
                    <div className="buyBtn text-end">
                        <Button>
                            <a href="">Add to cart</a>
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default ItemCard;
