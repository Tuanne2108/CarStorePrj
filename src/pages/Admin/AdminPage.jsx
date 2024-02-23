import React, { useState } from "react";
import { UserOutlined, AppstoreOutlined } from "@ant-design/icons";
import { Divider, Menu, Switch } from "antd";
import { Header } from "../../components/Header";
function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        label,
        children,
    };
}
const items = [
    getItem("User", "sub1", <UserOutlined />, [
        getItem("Option 2", "1"),
        getItem("Option 3", "2"),
    ]),
    getItem("Product", "sub2", <AppstoreOutlined />, [
        getItem("Option 7", "3"),
        getItem("Option 8", "4"),
    ]),
];

export const AdminPage = () => {
    const rootSubmenuKeys = ["user", "product"];
    const [openKeys, setOpenKeys] = useState(["user", "product"]);
    const onOpenChange = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };
    const [keySelected, setKeySelected] = useState("");
    const [theme, setTheme] = useState("light");
    const changeTheme = (value) => {
        setTheme(value ? "dark" : "light");
    };
    const handleOptionClicked = ({ key }) => {
        setKeySelected(key);
    };
    return (
        <>
        <Header isHidden/>
            <Switch onChange={changeTheme} /> Dark mode
            <br />
            <br />
            <div style={{ display: "flex" }}>
                <Menu
                    style={{
                        width: 256,
                    }}
                    mode="inline"
                    onClick={handleOptionClicked}
                    onOpenChange={onOpenChange}
                    theme={theme}
                    items={items}
                />
                <div>{keySelected === "1" && <span>Hello</span>}</div>
            </div>
        </>
    );
};
