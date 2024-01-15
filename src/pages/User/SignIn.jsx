import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
export const SignIn = () => {
    const [wrapperActive, setWrapperActive] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [signInEmail, setSignInEmail] = useState("");
    const [signInPassword, setSignInPassword] = useState("");

    const [signUpUsername, setSignUpUsername] = useState("");
    const [signUpEmail, setSignUpEmail] = useState("");
    const [signUpPassword, setSignUpPassword] = useState("");
    const [signUpConfirmPassword, setSignUpConfirmPassword] = useState("");

    const handleSignInEmailChange = (e) => {
        setSignInEmail(e.target.value);
    };

    const handleSignInPasswordChange = (e) => {
        setSignInPassword(e.target.value);
    };

    const handleSignupUsernameChange = (e) => {
        setSignUpUsername(e.target.value);
    };

    const handleSignupEmailChange = (e) => {
        setSignUpEmail(e.target.value);
    };

    const handleSignupPasswordChange = (e) => {
        setSignUpPassword(e.target.value);
    };

    const handleSignupConfirmPasswordChange = (e) => {
        setSignUpConfirmPassword(e.target.value);
    };
    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };
    const handleSignIn = () => {
        console.log("login", signInEmail, signInPassword);
    };
    const handleSignUp = () => {
        if(signUpPassword !== signUpConfirmPassword){
            alert('The password should be the same')
        }
    };

    useEffect(() => {
        const wrapper = document.querySelector(".wrapper");
        const loginLink = document.querySelector(".login-link");
        const registerLink = document.querySelector(".register-link");
        const handleRegisterClick = () => {
            setWrapperActive(true);
        };

        const handleLoginClick = () => {
            setWrapperActive(false);
        };

        registerLink.addEventListener("click", handleRegisterClick);
        loginLink.addEventListener("click", handleLoginClick);

        // Cleanup event listeners when the component is unmounted
        return () => {
            registerLink.removeEventListener("click", handleRegisterClick);
            loginLink.removeEventListener("click", handleLoginClick);
        };
    }, []);
    return (
        <div className="signIn">
            <div className={`wrapper ${wrapperActive ? "active" : ""}`}>
                <div className="form-box login">
                    <h2>Login</h2>
                    <form action="#">
                        <div className="input-box">
                            <span>
                                <box-icon
                                    color="#cc6600"
                                    type="solid"
                                    name="envelope"></box-icon>
                            </span>
                            <input
                                type="email"
                                value={signInEmail}
                                onChange={handleSignInEmailChange}
                                required
                            />
                            <label>Email</label>
                        </div>
                        <div className="input-box">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={signInPassword}
                                onChange={handleSignInPasswordChange}
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
                        <div className="remember-me">
                            <label>
                                <input type="checkbox" />
                                Remember me
                            </label>
                            <a href="#">Forgot Password?</a>
                        </div>
                        <div className="btn-sign-in">
                            <Button type="submit" onClick={handleSignIn}>
                                Login
                            </Button>
                        </div>
                        <div className="login-register">
                            <p>
                                Do not have an account?
                                <a href="#" className="register-link">
                                    {" "}
                                    Register
                                </a>
                            </p>
                        </div>
                    </form>
                </div>
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
                                value={signUpUsername}
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
                                value={signUpEmail}
                                onChange={handleSignupEmailChange}
                                required
                            />
                            <label>Email</label>
                        </div>
                        <div className="input-box">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={signUpPassword}
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
                                value={signUpConfirmPassword}
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
                        <div className="btn-sign-in">
                            <Button type="submit" onClick={handleSignUp}>
                                Register
                            </Button>
                        </div>
                        <div className="login-register">
                            <p>
                                Already have an account?
                                <a href="#" className="login-link">
                                    {" "}
                                    Login
                                </a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
