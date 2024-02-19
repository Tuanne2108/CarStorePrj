import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import { Default } from "./components/Default";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/header.scss";
import "boxicons";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { isJsonString } from "./utils";
import { jwtDecode } from "jwt-decode";
import * as UserService from "./services/UserService";
import { useDispatch } from "react-redux";
import { updateUser } from "./redux/slides/userSlice";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        fetchApi();
    }, []);
    const fetchApi = async () => {
        const res = await axios.get(
            `http://localhost:3001/product/get-all-product`
        );
        return res.data;
    };
    const query = useQuery({ queryKey: ["App"], queryFn: fetchApi });

    useEffect(() => {
        const { storageData, decoded } = handleDecoded();
        if (decoded?.id) {
            handleGetUserDetails(decoded?.id, storageData);
        }
    }, []);

    const handleDecoded = () => {
        let storageData = localStorage.getItem("access_token");
        let decoded = {};
        if (storageData && isJsonString(storageData)) {
            storageData = JSON.parse(storageData);
            decoded = jwtDecode(storageData);
        }
        return { decoded, storageData };
    };

    UserService.axiosJwt.interceptors.request.use(
        (config) => {
            return new Promise(async (resolve, reject) => {
                try {
                    let currentTime = new Date();
                    const { decoded } = handleDecoded();
                    if (decoded?.exp < currentTime.getTime() / 1000) {
                        const data = await UserService.refreshToken();
                        config.headers["token"] = `Bearer ${data?.access_token}`;
                    }
                    resolve(config);
                } catch (error) {
                    reject(error);
                }
            });
        },
        (error) => {
            return Promise.reject(error);
        }
    );
    

    const handleGetUserDetails = async (id, token) => {
        const res = await UserService.getUserDetails(id, token);
        dispatch(updateUser({ ...res?.data, access_token: token }));
    };

    return (
        <div>
            <Router>
                <Routes>
                    {routes.map((route) => {
                        const Page = route.page;
                        const Layout = route.showHeader ? Default : Fragment;
                        return (
                            <Route
                                key={{}}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </Router>
        </div>
    );
}

export default App;
