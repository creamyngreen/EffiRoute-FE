import React, { useState } from "react";
import filter from "../../assets/Admin/filter.png";
import arrowdown from "../../assets/Admin/arrowdown.png";
import reset from "../../assets/Admin/reset.png";
import TopSearchBar from "../../Components/TopSearchBar/TopSearchBar";
import SideBarAdmin from "../../Components/SidebarAdmin/SidebarAdmin";

const Supplier = () => {
    const [filterSector, setFilterSector] = useState("");
    const [filterYear, setFilterYear] = useState("");
    const [showYearDropdown, setShowYearDropdown] = useState(false);
    const [showSectorDropdown, setShowSectorDropdown] = useState(false);

    const [suppliers, setSuppliers] = useState([]); // State to hold suppliers data
    const [newSupplier, setNewSupplier] = useState({
    companyName: "",
    address: "",
    phone: "",
    representative: "",
    email: "",
    sector: "",
    productService: "",
    market: "",
    maSoThue: "",
    year: "",
    scale: "",
    capacity: "",
    });

    const handleResetFilters = () => {
    setFilterSector("");
    setFilterYear("");
    };

    const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSupplier({ ...newSupplier, [name]: value });
    };

    const handleAddSupplier = () => {
    setSuppliers([...suppliers, { id: suppliers.length + 1, ...newSupplier }]);
    setNewSupplier({
        companyName: "",
        address: "",
        phone: "",
        representative: "",
        email: "",
        sector: "",
        productService: "",
        market: "",
        maSoThue: "",
        year: "",
        scale: "",
        capacity: "",
    });
    };

    return (
    <div className="flex h-screen font-nunito">
        <SideBarAdmin />

        {/* Main content */}
        <div className="flex-1 flex flex-col">
        <TopSearchBar />
        <div className="p-6 bg-gray-100 flex-grow">
            <h1 className="text-3xl font-bold mb-4">Supplier Management</h1>

            {/* Supplier Form */}
            <div className="mb-6">
            <div className="grid grid-cols-2 gap-4">
                <input
                type="text"
                name="companyName"
                value={newSupplier.companyName}
                onChange={handleInputChange}
                placeholder="Company Name"
                className="p-2 border border-gray-300 rounded"
                />
                <input
                type="text"
                name="address"
                value={newSupplier.address}
                onChange={handleInputChange}
                placeholder="Address"
                className="p-2 border border-gray-300 rounded"
                />
                <input
                type="text"
                name="phone"
                value={newSupplier.phone}
                onChange={handleInputChange}
                placeholder="Phone"
                className="p-2 border border-gray-300 rounded"
                />
                <input
                type="text"
                name="representative"
                value={newSupplier.representative}
                onChange={handleInputChange}
                placeholder="Representative"
                className="p-2 border border-gray-300 rounded"
                />
                <input
                type="email"
                name="email"
                value={newSupplier.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="p-2 border border-gray-300 rounded"
                />
                <input
                type="text"
                name="sector"
                value={newSupplier.sector}
                onChange={handleInputChange}
                placeholder="Sector"
                className="p-2 border border-gray-300 rounded"
                />
                <input
                type="text"
                name="productService"
                value={newSupplier.productService}
                onChange={handleInputChange}
                placeholder="Product and Service"
                className="p-2 border border-gray-300 rounded"
                />
                <input
                type="text"
                name="market"
                value={newSupplier.market}
                onChange={handleInputChange}
                placeholder="Market"
                className="p-2 border border-gray-300 rounded"
                />
                <input
                type="text"
                name="maSoThue"
                value={newSupplier.maSoThue}
                onChange={handleInputChange}
                placeholder="Mã Số Thuế"
                className="p-2 border border-gray-300 rounded"
                />
                <input
                type="number"
                name="year"
                value={newSupplier.year}
                onChange={handleInputChange}
                placeholder="Year"
                className="p-2 border border-gray-300 rounded"
                />
                <input
                type="text"
                name="scale"
                value={newSupplier.scale}
                onChange={handleInputChange}
                placeholder="Scale"
                className="p-2 border border-gray-300 rounded"
                />
                <input
                type="text"
                name="capacity"
                value={newSupplier.capacity}
                onChange={handleInputChange}
                placeholder="Capacity"
                className="p-2 border border-gray-300 rounded"
                />
            </div>
            <button
                onClick={handleAddSupplier}
                className="mt-4 bg-blue-500 text-white p-2 rounded"
            >
                Add Supplier
            </button>
            </div>

            {/* Filter Section */}
            <div className="flex items-center mb-4 ml-5">
            <img src={filter} alt="Filter" className="w-5 h-5 mr-2" />
            <span className="mx-10 font-bold">Filter By</span>

            {/* Sector Filter */}
            <div className="relative flex items-center mx-10">
                <span className="font-bold mr-5">Sector</span>
                <img
                src={arrowdown}
                alt="Sector Filter"
                className="cursor-pointer w-5 h-5 mr-1"
                onClick={() => setShowSectorDropdown(!showSectorDropdown)}
                />
                {showSectorDropdown && (
                <select
                    value={filterSector}
                    onChange={(e) => setFilterSector(e.target.value)}
                    className="absolute top-10 left-0 p-1 border border-gray-300 rounded"
                >
                    <option value="">All</option>
                    <option value="Agriculture">Agriculture</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Services">Services</option>
                    {/* Add more options as needed */}
                </select>
                )}
            </div>

            {/* Year Filter */}
            <div className="relative flex items-center mx-10">
                <span className="font-bold mr-5">Year</span>
                <img
                src={arrowdown}
                alt="Year Filter"
                className="cursor-pointer w-5 h-5 mr-1"
                onClick={() => setShowYearDropdown(!showYearDropdown)}
                />
                {showYearDropdown && (
                <input
                    type="number"
                    value={filterYear}
                    onChange={(e) => setFilterYear(e.target.value)}
                    placeholder="Enter Year"
                    className="absolute top-10 left-0 p-1 border border-gray-300 rounded"
                />
                )}
            </div>

            <div className="ml-20">
                <button
                onClick={handleResetFilters}
                className="flex items-center text-red-600 p-2 font-semibold rounded"
                >
                <img src={reset} alt="Reset Filter" className="mr-1 w-4 h-4" />
                Reset Filter
                </button>
            </div>
            </div>

            {/* Supplier Table */}
            <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                <tr className="bg-gray-200">
                    <th className="border px-4 py-2">ID</th>
                    <th className="border px-4 py-2">Company Name</th>
                    <th className="border px-4 py-2">Address</th>
                    <th className="border px-4 py-2">Phone</th>
                    <th className="border px-4 py-2">Representative</th>
                    <th className="border px-4 py-2">Email</th>
                    <th className="border px-4 py-2">Sector</th>
                    <th className="border px-4 py-2">Product and Service</th>
                    <th className="border px-4 py-2">Market</th>
                    <th className="border px-4 py-2">Mã Số Thuế</th>
                    <th className="border px-4 py-2">Year</th>
                    <th className="border px-4 py-2">Scale</th>
                    <th className="border px-4 py-2">Capacity</th>
                </tr>
                </thead>
                <tbody>
                {suppliers.map((supplier) => (
                    <tr key={supplier.id}>
                    <td className="border px-4 py-2">{supplier.id}</td>
                    <td className="border px-4 py-2">{supplier.companyName}</td>
                    <td className="border px-4 py-2">{supplier.address}</td>
                    <td className="border px-4 py-2">{supplier.phone}</td>
                    <td className="border px-4 py-2">{supplier.representative}</td>
                    <td className="border px-4 py-2">{supplier.email}</td>
                    <td className="border px-4 py-2">{supplier.sector}</td>
                    <td className="border px-4 py-2">{supplier.productService}</td>
                    <td className="border px-4 py-2">{supplier.market}</td>
                    <td className="border px-4 py-2">{supplier.maSoThue}</td>
                    <td className="border px-4 py-2">{supplier.year}</td>
                    <td className="border px-4 py-2">{supplier.scale}</td>
                    <td className="border px-4 py-2">{supplier.capacity}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>
        </div>
    </div>
    );
};

export default Supplier;
