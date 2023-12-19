import React from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

export const Header = () => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid className="navbar">
                <Navbar.Brand href="/">Navbar scroll</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto mb-3 mb-lg-0"
                        style={{ maxHeight: "100px" }}
                        navbarScroll>
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
                    <Form className="d-flex justify-content-center">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            style={{ width: "500px" }}  
                        />
                        <a href=""><box-icon name='search' size='md'></box-icon></a>
                    </Form>
                    <Nav
                        className="ms-auto mb-2 mb-lg-0"
                        style={{ maxHeight: "100px" }}
                        navbarScroll>
                        <Nav.Link href="/order"><i class='bx bx-child'></i>My Cart</Nav.Link>
                        <Nav.Link href="/user">User</Nav.Link>
                        <Nav.Link href="#">Language</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
