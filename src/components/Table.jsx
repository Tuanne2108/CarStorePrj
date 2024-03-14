import React, { useState } from "react";
import { Table } from "antd";
import { Loading } from "./Loading";
import { Button } from "react-bootstrap";

const TableComponent = (props) => {
    const [rowSelectedKeys, setRowSelectedKeys] = useState([]);
    const {
        selectionType = "checkbox",
        isLoading = false,
        columns = [],
        data = [],
        handleDeleteMany,
    } = props;

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setRowSelectedKeys(selectedRowKeys);
        },
    };
    const handleDeleteAll = () => {
        handleDeleteMany(rowSelectedKeys);
    };

    return (
        <div>
            {rowSelectedKeys.length > 0 && (
                <div style={{ paddingTop: "10px" }}>
                    <Button
                        style={{ width: "30vh" }}
                        variant="danger"
                        onClick={handleDeleteAll}>
                        Delete
                    </Button>
                </div>
            )}
            <div
                style={{
                    marginTop: "10px",
                    border: "1px solid #c0c0c0",
                    width: "150vh",
                }}>
                {isLoading ? (
                    <Loading />
                ) : (
                    <Table
                        rowSelection={{
                            type: selectionType,
                            ...rowSelection,
                        }}
                        columns={columns}
                        dataSource={data}
                        {...props}
                    />
                )}
            </div>
        </div>
    );
};

export default TableComponent;
