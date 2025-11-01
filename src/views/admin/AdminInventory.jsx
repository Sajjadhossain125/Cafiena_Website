import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaEye, FaEdit, FaPlus, FaExclamationTriangle, FaBox, FaTruck, FaWarehouse, FaBell, FaChartLine, FaCog } from 'react-icons/fa';

function AdminInventory() {
  // Dummy data for inventory items
  const allInventoryItems = [
    { id: 1, name: 'Ethiopian Yirgacheffe Beans', category: 'Coffee Beans', currentStock: 45, minStock: 50, supplier: 'Global Coffee Co.', status: 'Low Stock', lastUpdated: '2023-06-10' },
    { id: 2, name: 'Colombian Supremo Beans', category: 'Coffee Beans', currentStock: 32, minStock: 30, supplier: 'South American Imports', status: 'In Stock', lastUpdated: '2023-06-12' },
    { id: 3, name: 'Paper Coffee Cups (8oz)', category: 'Packaging', currentStock: 1200, minStock: 1000, supplier: 'EcoPack Supplies', status: 'In Stock', lastUpdated: '2023-06-15' },
    { id: 4, name: 'Lids for 8oz Cups', category: 'Packaging', currentStock: 800, minStock: 1000, supplier: 'EcoPack Supplies', status: 'Low Stock', lastUpdated: '2023-06-10' },
    { id: 5, name: 'Espresso Machine Cleaner', category: 'Equipment', currentStock: 15, minStock: 10, supplier: 'BrewTech Solutions', status: 'In Stock', lastUpdated: '2023-06-05' },
    { id: 6, name: 'Guatemala Antigua Beans', category: 'Coffee Beans', currentStock: 28, minStock: 40, supplier: 'Central American Coffee', status: 'Low Stock', lastUpdated: '2023-06-11' },
    { id: 7, name: 'Paper Coffee Sleeves', category: 'Packaging', currentStock: 0, minStock: 500, supplier: 'EcoPack Supplies', status: 'Out of Stock', lastUpdated: '2023-06-01' },
    { id: 8, name: 'Milk Frothing Pitcher', category: 'Equipment', currentStock: 8, minStock: 5, supplier: 'BrewTech Solutions', status: 'In Stock', lastUpdated: '2023-06-08' },
    { id: 9, name: 'Brazilian Santos Beans', category: 'Coffee Beans', currentStock: 65, minStock: 60, supplier: 'South American Imports', status: 'In Stock', lastUpdated: '2023-06-14' },
    { id: 10, name: 'Paper Bags (1lb)', category: 'Packaging', currentStock: 300, minStock: 400, supplier: 'EcoPack Supplies', status: 'Low Stock', lastUpdated: '2023-06-09' },
  ];

  // Dummy data for suppliers
  const allSuppliers = [
    { id: 1, name: 'Global Coffee Co.', contact: 'James Wilson', email: 'james@globalcoffee.com', phone: '(555) 123-4567', products: 5, status: 'Active' },
    { id: 2, name: 'South American Imports', contact: 'Maria Garcia', email: 'maria@saimports.com', phone: '(555) 234-5678', products: 3, status: 'Active' },
    { id: 3, name: 'EcoPack Supplies', contact: 'David Chen', email: 'david@ecopack.com', phone: '(555) 345-6789', products: 4, status: 'Active' },
    { id: 4, name: 'BrewTech Solutions', contact: 'Sarah Johnson', email: 'sarah@brewtech.com', phone: '(555) 456-7890', products: 2, status: 'Active' },
    { id: 5, name: 'Central American Coffee', contact: 'Carlos Rodriguez', email: 'carlos@centramcoffee.com', phone: '(555) 567-8901', products: 2, status: 'Inactive' },
  ];

  // State management
  const [inventoryItems, setInventoryItems] = useState(allInventoryItems);
  const [suppliers, setSuppliers] = useState(allSuppliers);
  const [filteredItems, setFilteredItems] = useState(allInventoryItems);
  const [filteredSuppliers, setFilteredSuppliers] = useState(allSuppliers);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('inventory');
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [showItemDetails, setShowItemDetails] = useState(false);
  const [showSupplierDetails, setShowSupplierDetails] = useState(false);

  // Categories for filtering
  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'Coffee Beans', label: 'Coffee Beans' },
    { value: 'Packaging', label: 'Packaging' },
    { value: 'Equipment', label: 'Equipment' },
  ];

  // Status options
  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'In Stock', label: 'In Stock' },
    { value: 'Low Stock', label: 'Low Stock' },
    { value: 'Out of Stock', label: 'Out of Stock' },
  ];

  // Apply search and filter for inventory
  useEffect(() => {
    let results = allInventoryItems;
    
    // Apply search
    if (searchTerm) {
      results = results.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.supplier.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (categoryFilter !== 'all') {
      results = results.filter(item => item.category === categoryFilter);
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      results = results.filter(item => item.status === statusFilter);
    }
    
    setFilteredItems(results);
    setCurrentPage(1); // Reset to first page when filtering
  }, [searchTerm, categoryFilter, statusFilter]);

  // Apply search for suppliers
  useEffect(() => {
    let results = allSuppliers;
    
    // Apply search
    if (searchTerm) {
      results = results.filter(supplier =>
        supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.contact.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredSuppliers(results);
    setCurrentPage(1); // Reset to first page when filtering
  }, [searchTerm]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = activeTab === 'inventory' 
    ? filteredItems.slice(indexOfFirstItem, indexOfLastItem)
    : filteredSuppliers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = activeTab === 'inventory'
    ? Math.ceil(filteredItems.length / itemsPerPage)
    : Math.ceil(filteredSuppliers.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // View item details
  const handleViewItemDetails = (item) => {
    setSelectedItem(item);
    setShowItemDetails(true);
  };

  // View supplier details
  const handleViewSupplierDetails = (supplier) => {
    setSelectedSupplier(supplier);
    setShowSupplierDetails(true);
  };

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case 'In Stock':
        return <span className="px-2 py-1 text-xs font-semibold leading-tight text-green-700 bg-green-100 rounded-full">In Stock</span>;
      case 'Low Stock':
        return <span className="px-2 py-1 text-xs font-semibold leading-tight text-yellow-700 bg-yellow-100 rounded-full">Low Stock</span>;
      case 'Out of Stock':
        return <span className="px-2 py-1 text-xs font-semibold leading-tight text-red-700 bg-red-100 rounded-full">Out of Stock</span>;
      case 'Active':
        return <span className="px-2 py-1 text-xs font-semibold leading-tight text-green-700 bg-green-100 rounded-full">Active</span>;
      case 'Inactive':
        return <span className="px-2 py-1 text-xs font-semibold leading-tight text-red-700 bg-red-100 rounded-full">Inactive</span>;
      default:
        return <span className="px-2 py-1 text-xs font-semibold leading-tight text-gray-700 bg-gray-100 rounded-full">{status}</span>;
    }
  };

  // Calculate inventory stats
  const inStockCount = inventoryItems.filter(item => item.status === 'In Stock').length;
  const lowStockCount = inventoryItems.filter(item => item.status === 'Low Stock').length;
  const outOfStockCount = inventoryItems.filter(item => item.status === 'Out of Stock').length;
  const activeSuppliersCount = suppliers.filter(supplier => supplier.status === 'Active').length;

  // Get reorder alerts (items with low or out of stock)
  const reorderAlerts = inventoryItems.filter(item => 
    item.status === 'Low Stock' || item.status === 'Out of Stock'
  );

  // Item details modal
  const ItemDetailsModal = () => {
    if (!showItemDetails || !selectedItem) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity duration-300">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-95 animate-scaleIn">
          <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Inventory Item Details</h2>
                <p className="text-gray-600">ID: #{selectedItem.id}</p>
              </div>
              <button 
                onClick={() => setShowItemDetails(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <FaTimes size={24} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Item Information */}
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <FaBox className="text-amber-600" /> Item Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500">Name</p>
                    <p className="font-medium text-gray-800">{selectedItem.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Category</p>
                    <p className="font-medium text-gray-800">{selectedItem.category}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Status</p>
                    <div className="mt-1">{getStatusBadge(selectedItem.status)}</div>
                  </div>
                </div>
              </div>

              {/* Stock Information */}
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <FaWarehouse className="text-amber-600" /> Stock Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500">Current Stock</p>
                    <p className="font-medium text-gray-800">{selectedItem.currentStock} units</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Minimum Stock</p>
                    <p className="font-medium text-gray-800">{selectedItem.minStock} units</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Last Updated</p>
                    <p className="font-medium text-gray-800">{selectedItem.lastUpdated}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Supplier Information */}
            <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 mb-8">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FaTruck className="text-amber-600" /> Supplier Information
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500">Supplier</p>
                  <p className="font-medium text-gray-800">{selectedItem.supplier}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                onClick={() => setShowItemDetails(false)}
                className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
              >
                Close
              </button>
              <button className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors duration-200 flex items-center gap-2">
                <FaEdit />
                <span>Edit Item</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Supplier details modal
  const SupplierDetailsModal = () => {
    if (!showSupplierDetails || !selectedSupplier) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity duration-300">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-95 animate-scaleIn">
          <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Supplier Details</h2>
                <p className="text-gray-600">ID: #{selectedSupplier.id}</p>
              </div>
              <button 
                onClick={() => setShowSupplierDetails(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <FaTimes size={24} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Supplier Information */}
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <FaTruck className="text-amber-600" /> Supplier Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500">Name</p>
                    <p className="font-medium text-gray-800">{selectedSupplier.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Contact Person</p>
                    <p className="font-medium text-gray-800">{selectedSupplier.contact}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Status</p>
                    <div className="mt-1">{getStatusBadge(selectedSupplier.status)}</div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <FaCog className="text-amber-600" /> Contact Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="font-medium text-gray-800">{selectedSupplier.email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="font-medium text-gray-800">{selectedSupplier.phone}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Information */}
            <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 mb-8">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FaBox className="text-amber-600" /> Products Supplied
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500">Number of Products</p>
                  <p className="font-medium text-gray-800">{selectedSupplier.products} products</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                onClick={() => setShowSupplierDetails(false)}
                className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
              >
                Close
              </button>
              <button className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors duration-200 flex items-center gap-2">
                <FaEdit />
                <span>Edit Supplier</span>
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
        <h1 className="text-3xl font-bold text-gray-800">Inventory Management</h1>
        <p className="text-gray-600">Manage your warehouse stock levels and suppliers</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6 flex items-center">
          <div className="mr-4 p-3 rounded-lg bg-blue-100">
            <FaBox className="text-blue-600 text-xl" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Items</p>
            <h3 className="text-2xl font-bold text-gray-800">{inventoryItems.length}</h3>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 flex items-center">
          <div className="mr-4 p-3 rounded-lg bg-green-100">
            <FaChartLine className="text-green-600 text-xl" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">In Stock</p>
            <h3 className="text-2xl font-bold text-gray-800">{inStockCount}</h3>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 flex items-center">
          <div className="mr-4 p-3 rounded-lg bg-yellow-100">
            <FaExclamationTriangle className="text-yellow-600 text-xl" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Low Stock</p>
            <h3 className="text-2xl font-bold text-gray-800">{lowStockCount}</h3>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 flex items-center">
          <div className="mr-4 p-3 rounded-lg bg-purple-100">
            <FaTruck className="text-purple-600 text-xl" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Active Suppliers</p>
            <h3 className="text-2xl font-bold text-gray-800">{activeSuppliersCount}</h3>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-2 px-4 font-medium text-sm ${activeTab === 'inventory' ? 'text-amber-600 border-b-2 border-amber-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('inventory')}
        >
          Inventory
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${activeTab === 'suppliers' ? 'text-amber-600 border-b-2 border-amber-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('suppliers')}
        >
          Suppliers
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${activeTab === 'alerts' ? 'text-amber-600 border-b-2 border-amber-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('alerts')}
        >
          Reorder Alerts ({reorderAlerts.length})
        </button>
      </div>

      {/* Search and filter bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder={activeTab === 'inventory' ? "Search inventory..." : activeTab === 'suppliers' ? "Search suppliers..." : "Search alerts..."}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          
          {activeTab === 'inventory' && (
            <>
              <div className="relative w-full md:w-48">
                <select
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 appearance-none"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
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
        </div>
        
        {activeTab !== 'alerts' && (
          <button className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700">
            <FaPlus />
            <span>Add {activeTab === 'inventory' ? 'Item' : 'Supplier'}</span>
          </button>
        )}
      </div>

      {/* Content based on active tab */}
      {activeTab === 'inventory' && (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Stock</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Min Stock</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.length > 0 ? (
                  currentItems.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{item.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{item.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.currentStock}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.minStock}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.supplier}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(item.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          className="text-amber-600 hover:text-amber-800 transition-colors duration-200 p-2 rounded-full hover:bg-amber-50"
                          onClick={() => handleViewItemDetails(item)}
                          title="View Item Details"
                        >
                          <FaEye />
                        </button>
                        <button 
                          className="text-blue-600 hover:text-blue-800 transition-colors duration-200 p-2 rounded-full hover:bg-blue-50 ml-1"
                          title="Edit Item"
                        >
                          <FaEdit />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="px-6 py-4 text-center text-sm text-gray-500">
                      No inventory items found
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
                    {Math.min(indexOfLastItem, filteredItems.length)}
                  </span>{' '}
                  of <span className="font-medium">{filteredItems.length}</span> results
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

      {activeTab === 'suppliers' && (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Person</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.length > 0 ? (
                  currentItems.map((supplier) => (
                    <tr key={supplier.id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{supplier.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{supplier.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{supplier.contact}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{supplier.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{supplier.phone}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{supplier.products}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(supplier.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          className="text-amber-600 hover:text-amber-800 transition-colors duration-200 p-2 rounded-full hover:bg-amber-50"
                          onClick={() => handleViewSupplierDetails(supplier)}
                          title="View Supplier Details"
                        >
                          <FaEye />
                        </button>
                        <button 
                          className="text-blue-600 hover:text-blue-800 transition-colors duration-200 p-2 rounded-full hover:bg-blue-50 ml-1"
                          title="Edit Supplier"
                        >
                          <FaEdit />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="px-6 py-4 text-center text-sm text-gray-500">
                      No suppliers found
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
                    {Math.min(indexOfLastItem, filteredSuppliers.length)}
                  </span>{' '}
                  of <span className="font-medium">{filteredSuppliers.length}</span> results
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

      {activeTab === 'alerts' && (
        <div className="space-y-4">
          {reorderAlerts.length > 0 ? (
            reorderAlerts.map((alert) => (
              <div key={alert.id} className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-4 p-3 rounded-lg bg-yellow-100">
                      <FaExclamationTriangle className="text-yellow-600 text-xl" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{alert.name}</h3>
                      <p className="text-gray-600">Supplier: {alert.supplier}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="mb-2">{getStatusBadge(alert.status)}</div>
                    <p className="text-sm text-gray-600">
                      {alert.currentStock} / {alert.minStock} units
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <button className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors duration-200">
                    Reorder Now
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <FaBell className="text-green-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No Reorder Alerts</h3>
              <p className="text-gray-600">All inventory items are sufficiently stocked.</p>
            </div>
          )}
        </div>
      )}

      {/* Modals */}
      <ItemDetailsModal />
      <SupplierDetailsModal />
    </div>
  );
}

export default AdminInventory;