import React, { useState } from "react";
import { Table, Empty, Modal, Form, Input, notification } from "antd";
import { RiExpandUpDownFill, RiDeleteBack2Line } from "react-icons/ri";

import filter from "../../../assets/Admin/filter.png";
import arrowdown from "../../../assets/Admin/arrowdown.png";
import reset from "../../../assets/Admin/reset.png";

const CustomEmpty = () => (
  <div className="flex flex-col items-center justify-center py-8">
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description={
        <div className="text-center">
          <p className="text-gray-500 text-base mb-2">
            No suppliers found
          </p>
          <p className="text-gray-400 text-sm">
            Please add a new supplier to get started.
          </p>
        </div>
      }
    />
  </div>
);

const SupplierManagement = () => {
  const [suppliers, setSuppliers] = useState([
    {
      id: 1,
      name: "Supplier One",
      email: "supplier1@example.com",
      phone: "0123456789",
      address: "789 Le Dai Hanh",
      representative: "Rep One",
      sector: "Construction",
      product_service: "Building Materials",
      market: "Local",
      tax: "123",
      year: 2022,
      scale: "Small",
      capacity: "100 tons",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 2,
      name: "Supplier Two",
      email: "supplier2@example.com",
      phone: "0312893818",
      address: "321 Han Thuyen",
      representative: "Rep Two",
      sector: "Food",
      product_service: "Catering Services",
      market: "Regional",
      tax: " 456",
      year: 2023,
      scale: "Medium",
      capacity: "200 tons",
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
    representative: "",
    sector: "",
    product_service: "",
    market: "",
    tax: "",
    year: "",
    scale: "",
    capacity: "",
  });
  const [editSupplierId, setEditSupplierId] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [modalTitle, setModalTitle] = useState("Create Supplier");


  const handleCreate = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      representative: "",
      sector: "",
      product_service: "",
      market: "",
      tax: "",
      year: "",
      scale: "",
      capacity: "",
    });
    setEditSupplierId(null);
    setModalTitle("Create Supplier");
    setIsModalOpen(true);
  };


  const handleSubmit = (values) => {
    const now = new Date();
    const updatedSuppliers = selectedRowKeys.length > 0
      ? suppliers.map((supplier) => {
          if (selectedRowKeys.includes(supplier.id)) {
            return {
              ...supplier,
              ...values,
              updated_at: now,
            };
          }
          return supplier;
        })
      : suppliers;

    setSuppliers(updatedSuppliers);
    setIsModalOpen(false);
    setEditSupplierId(null);
  };

  const handleEdit = () => {
    if (selectedRowKeys.length === 0) {
      notification.warning({
        message: 'No Suppliers Selected',
        description: 'Please select at least one supplier to edit.',
        placement: 'topRight',
      });
      return;
    }

    const supplierToEdit = suppliers.find((supplier) => supplier.id === selectedRowKeys[0]);
    setFormData({
      name: supplierToEdit.name,
      email: supplierToEdit.email,
      phone: supplierToEdit.phone,
      address: supplierToEdit.address,
      representative: supplierToEdit.representative,
      sector: supplierToEdit.sector,
      product_service: supplierToEdit.product_service,
      market: supplierToEdit.market,
      tax: supplierToEdit.tax,
      year: supplierToEdit.year,
      scale: supplierToEdit.scale,
      capacity: supplierToEdit.capacity,
    });
    setEditSupplierId(supplierToEdit.id);
    setModalTitle(`Edit Supplier (ID: ${supplierToEdit.id})`);
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    if (selectedRowKeys.length === 0) {
      notification.warning({
        message: 'No Suppliers Selected',
        description: 'Please select at least one supplier to delete.',
        placement: 'topRight',
      });
      return;
    }
    
    // Remove all selected suppliers
    setSuppliers(suppliers.filter((supplier) => !selectedRowKeys.includes(supplier.id)));
  };

  // Define your columns for the Ant Design table
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Address",
      dataIndex: "address",
      sorter: (a, b) => a.address.localeCompare(b.address),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      sorter: (a, b) => a.phone.localeCompare(b.phone),
    },
    {
      title: "Representative",
      dataIndex: "representative",
      sorter: (a, b) => a.representative.localeCompare(b.representative),
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: "Sector",
      dataIndex: "sector",
      sorter: (a, b) => a.sector.localeCompare(b.sector),
    },
    {
      title: "Product & Service",
      dataIndex: "product_service",
      sorter: (a, b) => a.product_service.localeCompare(b.product_service),
    },
    {
      title: "Market",
      dataIndex: "market",
      sorter: (a, b) => a.market.localeCompare(b.market),
    },
    {
      title: "Tax",
      dataIndex: "tax",
      sorter: (a, b) => a.tax.localeCompare(b.tax),
    },
    {
      title: "Year",
      dataIndex: "year",
      sorter: (a, b) => a.year - b.year,
    },
    {
      title: "Scale",
      dataIndex: "scale",
      sorter: (a, b) => a.scale.localeCompare(b.scale),
    },
    {
      title: "Capacity",
      dataIndex: "capacity",
      sorter: (a, b) => a.capacity.localeCompare(b.capacity),
    },
  ];

  // Transform suppliers data for table display
  const tableData = suppliers.map((supplier) => ({
    key: supplier.id,
    ...supplier,
  }));

  // Row selection configuration
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys) => {
      setSelectedRowKeys(selectedRowKeys);
    },
  };

 
  const handleRowsChange = (e) => {
    
  };

  return (
    <div className="flex h-screen font-nunito">
      <div className="flex-1 flex flex-col">
        <div className="p-6flex-grow">
          {/* Suppliers Summary and Actions */}
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mt-10 mb-5 text-gray-600 gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <span>Selected Suppliers: {selectedRowKeys.length}</span>
              <span className="text-gray-400">|</span>
              <span>Total Suppliers: {suppliers.length || 0}</span>
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
                Add Supplier
              </button>
              <button
                className="bg-white flex items-center text-[#8F96A9] border font-bold border-gray-300 px-2 py-1 sm:px-4 sm:py-2 rounded-md hover:bg-gray-200 text-sm sm:text-base"
                onClick={handleDelete} 
              >
                <RiDeleteBack2Line className="mr-1 sm:mr-2 text-sm sm:text-base" />
                Withdraw Supplier
              </button>
              <button
                className="bg-white text-[#8F96A9] border font-bold border-gray-300 px-2 py-1 sm:px-4 sm:py-2 rounded-md hover:bg-gray-200 text-sm sm:text-base"
                onClick={handleEdit} 
              >
                Edit Supplier Information
              </button>
            </div>
          </div>

          {/* Suppliers Table */}
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

          
          <Modal
            title={modalTitle}
            visible={isModalOpen}
            onOk={() => handleSubmit(formData)}
            onCancel={() => setIsModalOpen(false)}
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
                <Form.Item name="representative" label="Representative">
                  <Input
                    type="text"
                    value={formData.representative}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        representative: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded p-2"
                    required
                  />
                </Form.Item>
                <Form.Item name="sector" label="Sector">
                  <Input
                    type="text"
                    value={formData.sector}
                    onChange={(e) =>
                      setFormData({ ...formData, sector: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded p-2"
                    required
                  />
                </Form.Item>
                <Form.Item name="product_service" label="Product & Service">
                  <Input
                    type="text"
                    value={formData.product_service}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        product_service: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded p-2"
                    required
                  />
                </Form.Item>
                <Form.Item name="market" label="Market">
                  <Input
                    type="text"
                    value={formData.market}
                    onChange={(e) =>
                      setFormData({ ...formData, market: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded p-2"
                    required
                  />
                </Form.Item>
                <Form.Item name="tax" label="Tax">
                  <Input
                    type="text"
                    value={formData.tax}
                    onChange={(e) =>
                      setFormData({ ...formData, tax: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded p-2"
                    required
                  />
                </Form.Item>
                <Form.Item name="year" label="Year">
                  <Input
                    type="number"
                    value={formData.year}
                    onChange={(e) =>
                      setFormData({ ...formData, year: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded p-2"
                    required
                  />
                </Form.Item>
                <Form.Item name="scale" label="Scale">
                  <Input
                    type="text"
                    value={formData.scale}
                    onChange={(e) =>
                      setFormData({ ...formData, scale: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded p-2"
                    required
                  />
                </Form.Item>
                <Form.Item name="capacity" label="Capacity">
                  <Input
                    type="text"
                    value={formData.capacity}
                    onChange={(e) =>
                      setFormData({ ...formData, capacity: e.target.value })
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
                  {editSupplierId ? "Update Supplier" : "Create Supplier"}
                </button>
              </div>
            </Form>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default SupplierManagement;
