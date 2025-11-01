import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaEye, FaEdit, FaTruck, FaCheck, FaTimes, FaCalendarAlt, FaUser, FaBox, FaMoneyBillWave } from 'react-icons/fa';

function AdminOrders() {
  // Dummy data for orders
  const allOrders = [
    { id: 'ORD-001', customer: 'John Smith', date: '2023-06-15', total: 42.50, status: 'Delivered', items: 3, payment: 'Paid' },
    { id: 'ORD-002', customer: 'Emma Wilson', date: '2023-06-14', total: 28.75, status: 'Processing', items: 2, payment: 'Paid' },
    { id: 'ORD-003', customer: 'Michael Brown', date: '2023-06-14', total: 65.20, status: 'Shipped', items: 4, payment: 'Paid' },
    { id: 'ORD-004', customer: 'Sarah Davis', date: '2023-06-13', total: 31.40, status: 'Delivered', items: 1, payment: 'Paid' },
    { id: 'ORD-005', customer: 'Robert Johnson', date: '2023-06-13', total: 53.80, status: 'Cancelled', items: 3, payment: 'Refunded' },
    { id: 'ORD-006', customer: 'Jennifer Lee', date: '2023-06-12', total: 76.25, status: 'Processing', items: 5, payment: 'Paid' },
    { id: 'ORD-007', customer: 'David Miller', date: '2023-06-12', total: 29.99, status: 'Shipped', items: 2, payment: 'Paid' },
    { id: 'ORD-008', customer: 'Lisa Anderson', date: '2023-06-11', total: 45.60, status: 'Delivered', items: 3, payment: 'Paid' },
    { id: 'ORD-009', customer: 'James Taylor', date: '2023-06-11', total: 38.75, status: 'Processing', items: 2, payment: 'Pending' },
    { id: 'ORD-010', customer: 'Mary Thomas', date: '2023-06-10', total: 52.30, status: 'Shipped', items: 4, payment: 'Paid' },
  ];

  // State management
  const [orders, setOrders] = useState(allOrders);
  const [filteredOrders, setFilteredOrders] = useState(allOrders);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  // Order status options
  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'Processing', label: 'Processing' },
    { value: 'Shipped', label: 'Shipped' },
    { value: 'Delivered', label: 'Delivered' },
    { value: 'Cancelled', label: 'Cancelled' },
  ];

  // Apply search and filter
  useEffect(() => {
    let results = allOrders;
    
    // Apply search
    if (searchTerm) {
      results = results.filter(order =>
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      results = results.filter(order => order.status === statusFilter);
    }
    
    setFilteredOrders(results);
    setCurrentPage(1); // Reset to first page when filtering
  }, [searchTerm, statusFilter]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // View order details
  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setShowDetails(true);
  };

  // Update order status
  const handleStatusUpdate = (orderId, newStatus) => {
    const updatedOrders = orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    
    // Update filtered orders as well
    const updatedFilteredOrders = filteredOrders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setFilteredOrders(updatedFilteredOrders);
    
    // Update selected order if it's the one being viewed
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Processing':
        return <span className="px-2 py-1 text-xs font-semibold leading-tight text-yellow-700 bg-yellow-100 rounded-full">Processing</span>;
      case 'Shipped':
        return <span className="px-2 py-1 text-xs font-semibold leading-tight text-blue-700 bg-blue-100 rounded-full">Shipped</span>;
      case 'Delivered':
        return <span className="px-2 py-1 text-xs font-semibold leading-tight text-green-700 bg-green-100 rounded-full">Delivered</span>;
      case 'Cancelled':
        return <span className="px-2 py-1 text-xs font-semibold leading-tight text-red-700 bg-red-100 rounded-full">Cancelled</span>;
      default:
        return <span className="px-2 py-1 text-xs font-semibold leading-tight text-gray-700 bg-gray-100 rounded-full">{status}</span>;
    }
  };

  // Get payment badge
  const getPaymentBadge = (payment) => {
    switch (payment) {
      case 'Paid':
        return <span className="px-2 py-1 text-xs font-semibold leading-tight text-green-700 bg-green-100 rounded-full">Paid</span>;
      case 'Pending':
        return <span className="px-2 py-1 text-xs font-semibold leading-tight text-yellow-700 bg-yellow-100 rounded-full">Pending</span>;
      case 'Refunded':
        return <span className="px-2 py-1 text-xs font-semibold leading-tight text-purple-700 bg-purple-100 rounded-full">Refunded</span>;
      default:
        return <span className="px-2 py-1 text-xs font-semibold leading-tight text-gray-700 bg-gray-100 rounded-full">{payment}</span>;
    }
  };

  // Order details modal
  const OrderDetailsModal = () => {
    if (!showDetails || !selectedOrder) return null;

    // Dummy order items
    const orderItems = [
      { id: 1, name: 'Ethiopian Yirgacheffe', quantity: 2, price: 14.99 },
      { id: 2, name: 'Colombian Supremo', quantity: 1, price: 12.99 },
    ];

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Order Details</h2>
                <p className="text-gray-600">Order ID: {selectedOrder.id}</p>
              </div>
              <button 
                onClick={() => setShowDetails(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes size={24} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <FaUser className="mr-2 text-amber-600" /> Customer Information
                </h3>
                <p className="text-gray-700"><span className="font-medium">Name:</span> {selectedOrder.customer}</p>
                <p className="text-gray-700"><span className="font-medium">Email:</span> customer@example.com</p>
                <p className="text-gray-700"><span className="font-medium">Phone:</span> (123) 456-7890</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <FaCalendarAlt className="mr-2 text-amber-600" /> Order Information
                </h3>
                <p className="text-gray-700"><span className="font-medium">Date:</span> {selectedOrder.date}</p>
                <p className="text-gray-700"><span className="font-medium">Status:</span> {getStatusBadge(selectedOrder.status)}</p>
                <p className="text-gray-700"><span className="font-medium">Payment:</span> {getPaymentBadge(selectedOrder.payment)}</p>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                <FaBox className="mr-2 text-amber-600" /> Order Items
              </h3>
              <div className="bg-white border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {orderItems.map((item) => (
                      <tr key={item.id}>
                        <td className="px-4 py-3 text-sm text-gray-900">{item.name}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{item.quantity}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">${item.price.toFixed(2)}</td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">${(item.quantity * item.price).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-50">
                    <tr>
                      <td colSpan="3" className="px-4 py-3 text-sm font-medium text-gray-900 text-right">Subtotal:</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">${selectedOrder.total.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td colSpan="3" className="px-4 py-3 text-sm font-medium text-gray-900 text-right">Shipping:</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">$5.00</td>
                    </tr>
                    <tr>
                      <td colSpan="3" className="px-4 py-3 text-sm font-bold text-gray-900 text-right">Total:</td>
                      <td className="px-4 py-3 text-sm font-bold text-gray-900">${(selectedOrder.total + 5).toFixed(2)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">Update Status</h3>
              <div className="flex flex-wrap gap-2">
                {statusOptions
                  .filter(option => option.value !== 'all')
                  .map((status) => (
                    <button
                      key={status.value}
                      onClick={() => handleStatusUpdate(selectedOrder.id, status.value)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium ${
                        selectedOrder.status === status.value
                          ? 'bg-amber-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {status.label}
                    </button>
                  ))}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setShowDetails(false)}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Close
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
        <h1 className="text-3xl font-bold text-gray-800">Orders Management</h1>
        <p className="text-gray-600">Track and manage customer orders</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6 flex items-center">
          <div className="mr-4 p-3 rounded-lg bg-blue-100">
            <FaBox className="text-blue-600 text-xl" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Orders</p>
            <h3 className="text-2xl font-bold text-gray-800">{orders.length}</h3>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 flex items-center">
          <div className="mr-4 p-3 rounded-lg bg-yellow-100">
            <FaEdit className="text-yellow-600 text-xl" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Processing</p>
            <h3 className="text-2xl font-bold text-gray-800">
              {orders.filter(o => o.status === 'Processing').length}
            </h3>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 flex items-center">
          <div className="mr-4 p-3 rounded-lg bg-green-100">
            <FaCheck className="text-green-600 text-xl" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Delivered</p>
            <h3 className="text-2xl font-bold text-gray-800">
              {orders.filter(o => o.status === 'Delivered').length}
            </h3>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 flex items-center">
          <div className="mr-4 p-3 rounded-lg bg-purple-100">
            <FaMoneyBillWave className="text-purple-600 text-xl" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Revenue</p>
            <h3 className="text-2xl font-bold text-gray-800">
              ${orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
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
              placeholder="Search orders..."
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

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentOrders.length > 0 ? (
                currentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.customer}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.items}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${order.total.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getPaymentBadge(order.payment)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(order.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        className="text-amber-600 hover:text-amber-900 mr-3"
                        onClick={() => handleViewDetails(order)}
                      >
                        <FaEye />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-6 py-4 text-center text-sm text-gray-500">
                    No orders found
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
                  {Math.min(indexOfLastItem, filteredOrders.length)}
                </span>{' '}
                of <span className="font-medium">{filteredOrders.length}</span> results
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

      {/* Order Details Modal */}
      <OrderDetailsModal />
    </div>
  );
}

export default AdminOrders;