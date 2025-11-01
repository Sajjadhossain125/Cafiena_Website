import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaEye, FaEdit, FaTrash, FaCalendarAlt, FaShoppingCart, FaMoneyBillWave, FaEnvelope, FaPhone, FaMapMarkerAlt,FaUser } from 'react-icons/fa';

function AdminCustomers() {
  // Dummy data for customers
  const allCustomers = [
    { id: 1, name: 'John Smith', email: 'john@example.com', phone: '(123) 456-7890', joinDate: '2023-01-15', orders: 12, spent: 245.80, status: 'Active', address: '123 Coffee St, Brewtown' },
    { id: 2, name: 'Emma Wilson', email: 'emma@example.com', phone: '(234) 567-8901', joinDate: '2023-02-20', orders: 8, spent: 178.50, status: 'Active', address: '456 Java Ave, Brewtown' },
    { id: 3, name: 'Michael Brown', email: 'michael@example.com', phone: '(345) 678-9012', joinDate: '2023-03-10', orders: 15, spent: 312.75, status: 'Active', address: '789 Espresso Blvd, Brewtown' },
    { id: 4, name: 'Sarah Davis', email: 'sarah@example.com', phone: '(456) 789-0123', joinDate: '2023-04-05', orders: 5, spent: 98.25, status: 'Inactive', address: '101 Latte Rd, Brewtown' },
    { id: 5, name: 'Robert Johnson', email: 'robert@example.com', phone: '(567) 890-1234', joinDate: '2023-05-18', orders: 3, spent: 67.40, status: 'Active', address: '202 Cappuccino Dr, Brewtown' },
    { id: 6, name: 'Jennifer Lee', email: 'jennifer@example.com', phone: '(678) 901-2345', joinDate: '2023-06-01', orders: 20, spent: 420.60, status: 'Active', address: '303 Mocha Ln, Brewtown' },
    { id: 7, name: 'David Miller', email: 'david@example.com', phone: '(789) 012-3456', joinDate: '2023-06-10', orders: 7, spent: 145.30, status: 'Active', address: '404 Americano Way, Brewtown' },
    { id: 8, name: 'Lisa Anderson', email: 'lisa@example.com', phone: '(890) 123-4567', joinDate: '2023-06-12', orders: 9, spent: 195.75, status: 'Active', address: '505 Macchiato Ct, Brewtown' },
    { id: 9, name: 'James Taylor', email: 'james@example.com', phone: '(901) 234-5678', joinDate: '2023-06-14', orders: 4, spent: 85.50, status: 'Inactive', address: '606 Frappuccino Ave, Brewtown' },
    { id: 10, name: 'Mary Thomas', email: 'mary@example.com', phone: '(012) 345-6789', joinDate: '2023-06-15', orders: 11, spent: 230.25, status: 'Active', address: '707 Ristretto Blvd, Brewtown' },
  ];

  // State management
  const [customers, setCustomers] = useState(allCustomers);
  const [filteredCustomers, setFilteredCustomers] = useState(allCustomers);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  // Status options
  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
  ];

  // Apply search and filter
  useEffect(() => {
    let results = allCustomers;
    
    // Apply search
    if (searchTerm) {
      results = results.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      results = results.filter(customer => customer.status === statusFilter);
    }
    
    setFilteredCustomers(results);
    setCurrentPage(1); // Reset to first page when filtering
  }, [searchTerm, statusFilter]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCustomers = filteredCustomers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // View customer details
  const handleViewDetails = (customer) => {
    setSelectedCustomer(customer);
    setShowDetails(true);
  };

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active':
        return <span className="px-2 py-1 text-xs font-semibold leading-tight text-green-700 bg-green-100 rounded-full">Active</span>;
      case 'Inactive':
        return <span className="px-2 py-1 text-xs font-semibold leading-tight text-red-700 bg-red-100 rounded-full">Inactive</span>;
      default:
        return <span className="px-2 py-1 text-xs font-semibold leading-tight text-gray-700 bg-gray-100 rounded-full">{status}</span>;
    }
  };

  // Customer details modal
  const CustomerDetailsModal = () => {
    if (!showDetails || !selectedCustomer) return null;

    // Dummy order history
    const orderHistory = [
      { id: 'ORD-001', date: '2023-06-15', total: 42.50, status: 'Delivered' },
      { id: 'ORD-003', date: '2023-06-14', total: 65.20, status: 'Shipped' },
      { id: 'ORD-007', date: '2023-06-12', total: 29.99, status: 'Delivered' },
    ];

    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity duration-300">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-95 animate-scaleIn">
          <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold text-gray-800">Customer Details</h2>
                  <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                    ID: #{selectedCustomer.id}
                  </span>
                </div>
                <p className="text-gray-600">Member since {selectedCustomer.joinDate}</p>
              </div>
              <button 
                onClick={() => setShowDetails(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <FaTimes size={24} />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Personal Information */}
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <FaUser className="text-amber-600" /> Personal Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500">Full Name</p>
                    <p className="font-medium text-gray-800">{selectedCustomer.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <div className="flex items-center gap-2 mt-1">
                      <FaEnvelope className="text-gray-600" />
                      <p className="font-medium text-gray-800">{selectedCustomer.email}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Phone</p>
                    <div className="flex items-center gap-2 mt-1">
                      <FaPhone className="text-gray-600" />
                      <p className="font-medium text-gray-800">{selectedCustomer.phone}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-amber-600" /> Address
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500">Address</p>
                    <p className="font-medium text-gray-800">{selectedCustomer.address}</p>
                  </div>
                </div>
              </div>

              {/* Account Information */}
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <FaCalendarAlt className="text-amber-600" /> Account Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500">Status</p>
                    <div className="mt-1">{getStatusBadge(selectedCustomer.status)}</div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Member Since</p>
                    <p className="font-medium text-gray-800">{selectedCustomer.joinDate}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order History */}
            <div className="mb-8">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FaShoppingCart className="text-amber-600" /> Order History
              </h3>
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {orderHistory.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{order.id}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{order.date}</td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">${order.total.toFixed(2)}</td>
                        <td className="px-4 py-3">
                          {order.status === 'Delivered' ? 
                            <span className="px-2 py-1 text-xs font-semibold leading-tight text-green-700 bg-green-100 rounded-full">Delivered</span> :
                            <span className="px-2 py-1 text-xs font-semibold leading-tight text-blue-700 bg-blue-100 rounded-full">Shipped</span>
                          }
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Customer Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-amber-50 p-5 rounded-xl border border-amber-200">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-amber-100">
                    <FaShoppingCart className="text-amber-600 text-xl" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Orders</p>
                    <p className="text-2xl font-bold text-gray-800">{selectedCustomer.orders}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 p-5 rounded-xl border border-green-200">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-green-100">
                    <FaMoneyBillWave className="text-green-600 text-xl" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Spent</p>
                    <p className="text-2xl font-bold text-gray-800">${selectedCustomer.spent.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                onClick={() => setShowDetails(false)}
                className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
              >
                Close
              </button>
              <button className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors duration-200 flex items-center gap-2">
                <FaEdit />
                <span>Edit Customer</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Customers Management</h1>
        <p className="text-gray-600">Manage your coffee store customers</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6 flex items-center">
          <div className="mr-4 p-3 rounded-lg bg-blue-100">
            <FaUser className="text-blue-600 text-xl" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Customers</p>
            <h3 className="text-2xl font-bold text-gray-800">{customers.length}</h3>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 flex items-center">
          <div className="mr-4 p-3 rounded-lg bg-green-100">
            <FaCalendarAlt className="text-green-600 text-xl" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">New This Month</p>
            <h3 className="text-2xl font-bold text-gray-800">
              {customers.filter(c => c.joinDate.startsWith('2023-06')).length}
            </h3>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 flex items-center">
          <div className="mr-4 p-3 rounded-lg bg-amber-100">
            <FaShoppingCart className="text-amber-600 text-xl" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Active Customers</p>
            <h3 className="text-2xl font-bold text-gray-800">
              {customers.filter(c => c.status === 'Active').length}
            </h3>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 flex items-center">
          <div className="mr-4 p-3 rounded-lg bg-purple-100">
            <FaMoneyBillWave className="text-purple-600 text-xl" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Avg. Spending</p>
            <h3 className="text-2xl font-bold text-gray-800">
              ${(customers.reduce((sum, customer) => sum + customer.spent, 0) / customers.length).toFixed(2)}
            </h3>
          </div>
        </div>
      </div>

      {/* Search and filter bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search customers..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          
          <div className="relative w-full md:w-48">
            <select
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 appearance-none"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <FaFilter className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Spent</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentCustomers.length > 0 ? (
                currentCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{customer.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{customer.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{customer.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{customer.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{customer.joinDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{customer.orders}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${customer.spent.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(customer.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        className="text-amber-600 hover:text-amber-800 transition-colors duration-200 p-2 rounded-full hover:bg-amber-50"
                        onClick={() => handleViewDetails(customer)}
                        title="View Customer Details"
                      >
                        <FaEye />
                      </button>
                      <button 
                        className="text-blue-600 hover:text-blue-800 transition-colors duration-200 p-2 rounded-full hover:bg-blue-50 ml-1"
                        title="Edit Customer"
                      >
                        <FaEdit />
                      </button>
                      <button 
                        className="text-red-600 hover:text-red-800 transition-colors duration-200 p-2 rounded-full hover:bg-red-50 ml-1"
                        title="Delete Customer"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="px-6 py-4 text-center text-sm text-gray-500">
                    No customers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
                <span className="font-medium">
                  {Math.min(indexOfLastItem, filteredCustomers.length)}
                </span>{' '}
                of <span className="font-medium">{filteredCustomers.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                    currentPage > 1
                      ? 'text-gray-500 hover:bg-gray-50'
                      : 'text-gray-300 cursor-not-allowed'
                  }`}
                >
                  Previous
                </button>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let page;
                  if (totalPages <= 5) {
                    page = i + 1;
                  } else if (currentPage <= 3) {
                    page = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    page = totalPages - 4 + i;
                  } else {
                    page = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        currentPage === page
                          ? 'z-10 bg-amber-50 border-amber-500 text-amber-600'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                    currentPage < totalPages
                      ? 'text-gray-500 hover:bg-gray-50'
                      : 'text-gray-300 cursor-not-allowed'
                  }`}
                >
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Details Modal */}
      <CustomerDetailsModal />
    </div>
  );
}

export default AdminCustomers;