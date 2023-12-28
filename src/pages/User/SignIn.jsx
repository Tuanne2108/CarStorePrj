import React from "react";
import { Button } from "react-bootstrap";
export const SignIn = () => {
    return (
        <div className="signIn">
            <div className="wrapper">
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
                        <div className="signUp">
                            <p>
                                Do not have an account?
                                <a href="/sign-up"> Sign Up</a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
