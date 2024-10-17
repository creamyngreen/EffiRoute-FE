import React, { useState } from "react";
import TopSearchBar from "../../Components/TopSearchBar/TopSearchBar"; 
import SideBarAdmin from "../../Components/SidebarAdmin/SidebarAdmin";  
import filter from "../../assets/Admin/filter.png";
import arrowdown from "../../assets/Admin/arrowdown.png";
import reset from "../../assets/Admin/reset.png";

const AccountManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '0123456789', password: 'password123', address: '123 Main St', role: 'Manager', created_at: new Date(), updated_at: new Date(), deleted_at: null },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '0312893818', password: 'securePass456', address: '456 Elm St', role: 'Planner', created_at: new Date(), updated_at: new Date(), deleted_at: null },
  ]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [role, setRole] = useState('Manager');
  const [editUserId, setEditUserId] = useState(null);
  
  // State for filters
  const [filterRole, setFilterRole] = useState('');
  const [filterDate, setFilterDate] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const now = new Date();
    const newUser = { 
      id: editUserId || Date.now(), 
      name, 
      email, 
      phone, 
      password, 
      address, 
      role,
      created_at: editUserId ? users.find(user => user.id === editUserId).created_at : now,
      updated_at: now,
      deleted_at: null 
    };
    
    if (editUserId) {
      // Update existing user
      setUsers(users.map(user => (user.id === editUserId ? newUser : user)));
    } else {
      // Create new user
      setUsers([...users, newUser]);
    }

    // Reset form
    setName('');
    setEmail('');
    setPassword('');
    setRepeatPassword('');
    setPhone('');
    setAddress('');
    setRole('Manager'); // Reset role to default
    setEditUserId(null);
  };

  const handleEdit = (user) => {
    setName(user.name);
    setEmail(user.email);
    setPhone(user.phone);
    setAddress(user.address); 
    setPassword(user.password);
    setRepeatPassword(user.password); 
    setRole(user.role);
    setEditUserId(user.id);
  };

  const handleDelete = (id) => {
    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(updatedUsers);
  };

  const handleResetFilters = () => {
    setFilterRole('');
    setFilterDate('');
  };

  // Filtered users based on selected filters
  const filteredUsers = users.filter(user => {
    const matchesRole = filterRole ? user.role === filterRole : true;
    const matchesDate = filterDate ? user.created_at.toLocaleDateString() === new Date(filterDate).toLocaleDateString() : true;
    return matchesRole && matchesDate;
  });

  return (
    <div className="flex h-screen font-nunito">
      <SideBarAdmin />
      <div className="flex-1 flex flex-col">
        <TopSearchBar />
        <div className="p-6 bg-gray-100 flex-grow">
          <h1 className="text-3xl font-bold mb-4">Account Management</h1>

          {/* User Form */}
          <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-6">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-1 font-semibold">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter name"
                  className="w-80 p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="-ml-80">
                <label className="block mb-1 font-semibold">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                  className="w-80 p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold">Phone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter phone number"
                  className="w-80 p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="-ml-80">
                <label className="block mb-1 font-semibold">Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter address"
                  className="w-80 p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold">Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-80 p-2 border border-gray-300 rounded"
                  required
                >
                  <option value="Manager">Manager</option>
                  <option value="Planner">Planner</option>
                </select>
              </div>
              <div className="-ml-80">
                <label className="block mb-1 font-semibold">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-80 p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold">Repeat Password</label>
                <input
                  type="password"
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  placeholder="Repeat password"
                  className="w-80 p-2 border border-gray-300 rounded"
                  required
                />
              </div>
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
              {editUserId ? 'Update Account' : 'Save Account'}
            </button>
          </form>

          {/* Filter Section*/}
          <div className="flex items-center mb-4 ml-5">
            <img src={filter} alt="Filter" className="w-5 h-5 mr-2" />
            <span className="mx-10 font-bold">Filter By</span>
            <div className="flex items-center mx-10">
              <span className="font-bold mr-5">Date</span>
              <img src={arrowdown} alt="Date Filter" className=" w-5 h-5 mr-1" />
              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="p-1 border border-gray-300 rounded"
              />
            </div>
            <div className="flex items-center mx-10">
              <span className="font-bold mr-5">Role</span>
              <img src={arrowdown} alt="Role Filter" className="w-5 h-5 mr-1" />
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="p-1 border border-gray-300 rounded"
              >
                <option value="">All Roles</option>
                <option value="Manager">Manager</option>
                <option value="Planner">Planner</option>
              </select>
            </div>
            <button onClick={handleResetFilters} className="flex items-center text-red-600 p-2 font-semibold rounded">
              <img src={reset} alt="Reset Filter" className="mr-1 w-4 h-4" />
              Reset Filter
            </button>
          </div>

          {/* User Account List */}
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Phone</th>
                <th className="py-3 px-6 text-left">Address</th>
                <th className="py-3 px-6 text-left">Role</th>
                <th className="py-3 px-6 text-left">Created At</th>
                <th className="py-3 px-6 text-left">Updated At</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {filteredUsers.map(user => (
                <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left">{user.id}</td>
                  <td className="py-3 px-6 text-left">{user.name}</td>
                  <td className="py-3 px-6 text-left">{user.email}</td>
                  <td className="py-3 px-6 text-left">{user.phone}</td>
                  <td className="py-3 px-6 text-left">{user.address}</td>
                  <td className="py-3 px-6 text-left">{user.role}</td>
                  <td className="py-3 px-6 text-left">{user.created_at.toLocaleString()}</td>
                  <td className="py-3 px-6 text-left">{user.updated_at.toLocaleString()}</td>
                  <td className="py-3 px-6 text-left">
                    <button onClick={() => handleEdit(user)} className="text-yellow-600 hover:text-yellow-800 mr-2">Edit</button>
                    <button onClick={() => handleDelete(user.id)} className="text-red-600 hover:text-red-800">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AccountManagement;
