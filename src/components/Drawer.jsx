import React, { useState } from "react";
import { Drawer } from "antd";
const DrawerComponent = ({
    title = "Drawer",
    placement = "top",
    isOpen = false,
    children,
    ...rests
}) => {
    return (
        <>
            <Drawer
                title={title}
                placement={placement}
                height={"90vh"}
                open={isOpen}
                {...rests}>
                {children}
            </Drawer>
        </>
    );
};
export default DrawerComponent;
