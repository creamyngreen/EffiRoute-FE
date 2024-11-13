import React, { useState } from "react";
import { Table, Empty } from "antd";
import { RiExpandUpDownFill } from "react-icons/ri";
const CustomEmpty = () => (
  <div className="flex flex-col items-center justify-center py-8">
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description={
        <div className="text-center">
          <p className="text-gray-500 text-base mb-2">No audit logs found</p>
          <p className="text-gray-400 text-sm">Please check back later.</p>
        </div>
      }
    />
  </div>
);

const AuditLog = () => {
  const [logs, setLogs] = useState([

    {
      action: "Create",
      userId: "User1",
      affectedEntity: "Supplier",
      entityId: 1,
      timestamp: new Date().toLocaleString(),
    },
    {
      action: "Update",
      userId: "User2",
      affectedEntity: "Supplier",
      entityId: 2,
      timestamp: new Date().toLocaleString(),
    },
  ]);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [pageSize, setPageSize] = useState(10);

  const columns = [
    {
      title: "Action",
      dataIndex: "action",
      sorter: (a, b) => a.action.localeCompare(b.action),
    },
    {
      title: "User ID",
      dataIndex: "userId",
      sorter: (a, b) => a.userId.localeCompare(b.userId),
    },
    {
      title: "Affected Entity",
      dataIndex: "affectedEntity",
      sorter: (a, b) => a.affectedEntity.localeCompare(b.affectedEntity),
    },
    {
      title: "Entity ID",
      dataIndex: "entityId",
      sorter: (a, b) => a.entityId - b.entityId,
    },
    {
      title: "Time Stamp",
      dataIndex: "timestamp",
      sorter: (a, b) => new Date(a.timestamp) - new Date(b.timestamp),
    },
  ];

  const tableData = logs.map((log, index) => ({
    key: index,
    ...log,
  }));

  const handleRowsChange = (e) => {
    setPageSize(Number(e.target.value));
  };

  return (
    <div className="flex h-screen font-nunito">
      <div className="flex-1 flex flex-col">
        <div className="p-6 flex-grow">
          {/* Audit Logs Summary */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <span>Selected Audit Logs: {selectedRowKeys.length}</span>
            <span className="text-gray-400">|</span>
            <span>Total Audit Logs: {logs.length || 0}</span>
            <div className="relative inline-flex items-center">
              <select
                className="border border-gray-300 text-sm px-4 py-2 pr-8 rounded-md focus:outline-none appearance-none"
                onChange={handleRowsChange}
              >
                <option value={10}>View 10 at a time</option>
                <option value={20}>View 20 at a time</option>
                <option value={30}>View 30 at a time</option>
                <option value={40}>View 40 at a time</option>
                <option value={50}>View 50 at a time</option>
              </select>
              <RiExpandUpDownFill className="absolute right-2 pointer-events-none text-gray-500" />
            </div>
          </div>
          {/* Audit Logs Table */}
          <div className="overflow-x-auto mb-6">
            <Table
              columns={columns}
              dataSource={tableData}
              pagination={{ pageSize: pageSize }}
              rowKey="key"
              rowSelection={{
                selectedRowKeys,
                onChange: (selectedRowKeys) => {
                  setSelectedRowKeys(selectedRowKeys);
                },
              }}
              locale={{ emptyText: <CustomEmpty /> }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditLog;
