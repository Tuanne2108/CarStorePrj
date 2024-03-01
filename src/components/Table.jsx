import React from "react";
import { Table } from "antd";
import { Loading } from "./Loading";

const TableComponent = (props) => {
    const {
        selectionType = "checkbox",
        isLoading = false,
        columns = [],
        data = [],
    } = props;

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(
                `selectedRowKeys: ${selectedRowKeys}`,
                "selectedRows: ",
                selectedRows
            );
        },
    };

    return (
        <div
            style={{
                marginTop: "15px",
                border: "1px solid #c0c0c0",
                width: "100vh",
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
                />
            )}
        </div>
    );
};

export default TableComponent;
