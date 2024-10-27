import React, { useState } from "react";
import TopSearchBar from "../../../Components/TopSearchBar/TopSearchBar";
import SideBarAdmin from "../../../Components/SidebarAdmin/SidebarAdmin";
import filter from "../../../assets/Admin/filter.png";
import arrowdown from "../../../assets/Admin/arrowdown.png";
import reset from "../../../assets/Admin/reset.png";

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
  const [filterRole, setFilterRole] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  // Function to open modal for creating a new supplier
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
    setIsModalOpen(true);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const now = new Date();
    const newSupplier = {
      id: editSupplierId || Date.now(),
      ...formData,
      created_at: editSupplierId
        ? suppliers.find((supplier) => supplier.id === editSupplierId)
            .created_at
        : now,
      updated_at: now,
    };

    // Update existing supplier or add a new one
    if (editSupplierId) {
      setSuppliers(
        suppliers.map((supplier) =>
          supplier.id === editSupplierId ? newSupplier : supplier
        )
      );
    } else {
      setSuppliers([...suppliers, newSupplier]);
    }

    setIsModalOpen(false);
    setEditSupplierId(null);
  };

  // Function to populate the form with existing supplier data for editing
  const handleEdit = (supplier) => {
    setFormData({
      name: supplier.name,
      email: supplier.email,
      phone: supplier.phone,
      address: supplier.address,
      representative: supplier.representative,
      sector: supplier.sector,
      product_service: supplier.product_service,
      market: supplier.market,
      tax: supplier.tax,
      year: supplier.year,
      scale: supplier.scale,
      capacity: supplier.capacity,
    });
    setEditSupplierId(supplier.id);
    setIsModalOpen(true);
  };

  // Function to delete a supplier
  const handleDelete = (id) => {
    setSuppliers(suppliers.filter((supplier) => supplier.id !== id));
  };

  // Function to reset filters
  const handleResetFilters = () => {
    setFilterRole("");
    setFilterDate("");
  };

  // Filtering suppliers based on selected role and date
  const filteredSuppliers = suppliers.filter((supplier) => {
    const matchesRole = filterRole ? supplier.role === filterRole : true;
    const matchesDate = filterDate
      ? supplier.created_at.toLocaleDateString() ===
        new Date(filterDate).toLocaleDateString()
      : true;
    return matchesRole && matchesDate;
  });

  return (
    <div className="flex h-screen font-nunito">
      <SideBarAdmin />
      <div className="flex-1 flex flex-col">
        <TopSearchBar />
        <div className="p-6 bg-gray-100 flex-grow">
          <h1 className="text-3xl font-bold mb-4">Supplier Management</h1>

          {/* Filter Section */}
          <div className="flex items-center w-full mb-4">
            <div className="flex items-center">
              <img src={filter} alt="Filter" className="w-5 h-5 mr-2" />
              <span className="mx-10 font-bold">Filter By</span>

              {/* Date Filter */}
              <div className="relative flex items-center mx-10">
                <span className="font-bold mr-5">Date</span>
                <img
                  src={arrowdown}
                  alt="Date Filter"
                  className="cursor-pointer w-5 h-5 mr-1"
                  onClick={() => setShowDateDropdown(!showDateDropdown)}
                />
                {showDateDropdown && (
                  <input
                    type="date"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                    className="absolute top-10 left-0 p-1 border border-gray-300 rounded"
                  />
                )}
              </div>

              {/* Role Filter */}
              <div className="relative flex items-center mx-10">
                <span className="font-bold mr-5">Role</span>
                <img
                  src={arrowdown}
                  alt="Role Filter"
                  className="cursor-pointer w-5 h-5 mr-1"
                  onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                />
                {showRoleDropdown && (
                  <select
                    value={filterRole}
                    onChange={(e) => setFilterRole(e.target.value)}
                    className="absolute top-10 left-0 p-1 border border-gray-300 rounded"
                  >
                    <option value="">All</option>
                    <option value="Distributor">Distributor</option>
                    <option value="Vendor">Vendor</option>
                  </select>
                )}
              </div>

              <button
                onClick={handleResetFilters}
                className="flex items-center text-red-600 p-2 font-semibold rounded"
              >
                <img src={reset} alt="Reset Filter" className="mr-1 w-4 h-4" />
                Reset Filter
              </button>
            </div>

            <button
              onClick={handleCreate}
              className="bg-blue-500 text-white p-2 rounded mb-4 ml-auto"
            >
              Create Supplier
            </button>
          </div>

          {/* Suppliers Table */}
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Address</th>
                <th className="py-3 px-6 text-left">Phone</th>
                <th className="py-3 px-6 text-left">Representative</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Sector</th>
                <th className="py-3 px-6 text-left">Product & Service</th>
                <th className="py-3 px-6 text-left">Market</th>
                <th className="py-3 px-6 text-left">Tax</th>
                <th className="py-3 px-6 text-left">Year</th>
                <th className="py-3 px-6 text-left">Scale</th>
                <th className="py-3 px-6 text-left">Capacity</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {filteredSuppliers.map((supplier) => (
                <tr
                  key={supplier.id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-left">{supplier.id}</td>
                  <td className="py-3 px-6 text-left">{supplier.name}</td>
                  <td className="py-3 px-6 text-left">{supplier.address}</td>
                  <td className="py-3 px-6 text-left">{supplier.phone}</td>
                  <td className="py-3 px-6 text-left">
                    {supplier.representative}
                  </td>
                  <td className="py-3 px-6 text-left">{supplier.email}</td>
                  <td className="py-3 px-6 text-left">{supplier.sector}</td>
                  <td className="py-3 px-6 text-left">
                    {supplier.product_service}
                  </td>
                  <td className="py-3 px-6 text-left">{supplier.market}</td>
                  <td className="py-3 px-6 text-left">{supplier.tax}</td>
                  <td className="py-3 px-6 text-left">{supplier.year}</td>
                  <td className="py-3 px-6 text-left">{supplier.scale}</td>
                  <td className="py-3 px-6 text-left">{supplier.capacity}</td>
                  <td className="py-3 px-6 text-center">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(supplier)}
                        className="text-blue-500 hover:text-blue-700 font-semibold mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(supplier.id)}
                        className="text-red-500 hover:text-red-700 font-semibold"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Modal for creating and editing suppliers */}
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-2/3">
                <h2 className="text-2xl font-bold mb-4">
                  {editSupplierId ? "Edit Supplier" : "Create Supplier"}
                </h2>
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="mb-4">
                      <label className="block mb-2" htmlFor="name">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full border border-gray-300 rounded p-2"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2" htmlFor="email">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full border border-gray-300 rounded p-2"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2" htmlFor="phone">
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full border border-gray-300 rounded p-2"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2" htmlFor="address">
                        Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        value={formData.address}
                        onChange={(e) =>
                          setFormData({ ...formData, address: e.target.value })
                        }
                        className="w-full border border-gray-300 rounded p-2"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2" htmlFor="representative">
                        Representative
                      </label>
                      <input
                        type="text"
                        id="representative"
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
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2" htmlFor="sector">
                        Sector
                      </label>
                      <input
                        type="text"
                        id="sector"
                        value={formData.sector}
                        onChange={(e) =>
                          setFormData({ ...formData, sector: e.target.value })
                        }
                        className="w-full border border-gray-300 rounded p-2"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2" htmlFor="product_service">
                        Product & Service
                      </label>
                      <input
                        type="text"
                        id="product_service"
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
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2" htmlFor="market">
                        Market
                      </label>
                      <input
                        type="text"
                        id="market"
                        value={formData.market}
                        onChange={(e) =>
                          setFormData({ ...formData, market: e.target.value })
                        }
                        className="w-full border border-gray-300 rounded p-2"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2" htmlFor="tax">
                        Tax
                      </label>
                      <input
                        type="text"
                        id="tax"
                        value={formData.tax}
                        onChange={(e) =>
                          setFormData({ ...formData, tax: e.target.value })
                        }
                        className="w-full border border-gray-300 rounded p-2"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2" htmlFor="year">
                        Year
                      </label>
                      <input
                        type="number"
                        id="year"
                        value={formData.year}
                        onChange={(e) =>
                          setFormData({ ...formData, year: e.target.value })
                        }
                        className="w-full border border-gray-300 rounded p-2"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2" htmlFor="scale">
                        Scale
                      </label>
                      <input
                        type="text"
                        id="scale"
                        value={formData.scale}
                        onChange={(e) =>
                          setFormData({ ...formData, scale: e.target.value })
                        }
                        className="w-full border border-gray-300 rounded p-2"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2" htmlFor="capacity">
                        Capacity
                      </label>
                      <input
                        type="text"
                        id="capacity"
                        value={formData.capacity}
                        onChange={(e) =>
                          setFormData({ ...formData, capacity: e.target.value })
                        }
                        className="w-full border border-gray-300 rounded p-2"
                        required
                      />
                    </div>
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
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupplierManagement;
