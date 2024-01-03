import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
export const SignIn = () => {
    const [wrapperActive, setWrapperActive] = useState(false);

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
                                    type="solid"
                                    name="envelope"></box-icon>
                            </span>
                            <input type="email" required />
                            <label>Email</label>
                        </div>
                        <div className="input-box">
                            <span>
                                <box-icon type="solid" name="lock"></box-icon>
                            </span>
                            <input type="password" required />
                            <label>Password</label>
                        </div>
                        <div className="remember-me">
                            <label>
                                <input type="checkbox" />
                                Remember me
                            </label>
                            <a href="#">Forgot Password?</a>
                        </div>
                        <div className="btn-sign-in">
                            <Button type="submit">Login</Button>
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
                                <box-icon type="solid" name="user"></box-icon>
                            </span>
                            <input type="text" required />
                            <label>Username</label>
                        </div>
                        <div className="input-box">
                            <span>
                                <box-icon
                                    type="solid"
                                    name="envelope"></box-icon>
                            </span>
                            <input type="email" required />
                            <label>Email</label>
                        </div>
                        <div className="input-box">
                            <span>
                                <box-icon type="solid" name="lock"></box-icon>
                            </span>
                            <input type="password" required />
                            <label>Password</label>
                        </div>
                        <div className="remember-me">
                            <label>
                                <input type="checkbox" />I agree to the terms
                                and conditions
                            </label>
                        </div>
                        <div className="btn-sign-in">
                            <Button type="submit">Register</Button>
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
