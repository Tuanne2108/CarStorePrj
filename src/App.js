import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import { Default } from "./components/Default";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/header.scss";
import "boxicons";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

function App() {
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

    console.log("query", query);
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
