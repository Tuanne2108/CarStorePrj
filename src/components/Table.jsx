import React, { useMemo, useState } from "react";
import { Table, Modal } from "antd"; // Import Modal from antd
import { Loading } from "./Loading";
import { Button } from "react-bootstrap";
import { Excel } from "antd-table-saveas-excel";

const TableComponent = (props) => {
    const [rowSelectedKeys, setRowSelectedKeys] = useState([]);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); // State variable for delete confirmation modal

    const {
        selectionType = "checkbox",
        isLoading = false,
        columns = [],
        data: dataSource = [],
        handleDeleteMany,
    } = props;

    const newColumn = useMemo(() => {
        const arr = columns?.filter((column) => column.dataIndex !== "action");
        return arr;
    }, [columns]);
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setRowSelectedKeys(selectedRowKeys);
        },
    };
    const exportToExcel = () => {
        const excel = new Excel();
        excel
            .addSheet("sheet1")
            .addColumns(newColumn)
            .addDataSource(dataSource, {
                str2Percent: true,
            })
            .saveAs("Excel.xlsx");
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
            <div style={{ paddingTop: "10px" }}>
                <Button variant="success" onClick={exportToExcel}>
                    Export to Excel
                </Button>
            </div>
            {rowSelectedKeys.length > 0 && (
                <div>
                    <div style={{ paddingTop: "10px" }}>
                        <Button
                            style={{ width: "30vh" }}
                            variant="danger"
                            onClick={handleDeleteAll}>
                            Delete All
                        </Button>
                    </div>
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
                        dataSource={dataSource}
                        {...props}
                    />
                )}
            </div>

            {/* Delete confirmation modal */}
            <Modal
                title="Confirm Delete"
                onOk={handleConfirmDelete}
                onCancel={handleCancelDelete}>
                <p>Are you sure you want to delete these items?</p>
            </Modal>
        </div>
    );
};

export default TableComponent;
