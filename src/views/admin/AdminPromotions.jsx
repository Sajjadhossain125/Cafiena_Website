import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaEye, FaEdit, FaTrash, FaPlus, FaGift, FaCalendarAlt, FaPercent, FaTag, FaImage, FaTimes } from 'react-icons/fa';

function AdminPromotions() {
  // Dummy data for coupons
  const allCoupons = [
    { id: 'CPN-001', code: 'ESPRESSO20', discount: 20, type: 'Percentage', minOrder: 25, maxDiscount: 10, usageLimit: 100, usedCount: 45, status: 'Active', validUntil: '2023-12-31' },
    { id: 'CPN-002', code: 'COFFEE10', discount: 10, type: 'Percentage', minOrder: 15, maxDiscount: 5, usageLimit: 50, usedCount: 23, status: 'Active', validUntil: '2023-11-30' },
    { id: 'CPN-003', code: 'FIRST5', discount: 5, type: 'Fixed Amount', minOrder: 20, maxDiscount: 0, usageLimit: 200, usedCount: 87, status: 'Active', validUntil: '2023-10-31' },
    { id: 'CPN-004', code: 'SUMMER15', discount: 15, type: 'Percentage', minOrder: 30, maxDiscount: 15, usageLimit: 75, usedCount: 75, status: 'Expired', validUntil: '2023-06-30' },
    { id: 'CPN-005', code: 'WEEKEND', discount: 7, type: 'Fixed Amount', minOrder: 25, maxDiscount: 0, usageLimit: 150, usedCount: 32, status: 'Inactive', validUntil: '2023-09-30' },
  ];

  // Dummy data for gift cards
  const allGiftCards = [
    { id: 'GC-001', code: 'GIFT123456789', value: 25.00, balance: 25.00, purchaser: 'John Smith', recipient: 'Emma Wilson', purchaseDate: '2023-06-10', status: 'Active', expiryDate: '2024-06-10' },
    { id: 'GC-002', code: 'GIFT987654321', value: 50.00, balance: 32.50, purchaser: 'Michael Brown', recipient: 'Sarah Davis', purchaseDate: '2023-05-15', status: 'Active', expiryDate: '2024-05-15' },
    { id: 'GC-003', code: 'GIFT456789123', value: 75.00, balance: 0.00, purchaser: 'Robert Johnson', recipient: 'Jennifer Lee', purchaseDate: '2023-04-20', status: 'Used', expiryDate: '2024-04-20' },
    { id: 'GC-004', code: 'GIFT789123456', value: 100.00, balance: 100.00, purchaser: 'David Miller', recipient: 'Lisa Anderson', purchaseDate: '2023-06-01', status: 'Active', expiryDate: '2024-06-01' },
    { id: 'GC-005', code: 'GIFT321654987', value: 30.00, balance: 30.00, purchaser: 'James Taylor', recipient: 'Mary Thomas', purchaseDate: '2023-03-10', status: 'Expired', expiryDate: '2023-03-10' },
  ];

  // Dummy data for campaigns
  const allCampaigns = [
    { id: 1, name: 'Summer Coffee Festival', startDate: '2023-06-01', endDate: '2023-06-30', type: 'Seasonal', status: 'Active', budget: 500.00, spent: 320.50, description: 'Special discounts on all summer blends' },
    { id: 2, name: 'Ramadan Special', startDate: '2023-03-22', endDate: '2023-04-21', type: 'Holiday', status: 'Completed', budget: 750.00, spent: 742.30, description: 'Exclusive offers during Ramadan month' },
    { id: 3, name: 'New Year Sale', startDate: '2023-01-01', endDate: '2023-01-15', type: 'Holiday', status: 'Completed', budget: 1000.00, spent: 985.75, description: 'Start the year with great coffee deals' },
    { id: 4, name: 'Back to School', startDate: '2023-08-15', endDate: '2023-09-15', type: 'Seasonal', status: 'Scheduled', budget: 600.00, spent: 0.00, description: 'Special offers for students and teachers' },
    { id: 5, name: 'Black Friday', startDate: '2023-11-24', endDate: '2023-11-27', type: 'Holiday', status: 'Scheduled', budget: 1500.00, spent: 0.00, description: 'Biggest sale of the year' },
  ];

  // Dummy data for banners
  const allBanners = [
    { id: 1, title: 'Summer Coffee Festival', image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80', position: 'Homepage Slider', status: 'Active', startDate: '2023-06-01', endDate: '2023-06-30', link: '/summer-festival' },
    { id: 2, title: 'New Ethiopian Yirgacheffe', image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80', position: 'Product Page', status: 'Active', startDate: '2023-05-15', endDate: '2023-07-15', link: '/products/ethiopian-yirgacheffe' },
    { id: 3, title: 'Ramadan Special Offers', image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80', position: 'Homepage Slider', status: 'Inactive', startDate: '2023-03-22', endDate: '2023-04-21', link: '/ramadan-special' },
    { id: 4, title: 'Gift Cards for Coffee Lovers', image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80', position: 'Category Page', status: 'Active', startDate: '2023-05-01', endDate: '2023-08-31', link: '/gift-cards' },
    { id: 5, title: 'New Year Sale', image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80', position: 'Homepage Slider', status: 'Expired', startDate: '2023-01-01', endDate: '2023-01-15', link: '/new-year-sale' },
  ];

  // State management
  const [coupons, setCoupons] = useState(allCoupons);
  const [giftCards, setGiftCards] = useState(allGiftCards);
  const [campaigns, setCampaigns] = useState(allCampaigns);
  const [banners, setBanners] = useState(allBanners);
  const [filteredCoupons, setFilteredCoupons] = useState(allCoupons);
  const [filteredGiftCards, setFilteredGiftCards] = useState(allGiftCards);
  const [filteredCampaigns, setFilteredCampaigns] = useState(allCampaigns);
  const [filteredBanners, setFilteredBanners] = useState(allBanners);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('coupons');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Status options
  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
    { value: 'Expired', label: 'Expired' },
    { value: 'Used', label: 'Used' },
    { value: 'Completed', label: 'Completed' },
    { value: 'Scheduled', label: 'Scheduled' },
  ];

  // Apply search and filter for coupons
  useEffect(() => {
    let results = allCoupons;
    
    if (searchTerm) {
      results = results.filter(coupon =>
        coupon.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coupon.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== 'all') {
      results = results.filter(coupon => coupon.status === statusFilter);
    }
    
    setFilteredCoupons(results);
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  // Apply search and filter for gift cards
  useEffect(() => {
    let results = allGiftCards;
    
    if (searchTerm) {
      results = results.filter(card =>
        card.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.purchaser.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.recipient.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== 'all') {
      results = results.filter(card => card.status === statusFilter);
    }
    
    setFilteredGiftCards(results);
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  // Apply search and filter for campaigns
  useEffect(() => {
    let results = allCampaigns;
    
    if (searchTerm) {
      results = results.filter(campaign =>
        campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        campaign.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== 'all') {
      results = results.filter(campaign => campaign.status === statusFilter);
    }
    
    setFilteredCampaigns(results);
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  // Apply search and filter for banners
  useEffect(() => {
    let results = allBanners;
    
    if (searchTerm) {
      results = results.filter(banner =>
        banner.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        banner.position.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== 'all') {
      results = results.filter(banner => banner.status === statusFilter);
    }
    
    setFilteredBanners(results);
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = activeTab === 'coupons' 
    ? filteredCoupons.slice(indexOfFirstItem, indexOfLastItem)
    : activeTab === 'giftCards'
      ? filteredGiftCards.slice(indexOfFirstItem, indexOfLastItem)
      : activeTab === 'campaigns'
        ? filteredCampaigns.slice(indexOfFirstItem, indexOfLastItem)
        : filteredBanners.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = activeTab === 'coupons'
    ? Math.ceil(filteredCoupons.length / itemsPerPage)
    : activeTab === 'giftCards'
      ? Math.ceil(filteredGiftCards.length / itemsPerPage)
      : activeTab === 'campaigns'
        ? Math.ceil(filteredCampaigns.length / itemsPerPage)
        : Math.ceil(filteredBanners.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // View item details
  const handleViewDetails = (item) => {
    setSelectedItem(item);
    setShowDetails(true);
  };

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active':
        return <span className="px-2 py-1 text-xs font-semibold leading-tight text-green-700 bg-green-100 rounded-full">Active</span>;
      case 'Inactive':
        return <span className="px-2 py-1 text-xs font-semibold leading-tight text-gray-700 bg-gray-100 rounded-full">Inactive</span>;
      case 'Expired':
        return <span className="px-2 py-1 text-xs font-semibold leading-tight text-red-700 bg-red-100 rounded-full">Expired</span>;
      case 'Used':
        return <span className="px-2 py-1 text-xs font-semibold leading-tight text-blue-700 bg-blue-100 rounded-full">Used</span>;
      case 'Completed':
        return <span className="px-2 py-1 text-xs font-semibold leading-tight text-purple-700 bg-purple-100 rounded-full">Completed</span>;
      case 'Scheduled':
        return <span className="px-2 py-1 text-xs font-semibold leading-tight text-yellow-700 bg-yellow-100 rounded-full">Scheduled</span>;
      default:
        return <span className="px-2 py-1 text-xs font-semibold leading-tight text-gray-700 bg-gray-100 rounded-full">{status}</span>;
    }
  };

  // Calculate stats
  const activeCoupons = coupons.filter(c => c.status === 'Active').length;
  const activeGiftCards = giftCards.filter(g => g.status === 'Active').length;
  const activeCampaigns = campaigns.filter(c => c.status === 'Active').length;
  const activeBanners = banners.filter(b => b.status === 'Active').length;

  // Details modal
  const DetailsModal = () => {
    if (!showDetails || !selectedItem) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity duration-300">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-95 animate-scaleIn">
          <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {activeTab === 'coupons' ? 'Coupon Details' :
                   activeTab === 'giftCards' ? 'Gift Card Details' :
                   activeTab === 'campaigns' ? 'Campaign Details' : 'Banner Details'}
                </h2>
                <p className="text-gray-600">ID: {selectedItem.id || selectedItem.code || `#${selectedItem.id}`}</p>
              </div>
              <button 
                onClick={() => setShowDetails(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <FaTimes size={24} />
              </button>
            </div>

            {/* Content based on active tab */}
            {activeTab === 'coupons' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                    <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <FaPercent className="text-amber-600" /> Coupon Information
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-gray-500">Coupon Code</p>
                        <p className="font-medium text-gray-800">{selectedItem.code}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Discount</p>
                        <p className="font-medium text-gray-800">{selectedItem.discount}{selectedItem.type === 'Percentage' ? '%' : ' fixed amount'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Minimum Order</p>
                        <p className="font-medium text-gray-800">${selectedItem.minOrder}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Status</p>
                        <div className="mt-1">{getStatusBadge(selectedItem.status)}</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                    <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <FaCalendarAlt className="text-amber-600" /> Usage Information
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-gray-500">Usage Limit</p>
                        <p className="font-medium text-gray-800">{selectedItem.usageLimit}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Used Count</p>
                        <p className="font-medium text-gray-800">{selectedItem.usedCount}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Remaining</p>
                        <p className="font-medium text-gray-800">{selectedItem.usageLimit - selectedItem.usedCount}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Valid Until</p>
                        <p className="font-medium text-gray-800">{selectedItem.validUntil}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'giftCards' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                    <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <FaGift className="text-amber-600" /> Gift Card Information
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-gray-500">Gift Card Code</p>
                        <p className="font-medium text-gray-800">{selectedItem.code}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Initial Value</p>
                        <p className="font-medium text-gray-800">${selectedItem.value.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Current Balance</p>
                        <p className="font-medium text-gray-800">${selectedItem.balance.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Status</p>
                        <div className="mt-1">{getStatusBadge(selectedItem.status)}</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                    <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <FaCalendarAlt className="text-amber-600" /> Purchase Information
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-gray-500">Purchaser</p>
                        <p className="font-medium text-gray-800">{selectedItem.purchaser}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Recipient</p>
                        <p className="font-medium text-gray-800">{selectedItem.recipient}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Purchase Date</p>
                        <p className="font-medium text-gray-800">{selectedItem.purchaseDate}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Expiry Date</p>
                        <p className="font-medium text-gray-800">{selectedItem.expiryDate}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'campaigns' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                    <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <FaCalendarAlt className="text-amber-600" /> Campaign Information
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-gray-500">Campaign Name</p>
                        <p className="font-medium text-gray-800">{selectedItem.name}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Type</p>
                        <p className="font-medium text-gray-800">{selectedItem.type}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Start Date</p>
                        <p className="font-medium text-gray-800">{selectedItem.startDate}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">End Date</p>
                        <p className="font-medium text-gray-800">{selectedItem.endDate}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Status</p>
                        <div className="mt-1">{getStatusBadge(selectedItem.status)}</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                    <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <FaTag className="text-amber-600" /> Budget Information
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-gray-500">Total Budget</p>
                        <p className="font-medium text-gray-800">${selectedItem.budget.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Amount Spent</p>
                        <p className="font-medium text-gray-800">${selectedItem.spent.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Remaining Budget</p>
                        <p className="font-medium text-gray-800">${(selectedItem.budget - selectedItem.spent).toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Budget Utilization</p>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                          <div 
                            className="bg-amber-600 h-2.5 rounded-full" 
                            style={{ width: `${(selectedItem.spent / selectedItem.budget) * 100}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">{Math.round((selectedItem.spent / selectedItem.budget) * 100)}%</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-3">Description</h3>
                  <p className="text-gray-700">{selectedItem.description}</p>
                </div>
              </div>
            )}

            {activeTab === 'banners' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                    <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <FaImage className="text-amber-600" /> Banner Information
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-gray-500">Banner Title</p>
                        <p className="font-medium text-gray-800">{selectedItem.title}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Position</p>
                        <p className="font-medium text-gray-800">{selectedItem.position}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Status</p>
                        <div className="mt-1">{getStatusBadge(selectedItem.status)}</div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Link</p>
                        <p className="font-medium text-gray-800">{selectedItem.link}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                    <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <FaCalendarAlt className="text-amber-600" /> Schedule Information
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-gray-500">Start Date</p>
                        <p className="font-medium text-gray-800">{selectedItem.startDate}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">End Date</p>
                        <p className="font-medium text-gray-800">{selectedItem.endDate}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-3">Banner Preview</h3>
                  <div className="rounded-lg overflow-hidden">
                    <img 
                      src={selectedItem.image} 
                      alt={selectedItem.title} 
                      className="w-full h-48 object-cover"
                    />
                  </div>
                </div>
              </div>
            )}

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
                <span>Edit</span>
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
        <h1 className="text-3xl font-bold text-gray-800">Promotions & Marketing</h1>
        <p className="text-gray-600">Manage coupons, gift cards, campaigns, and banners</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6 flex items-center">
          <div className="mr-4 p-3 rounded-lg bg-green-100">
            <FaPercent className="text-green-600 text-xl" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Active Coupons</p>
            <h3 className="text-2xl font-bold text-gray-800">{activeCoupons}</h3>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 flex items-center">
          <div className="mr-4 p-3 rounded-lg bg-blue-100">
            <FaGift className="text-blue-600 text-xl" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Active Gift Cards</p>
            <h3 className="text-2xl font-bold text-gray-800">{activeGiftCards}</h3>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 flex items-center">
          <div className="mr-4 p-3 rounded-lg bg-purple-100">
            <FaCalendarAlt className="text-purple-600 text-xl" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Active Campaigns</p>
            <h3 className="text-2xl font-bold text-gray-800">{activeCampaigns}</h3>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 flex items-center">
          <div className="mr-4 p-3 rounded-lg bg-amber-100">
            <FaImage className="text-amber-600 text-xl" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Active Banners</p>
            <h3 className="text-2xl font-bold text-gray-800">{activeBanners}</h3>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-2 px-4 font-medium text-sm ${activeTab === 'coupons' ? 'text-amber-600 border-b-2 border-amber-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('coupons')}
        >
          Coupons
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${activeTab === 'giftCards' ? 'text-amber-600 border-b-2 border-amber-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('giftCards')}
        >
          Gift Cards
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${activeTab === 'campaigns' ? 'text-amber-600 border-b-2 border-amber-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('campaigns')}
        >
          Campaigns
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${activeTab === 'banners' ? 'text-amber-600 border-b-2 border-amber-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('banners')}
        >
          Banners
        </button>
      </div>

      {/* Search and filter bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder={activeTab === 'coupons' ? "Search coupons..." : 
                         activeTab === 'giftCards' ? "Search gift cards..." : 
                         activeTab === 'campaigns' ? "Search campaigns..." : "Search banners..."}
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
              {statusOptions.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
            <FaFilter className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>
        
        <button className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700">
          <FaPlus />
          <span>Add {activeTab === 'coupons' ? 'Coupon' : 
                   activeTab === 'giftCards' ? 'Gift Card' : 
                   activeTab === 'campaigns' ? 'Campaign' : 'Banner'}</span>
        </button>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'coupons' && (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discount</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Min Order</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usage</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valid Until</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.length > 0 ? (
                  currentItems.map((coupon) => (
                    <tr key={coupon.id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{coupon.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{coupon.code}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{coupon.discount}{coupon.type === 'Percentage' ? '%' : ' fixed'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${coupon.minOrder}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{coupon.usedCount}/{coupon.usageLimit}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{coupon.validUntil}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(coupon.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          className="text-amber-600 hover:text-amber-800 transition-colors duration-200 p-2 rounded-full hover:bg-amber-50"
                          onClick={() => handleViewDetails(coupon)}
                          title="View Coupon Details"
                        >
                          <FaEye />
                        </button>
                        <button 
                          className="text-blue-600 hover:text-blue-800 transition-colors duration-200 p-2 rounded-full hover:bg-blue-50 ml-1"
                          title="Edit Coupon"
                        >
                          <FaEdit />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="px-6 py-4 text-center text-sm text-gray-500">
                      No coupons found
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
                    {Math.min(indexOfLastItem, filteredCoupons.length)}
                  </span>{' '}
                  of <span className="font-medium">{filteredCoupons.length}</span> results
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

      {activeTab === 'giftCards' && (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purchaser</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recipient</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.length > 0 ? (
                  currentItems.map((card) => (
                    <tr key={card.id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{card.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{card.code}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${card.value.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${card.balance.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{card.purchaser}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{card.recipient}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(card.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          className="text-amber-600 hover:text-amber-800 transition-colors duration-200 p-2 rounded-full hover:bg-amber-50"
                          onClick={() => handleViewDetails(card)}
                          title="View Gift Card Details"
                        >
                          <FaEye />
                        </button>
                        <button 
                          className="text-blue-600 hover:text-blue-800 transition-colors duration-200 p-2 rounded-full hover:bg-blue-50 ml-1"
                          title="Edit Gift Card"
                        >
                          <FaEdit />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="px-6 py-4 text-center text-sm text-gray-500">
                      No gift cards found
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
                    {Math.min(indexOfLastItem, filteredGiftCards.length)}
                  </span>{' '}
                  of <span className="font-medium">{filteredGiftCards.length}</span> results
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

      {activeTab === 'campaigns' && (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.length > 0 ? (
                  currentItems.map((campaign) => (
                    <tr key={campaign.id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{campaign.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{campaign.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{campaign.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{campaign.startDate} - {campaign.endDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${campaign.spent.toFixed(2)} / ${campaign.budget.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(campaign.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          className="text-amber-600 hover:text-amber-800 transition-colors duration-200 p-2 rounded-full hover:bg-amber-50"
                          onClick={() => handleViewDetails(campaign)}
                          title="View Campaign Details"
                        >
                          <FaEye />
                        </button>
                        <button 
                          className="text-blue-600 hover:text-blue-800 transition-colors duration-200 p-2 rounded-full hover:bg-blue-50 ml-1"
                          title="Edit Campaign"
                        >
                          <FaEdit />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                      No campaigns found
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
                    {Math.min(indexOfLastItem, filteredCampaigns.length)}
                  </span>{' '}
                  of <span className="font-medium">{filteredCampaigns.length}</span> results
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

      {activeTab === 'banners' && (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Link</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.length > 0 ? (
                  currentItems.map((banner) => (
                    <tr key={banner.id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{banner.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{banner.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{banner.position}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{banner.startDate} - {banner.endDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{banner.link}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(banner.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          className="text-amber-600 hover:text-amber-800 transition-colors duration-200 p-2 rounded-full hover:bg-amber-50"
                          onClick={() => handleViewDetails(banner)}
                          title="View Banner Details"
                        >
                          <FaEye />
                        </button>
                        <button 
                          className="text-blue-600 hover:text-blue-800 transition-colors duration-200 p-2 rounded-full hover:bg-blue-50 ml-1"
                          title="Edit Banner"
                        >
                          <FaEdit />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                      No banners found
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
                    {Math.min(indexOfLastItem, filteredBanners.length)}
                  </span>{' '}
                  of <span className="font-medium">{filteredBanners.length}</span> results
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

      {/* Details Modal */}
      <DetailsModal />
    </div>
  );
}

export default AdminPromotions;