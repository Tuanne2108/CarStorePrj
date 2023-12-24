import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import { Default } from "./components/Default";
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/header.scss'
import 'boxicons'


function App() {
    return (
        <div>
            <Router>
                <Routes>
                    {routes.map((route) => {
                        const Page = route.page;
                        const Layout = route.showHeader ? Default : Fragment
                        return (
                            <Route
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
