import React, { useState } from "react";
import { Table, Empty, Modal, Form, Input, notification } from "antd";
import { RiExpandUpDownFill, RiDeleteBack2Line } from "react-icons/ri";


const CustomEmpty = () => (
  <div className="flex flex-col items-center justify-center py-8">
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description={
        <div className="text-center">
          <p className="text-gray-500 text-base mb-2">
            No accounts found
          </p>
          <p className="text-gray-400 text-sm">
            Please add a new account to get started.
          </p>
        </div>
      }
    />
  </div>
);

const AccountManagement = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "0123456789",
      address: "123 Main St",
      role: "Manager",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "0312893818",
      address: "456 Elm St",
      role: "Planner",
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    role: "Manager",
  });
  const [editUserId, setEditUserId] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [modalTitle, setModalTitle] = useState("Create Account");

  const handleCreate = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      role: "Manager",
    });
    setEditUserId(null);
    setIsModalOpen(true);
  };

  const handleSubmit = (values) => {
    const now = new Date();
    const newUser = {
      id: editUserId || Date.now(),
      ...values,
      created_at: editUserId
        ? users.find((user) => user.id === editUserId).created_at
        : now,
      updated_at: now,
    };

    if (editUserId) {
      setUsers(users.map((user) => (user.id === editUserId ? newUser : user)));
    } else {
      setUsers([...users, newUser]);
    }

    setIsModalOpen(false);
    setEditUserId(null);
  };

  const handleEdit = () => {
    if (selectedRowKeys.length === 1) {
      const user = users.find((user) => user.id === selectedRowKeys[0]);
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      });
      setEditUserId(user.id);
      setIsModalOpen(true);
    } else {
      notification.warning({
        message: "Edit Multiple Accounts",
        description: "Please select only one account to edit.",
      });
    }
  };

  const handleDelete = () => {
    if (selectedRowKeys.length === 0) {
        notification.warning({
            message: "No Accounts Selected",
            description: "Please select at least one account to withdraw.",
        });
        return; // Exit the function if no rows are selected
    }
    
    // Delete multiple users based on selectedRowKeys
    setUsers(users.filter((user) => !selectedRowKeys.includes(user.id)));
    setSelectedRowKeys([]); // Clear selection after deletion
  };

  const handleRowsChange = (e) => {
    const value = e.target.value;
    console.log(`Rows to display: ${value}`);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      sorter: (a, b) => a.phone.localeCompare(b.phone),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      sorter: (a, b) => a.address.localeCompare(b.address),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
  ];

  const tableData = users.map((user) => ({
    key: user.id,
    ...user,
  }));

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys) => {
      setSelectedRowKeys(selectedRowKeys);
    },
  };

  return (
    <div className="flex h-screen font-nunito">
      <div className="flex-1 flex flex-col">
        <div className="p-6 flex-grow">
          {/* Accounts Summary and Actions */}
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mt-10 mb-5 text-gray-600 gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <span>Selected Accounts: {selectedRowKeys.length}</span>
              <span className="text-gray-400">|</span>
              <span>Total Accounts: {users.length || 0}</span>
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

            <div className="flex flex-wrap gap-2">
              <button
                className="flex-1 sm:flex-none bg-orange-50 text-primary font-bold px-2 py-1 sm:px-4 sm:py-2 rounded-md hover:bg-primary hover:text-white text-sm sm:text-base"
                onClick={handleCreate}
              >
                Add Account
              </button>
              <button
                className="bg-white flex items-center text-[#8F96A9] border font-bold border-gray-300 px-2 py-1 sm:px-4 sm:py-2 rounded-md hover:bg-gray-200 text-sm sm:text-base"
                onClick={handleDelete}
              >
                <RiDeleteBack2Line className="mr-1 sm:mr-2 text-sm sm:text-base" />
                Withdraw Account
              </button>
              <button
                className="bg-white flex items-center text-[#8F96A9] border font-bold border-gray-300 px-2 py-1 sm:px-4 sm:py-2 rounded-md hover:bg-gray-200 text-sm sm:text-base"
                onClick={handleEdit}
              >
                Edit Account Information
              </button>
            </div>
          </div>

          {/* Accounts Table */}
          <div className="overflow-x-auto mb-6">
            <Table
              columns={columns}
              dataSource={tableData}
              pagination={{ pageSize: 10 }}
              rowKey="id"
              rowSelection={rowSelection}
              locale={{ emptyText: <CustomEmpty /> }}
            />
          </div>

          {/* Ant Design Modal for creating and editing accounts */}
          <Modal
            title={modalTitle}
            visible={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            footer={null}
          >
            <Form
              layout="vertical"
              initialValues={formData}
              onFinish={handleSubmit}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Form.Item name="name" label="Name">
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded p-2"
                    required
                  />
                </Form.Item>
                <Form.Item name="email" label="Email">
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded p-2"
                    required
                  />
                </Form.Item>
                <Form.Item name="phone" label="Phone">
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded p-2"
                    required
                  />
                </Form.Item>
                <Form.Item name="address" label="Address">
                  <Input
                    type="text"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded p-2"
                    required
                  />
                </Form.Item>
                <Form.Item name="role" label="Role">
                  <Input
                    type="text"
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded p-2"
                    required
                  />
                </Form.Item>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 text-gray-700 p-2 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded"
                >
                  {editUserId ? "Update Account" : "Create Account"}
                </button>
              </div>
            </Form>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default AccountManagement;
