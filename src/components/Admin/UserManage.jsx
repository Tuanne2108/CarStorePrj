import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import TableComponent from "../Table";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { getBase64 } from "../../utils";
import { useMutationHooks } from "../../hooks/userMutationHook";
import * as UserService from "../../services/UserService";
import { Loading } from "../Loading";
import * as message from "../../components/Message";
import { useQuery } from "@tanstack/react-query";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import DrawerComponent from "../Drawer";

export const UserManage = () => {
    const [showDelete, setShowDelete] = useState(false);
    const [rowSelected, setRowSelected] = useState("");
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const user = useSelector((state) => state?.user);
    const [isPendingUpdate, setIsPendingUpdate] = useState(false);
    const initUserDetailState = {
        name: "",
        phone: "",
        email: "",
        isAdmin: false,
        avatar: "",
    };
    const [stateUserDetails, setStateUserDetails] =
        useState(initUserDetailState);
    const [stateUser, setStateUser] = useState({
        name: "",
        phone: "",
        email: "",
        isAdmin: false,
        avatar: "",
    });
    const handleDetailOnChange = (e) => {
        setStateUserDetails({
            ...stateUserDetails,
            [e.target.name]: e.target.value,
        });
    };
    const handleDetailImageChange = async ({ fileList }) => {
        if (fileList.length > 0) {
            const file = fileList[0];
            if (!file.url && !file.preview) {
                file.preview = await getBase64(file.originFileObj);
            }
            setStateUserDetails({
                ...stateUserDetails,
                avatar: file.preview,
            });
        }
    };

    const updateMutation = useMutationHooks((data) => {
        const { id, token, ...rests } = data;

        const res = UserService.updateUser(id, token, { ...rests });
        return res;
    });
    const deleteMutation = useMutationHooks((data) => {
        const { id, token } = data;
        const res = UserService.deleteUser(id, token);
        return res;
    });
    const fetchUserAll = async () => {
        const res = await UserService.getAllUser();
        return res;
    };
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

    const onFinishUpdate = () => {
        updateMutation.mutate(
            {
                id: rowSelected,
                token: user?.access_token,
                ...stateUserDetails,
            },
            {
                onSettled: () => {
                    queryUser.refetch();
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
                    queryUser.refetch();
                },
            }
        );
        setShowDelete(false);
    };
    const handleCloseDrawer = () => {
        setIsOpenDrawer(false);
        setStateUserDetails(initUserDetailState);
        setRowSelected("");
    };
    const handleCloseDelete = () => {
        setShowDelete(false);
    };

    // Table
    const fetchUserDetails = async () => {
        const res = await UserService.getUserDetails(rowSelected);
        if (res?.data) {
            setStateUserDetails({
                name: res?.data?.name,
                email: res?.data?.email,
                phone: res?.data?.phone,
                price: res?.data?.price,
                isAdmin: res?.data?.isAdmin,
                avatar: res?.data?.avatar,
            });
        }
        setIsPendingUpdate(false);
    };
    useEffect(() => {
        setStateUser(stateUserDetails);
    }, [stateUserDetails]);
    useEffect(() => {
        if (rowSelected) {
            setIsPendingUpdate(true);
            fetchUserDetails(rowSelected);
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
    const queryUser = useQuery({
        queryKey: ["users"],
        queryFn: fetchUserAll,
    });
    const { isLoading: isLoadingUsers, data: users } = queryUser;

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
            width: "20%",
        },
        {
            title: "Email",
            dataIndex: "email",
        },
        {
            title: "Phone",
            dataIndex: "phone",
        },
        {
            title: "isAdmin",
            dataIndex: "isAdmin",
        },
        {
            title: "Created At",
            dataIndex: "createdAt",
        },
        {
            title: "Action",
            dataIndex: "action",
            render: renderAction,
        },
    ];
    const dataTable =
        users?.data?.length &&
        users?.data?.map((user) => {
            return {
                ...user,
                key: user._id,
                isAdmin: user.isAdmin ? "True" : "False",
            };
        });
    return (
        <>
            <h3>User Management</h3>
            {/* Table Component */}
            <div>
                <TableComponent
                    users={users?.data}
                    isLoading={isLoadingUsers}
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
            {/* Drawer */}
            <div>
                <DrawerComponent
                    forcerender="true"
                    title="User Details"
                    isOpen={isOpenDrawer}
                    onClose={() => handleCloseDrawer()}>
                    <Modal.Body style={{ paddingLeft: "50px" }}>
                        <Form>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm="4">
                                    Name
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your name"
                                        value={stateUserDetails.name}
                                        name="name"
                                        onChange={handleDetailOnChange}
                                        required
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group
                                as={Row}
                                className="mb-3"
                                controlId="email">
                                <Form.Label column sm="4">
                                    Email
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter your email"
                                        value={stateUserDetails.email}
                                        name="email"
                                        onChange={handleDetailOnChange}
                                        required
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group
                                as={Row}
                                className="mb-3"
                                controlId="password">
                                <Form.Label column sm="4">
                                    Password
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control
                                        type="number"
                                        placeholder="Enter password"
                                        value={stateUserDetails.password}
                                        name="password"
                                        onChange={handleDetailOnChange}
                                        required
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group
                                as={Row}
                                className="mb-3"
                                controlId="phone">
                                <Form.Label column sm="4">
                                    Phone
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control
                                        type="number"
                                        placeholder="Enter phone number"
                                        value={stateUserDetails.phone}
                                        name="phone"
                                        onChange={handleDetailOnChange}
                                        required
                                    />
                                </Col>
                            </Form.Group>
                            <Form>
                                <div key={"isAdmin"} className="mb-3">
                                    <Form.Check
                                        type="checkbox"
                                        id="isAdmin"
                                        label="Is admin?"
                                        value={stateUserDetails.isAdmin}
                                        onChange={handleDetailOnChange}
                                    />
                                </div>
                            </Form>
                            <Form.Group
                                as={Row}
                                className="mb-3"
                                controlId="avatar">
                                <Form.Label column sm="4">
                                    Avatar
                                </Form.Label>
                                <Col sm="8">
                                    <Upload
                                        onChange={handleDetailImageChange}
                                        maxCount={1}>
                                        <Button icon={<UploadOutlined />}>
                                            Upload file
                                        </Button>
                                    </Upload>
                                    {stateUserDetails?.avatar && (
                                        <img
                                            src={stateUserDetails?.avatar}
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
            <div style={{ display: "block", position: "initial" }}>
                <Modal show={showDelete} onHide={handleCloseDelete}>
                    <Modal.Body>
                        <p>
                            Are you sure to delele this? This action cannot be
                            undone.
                        </p>
                    </Modal.Body>

                    <Modal.Footer>
                        {isPendingDeleted ? (
                            <Loading />
                        ) : (
                            <Button variant="danger" onClick={onFinishDelete}>
                                Delete
                            </Button>
                        )}
                        <Button variant="secondary" onClick={handleCloseDelete}>
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
};
