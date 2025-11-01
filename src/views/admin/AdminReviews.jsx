import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaEye, FaCheck, FaTimes, FaStar, FaChartBar, FaThumbsUp, FaThumbsDown, FaCalendarAlt } from 'react-icons/fa';

function AdminReviews() {
  // Dummy data for reviews
  const allReviews = [
    { id: 1, product: 'Ethiopian Yirgacheffe', customer: 'John Smith', rating: 5, review: 'Absolutely amazing coffee! The flavor profile is incredible with notes of blueberry and chocolate. Will definitely order again.', date: '2023-06-15', status: 'Pending' },
    { id: 2, product: 'Colombian Supremo', customer: 'Emma Wilson', rating: 4, review: 'Great coffee with a smooth taste. I enjoyed it but found it a bit mild for my preference. Still a quality product.', date: '2023-06-14', status: 'Approved' },
    { id: 3, product: 'Guatemala Antigua', customer: 'Michael Brown', rating: 3, review: 'Average coffee. Nothing special but decent for the price. The packaging was nice though.', date: '2023-06-14', status: 'Approved' },
    { id: 4, product: 'Sumatra Mandheling', customer: 'Sarah Davis', rating: 5, review: 'One of the best Sumatran coffees I\'ve tried. Rich, earthy flavors with a hint of spice. Perfect for my morning brew!', date: '2023-06-13', status: 'Pending' },
    { id: 5, product: 'Brazilian Santos', customer: 'Robert Johnson', rating: 2, review: 'Disappointed with this purchase. The coffee tasted stale and had no aroma. Not worth the money.', date: '2023-06-13', status: 'Rejected' },
    { id: 6, product: 'House Blend', customer: 'Jennifer Lee', rating: 4, review: 'Solid everyday coffee. Good value for money and consistent quality. My go-to morning brew.', date: '2023-06-12', status: 'Approved' },
    { id: 7, product: 'Espresso Roast', customer: 'David Miller', rating: 5, review: 'Perfect for espresso! Rich crema and bold flavor. Exactly what I was looking for.', date: '2023-06-12', status: 'Pending' },
    { id: 8, product: 'French Roast', customer: 'Lisa Anderson', rating: 4, review: 'Good dark roast with smoky notes. A bit too bitter for my taste but still quality coffee.', date: '2023-06-11', status: 'Approved' },
    { id: 9, product: 'Decaf Colombian', customer: 'James Taylor', rating: 3, review: 'As far as decaf goes, this is pretty good. Maintains good flavor without the caffeine.', date: '2023-06-11', status: 'Approved' },
    { id: 10, product: 'Flavored Vanilla', customer: 'Mary Thomas', rating: 1, review: 'Artificial tasting and overly sweet. Not what I expected from a specialty coffee roaster.', date: '2023-06-10', status: 'Rejected' },
  ];

  // State management
  const [reviews, setReviews] = useState(allReviews);
  const [filteredReviews, setFilteredReviews] = useState(allReviews);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedReview, setSelectedReview] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  // Status options
  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'Pending', label: 'Pending' },
    { value: 'Approved', label: 'Approved' },
    { value: 'Rejected', label: 'Rejected' },
  ];

  // Apply search and filter
  useEffect(() => {
    let results = allReviews;
    
    // Apply search
    if (searchTerm) {
      results = results.filter(review =>
        review.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.review.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      results = results.filter(review => review.status === statusFilter);
    }
    
    setFilteredReviews(results);
    setCurrentPage(1); // Reset to first page when filtering
  }, [searchTerm, statusFilter]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentReviews = filteredReviews.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredReviews.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // View review details
  const handleViewDetails = (review) => {
    setSelectedReview(review);
    setShowDetails(true);
  };

  // Approve review
  const handleApprove = (reviewId) => {
    const updatedReviews = reviews.map(review =>
      review.id === reviewId ? { ...review, status: 'Approved' } : review
    );
    setReviews(updatedReviews);
    
    // Update filtered reviews as well
    const updatedFilteredReviews = filteredReviews.map(review =>
      review.id === reviewId ? { ...review, status: 'Approved' } : review
    );
    setFilteredReviews(updatedFilteredReviews);
    
    // Update selected review if it's the one being viewed
    if (selectedReview && selectedReview.id === reviewId) {
      setSelectedReview({ ...selectedReview, status: 'Approved' });
    }
  };

  // Reject review
  const handleReject = (reviewId) => {
    const updatedReviews = reviews.map(review =>
      review.id === reviewId ? { ...review, status: 'Rejected' } : review
    );
    setReviews(updatedReviews);
    
    // Update filtered reviews as well
    const updatedFilteredReviews = filteredReviews.map(review =>
      review.id === reviewId ? { ...review, status: 'Rejected' } : review
    );
    setFilteredReviews(updatedFilteredReviews);
    
    // Update selected review if it's the one being viewed
    if (selectedReview && selectedReview.id === reviewId) {
      setSelectedReview({ ...selectedReview, status: 'Rejected' });
    }
  };

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending':
        return <span className="px-2 py-1 text-xs font-semibold leading-tight text-yellow-700 bg-yellow-100 rounded-full">Pending</span>;
      case 'Approved':
        return <span className="px-2 py-1 text-xs font-semibold leading-tight text-green-700 bg-green-100 rounded-full">Approved</span>;
      case 'Rejected':
        return <span className="px-2 py-1 text-xs font-semibold leading-tight text-red-700 bg-red-100 rounded-full">Rejected</span>;
      default:
        return <span className="px-2 py-1 text-xs font-semibold leading-tight text-gray-700 bg-gray-100 rounded-full">{status}</span>;
    }
  };

  // Render star rating
  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={i < rating ? 'text-amber-500' : 'text-gray-300'}
          />
        ))}
      </div>
    );
  };

  // Calculate ratings stats
  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(r => r.rating === rating).length,
    percentage: (reviews.filter(r => r.rating === rating).length / reviews.length) * 100
  }));

  const pendingReviews = reviews.filter(r => r.status === 'Pending').length;
  const approvedReviews = reviews.filter(r => r.status === 'Approved').length;
  const rejectedReviews = reviews.filter(r => r.status === 'Rejected').length;

  // Review details modal
  const ReviewDetailsModal = () => {
    if (!showDetails || !selectedReview) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity duration-300">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-95 animate-scaleIn">
          <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Review Details</h2>
                <p className="text-gray-600">Review ID: #{selectedReview.id}</p>
              </div>
              <button 
                onClick={() => setShowDetails(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <FaTimes size={24} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Review Information */}
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <FaStar className="text-amber-600" /> Review Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500">Product</p>
                    <p className="font-medium text-gray-800">{selectedReview.product}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Customer</p>
                    <p className="font-medium text-gray-800">{selectedReview.customer}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Rating</p>
                    <div className="mt-1">{renderStars(selectedReview.rating)}</div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Date</p>
                    <p className="font-medium text-gray-800">{selectedReview.date}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Status</p>
                    <div className="mt-1">{getStatusBadge(selectedReview.status)}</div>
                  </div>
                </div>
              </div>

              {/* Review Content */}
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <FaThumbsUp className="text-amber-600" /> Customer Feedback
                </h3>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <p className="text-gray-700">{selectedReview.review}</p>
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
              {selectedReview.status === 'Pending' && (
                <>
                  <button 
                    onClick={() => handleReject(selectedReview.id)}
                    className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center gap-2"
                  >
                    <FaTimes />
                    <span>Reject</span>
                  </button>
                  <button 
                    onClick={() => handleApprove(selectedReview.id)}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center gap-2"
                  >
                    <FaCheck />
                    <span>Approve</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Reviews & Feedback</h1>
        <p className="text-gray-600">Manage product reviews and customer feedback</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6 flex items-center">
          <div className="mr-4 p-3 rounded-lg bg-amber-100">
            <FaStar className="text-amber-600 text-xl" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Average Rating</p>
            <h3 className="text-2xl font-bold text-gray-800">{averageRating.toFixed(1)}</h3>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 flex items-center">
          <div className="mr-4 p-3 rounded-lg bg-yellow-100">
            <FaChartBar className="text-yellow-600 text-xl" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Pending Reviews</p>
            <h3 className="text-2xl font-bold text-gray-800">{pendingReviews}</h3>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 flex items-center">
          <div className="mr-4 p-3 rounded-lg bg-green-100">
            <FaThumbsUp className="text-green-600 text-xl" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Approved Reviews</p>
            <h3 className="text-2xl font-bold text-gray-800">{approvedReviews}</h3>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 flex items-center">
          <div className="mr-4 p-3 rounded-lg bg-red-100">
            <FaThumbsDown className="text-red-600 text-xl" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Rejected Reviews</p>
            <h3 className="text-2xl font-bold text-gray-800">{rejectedReviews}</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Reviews Table */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Product Reviews</h2>
          </div>
          
          {/* Search and filter bar */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search reviews..."
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
          </div>
          
          {/* Reviews Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentReviews.length > 0 ? (
                  currentReviews.map((review) => (
                    <tr key={review.id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{review.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{review.product}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{review.customer}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {renderStars(review.rating)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{review.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(review.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          className="text-amber-600 hover:text-amber-800 transition-colors duration-200 p-2 rounded-full hover:bg-amber-50"
                          onClick={() => handleViewDetails(review)}
                          title="View Review Details"
                        >
                          <FaEye />
                        </button>
                        {review.status === 'Pending' && (
                          <>
                            <button 
                              className="text-red-600 hover:text-red-800 transition-colors duration-200 p-2 rounded-full hover:bg-red-50 ml-1"
                              onClick={() => handleReject(review.id)}
                              title="Reject Review"
                            >
                              <FaTimes />
                            </button>
                            <button 
                              className="text-green-600 hover:text-green-800 transition-colors duration-200 p-2 rounded-full hover:bg-green-50 ml-1"
                              onClick={() => handleApprove(review.id)}
                              title="Approve Review"
                            >
                              <FaCheck />
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                      No reviews found
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
                    {Math.min(indexOfLastItem, filteredReviews.length)}
                  </span>{' '}
                  of <span className="font-medium">{filteredReviews.length}</span> results
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

        {/* Ratings Overview */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Ratings Overview</h2>
          </div>
          
          {/* Average Rating */}
          <div className="text-center mb-8">
            <div className="text-5xl font-bold text-gray-800 mb-2">{averageRating.toFixed(1)}</div>
            <div className="flex justify-center mb-2">
              {renderStars(Math.round(averageRating))}
            </div>
            <p className="text-gray-600">Based on {reviews.length} reviews</p>
          </div>
          
          {/* Rating Distribution */}
          <div className="space-y-4">
            {ratingDistribution.map((item) => (
              <div key={item.rating} className="flex items-center">
                <div className="w-10 text-sm text-gray-600">{item.rating} star</div>
                <div className="flex-1 mx-2">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-amber-600 h-2.5 rounded-full" 
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
                <div className="w-12 text-right text-sm text-gray-600">{item.count}</div>
              </div>
            ))}
          </div>
          
          {/* Recent Reviews Summary */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-4">Recent Reviews Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">This Week</span>
                <span className="text-sm font-medium text-gray-800">
                  {reviews.filter(r => r.date >= '2023-06-10').length} reviews
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">This Month</span>
                <span className="text-sm font-medium text-gray-800">
                  {reviews.filter(r => r.date.startsWith('2023-06')).length} reviews
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Average Response Time</span>
                <span className="text-sm font-medium text-gray-800">24 hours</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Review Details Modal */}
      <ReviewDetailsModal />
    </div>
  );
}

export default AdminReviews;