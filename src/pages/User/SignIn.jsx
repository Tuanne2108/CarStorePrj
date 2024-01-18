import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { MutationHook } from "../../hooks/mutationHook";
import * as UserService from "../../services/UserService";
import { Loading } from "../../components/Loading";

export const SignInForm = () => {
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

    const signInMutation = MutationHook((data) => UserService.signInUser(data));
    const { data, isLoading = false } = signInMutation;
    const handleSignIn = () => {
        signInMutation.mutate({
            email,
            password,
        });
    };
    return (
        <div className="signIn">
            <div className="wrapper">
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
                                value={email}
                                onChange={handleSignInEmailChange}
                                required
                            />
                            <label>Email</label>
                        </div>
                        <div className="input-box">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
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
                        {data?.status === "ERR" && (
                            <span style={{ color: "red" }}>
                                {data?.message}
                            </span>
                        )}
                        <Loading isLoading={isLoading}>
                            <div className="btn-sign-in">
                                <Button type="submit" onClick={handleSignIn}>
                                    Login
                                </Button>
                            </div>
                        </Loading>
                        <div className="login-register">
                            <span>Do not have an account?</span>
                            <a href="/sign-up" className="register-link">
                                Register
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignInForm;
