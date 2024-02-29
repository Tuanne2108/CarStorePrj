import React, { useState } from "react";
import { Button } from "react-bootstrap";
import TableComponent from "../Table";
import { PlusOutlined } from "@ant-design/icons";

export const UserManage = () => {
    return (
        <>
            <h3>User Management</h3>
            <div style={{ marginTop: "15px" }}>
                <Button
                    style={{
                        width: "150px",
                        height: "150px",
                        background: "#e0e0e0",
                        borderStyle: "dashed",
                    }}>
                    <PlusOutlined style={{ fontSize: "45px" }} />
                </Button>
            </div>
            <TableComponent />
        </>
    );
};
