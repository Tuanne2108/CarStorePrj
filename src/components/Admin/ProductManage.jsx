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
import { useQuery } from "@tanstack/react-query";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import DrawerComponent from "../Drawer";

export const ProductManage = () => {
    const [show, setShow] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [rowSelected, setRowSelected] = useState("");
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const user = useSelector((state) => state?.user);
    const [isPendingUpdate, setIsPendingUpdate] = useState(false);
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
    const initProductDetailState = {
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
    const [stateProductDetails, setStateProductDetails] = useState(
        initProductDetailState
    );
    const handleOnChange = (e) => {
        setStateProduct({
            ...stateProduct,
            [e.target.name]: e.target.value,
        });
    };
    const handleDetailOnChange = (e) => {
        setStateProductDetails({
            ...stateProductDetails,
            [e.target.name]: e.target.value,
        });
    };

    const handleImageChange = async ({ fileList }) => {
        if (fileList.length > 0) {
            const file = fileList[0];
            if (!file.url && !file.preview) {
                file.preview = await getBase64(file.originFileObj);
            }
            setStateProduct({ ...stateProduct, image: file.preview });
        }
    };

    const handleDetailImageChange = async ({ fileList }) => {
        if (fileList.length > 0) {
            const file = fileList[0];
            if (!file.url && !file.preview) {
                file.preview = await getBase64(file.originFileObj);
            }
            setStateProductDetails({
                ...stateProductDetails,
                image: file.preview,
            });
        }
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
    const updateMutation = useMutationHooks((data) => {
        const { id, token, ...rests } = data;

        const res = ProductService.updateProduct(id, token, { ...rests });
        return res;
    });
    const deleteMutation = useMutationHooks((data) => {
        const { id, token } = data;
        const res = ProductService.deleteProduct(id, token);
        return res;
    });
    const fetchProductAll = async () => {
        const res = await ProductService.getAllProduct();
        return res;
    };
    const { isPending, isSuccess, isError, data } = mutation;
    const {
        data: dataUpdated,
        isPending: isPendingUpdated,
        isSuccess: isSuccessUpdated,
        isError: isErrorUpdated,
    } = updateMutation;
    const {
        data: dataDeleted,
        isPending: isPendingDeleted,
        isSuccess: isSuccessDeleted,
        isError: isErrorDeleted,
    } = deleteMutation;
    useEffect(() => {
        if (isSuccess && data?.status === "OK") {
            message.success();
            setShow(false);
        } else if (isError) {
            message.error();
        }
    }, [isSuccess, isError]);
    useEffect(() => {
        if (isSuccessUpdated && dataUpdated?.status === "OK") {
            message.success();
            handleCloseDrawer();
        } else if (isErrorUpdated) {
            message.error();
        }
    }, [isSuccessUpdated, isErrorUpdated]);
    useEffect(() => {
        if (isSuccessDeleted && dataDeleted?.status === "OK") {
            message.success();
            handleCloseDelete();
        } else if (isErrorDeleted) {
            message.error();
        }
    }, [isSuccessDeleted, isErrorDeleted]);

    const onFinish = () => {
        mutation.mutate(stateProduct, {
            onSettled: () => {
                queryProduct.refetch();
            },
        });
        setStateProduct(initProductState);
    };
    const onFinishUpdate = () => {
        updateMutation.mutate(
            {
                id: rowSelected,
                token: user?.access_token,
                ...stateProductDetails,
            },
            {
                onSettled: () => {
                    queryProduct.refetch();
                },
            }
        );
        setIsOpenDrawer(false);
    };
    const onFinishDelete = () => {
        deleteMutation.mutate(
            { id: rowSelected, token: user?.access_token },
            {
                onSettled: () => {
                    queryProduct.refetch();
                },
            }
        );
        setShowDelete(false);
    };
    const handleCloseDrawer = () => {
        setIsOpenDrawer(false);
        setStateProductDetails(initProductDetailState);
        setRowSelected("");
    };
    const handleClose = () => {
        setStateProduct(initProductState);
        setShow(false);
        setRowSelected("");
    };
    const handleCloseDelete = () => {
        setShowDelete(false);
    };
    const handleShow = () => setShow(true);
    //Table
    const fetchProductDetails = async () => {
        const res = await ProductService.getProductDetails(rowSelected);
        if (res?.data) {
            setStateProductDetails({
                name: res?.data?.name,
                type: res?.data?.type,
                description: res?.data?.description,
                price: res?.data?.price,
                rating: res?.data?.rating,
                countInStock: res?.data?.countInStock,
                discount: res?.data?.discount,
                image: res?.data?.image,
            });
        }
        setIsPendingUpdate(false);
    };
    useEffect(() => {
        setStateProduct(stateProductDetails);
    }, [stateProductDetails]);
    useEffect(() => {
        if (rowSelected) {
            setIsPendingUpdate(true);
            fetchProductDetails(rowSelected);
        }
    }, [rowSelected]);
    const handleUpdateDetails = () => {
        setIsOpenDrawer(true);
    };

    const handleDelete = () => {
        setShowDelete(true);
    };
    const renderAction = () => {
        return (
            <div style={{ display: "flex", gap: "15px" }}>
                <EditOutlined
                    style={{ fontSize: "20px", cursor: "pointer" }}
                    onClick={handleUpdateDetails}
                />
                <DeleteOutlined
                    style={{
                        color: "red",
                        fontSize: "20px",
                        cursor: "pointer",
                    }}
                    onClick={handleDelete}
                />
            </div>
        );
    };
    const queryProduct = useQuery({
        queryKey: ["products"],
        queryFn: fetchProductAll,
    });
    const { isLoading: isLoadingProducts, data: products } = queryProduct;

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            filters: [
                {
                    text: "Audi",
                    value: "Audi",
                },
                {
                    text: "Carrera",
                    value: "Carrera",
                },
            ],
            filterMode: "tree",
            filterSearch: true,
            onFilter: (value, record) => record.name.includes(value),
            width: "30%",
        },
        {
            title: "Type",
            dataIndex: "type",
            filters: [
                {
                    text: "Car",
                    value: "Car",
                },
                {
                    text: "Equipment",
                    value: "Equipment",
                },
            ],
            filterMode: "tree",
            filterSearch: true,
            onFilter: (value, record) => record.type.includes(value),
        },
        {
            title: "Price",
            dataIndex: "price",
            sorter: (a, b) => a.price - b.price,
        },
        {
            title: "Action",
            dataIndex: "action",
            render: renderAction,
        },
    ];
    const dataTable = 
        products?.data?.length &&
        products?.data?.map((product) => {
            return {
                ...product,
                key: product._id,
            };
        });

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
            {/* Table Component */}
            <div>
                <TableComponent
                    products={products?.data}
                    isLoading={isLoadingProducts}
                    columns={columns}
                    data={dataTable}
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: (event) => {
                                setRowSelected(record._id);
                            },
                        };
                    }}
                />
            </div>
            {/* Modal */}
            <div>
                <Modal forcerender="true" show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add new product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ paddingLeft: "50px" }}>
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
                                        onChange={handleImageChange}
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
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        {isPending ? (
                            <Loading />
                        ) : (
                            <Button variant="primary" onClick={onFinish}>
                                Add
                            </Button>
                        )}
                    </Modal.Footer>
                </Modal>
            </div>
            {/* Drawer */}
            <div>
                <DrawerComponent
                    title="Product Details"
                    isOpen={isOpenDrawer}
                    onClose={() => handleCloseDrawer()}>
                    <Modal.Body style={{ paddingLeft: "100px" }}>
                        <Form>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm="4">
                                    Name
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter product name"
                                        value={stateProductDetails.name}
                                        name="name"
                                        onChange={handleDetailOnChange}
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
                                        value={stateProductDetails.type}
                                        name="type"
                                        onChange={handleDetailOnChange}
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
                                        value={stateProductDetails.price}
                                        name="price"
                                        onChange={handleDetailOnChange}
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
                                        value={stateProductDetails.rating}
                                        name="rating"
                                        onChange={handleDetailOnChange}
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
                                        value={stateProductDetails.countInStock}
                                        name="countInStock"
                                        onChange={handleDetailOnChange}
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
                                        value={stateProductDetails.description}
                                        name="description"
                                        onChange={handleDetailOnChange}
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
                                        value={stateProductDetails.discount}
                                        name="discount"
                                        onChange={handleDetailOnChange}
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
                                        onChange={handleDetailImageChange}
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
                    </Modal.Body>
                    <Modal.Footer style={{ display: "flex", gap: "10px" }}>
                        <Button variant="secondary" onClick={handleCloseDrawer}>
                            Cancel
                        </Button>
                        {isPendingUpdate || isPendingUpdated ? (
                            <Loading />
                        ) : (
                            <Button variant="primary" onClick={onFinishUpdate}>
                                Update
                            </Button>
                        )}
                    </Modal.Footer>
                </DrawerComponent>
            </div>
            {/* Delete modal */}
            <>
                <div style={{ display: "block", position: "initial" }}>
                    <Modal show={showDelete} onHide={handleCloseDelete}>
                        <Modal.Body>
                            <p>
                                Are you sure to delele this? This action cannot
                                be undone.
                            </p>
                        </Modal.Body>

                        <Modal.Footer>
                            {isPendingDeleted ? (
                                <Loading />
                            ) : (
                                <Button
                                    variant="danger"
                                    onClick={onFinishDelete}>
                                    Delete
                                </Button>
                            )}
                            <Button
                                variant="secondary"
                                onClick={handleCloseDelete}>
                                Cancel
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </>
        </>
    );
};
