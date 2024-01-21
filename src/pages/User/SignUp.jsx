import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import * as UserService from "../../services/UserService";
import { Loading } from "../../components/Loading";
import { useMutationHooks } from "../../hooks/userMutationHook";
import { useNavigate } from "react-router-dom";
import * as message from "../../components/Message";

const SignUpForm = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };
    const handleToggleConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };
    const handleSignupUsernameChange = (e) => {
        setName(e.target.value);
    };

    const handleSignupEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSignupPasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSignupConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const mutation = useMutationHooks((newUser) =>
        UserService.signUpUser(newUser)
    );

    const { isPending } = mutation;
    console.log("mutation", mutation);
    const handleSignUp = async () => {
        if (!name || !email || !password || !confirmPassword) {
            message.error("Please fill in all required fields.");
            return;
        }
        try {
            const response = await mutation.mutateAsync({
                name,
                email,
                password,
                confirmPassword,
            });

            if (response.status === "ERR") {
                message.error(response.message);
            } else {
                message.success();
                navigate("/sign-in");
            }
        } catch (error) {
            message.error(
                "An error occurred during sign up. Please try again later."
            );
        }
    };

    return (
        <div className="signUp">
            <div className="wrapper">
                <div className="form-box register">
                    <h2>Registration</h2>
                        <div className="input-box">
                            <span>
                                <box-icon
                                    color="#cc6600"
                                    type="solid"
                                    name="user"></box-icon>
                            </span>
                            <input
                                value={name}
                                onChange={handleSignupUsernameChange}
                                type="text"
                                required
                            />
                            <label>Username</label>
                        </div>
                        <div className="input-box">
                            <span>
                                <box-icon
                                    type="solid"
                                    name="envelope"
                                    color="#cc6600"></box-icon>
                            </span>
                            <input
                                type="email"
                                value={email}
                                onChange={handleSignupEmailChange}
                                required
                            />
                            <label>Email</label>
                        </div>
                        <div className="input-box">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={handleSignupPasswordChange}
                                required
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
                        <div className="input-box">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={handleSignupConfirmPasswordChange}
                                required
                            />
                            <label>Confirm Password</label>
                            <span
                                className="toggle-password"
                                onClick={handleToggleConfirmPassword}
                                id="visible-toggle">
                                <FontAwesomeIcon
                                    icon={
                                        showConfirmPassword ? faEye : faEyeSlash
                                    }
                                />
                            </span>
                        </div>
                        <div className="remember-me">
                            <label>
                                <input type="checkbox" />I agree to the terms
                                and conditions
                            </label>
                        </div>
                        <div type="submit" className="btn-sign-in">
                            <Button onClick={handleSignUp}>
                                {isPending ? <Loading /> : "Register"}
                            </Button>
                        </div>
                        <div className="login-register">
                            <span>Already have an account?</span>
                            <a href="/sign-in" className="login-link">
                                Login
                            </a>
                        </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpForm;
