import { Table } from "antd";
import React, { useRef, useState } from "react";
import Loading from "../LoadingComponent/Loading";
import { DownloadTableExcel } from "react-export-table-to-excel";

const TableComponent = (props) => {
  const tableRef = useRef(null);
  const {
    selectionType = "checkbox",
    data = [],
    isLoading = false,
    columns = [],
    handleDeleteMany,
  } = props;
  const [rowSelectedKeys, setRowSelectedKeys] = useState([]);
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setRowSelectedKeys(selectedRowKeys);
    },
    // getCheckboxProps: (record) => ({
    //   disabled: record.name === "Disabled User",
    //   name: record.name,
    // }),
  };
  const handleDeleteAll = () => {
    handleDeleteMany(rowSelectedKeys);
  };
  return (
    <Loading isPending={isLoading}>
      {rowSelectedKeys.length > 0 && (
        <div
          style={{
            cursor: "pointer",
            marginTop: "5px",
            backgroundColor: "red",
            width: "99px",
            borderRadius: "4px",
            color: "#ffffff",
            height: "30px",
            alignContent: "center",
            textAlign: "center",
          }}
          onClick={handleDeleteAll}
        >
          {/* <Dropdown
          menu={{
            items,
          }}
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              Hover me
              <DownOutlined />
            </Space>
          </a>
        </Dropdown> */}
          Xóa tất cả
        </div>
      )}
      <Table
        ref={tableRef}
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
        {...props}
      />
    </Loading>
  );
};

export default TableComponent;
