import React, { useState } from "react";
import { UserOutlined, AppstoreOutlined } from "@ant-design/icons";
import { Menu, Switch } from "antd";
import { Header } from "../../components/Header";
import { UserManage } from "../../components/Admin/UserManage";
import { ProductManage } from "../../components/Admin/ProductManage";
function getItem(label, key, icon) {
    return {
        key,
        icon,
        label,
    };
}
const items = [
    getItem("User", "user", <UserOutlined />, []),
    getItem("Product", "product", <AppstoreOutlined />, []),
];
const renderPage = (key) => {
    switch (key) {
        case "user":
            return <UserManage />;

        case "product":
            return <ProductManage />;

        default:
            return <></>;
    }
};

export const AdminPage = () => {
    const [keySelected, setKeySelected] = useState("");
    const handleOptionClicked = ({ key }) => {
        setKeySelected(key);
    };
    return (
        <>
            <Header isHidden />
            <div style={{ display: "flex" }}>
                <Menu
                    style={{
                        width: 256,
                        height: "100vh",
                        boxShadow: "1px 1px 1px #cc6600",
                    }}
                    mode="inline"
                    onClick={handleOptionClicked}
                    theme={"dark"}
                    items={items}
                />
                <div style={{ padding: "20px" }}>{renderPage(keySelected)}</div>
            </div>
        </>
    );
};
