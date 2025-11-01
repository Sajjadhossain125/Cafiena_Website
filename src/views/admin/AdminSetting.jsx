import React, { useState } from 'react';
import { FaStore, FaShippingFast, FaMoneyBillWave, FaUsers, FaSave, FaEdit, FaTrash, FaPlus, FaMapMarkerAlt, FaUserShield, FaUserCog } from 'react-icons/fa';

function AdminSettings() {
  // State for active tab
  const [activeTab, setActiveTab] = useState('shop');

  // State for shop settings
  const [shopSettings, setShopSettings] = useState({
    storeName: 'Coffee House',
    storeEmail: 'info@coffeehouse.com',
    storePhone: '(123) 456-7890',
    storeAddress: '123 Coffee Street, Brewtown',
    storeLogo: null,
    storeDescription: 'Premium coffee beans and brewing equipment for coffee enthusiasts.',
    currency: 'USD',
    timezone: 'America/New_York',
  });

  // State for shipping settings
  const [shippingSettings, setShippingSettings] = useState({
    freeShippingThreshold: 50,
    standardShippingRate: 5.99,
    expressShippingRate: 12.99,
    deliveryZones: [
      { id: 1, name: 'Local', rate: 0, deliveryTime: '1-2 days' },
      { id: 2, name: 'National', rate: 5.99, deliveryTime: '3-5 days' },
      { id: 3, name: 'International', rate: 15.99, deliveryTime: '7-14 days' },
    ],
  });

  // State for tax settings
  const [taxSettings, setTaxSettings] = useState({
    taxRate: 8.5,
    taxIncluded: false,
    taxRegions: [
      { id: 1, name: 'Default', rate: 8.5 },
      { id: 2, name: 'California', rate: 9.25 },
      { id: 3, name: 'New York', rate: 8.875 },
    ],
  });

  // State for admin users
  const [adminUsers, setAdminUsers] = useState([
    { id: 1, name: 'John Smith', email: 'john@coffeehouse.com', role: 'Super Admin', lastLogin: '2023-06-15', status: 'Active' },
    { id: 2, name: 'Emma Wilson', email: 'emma@coffeehouse.com', role: 'Staff', lastLogin: '2023-06-14', status: 'Active' },
    { id: 3, name: 'Michael Brown', email: 'michael@coffeehouse.com', role: 'Staff', lastLogin: '2023-06-10', status: 'Inactive' },
    { id: 4, name: 'Sarah Davis', email: 'sarah@coffeehouse.com', role: 'Manager', lastLogin: '2023-06-12', status: 'Active' },
  ]);

  // Handle shop settings changes
  const handleShopSettingsChange = (e) => {
    const { name, value } = e.target;
    setShopSettings(prev => ({ ...prev, [name]: value }));
  };

  // Handle shipping settings changes
  const handleShippingSettingsChange = (e) => {
    const { name, value } = e.target;
    setShippingSettings(prev => ({ ...prev, [name]: value }));
  };

  // Handle tax settings changes
  const handleTaxSettingsChange = (e) => {
    const { name, value } = e.target;
    setTaxSettings(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would save the settings to your backend
    alert('Settings saved successfully!');
  };

  // Get role badge
  const getRoleBadge = (role) => {
    switch (role) {
      case 'Super Admin':
        return <span className="px-2 py-1 text-xs font-semibold leading-tight text-purple-700 bg-purple-100 rounded-full">Super Admin</span>;
      case 'Manager':
        return <span className="px-2 py-1 text-xs font-semibold leading-tight text-blue-700 bg-blue-100 rounded-full">Manager</span>;
      case 'Staff':
        return <span className="px-2 py-1 text-xs font-semibold leading-tight text-green-700 bg-green-100 rounded-full">Staff</span>;
      default:
        return <span className="px-2 py-1 text-xs font-semibold leading-tight text-gray-700 bg-gray-100 rounded-full">{role}</span>;
    }
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

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
        <p className="text-gray-600">Manage your store settings, shipping, taxes, and admin users</p>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            className={`py-4 px-6 font-medium text-sm flex items-center gap-2 ${activeTab === 'shop' ? 'text-amber-600 border-b-2 border-amber-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('shop')}
          >
            <FaStore />
            <span>Shop Settings</span>
          </button>
          <button
            className={`py-4 px-6 font-medium text-sm flex items-center gap-2 ${activeTab === 'shipping' ? 'text-amber-600 border-b-2 border-amber-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('shipping')}
          >
            <FaShippingFast />
            <span>Shipping Settings</span>
          </button>
          <button
            className={`py-4 px-6 font-medium text-sm flex items-center gap-2 ${activeTab === 'tax' ? 'text-amber-600 border-b-2 border-amber-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('tax')}
          >
            <FaMoneyBillWave />
            <span>Taxes & Pricing</span>
          </button>
          <button
            className={`py-4 px-6 font-medium text-sm flex items-center gap-2 ${activeTab === 'users' ? 'text-amber-600 border-b-2 border-amber-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('users')}
          >
            <FaUsers />
            <span>Admin Users</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* Shop Settings */}
          {activeTab === 'shop' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Shop Settings</h2>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
                    <input
                      type="text"
                      name="storeName"
                      value={shopSettings.storeName}
                      onChange={handleShopSettingsChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Store Email</label>
                    <input
                      type="email"
                      name="storeEmail"
                      value={shopSettings.storeEmail}
                      onChange={handleShopSettingsChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Store Phone</label>
                    <input
                      type="tel"
                      name="storePhone"
                      value={shopSettings.storePhone}
                      onChange={handleShopSettingsChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Store Address</label>
                    <input
                      type="text"
                      name="storeAddress"
                      value={shopSettings.storeAddress}
                      onChange={handleShopSettingsChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                    <select
                      name="currency"
                      value={shopSettings.currency}
                      onChange={handleShopSettingsChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                    >
                      <option value="USD">US Dollar (USD)</option>
                      <option value="EUR">Euro (EUR)</option>
                      <option value="GBP">British Pound (GBP)</option>
                      <option value="CAD">Canadian Dollar (CAD)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
                    <select
                      name="timezone"
                      value={shopSettings.timezone}
                      onChange={handleShopSettingsChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                    >
                      <option value="America/New_York">Eastern Time (US & Canada)</option>
                      <option value="America/Chicago">Central Time (US & Canada)</option>
                      <option value="America/Denver">Mountain Time (US & Canada)</option>
                      <option value="America/Los_Angeles">Pacific Time (US & Canada)</option>
                    </select>
                  </div>
                </div>
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Store Description</label>
                  <textarea
                    name="storeDescription"
                    value={shopSettings.storeDescription}
                    onChange={handleShopSettingsChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                  ></textarea>
                </div>
                <div className="mt-8 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 flex items-center gap-2"
                  >
                    <FaSave />
                    <span>Save Settings</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Shipping Settings */}
          {activeTab === 'shipping' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Shipping Settings</h2>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Free Shipping Threshold</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
                      <input
                        type="number"
                        name="freeShippingThreshold"
                        value={shippingSettings.freeShippingThreshold}
                        onChange={handleShippingSettingsChange}
                        min="0"
                        step="0.01"
                        className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Standard Shipping Rate</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
                      <input
                        type="number"
                        name="standardShippingRate"
                        value={shippingSettings.standardShippingRate}
                        onChange={handleShippingSettingsChange}
                        min="0"
                        step="0.01"
                        className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Express Shipping Rate</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
                      <input
                        type="number"
                        name="expressShippingRate"
                        value={shippingSettings.expressShippingRate}
                        onChange={handleShippingSettingsChange}
                        min="0"
                        step="0.01"
                        className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
                    <FaMapMarkerAlt className="text-amber-600" />
                    <span>Delivery Zones</span>
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Zone Name</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivery Time</th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {shippingSettings.deliveryZones.map((zone) => (
                          <tr key={zone.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{zone.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${zone.rate.toFixed(2)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{zone.deliveryTime}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button className="text-blue-600 hover:text-blue-900">
                                <FaEdit />
                              </button>
                              <button className="text-red-600 hover:text-red-900 ml-2">
                                <FaTrash />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4">
                    <button className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 flex items-center gap-2">
                      <FaPlus />
                      <span>Add Zone</span>
                    </button>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 flex items-center gap-2"
                  >
                    <FaSave />
                    <span>Save Settings</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Tax Settings */}
          {activeTab === 'tax' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Taxes & Pricing</h2>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Default Tax Rate (%)</label>
                    <div className="relative">
                      <input
                        type="number"
                        name="taxRate"
                        value={taxSettings.taxRate}
                        onChange={handleTaxSettingsChange}
                        min="0"
                        max="100"
                        step="0.01"
                        className="w-full pr-8 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                      />
                      <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">%</span>
                    </div>
                  </div>
                  <div className="flex items-end">
                    <div className="flex items-center h-5">
                      <input
                        id="taxIncluded"
                        name="taxIncluded"
                        type="checkbox"
                        checked={taxSettings.taxIncluded}
                        onChange={(e) => setTaxSettings(prev => ({ ...prev, taxIncluded: e.target.checked }))}
                        className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="taxIncluded" className="font-medium text-gray-700">
                        Prices include tax
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Tax Regions</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Region Name</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tax Rate (%)</th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {taxSettings.taxRegions.map((region) => (
                          <tr key={region.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{region.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{region.rate}%</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button className="text-blue-600 hover:text-blue-900">
                                <FaEdit />
                              </button>
                              <button className="text-red-600 hover:text-red-900 ml-2">
                                <FaTrash />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4">
                    <button className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 flex items-center gap-2">
                      <FaPlus />
                      <span>Add Region</span>
                    </button>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 flex items-center gap-2"
                  >
                    <FaSave />
                    <span>Save Settings</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Admin Users */}
          {activeTab === 'users' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Admin Users</h2>
                <button className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 flex items-center gap-2">
                  <FaPlus />
                  <span>Add User</span>
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {adminUsers.map((user) => (
                      <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getRoleBadge(user.role)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.lastLogin}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(user.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900">
                            <FaEdit />
                          </button>
                          <button className="text-red-600 hover:text-red-900 ml-2">
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminSettings;