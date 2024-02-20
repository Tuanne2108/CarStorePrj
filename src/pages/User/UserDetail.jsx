import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import * as UserService from "../../services/UserService";
import { useMutationHooks } from "../../hooks/userMutationHook";
import * as message from "../../components/Message";
import { Loading } from "../../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/slides/userSlice";

export const UserDetail = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [email, setEmail] = useState(user?.email);
    const [name, setName] = useState(user?.name);
    const [phone, setPhone] = useState(user?.phone);
    const [address, setAddress] = useState(user?.address);
    const [avatar, setAvatar] = useState(user?.avatar);
    const updateUserMutation = useMutationHooks((data) => {
        const { id, access_token, ...rests } = data;
        UserService.updateUser(id, rests, access_token);
    });
    const { isPending, isSuccess, isError } = updateUserMutation;

    useEffect(() => {
        setEmail(user?.email);
        setName(user?.name);
        setPhone(user?.phone);
        setAddress(user?.address);
    }, [user]);

    useEffect(() => {
        if (isSuccess) {
            message.success();
            handleGetUserDetails(user?.id, user?.access_token);
        } else if (isError) {
            message.error();
        }
    }, [isSuccess, isError]);

    const handleGetUserDetails = async (id, token) => {
        const res = await UserService.getUserDetails(id, token);
        dispatch(updateUser({ ...res?.data, access_token: token }));
    };
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handleUsernameChange = (e) => {
        setName(e.target.value);
    };
    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    };
    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };
    const handleAvatarChange = (e) => {
        setAvatar(e.target.value);
    };
    const handleUpdate = () => {
        updateUserMutation.mutate({
            id: user?.id,
            email,
            name,
            phone,
            address,
            avatar,
            access_token: user?.access_token,
        });
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
                        value={name}
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
                    <Form.Control
                        type="file"
                        value={avatar}
                        onChange={handleAvatarChange}
                    />
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
