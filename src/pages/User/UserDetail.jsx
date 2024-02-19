import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import * as UserService from "../../services/UserService";
import { useMutationHooks } from "../../hooks/userMutationHook";
import * as message from "../../components/Message";
import { Loading } from "../../components/Loading";

export const UserDetail = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };
    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    };
    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };
    const updateUserMutation = useMutationHooks((data) =>
        UserService.signInUser(data)
    );
    const { isPending, isSuccess } = updateUserMutation;
    const handleUpdate = async () => {
        try {
            const response = await updateUserMutation.mutateAsync({
                email,
                username,
                phone,
                address,
            });
            if (isSuccess) {
                message.success();
            } else {
                message.error();
            }
        } catch (error) {}
    };
    return (
        <div className="user-info">
            <h3>User Detail</h3>
            <div className="input-form">
                <InputGroup className="mb-3">
                    <Form.Label htmlFor="username">Username</Form.Label>
                    <Form.Control
                        type="text"
                        id="username"
                        autoComplete="username"
                        value={username}
                        onChange={handleUsernameChange}
                        aria-describedby="basic-addon1"
                    />
                </InputGroup>
                <InputGroup className="mb-3">
                    <Form.Label htmlFor="email">Email</Form.Label>
                    <Form.Control
                        type="email"
                        id="email"
                        autoComplete="email"
                        value={email}
                        onChange={handleEmailChange}
                        aria-describedby="basic-addon1"
                    />
                </InputGroup>
                <InputGroup className="mb-3">
                    <Form.Label htmlFor="phone">Phone</Form.Label>
                    <Form.Control
                        type="tel"
                        id="phone"
                        autoComplete="phone"
                        pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                        value={phone}
                        onChange={handlePhoneChange}
                        aria-describedby="basic-addon1"
                    />
                </InputGroup>
                <InputGroup className="mb-3">
                    <Form.Label htmlFor="address">Address</Form.Label>
                    <Form.Control
                        type="text"
                        id="address"
                        autoComplete="address"
                        value={address}
                        onChange={handleAddressChange}
                        aria-describedby="basic-addon1"
                    />
                </InputGroup>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Avatar</Form.Label>
                    <Form.Control type="file" />
                </Form.Group>
                <div className="text-end">
                    <Button
                        style={{ width: "100px" }}
                        type="submit"
                        onClick={handleUpdate}>
                        {isPending ? <Loading /> : "Update"}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default UserDetail;
