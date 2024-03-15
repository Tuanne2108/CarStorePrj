import React, { useState } from "react";
import { Table, Modal } from "antd"; // Import Modal from antd
import { Loading } from "./Loading";
import { Button } from "react-bootstrap";

const TableComponent = (props) => {
    const [rowSelectedKeys, setRowSelectedKeys] = useState([]);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); // State variable for delete confirmation modal

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
        setShowDeleteConfirmation(true); 
    };

    const handleConfirmDelete = () => {
        handleDeleteMany(rowSelectedKeys);
        setShowDeleteConfirmation(false); 
    };

    const handleCancelDelete = () => {
        setShowDeleteConfirmation(false); 
    };

    return (
        <div>
            {rowSelectedKeys.length > 0 && (
                <div>
                    {isLoading ? (
                        <Loading />
                    ) : (
                        <div style={{ paddingTop: "10px" }}>
                            <Button
                                style={{ width: "30vh" }}
                                variant="danger"
                                onClick={handleDeleteAll}>
                                Delete All 
                            </Button>
                        </div>
                    )}
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

            {/* Delete confirmation modal */}
            <Modal
                title="Confirm Delete"
                visible={showDeleteConfirmation}
                onOk={handleConfirmDelete}
                onCancel={handleCancelDelete}
            >
                <p>Are you sure you want to delete these items?</p>
            </Modal>
        </div>
    );
};

export default TableComponent;
