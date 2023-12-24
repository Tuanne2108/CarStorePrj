import React from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import logo from "../assets/images/brandLogo.svg"

export const Header = () => {
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
                            placeholder="Search product..."
                            aria-label="Search products"
                            aria-describedby="basic-addon2"
                        />
                        <Button variant="outline-secondary" id="button-addon2">
                            <a href="">
                                <box-icon name="search" style={{marginTop: 5 + 'px'}}></box-icon>
                            </a>
                        </Button>
                    </InputGroup>
                    <Nav
                        className="ms-auto mb-2 mb-lg-0"
                        style={{ maxHeight: "100px" }}
                        navbarScroll>
                        <div className="myCart">
                            <box-icon type="solid" name="cart"></box-icon>
                            <div>
                                <Nav.Link href="/order">My Cart</Nav.Link>
                            </div>
                        </div>
                        <div className="user">
                            <box-icon type="solid" name="user"></box-icon>
                            <Nav.Link href="/user">
                                <span>Login/Logout</span>
                                <div>
                                    <span>Account</span>
                                </div>
                            </Nav.Link>
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
