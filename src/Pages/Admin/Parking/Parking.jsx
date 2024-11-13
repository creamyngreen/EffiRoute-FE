import React, { useState } from "react";
import { Table, Empty, Button, notification, Modal, Form, Input } from "antd";
import { RiDeleteBack2Line, RiExpandUpDownFill } from "react-icons/ri";
const CustomEmpty = () => (
  <div className="flex flex-col items-center justify-center py-8">
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description={
        <div className="text-center">
          <p className="text-gray-500 text-base mb-2">
            No parking records found
          </p>
          <p className="text-gray-400 text-sm">
            Please add a new parking record to get started.
          </p>
        </div>
      }
    />
  </div>
);

const Parking = () => {
  const [parkingRecords, setParkingRecords] = useState([
    {
      id: 1,
      name: "Parking Lot A",
      address: "123 Main St",
    },
    {
      id: 2,
      name: "Parking Lot B",
      address: "456 Elm St",
    },
  ]);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", address: "" });
  const [editParkingId, setEditParkingId] = useState(null);
  const [modalTitle, setModalTitle] = useState("Add Parking");


  const columns = [
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
  ];


  const tableData = parkingRecords.map((record) => ({
    key: record.id,
    ...record,
  }));

  const handleCreate = () => {
    setFormData({ name: "", address: "" });
    setEditParkingId(null);
    setModalTitle("Add Parking");
    setIsModalOpen(true);
  };

  const handleSubmit = (values) => {
    if (editParkingId) {
     
      setParkingRecords(parkingRecords.map(record => 
        record.id === editParkingId ? { ...record, ...values } : record
      ));
    } else {
  
      const newRecord = { id: Date.now(), ...values };
      setParkingRecords([...parkingRecords, newRecord]);
    }
    setIsModalOpen(false);
    setEditParkingId(null);
  };

  const handleEdit = () => {
    if (selectedRowKeys.length === 0) {
      notification.warning({
        message: 'No Parking Records Selected',
        description: 'Please select at least one parking record to edit.',
        placement: 'topRight',
      });
      return;
    }

    const parkingToEdit = parkingRecords.find(record => record.id === selectedRowKeys[0]);
    setFormData({ name: parkingToEdit.name, address: parkingToEdit.address });
    setEditParkingId(parkingToEdit.id);
    setModalTitle(`Edit Parking (ID: ${parkingToEdit.id})`);
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    if (selectedRowKeys.length === 0) {
      notification.warning({
        message: 'No Parking Records Selected',
        description: 'Please select at least one parking record to delete.',
        placement: 'topRight',
      });
      return;
    }
    // Logic to delete selected parking records
    setParkingRecords(parkingRecords.filter((record) => !selectedRowKeys.includes(record.id)));
    setSelectedRowKeys([]);
  };

  const handleRowsChange = (value) => {

  };

  return (
    <div className="flex h-screen font-nunito">
      <div className="flex-1 flex flex-col">
        <div className="p-6 flex-grow">
          {/* Parking Summary and Actions */}
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mt-10 mb-5 text-gray-600 gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <span>Selected Parking: {selectedRowKeys.length}</span>
              <span className="text-gray-400">|</span>
              <span>Total Parking: {parkingRecords.length || 0}</span>
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
                Add Parking
              </button>
              <button
                className="bg-white flex items-center text-[#8F96A9] border font-bold border-gray-300 px-2 py-1 sm:px-4 sm:py-2 rounded-md hover:bg-gray-200 text-sm sm:text-base"
                onClick={handleDelete} 
              >
                <RiDeleteBack2Line className="mr-1 sm:mr-2 text-sm sm:text-base" />
                Withdraw Parking
              </button>
              <button
                className="bg-white text-[#8F96A9] border font-bold border-gray-300 px-2 py-1 sm:px-4 sm:py-2 rounded-md hover:bg-gray-200 text-sm sm:text-base"
                onClick={handleEdit} 
              >
                Edit Parking Information
              </button>
            </div>
          </div>

          {/* Parking Records Table */}
          <div className="overflow-x-auto mb-6">
            <Table
              columns={columns}
              dataSource={tableData}
              pagination={{ pageSize: 10 }}
              rowKey="id"
              rowSelection={{
                selectedRowKeys,
                onChange: (selectedRowKeys) => {
                  setSelectedRowKeys(selectedRowKeys);
                },
              }}
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
              <Form.Item name="name" label="Parking Name">
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </Form.Item>
              <Form.Item name="address" label="Address">
                <Input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  required
                />
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Parking;
