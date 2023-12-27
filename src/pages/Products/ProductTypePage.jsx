import React from "react";
import { NavBar } from "../../components/NavBar";
import ItemCard from "../../components/ItemCard";
import { Col, Row } from "react-bootstrap";
import { Pagination } from "antd";

export const ProductTypePage = () => {
    const onchange = () => {};
    return (
        <div style={{ padding: "20px 50px", background: "#f8f5f5" }}>
            <Row style={{ flexWrap: "nowrap" }}>
                <Col sm={2}>
                    <NavBar />
                </Col>
                <Col sm={10}>
                    <div className="productCard">
                        <ItemCard />
                    </div>
                    <Pagination
                        defaultCurrent={1}
                        total={100}
                        onChange={onchange}
                        style={{textAlign: 'center', marginTop:'20px'}}
                    />
                </Col>
            </Row>
        </div>
    );
};
