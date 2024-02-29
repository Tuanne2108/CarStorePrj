import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { PlusOutlined } from "@ant-design/icons";
import TableComponent from "../Table";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { getBase64 } from "../../utils";
import { useMutationHooks } from "../../hooks/userMutationHook";
import * as ProductService from "../../services/ProductService";
import { Loading } from "../Loading";
import * as message from "../../components/Message";

export const ProductManage = () => {
    const [show, setShow] = useState(false);
    const initProductState = {
        name: "",
        type: "",
        description: "",
        price: "",
        rating: "",
        countInStock: "",
        discount: "",
        image: "",
    };
    const [stateProduct, setStateProduct] = useState(initProductState);
    const handleOnChange = (e) => {
        setStateProduct({
            ...stateProduct,
            [e.target.name]: e.target.value,
        });
    };

    const handleAvatarChange = async ({ fileList }) => {
        const file = fileList[0];
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateProduct({ ...stateProduct, image: file.preview });
    };
    const mutation = useMutationHooks((data) => {
        const {
            name,
            type,
            description,
            price,
            rating,
            countInStock,
            discount,
            image,
        } = data;
        const res = ProductService.addProduct({
            name,
            type,
            description,
            price,
            rating,
            countInStock,
            discount,
            image,
        });
        return res;
    });
    const { isPending, isSuccess, isError } = mutation;
    useEffect(() => {
        if (isSuccess) {
            message.success();
            setShow(false);
        } else if (isError) {
            message.error();
        }
    }, [isSuccess, isError]);
    const onFinish = () => {
        mutation.mutate(stateProduct);
    };
    const resetProductState = () => {
        setStateProduct(initProductState);
    };
    const handleClose = () => {
        resetProductState();
        setShow(false);
    };
    const handleShow = () => setShow(true);
    return (
        <>
            <h3>Product Management</h3>
            <div style={{ marginTop: "15px" }}>
                <Button
                    onClick={handleShow}
                    style={{
                        width: "150px",
                        height: "150px",
                        background: "#e0e0e0",
                        borderStyle: "dashed",
                    }}>
                    <PlusOutlined style={{ fontSize: "45px" }} />
                </Button>
            </div>
            <div>
                <TableComponent />
            </div>
            <div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add new product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ paddingLeft: "50px" }}>
                        {isPending ? (
                            <Loading />
                        ) : (
                            <Form>
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm="4">
                                        Name
                                    </Form.Label>
                                    <Col sm="8">
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter product name"
                                            value={stateProduct.name}
                                            name="name"
                                            onChange={handleOnChange}
                                            required
                                        />
                                    </Col>
                                </Form.Group>

                                <Form.Group
                                    as={Row}
                                    className="mb-3"
                                    controlId="type">
                                    <Form.Label column sm="4">
                                        Type
                                    </Form.Label>
                                    <Col sm="8">
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter product type"
                                            value={stateProduct.type}
                                            name="type"
                                            onChange={handleOnChange}
                                            required
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group
                                    as={Row}
                                    className="mb-3"
                                    controlId="price">
                                    <Form.Label column sm="4">
                                        Price
                                    </Form.Label>
                                    <Col sm="8">
                                        <Form.Control
                                            type="number"
                                            placeholder="Enter price"
                                            value={stateProduct.price}
                                            name="price"
                                            onChange={handleOnChange}
                                            required
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group
                                    as={Row}
                                    className="mb-3"
                                    controlId="rating">
                                    <Form.Label column sm="4">
                                        Rating
                                    </Form.Label>
                                    <Col sm="8">
                                        <Form.Control
                                            type="number"
                                            placeholder="Enter rating"
                                            value={stateProduct.rating}
                                            name="rating"
                                            onChange={handleOnChange}
                                            required
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group
                                    as={Row}
                                    className="mb-3"
                                    controlId="countInStock">
                                    <Form.Label column sm="4">
                                        CountInStock
                                    </Form.Label>
                                    <Col sm="8">
                                        <Form.Control
                                            type="number"
                                            placeholder="Enter the remains"
                                            value={stateProduct.countInStock}
                                            name="countInStock"
                                            onChange={handleOnChange}
                                            required
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group
                                    as={Row}
                                    className="mb-3"
                                    controlId="description">
                                    <Form.Label column sm="4">
                                        Description
                                    </Form.Label>
                                    <Col sm="8">
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter the description"
                                            value={stateProduct.description}
                                            name="description"
                                            onChange={handleOnChange}
                                            required
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group
                                    as={Row}
                                    className="mb-3"
                                    controlId="discount">
                                    <Form.Label column sm="4">
                                        Discount
                                    </Form.Label>
                                    <Col sm="8">
                                        <Form.Control
                                            type="number"
                                            placeholder="Enter the discount"
                                            value={stateProduct.discount}
                                            name="discount"
                                            onChange={handleOnChange}
                                            required
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group
                                    as={Row}
                                    className="mb-3"
                                    controlId="image">
                                    <Form.Label column sm="4">
                                        Image
                                    </Form.Label>
                                    <Col sm="8">
                                        <Upload
                                            onChange={handleAvatarChange}
                                            maxCount={1}>
                                            <Button icon={<UploadOutlined />}>
                                                Upload file
                                            </Button>
                                        </Upload>
                                        {stateProduct?.image && (
                                            <img
                                                src={stateProduct?.image}
                                                style={{
                                                    height: "60px",
                                                    width: "60px",
                                                    borderRadius: "50%",
                                                    objectFit: "cover",
                                                }}
                                                alt="avatar"
                                            />
                                        )}
                                    </Col>
                                </Form.Group>
                            </Form>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={onFinish}>
                            Add
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
};
