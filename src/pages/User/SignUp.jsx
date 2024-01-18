import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { MutationHook } from "../../hooks/mutationHook";
import * as UserService from "../../services/UserService";
import { Loading } from "../../components/Loading";

const SignUpForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
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

    const signUpMutation = MutationHook((data) => UserService.signUpUser(data));
    const { data, isLoading=false } = signUpMutation;

    const handleSignUp = () => {
        signUpMutation.mutate({
            name,
            email,
            password,
            confirmPassword,
        });
    };
    return (
        <div className="signUp">
            <div className="wrapper">
                <div className="form-box register">
                    <h2>Registration</h2>
                    <form action="#">
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
                                type={showPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={handleSignupConfirmPasswordChange}
                                required
                            />
                            <label>Confirm Password</label>
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
                                <input type="checkbox" />I agree to the terms
                                and conditions
                            </label>
                        </div>
                        {data?.status === "ERR" && (
                            <span style={{ color: "red", fontSize:'14px'}}>
                                {data?.message}
                            </span>
                        )}
                        <div className="btn-sign-in">
                            <Loading isLoading={isLoading}>
                                <Button type="submit" onClick={handleSignUp}>
                                    Register
                                </Button>
                            </Loading>
                        </div>
                        <div className="login-register">
                            <span>Already have an account?</span>
                            <a href="/sign-in" className="login-link">
                                Login
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUpForm;
