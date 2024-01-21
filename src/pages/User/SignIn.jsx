import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import * as UserService from "../../services/UserService";
import { useMutationHooks } from "../../hooks/userMutationHook";
import { Loading } from "../../components/Loading";
import * as message from "../../components/Message";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from 'react-redux'
import { updateUser } from "../../redux/slides/userSlice";

export const SignInForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };
    const handleSignInEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSignInPasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const signInMutation = useMutationHooks((data) =>
        UserService.signInUser(data)
    );
    const { isPending } = signInMutation;

    const handleSignIn = async () => {
        try {
            const response = await signInMutation.mutateAsync({
                email,
                password,
            });

            if (response.status === "ERR") {
                message.error(response.message);
            } else {
                message.success();
                navigate("/");
                localStorage.setItem("access_token", response?.access_token);
                const decoded = jwtDecode(response?.access_token);
                console.log("decode", decoded);
                if (decoded?.id) {
                    handleGetUserDetails(decoded?.id, response?.access_token);
                }
            }
        } catch (error) {
            message.error(
                "An error occurred during signup. Please try again later."
            );
        }
    };
    const handleGetUserDetails = async (id, token) => {
        const res = await UserService.getUserDetails(id, token);
        dispatch(updateUser({...res?.data, access_token:token}))

    };
    return (
        <div className="signIn">
            <div className="wrapper">
                <div className="form-box login">
                    <h2>Login</h2>
                    <div className="input-box">
                        <span>
                            <box-icon
                                color="#cc6600"
                                type="solid"
                                name="envelope"></box-icon>
                        </span>
                        <input
                            type="email"
                            value={email}
                            onChange={handleSignInEmailChange}
                        />
                        <label>Email</label>
                    </div>
                    <div className="input-box">
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={handleSignInPasswordChange}
                        />
                        <label>Password</label>
                        <span
                            className="toggle-password"
                            onClick={handleTogglePassword}
                            id="visible-toggle">
                            <FontAwesomeIcon
                                icon={showPassword ? faEye : faEyeSlash}
                            />
                        </span>
                    </div>
                    <div className="remember-me">
                        <label>
                            <input type="checkbox" />
                            Remember me
                        </label>
                        <a href="#">Forgot Password?</a>
                    </div>
                    <div className="btn-sign-in">
                        <Button type="submit" onClick={handleSignIn}>
                            {isPending ? <Loading /> : "Login"}
                        </Button>
                    </div>
                    <div className="login-register">
                        <span>Do not have an account?</span>
                        <a href="/sign-up" className="register-link">
                            Register
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignInForm;
