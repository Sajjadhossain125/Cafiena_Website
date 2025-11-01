import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaEye, FaCreditCard, FaMoneyBillWave, FaHandHoldingUsd, FaChartLine, FaDownload, FaCalendarAlt, FaUser, FaShoppingCart, FaFileInvoice } from 'react-icons/fa';

function AdminPayments() {
  // Dummy data for payment history
  const allPayments = [
    { id: 'PAY-001', orderId: 'ORD-001', customer: 'John Smith', date: '2023-06-15', amount: 42.50, method: 'Credit Card', status: 'Completed', transactionId: 'TRX123456' },
    { id: 'PAY-002', orderId: 'ORD-002', customer: 'Emma Wilson', date: '2023-06-14', amount: 28.75, method: 'bKash', status: 'Completed', transactionId: 'TRX234567' },
    { id: 'PAY-003', orderId: 'ORD-003', customer: 'Michael Brown', date: '2023-06-14', amount: 65.20, method: 'Cash on Delivery', status: 'Pending', transactionId: '-' },
    { id: 'PAY-004', orderId: 'ORD-004', customer: 'Sarah Davis', date: '2023-06-13', amount: 31.40, method: 'Credit Card', status: 'Completed', transactionId: 'TRX345678' },
    { id: 'PAY-005', orderId: 'ORD-005', customer: 'Robert Johnson', date: '2023-06-13', amount: 53.80, method: 'bKash', status: 'Refunded', transactionId: 'TRX456789' },
    { id: 'PAY-006', orderId: 'ORD-006', customer: 'Jennifer Lee', date: '2023-06-12', amount: 76.25, method: 'Credit Card', status: 'Completed', transactionId: 'TRX567890' },
    { id: 'PAY-007', orderId: 'ORD-007', customer: 'David Miller', date: '2023-06-12', amount: 29.99, method: 'Cash on Delivery', status: 'Completed', transactionId: '-' },
    { id: 'PAY-008', orderId: 'ORD-008', customer: 'Lisa Anderson', date: '2023-06-11', amount: 45.60, method: 'bKash', status: 'Completed', transactionId: 'TRX678901' },
    { id: 'PAY-009', orderId: 'ORD-009', customer: 'James Taylor', date: '2023-06-11', amount: 38.75, method: 'Credit Card', status: 'Pending', transactionId: 'TRX789012' },
    { id: 'PAY-010', orderId: 'ORD-010', customer: 'Mary Thomas', date: '2023-06-10', amount: 52.30, method: 'Cash on Delivery', status: 'Completed', transactionId: '-' },
  ];

  // Dummy data for refund requests
  const allRefunds = [
    { id: 'REF-001', orderId: 'ORD-005', customer: 'Robert Johnson', date: '2023-06-14', amount: 53.80, reason: 'Product not as described', status: 'Approved', paymentId: 'PAY-005' },
    { id: 'REF-002', orderId: 'ORD-011', customer: 'Patricia Moore', date: '2023-06-13', amount: 35.50, reason: 'Damaged product', status: 'Pending', paymentId: 'PAY-011' },
    { id: 'REF-003', orderId: 'ORD-012', customer: 'Christopher Lee', date: '2023-06-12', amount: 42.25, reason: 'Wrong item delivered', status: 'Rejected', paymentId: 'PAY-012' },
    { id: 'REF-004', orderId: 'ORD-013', customer: 'Linda Martinez', date: '2023-06-11', amount: 28.90, reason: 'Late delivery', status: 'Pending', paymentId: 'PAY-013' },
    { id: 'REF-005', orderId: 'ORD-014', customer: 'Daniel Wilson', date: '2023-06-10', amount: 67.40, reason: 'Product quality issue', status: 'Approved', paymentId: 'PAY-014' },
  ];

  // Dummy data for sales reports
  const salesReports = [
    { id: 1, period: 'June 2023', totalSales: 2450.75, totalOrders: 48, avgOrderValue: 51.06, topProduct: 'Ethiopian Yirgacheffe' },
    { id: 2, period: 'May 2023', totalSales: 2180.50, totalOrders: 42, avgOrderValue: 51.92, topProduct: 'Colombian Supremo' },
    { id: 3, period: 'April 2023', totalSales: 1925.25, totalOrders: 38, avgOrderValue: 50.66, topProduct: 'Guatemala Antigua' },
    { id: 4, period: 'March 2023', totalSales: 1760.80, totalOrders: 35, avgOrderValue: 50.31, topProduct: 'Sumatra Mandheling' },
  ];

  // State management
  const [payments, setPayments] = useState(allPayments);
  const [refunds, setRefunds] = useState(allRefunds);
  const [reports, setReports] = useState(salesReports);
  const [filteredPayments, setFilteredPayments] = useState(allPayments);
  const [filteredRefunds, setFilteredRefunds] = useState(allRefunds);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [methodFilter, setMethodFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('payments');
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [selectedRefund, setSelectedRefund] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [showRefundDetails, setShowRefundDetails] = useState(false);
  const [showReportDetails, setShowReportDetails] = useState(false);

  // Payment methods
  const paymentMethods = [
    { value: 'all', label: 'All Methods' },
    { value: 'Credit Card', label: 'Credit Card' },
    { value: 'bKash', label: 'bKash' },
    { value: 'Cash on Delivery', label: 'Cash on Delivery' },
  ];

  // Status options
  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'Completed', label: 'Completed' },
    { value: 'Pending', label: 'Pending' },
    { value: 'Refunded', label: 'Refunded' },
  ];

  // Refund status options
  const refundStatusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'Pending', label: 'Pending' },
    { value: 'Approved', label: 'Approved' },
    { value: 'Rejected', label: 'Rejected' },
  ];

  // Apply search and filter for payments
  useEffect(() => {
    let results = allPayments;
    
    // Apply search
    if (searchTerm) {
      results = results.filter(payment =>
        payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.orderId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply method filter
    if (methodFilter !== 'all') {
      results = results.filter(payment => payment.method === methodFilter);
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      results = results.filter(payment => payment.status === statusFilter);
    }
    
    setFilteredPayments(results);
    setCurrentPage(1); // Reset to first page when filtering
  }, [searchTerm, methodFilter, statusFilter]);

  // Apply search for refunds
  useEffect(() => {
    let results = allRefunds;
    
    // Apply search
    if (searchTerm) {
      results = results.filter(refund =>
        refund.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        refund.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        refund.orderId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      results = results.filter(refund => refund.status === statusFilter);
    }
    
    setFilteredRefunds(results);
    setCurrentPage(1); // Reset to first page when filtering
  }, [searchTerm, statusFilter]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = activeTab === 'payments' 
    ? filteredPayments.slice(indexOfFirstItem, indexOfLastItem)
    : activeTab === 'refunds'
      ? filteredRefunds.slice(indexOfFirstItem, indexOfLastItem)
      : reports.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = activeTab === 'payments'
    ? Math.ceil(filteredPayments.length / itemsPerPage)
    : activeTab === 'refunds'
      ? Math.ceil(filteredRefunds.length / itemsPerPage)
      : Math.ceil(reports.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // View payment details
  const handleViewPaymentDetails = (payment) => {
    setSelectedPayment(payment);
    setShowPaymentDetails(true);
  };

  // View refund details
  const handleViewRefundDetails = (refund) => {
    setSelectedRefund(refund);
    setShowRefundDetails(true);
  };

  // View report details
  const handleViewReportDetails = (report) => {
    setSelectedReport(report);
    setShowReportDetails(true);
  };

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return <span className="px-2 py-1 text-xs font-semibold leading-tight text-green-700 bg-green-100 rounded-full">Completed</span>;
      case 'Pending':
        return <span className="px-2 py-1 text-xs font-semibold leading-tight text-yellow-700 bg-yellow-100 rounded-full">Pending</span>;
      case 'Refunded':
        return <span className="px-2 py-1 text-xs font-semibold leading-tight text-purple-700 bg-purple-100 rounded-full">Refunded</span>;
      case 'Approved':
        return <span className="px-2 py-1 text-xs font-semibold leading-tight text-green-700 bg-green-100 rounded-full">Approved</span>;
      case 'Rejected':
        return <span className="px-2 py-1 text-xs font-semibold leading-tight text-red-700 bg-red-100 rounded-full">Rejected</span>;
      default:
        return <span className="px-2 py-1 text-xs font-semibold leading-tight text-gray-700 bg-gray-100 rounded-full">{status}</span>;
    }
  };

  // Get payment method badge
  const getMethodBadge = (method) => {
    switch (method) {
      case 'Credit Card':
        return <span className="px-2 py-1 text-xs font-semibold leading-tight text-blue-700 bg-blue-100 rounded-full">Credit Card</span>;
      case 'bKash':
        return <span className="px-2 py-1 text-xs font-semibold leading-tight text-green-700 bg-green-100 rounded-full">bKash</span>;
      case 'Cash on Delivery':
        return <span className="px-2 py-1 text-xs font-semibold leading-tight text-yellow-700 bg-yellow-100 rounded-full">Cash on Delivery</span>;
      default:
        return <span className="px-2 py-1 text-xs font-semibold leading-tight text-gray-700 bg-gray-100 rounded-full">{method}</span>;
    }
  };

  // Calculate payment stats
  const totalRevenue = payments.reduce((sum, payment) => {
    return payment.status === 'Completed' ? sum + payment.amount : sum;
  }, 0);
  
  const pendingPayments = payments.filter(payment => payment.status === 'Pending').length;
  const refundedPayments = payments.filter(payment => payment.status === 'Refunded').length;
  const pendingRefunds = refunds.filter(refund => refund.status === 'Pending').length;

  // Payment details modal
  const PaymentDetailsModal = () => {
    if (!showPaymentDetails || !selectedPayment) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity duration-300">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-95 animate-scaleIn">
          <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Payment Details</h2>
                <p className="text-gray-600">Payment ID: {selectedPayment.id}</p>
              </div>
              <button 
                onClick={() => setShowPaymentDetails(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <FaTimes size={24} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Payment Information */}
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <FaCreditCard className="text-amber-600" /> Payment Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500">Payment ID</p>
                    <p className="font-medium text-gray-800">{selectedPayment.id}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Order ID</p>
                    <p className="font-medium text-gray-800">{selectedPayment.orderId}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Payment Method</p>
                    <div className="mt-1">{getMethodBadge(selectedPayment.method)}</div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Status</p>
                    <div className="mt-1">{getStatusBadge(selectedPayment.status)}</div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Transaction ID</p>
                    <p className="font-medium text-gray-800">{selectedPayment.transactionId}</p>
                  </div>
                </div>
              </div>

              {/* Customer Information */}
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <FaUser className="text-amber-600" /> Customer Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500">Customer Name</p>
                    <p className="font-medium text-gray-800">{selectedPayment.customer}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Payment Date</p>
                    <p className="font-medium text-gray-800">{selectedPayment.date}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Amount</p>
                    <p className="font-medium text-gray-800">${selectedPayment.amount.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                onClick={() => setShowPaymentDetails(false)}
                className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
              >
                Close
              </button>
              {selectedPayment.status === 'Pending' && (
                <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200">
                  Mark as Completed
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Refund details modal
  const RefundDetailsModal = () => {
    if (!showRefundDetails || !selectedRefund) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity duration-300">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-95 animate-scaleIn">
          <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Refund Details</h2>
                <p className="text-gray-600">Refund ID: {selectedRefund.id}</p>
              </div>
              <button 
                onClick={() => setShowRefundDetails(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <FaTimes size={24} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Refund Information */}
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <FaHandHoldingUsd className="text-amber-600" /> Refund Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500">Refund ID</p>
                    <p className="font-medium text-gray-800">{selectedRefund.id}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Order ID</p>
                    <p className="font-medium text-gray-800">{selectedRefund.orderId}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Payment ID</p>
                    <p className="font-medium text-gray-800">{selectedRefund.paymentId}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Status</p>
                    <div className="mt-1">{getStatusBadge(selectedRefund.status)}</div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Refund Amount</p>
                    <p className="font-medium text-gray-800">${selectedRefund.amount.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              {/* Customer Information */}
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <FaUser className="text-amber-600" /> Customer Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500">Customer Name</p>
                    <p className="font-medium text-gray-800">{selectedRefund.customer}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Refund Date</p>
                    <p className="font-medium text-gray-800">{selectedRefund.date}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Reason</p>
                    <p className="font-medium text-gray-800">{selectedRefund.reason}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                onClick={() => setShowRefundDetails(false)}
                className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
              >
                Close
              </button>
              {selectedRefund.status === 'Pending' && (
                <>
                  <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200">
                    Approve Refund
                  </button>
                  <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200">
                    Reject Refund
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Report details modal
  const ReportDetailsModal = () => {
    if (!showReportDetails || !selectedReport) return null;

    // Dummy detailed report data
    const reportDetails = {
      salesByCategory: [
        { category: 'Single Origin', sales: 1250.50, percentage: 51 },
        { category: 'Blends', sales: 750.25, percentage: 31 },
        { category: 'Equipment', sales: 300.00, percentage: 12 },
        { category: 'Accessories', sales: 150.00, percentage: 6 },
      ],
      salesByMethod: [
        { method: 'Credit Card', sales: 1470.45, percentage: 60 },
        { method: 'bKash', sales: 735.23, percentage: 30 },
        { method: 'Cash on Delivery', sales: 245.07, percentage: 10 },
      ],
      topProducts: [
        { name: 'Ethiopian Yirgacheffe', sales: 425.50, units: 28 },
        { name: 'Colombian Supremo', sales: 375.25, units: 25 },
        { name: 'Guatemala Antigua', sales: 350.00, units: 23 },
        { name: 'Espresso Machine', sales: 300.00, units: 5 },
        { name: 'Paper Cups', sales: 150.00, units: 300 },
      ]
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity duration-300">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-95 animate-scaleIn">
          <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Sales Report Details</h2>
                <p className="text-gray-600">Period: {selectedReport.period}</p>
              </div>
              <button 
                onClick={() => setShowReportDetails(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <FaTimes size={24} />
              </button>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Total Sales</p>
                <p className="text-xl font-bold text-gray-800">${selectedReport.totalSales.toFixed(2)}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Total Orders</p>
                <p className="text-xl font-bold text-gray-800">{selectedReport.totalOrders}</p>
              </div>
              <div className="bg-amber-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Avg. Order Value</p>
                <p className="text-xl font-bold text-gray-800">${selectedReport.avgOrderValue.toFixed(2)}</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Top Product</p>
                <p className="text-xl font-bold text-gray-800">{selectedReport.topProduct}</p>
              </div>
            </div>

            {/* Sales by Category */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Sales by Category</h3>
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sales</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percentage</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {reportDetails.salesByCategory.map((item, index) => (
                      <tr key={index}>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{item.category}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">${item.sales.toFixed(2)}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{item.percentage}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Sales by Payment Method */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Sales by Payment Method</h3>
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Method</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sales</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percentage</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {reportDetails.salesByMethod.map((item, index) => (
                      <tr key={index}>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{item.method}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">${item.sales.toFixed(2)}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{item.percentage}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Top Products */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Selling Products</h3>
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sales</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Units Sold</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {reportDetails.topProducts.map((item, index) => (
                      <tr key={index}>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{item.name}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">${item.sales.toFixed(2)}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{item.units}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                onClick={() => setShowReportDetails(false)}
                className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
              >
                Close
              </button>
              <button className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors duration-200 flex items-center gap-2">
                <FaDownload />
                <span>Export Report</span>
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
        <h1 className="text-3xl font-bold text-gray-800">Payments Management</h1>
        <p className="text-gray-600">Manage payments, refunds, and sales reports</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6 flex items-center">
          <div className="mr-4 p-3 rounded-lg bg-green-100">
            <FaMoneyBillWave className="text-green-600 text-xl" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Revenue</p>
            <h3 className="text-2xl font-bold text-gray-800">${totalRevenue.toFixed(2)}</h3>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 flex items-center">
          <div className="mr-4 p-3 rounded-lg bg-yellow-100">
            <FaCreditCard className="text-yellow-600 text-xl" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Pending Payments</p>
            <h3 className="text-2xl font-bold text-gray-800">{pendingPayments}</h3>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 flex items-center">
          <div className="mr-4 p-3 rounded-lg bg-purple-100">
            <FaHandHoldingUsd className="text-purple-600 text-xl" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Refunded</p>
            <h3 className="text-2xl font-bold text-gray-800">${payments.reduce((sum, payment) => {
              return payment.status === 'Refunded' ? sum + payment.amount : sum;
            }, 0).toFixed(2)}</h3>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 flex items-center">
          <div className="mr-4 p-3 rounded-lg bg-red-100">
            <FaFileInvoice className="text-red-600 text-xl" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Pending Refunds</p>
            <h3 className="text-2xl font-bold text-gray-800">{pendingRefunds}</h3>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-2 px-4 font-medium text-sm ${activeTab === 'payments' ? 'text-amber-600 border-b-2 border-amber-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('payments')}
        >
          Payment History
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${activeTab === 'refunds' ? 'text-amber-600 border-b-2 border-amber-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('refunds')}
        >
          Refund Requests ({pendingRefunds})
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${activeTab === 'reports' ? 'text-amber-600 border-b-2 border-amber-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('reports')}
        >
          Sales Reports
        </button>
      </div>

      {/* Search and filter bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder={activeTab === 'payments' ? "Search payments..." : activeTab === 'refunds' ? "Search refunds..." : "Search reports..."}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          
          {activeTab === 'payments' && (
            <>
              <div className="relative w-full md:w-48">
                <select
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 appearance-none"
                  value={methodFilter}
                  onChange={(e) => setMethodFilter(e.target.value)}
                >
                  {paymentMethods.map((method) => (
                    <option key={method.value} value={method.value}>
                      {method.label}
                    </option>
                  ))}
                </select>
                <FaFilter className="absolute left-3 top-3 text-gray-400" />
              </div>
              
              <div className="relative w-full md:w-48">
                <select
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 appearance-none"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  {statusOptions.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
                <FaFilter className="absolute left-3 top-3 text-gray-400" />
              </div>
            </>
          )}
          
          {activeTab === 'refunds' && (
            <div className="relative w-full md:w-48">
              <select
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 appearance-none"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                {refundStatusOptions.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
              <FaFilter className="absolute left-3 top-3 text-gray-400" />
            </div>
          )}
        </div>
        
        {activeTab === 'reports' && (
          <button className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700">
            <FaDownload />
            <span>Generate New Report</span>
          </button>
        )}
      </div>

      {/* Content based on active tab */}
      {activeTab === 'payments' && (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.length > 0 ? (
                  currentItems.map((payment) => (
                    <tr key={payment.id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{payment.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{payment.orderId}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{payment.customer}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{payment.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${payment.amount.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getMethodBadge(payment.method)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(payment.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          className="text-amber-600 hover:text-amber-800 transition-colors duration-200 p-2 rounded-full hover:bg-amber-50"
                          onClick={() => handleViewPaymentDetails(payment)}
                          title="View Payment Details"
                        >
                          <FaEye />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="px-6 py-4 text-center text-sm text-gray-500">
                      No payments found
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
                    {Math.min(indexOfLastItem, filteredPayments.length)}
                  </span>{' '}
                  of <span className="font-medium">{filteredPayments.length}</span> results
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
      )}

      {activeTab === 'refunds' && (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Refund ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.length > 0 ? (
                  currentItems.map((refund) => (
                    <tr key={refund.id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{refund.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{refund.orderId}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{refund.customer}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{refund.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${refund.amount.toFixed(2)}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{refund.reason}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(refund.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          className="text-amber-600 hover:text-amber-800 transition-colors duration-200 p-2 rounded-full hover:bg-amber-50"
                          onClick={() => handleViewRefundDetails(refund)}
                          title="View Refund Details"
                        >
                          <FaEye />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="px-6 py-4 text-center text-sm text-gray-500">
                      No refunds found
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
                    {Math.min(indexOfLastItem, filteredRefunds.length)}
                  </span>{' '}
                  of <span className="font-medium">{filteredRefunds.length}</span> results
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
      )}

      {activeTab === 'reports' && (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Sales</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Orders</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg. Order Value</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Top Product</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.length > 0 ? (
                  currentItems.map((report) => (
                    <tr key={report.id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{report.period}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${report.totalSales.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{report.totalOrders}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${report.avgOrderValue.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{report.topProduct}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          className="text-amber-600 hover:text-amber-800 transition-colors duration-200 p-2 rounded-full hover:bg-amber-50"
                          onClick={() => handleViewReportDetails(report)}
                          title="View Report Details"
                        >
                          <FaEye />
                        </button>
                        <button 
                          className="text-blue-600 hover:text-blue-800 transition-colors duration-200 p-2 rounded-full hover:bg-blue-50 ml-1"
                          title="Download Report"
                        >
                          <FaDownload />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                      No reports found
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
                    {Math.min(indexOfLastItem, reports.length)}
                  </span>{' '}
                  of <span className="font-medium">{reports.length}</span> results
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
      )}

      {/* Modals */}
      <PaymentDetailsModal />
      <RefundDetailsModal />
      <ReportDetailsModal />
    </div>
  );
}

export default AdminPayments;