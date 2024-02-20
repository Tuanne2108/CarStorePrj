import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import logo from "../assets/images/brandLogo.svg";
import { Badge } from "antd";
import { useSelector } from "react-redux";
import { Popover, Space } from "antd";
import * as UserService from "../services/UserService";
import { useDispatch } from "react-redux";
import { resetUser } from "../redux/slides/userSlice";
import { useNavigate } from "react-router-dom";

export const Header = () => {
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [username, setUsername] = useState('')
    const dispatch = useDispatch();
    const handleLogout = async () => {
        await UserService.logOutUser();
        dispatch(resetUser());
    };
    const handleUserInfo = async () => {
        navigate("/user-detail");
    };
    useEffect(()=>{
        setUsername(user?.name)
    }, [user?.name])
    const content = (
        <div>
            <p className="popover-option" onClick={handleLogout}>
                Log out
            </p>
            <p className="popover-option" onClick={handleUserInfo}>
                User Information
            </p>
        </div>
    );
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid className="navbar">
                <Navbar.Brand href="/">
                    <img className="logoBrand" src={logo} alt="logo" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto mb-2 mb-lg-0"
                        style={{ maxHeight: "50px" }}
                        navbarScroll
                        id="brandDropdown">
                        <box-icon type="solid" name="widget"></box-icon>
                        <NavDropdown title="Brand" id="navbarScrollingDropdown">
                            <NavDropdown.Item href="#action3">
                                Action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action4">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action5">
                                Something else here
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <InputGroup className="mb">
                        <Form.Control
                            id="search"
                            placeholder="Search product..."
                            aria-label="Search products"
                            aria-describedby="basic-addon2"
                        />
                        <Button variant="outline-secondary" id="button-addon2">
                            <a href="">
                                <box-icon
                                    name="search"
                                    style={{ marginTop: 5 + "px" }}></box-icon>
                            </a>
                        </Button>
                    </InputGroup>
                    <Nav
                        className="ms-auto mb-2 mb-lg-0"
                        style={{ maxHeight: "100px" }}
                        navbarScroll>
                        <div className="myCart">
                            <a href="/order">
                                <Badge count={5} size="small">
                                    <box-icon
                                        type="solid"
                                        name="cart"></box-icon>
                                </Badge>
                                <div>My Cart</div>
                            </a>
                        </div>
                        <div className="user">
                            {user?.name ? (
                                <Space wrap>
                                    <Popover content={content} trigger="click">
                                        <div
                                            style={{
                                                cursor: "pointer",
                                                display: "flex",
                                                gap: "5px",
                                            }}>
                                            <box-icon
                                                type="solid"
                                                name="user-circle"></box-icon>
                                            <span>{user.name}</span>
                                        </div>
                                    </Popover>
                                </Space>
                            ) : (
                                <Nav.Link
                                    href="/sign-in"
                                    style={{ display: "flex", gap: "5px" }}>
                                    <box-icon
                                        type="solid"
                                        name="user"></box-icon>
                                    <span>Sign In/Sign Up</span>
                                </Nav.Link>
                            )}
                        </div>
                        <div className="language">
                            <Nav.Link href="#">
                                <box-icon name="globe"></box-icon>
                            </Nav.Link>
                        </div>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
