import React, { useState } from "react";
import { Table, Empty, Modal, Form, Input, notification } from "antd";
import { RiDeleteBack2Line, RiExpandUpDownFill } from "react-icons/ri";
const CustomEmpty = () => (
  <div className="flex flex-col items-center justify-center py-8">
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description={
        <div className="text-center">
          <p className="text-gray-500 text-base mb-2">
            No vehicles found
          </p>
          <p className="text-gray-400 text-sm">
            Please add a new vehicle to get started.
          </p>
        </div>
      }
    />
  </div>
);

const VehicleManagement = () => {
  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      registeredNumber: "ABC123",
      vehicleName: "Toyota Camry",
      capacity: "5 seats",
      kilometerDriven: "15000 km",
    },
    {
      id: 2,
      registeredNumber: "XYZ456",
      vehicleName: "Honda Accord",
      capacity: "5 seats",
      kilometerDriven: "20000 km",
    },
    {
      id: 3,
      registeredNumber: "LMN789",
      vehicleName: "Ford F-150",
      capacity: "3 seats",
      kilometerDriven: "25000 km",
    },
  ]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    registeredNumber: "",
    vehicleName: "",
    capacity: "",
    kilometerDriven: "",
  });
  const [editVehicleId, setEditVehicleId] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [modalTitle, setModalTitle] = useState("Create Vehicle");

  const handleCreate = () => {
    setFormData({
      registeredNumber: "",
      vehicleName: "",
      capacity: "",
      kilometerDriven: "",
    });
    setEditVehicleId(null);
    setIsModalOpen(true);
  };

  const handleSubmit = (values) => {
    const updatedVehicles = vehicles.map((vehicle) => {
      if (vehicle.id === editVehicleId) {
        return { ...vehicle, ...values };
      }
      return vehicle;
    });
    setVehicles(updatedVehicles);
    setIsModalOpen(false);
    setEditVehicleId(null);
  };

  const handleEdit = () => {
    if (selectedRowKeys.length === 0) {
      notification.warning({
        message: 'No Vehicles Selected',
        description: 'Please select at least one vehicle to edit.',
        placement: 'topRight',
      });
      return;
    }

    const vehicleToEdit = vehicles.find((vehicle) => vehicle.id === selectedRowKeys[0]);
    setFormData(vehicleToEdit);
    setEditVehicleId(vehicleToEdit.id);
    setModalTitle(`Edit Vehicle (ID: ${vehicleToEdit.id})`);
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    if (selectedRowKeys.length === 0) {
      notification.warning({
        message: 'No Vehicles Selected',
        description: 'Please select at least one vehicle to delete.',
        placement: 'topRight',
      });
      return;
    }
    
    setVehicles(vehicles.filter((vehicle) => !selectedRowKeys.includes(vehicle.id)));
  };

  const handleRowsChange = (value) => {
    // Handle row selection change
  };

  const columns = [
    {
      title: "Registered Number",
      dataIndex: "registeredNumber",
      sorter: (a, b) => a.registeredNumber.localeCompare(b.registeredNumber),
    },
    {
      title: "Vehicle Name",
      dataIndex: "vehicleName",
      sorter: (a, b) => a.vehicleName.localeCompare(b.vehicleName),
    },
    {
      title: "Capacity",
      dataIndex: "capacity",
      sorter: (a, b) => a.capacity.localeCompare(b.capacity),
    },
    {
      title: "Kilometer Driven",
      dataIndex: "kilometerDriven",
      sorter: (a, b) => a.kilometerDriven.localeCompare(b.kilometerDriven),
    },
  ];

  const tableData = vehicles.map((vehicle) => ({
    key: vehicle.id,
    ...vehicle,
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
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mt-10 mb-5 text-gray-600 gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <span>Selected Vehicles: {selectedRowKeys.length}</span>
              <span className="text-gray-400">|</span>
              <span>Total Vehicles: {vehicles.length || 0}</span>
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

          <div className="overflow-x-auto mb-6">
            <Table
              columns={columns}
              dataSource={tableData}
              rowKey="id"
              rowSelection={rowSelection}
              locale={{ emptyText: <CustomEmpty /> }}
            />
          </div>

          <Modal
            title={modalTitle}
            visible={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            footer={null}
          >
            <Form layout="vertical" initialValues={formData} onFinish={handleSubmit}>
              <Form.Item name="registeredNumber" label="Registered Number">
                <Input required />
              </Form.Item>
              <Form.Item name="vehicleName" label="Vehicle Name">
                <Input required />
              </Form.Item>
              <Form.Item name="capacity" label="Capacity">
                <Input required />
              </Form.Item>
              <Form.Item name="kilometerDriven" label="Kilometer Driven">
                <Input required />
              </Form.Item>
              <div className="flex justify-end">
                <button type="button" className="bg-gray-300 text-gray-700 p-2 rounded mr-2" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit"  className="bg-blue-500 text-white p-2 rounded">{editVehicleId ? "Update Vehicle" : "Create Vehicle"}</button>
              </div>
            </Form>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default VehicleManagement;
