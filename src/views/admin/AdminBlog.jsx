import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaEye, FaEdit, FaTrash, FaPlus, FaNewspaper, FaFolder, FaCalendarAlt, FaUser, FaTag } from 'react-icons/fa';

function AdminBlog() {
  // Dummy data for blog posts
  const allPosts = [
    { id: 1, title: 'The Art of Pour-Over Coffee: A Complete Guide', author: 'Sarah Johnson', date: '2023-06-15', category: 'Brewing Guides', status: 'Published', excerpt: 'Learn the perfect technique for brewing pour-over coffee at home with our step-by-step guide.' },
    { id: 2, title: 'Exploring the Flavor Profiles of Single-Origin Coffees', author: 'Michael Chen', date: '2023-06-10', category: 'Coffee Education', status: 'Published', excerpt: 'Discover the unique taste characteristics of coffees from different regions around the world.' },
    { id: 3, title: 'Sustainable Coffee Farming Practices', author: 'Emma Rodriguez', date: '2023-06-05', category: 'Sustainability', status: 'Draft', excerpt: 'How sustainable farming practices are changing the coffee industry for the better.' },
    { id: 4, title: 'Cold Brew vs. Iced Coffee: What\'s the Difference?', author: 'David Kim', date: '2023-06-01', category: 'Brewing Guides', status: 'Published', excerpt: 'Understanding the key differences between cold brew and iced coffee and how to make each.' },
    { id: 5, title: 'The History of Coffee: From Ethiopia to Your Cup', author: 'Lisa Anderson', date: '2023-05-28', category: 'Coffee Education', status: 'Published', excerpt: 'A journey through time exploring how coffee became one of the world\'s most beloved beverages.' },
    { id: 6, title: 'Essential Coffee Brewing Equipment for Beginners', author: 'James Wilson', date: '2023-05-25', category: 'Brewing Guides', status: 'Draft', excerpt: 'A comprehensive guide to the must-have equipment for anyone starting their coffee brewing journey.' },
    { id: 7, title: 'Fair Trade Coffee: Impact on Farmers and Communities', author: 'Maria Garcia', date: '2023-05-20', category: 'Sustainability', status: 'Published', excerpt: 'How fair trade practices are improving the lives of coffee farmers and their communities.' },
    { id: 8, title: 'Coffee Tasting Like a Pro: Developing Your Palate', author: 'Robert Thompson', date: '2023-05-15', category: 'Coffee Education', status: 'Published', excerpt: 'Tips and techniques for training your palate to identify different flavors and aromas in coffee.' },
  ];

  // Dummy data for blog categories
  const allCategories = [
    { id: 1, name: 'Brewing Guides', description: 'Step-by-step guides for brewing methods', postCount: 3 },
    { id: 2, name: 'Coffee Education', description: 'Learn about coffee origins, processing, and more', postCount: 3 },
    { id: 3, name: 'Sustainability', description: 'Environmental and social impact of coffee', postCount: 2 },
    { id: 4, name: 'Product Reviews', description: 'Reviews of coffee equipment and accessories', postCount: 0 },
    { id: 5, name: 'Recipes', description: 'Coffee-based drink and food recipes', postCount: 0 },
  ];

  // State management
  const [posts, setPosts] = useState(allPosts);
  const [categories, setCategories] = useState(allCategories);
  const [filteredPosts, setFilteredPosts] = useState(allPosts);
  const [filteredCategories, setFilteredCategories] = useState(allCategories);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('posts');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  // Status options
  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'Published', label: 'Published' },
    { value: 'Draft', label: 'Draft' },
  ];

  // Apply search and filter for posts
  useEffect(() => {
    let results = allPosts;
    
    // Apply search
    if (searchTerm) {
      results = results.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      results = results.filter(post => post.status === statusFilter);
    }
    
    // Apply category filter
    if (categoryFilter !== 'all') {
      results = results.filter(post => post.category === categoryFilter);
    }
    
    setFilteredPosts(results);
    setCurrentPage(1);
  }, [searchTerm, statusFilter, categoryFilter]);

  // Apply search for categories
  useEffect(() => {
    let results = allCategories;
    
    if (searchTerm) {
      results = results.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredCategories(results);
    setCurrentPage(1);
  }, [searchTerm]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = activeTab === 'posts' 
    ? filteredPosts.slice(indexOfFirstItem, indexOfLastItem)
    : filteredCategories.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = activeTab === 'posts'
    ? Math.ceil(filteredPosts.length / itemsPerPage)
    : Math.ceil(filteredCategories.length / itemsPerPage);

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
      case 'Published':
        return <span className="px-2 py-1 text-xs font-semibold leading-tight text-green-700 bg-green-100 rounded-full">Published</span>;
      case 'Draft':
        return <span className="px-2 py-1 text-xs font-semibold leading-tight text-yellow-700 bg-yellow-100 rounded-full">Draft</span>;
      default:
        return <span className="px-2 py-1 text-xs font-semibold leading-tight text-gray-700 bg-gray-100 rounded-full">{status}</span>;
    }
  };

  // Calculate stats
  const totalPosts = posts.length;
  const publishedPosts = posts.filter(p => p.status === 'Published').length;
  const draftPosts = posts.filter(p => p.status === 'Draft').length;
  const totalCategories = categories.length;

  // Details modal
  const DetailsModal = () => {
    if (!showDetails || !selectedItem) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity duration-300">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-95 animate-scaleIn">
          <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {activeTab === 'posts' ? 'Post Details' : 'Category Details'}
                </h2>
                <p className="text-gray-600">ID: {selectedItem.id}</p>
              </div>
              <button 
                onClick={() => setShowDetails(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <FaTimes size={24} />
              </button>
            </div>

            {/* Content based on active tab */}
            {activeTab === 'posts' && (
              <div className="space-y-6">
                <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <FaNewspaper className="text-amber-600" /> Post Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Title</p>
                      <p className="font-medium text-gray-800">{selectedItem.title}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Author</p>
                      <p className="font-medium text-gray-800">{selectedItem.author}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Category</p>
                      <p className="font-medium text-gray-800">{selectedItem.category}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Status</p>
                      <div className="mt-1">{getStatusBadge(selectedItem.status)}</div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Publish Date</p>
                      <p className="font-medium text-gray-800">{selectedItem.date}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-3">Excerpt</h3>
                  <p className="text-gray-700">{selectedItem.excerpt}</p>
                </div>

                <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-3">Content Preview</h3>
                  <div className="prose max-w-none text-gray-700">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'categories' && (
              <div className="space-y-6">
                <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <FaFolder className="text-amber-600" /> Category Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Category Name</p>
                      <p className="font-medium text-gray-800">{selectedItem.name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Post Count</p>
                      <p className="font-medium text-gray-800">{selectedItem.postCount} posts</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-3">Description</h3>
                  <p className="text-gray-700">{selectedItem.description}</p>
                </div>

                <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-3">Recent Posts in This Category</h3>
                  <div className="space-y-3">
                    {posts
                      .filter(post => post.category === selectedItem.name)
                      .slice(0, 3)
                      .map(post => (
                        <div key={post.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                          <div>
                            <h4 className="font-medium text-gray-800">{post.title}</h4>
                            <p className="text-sm text-gray-600">By {post.author} • {post.date}</p>
                          </div>
                          {getStatusBadge(post.status)}
                        </div>
                      ))}
                    {posts.filter(post => post.category === selectedItem.name).length === 0 && (
                      <p className="text-gray-600">No posts in this category yet.</p>
                    )}
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
        <h1 className="text-3xl font-bold text-gray-800">Blog Management</h1>
        <p className="text-gray-600">Manage blog posts and categories</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6 flex items-center">
          <div className="mr-4 p-3 rounded-lg bg-blue-100">
            <FaNewspaper className="text-blue-600 text-xl" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Posts</p>
            <h3 className="text-2xl font-bold text-gray-800">{totalPosts}</h3>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 flex items-center">
          <div className="mr-4 p-3 rounded-lg bg-green-100">
            <FaUser className="text-green-600 text-xl" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Published</p>
            <h3 className="text-2xl font-bold text-gray-800">{publishedPosts}</h3>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 flex items-center">
          <div className="mr-4 p-3 rounded-lg bg-yellow-100">
            <FaEdit className="text-yellow-600 text-xl" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Drafts</p>
            <h3 className="text-2xl font-bold text-gray-800">{draftPosts}</h3>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 flex items-center">
          <div className="mr-4 p-3 rounded-lg bg-purple-100">
            <FaFolder className="text-purple-600 text-xl" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Categories</p>
            <h3 className="text-2xl font-bold text-gray-800">{totalCategories}</h3>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-2 px-4 font-medium text-sm ${activeTab === 'posts' ? 'text-amber-600 border-b-2 border-amber-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('posts')}
        >
          Blog Posts
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${activeTab === 'categories' ? 'text-amber-600 border-b-2 border-amber-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('categories')}
        >
          Categories
        </button>
      </div>

      {/* Search and filter bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder={activeTab === 'posts' ? "Search posts..." : "Search categories..."}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          
          {activeTab === 'posts' && (
            <>
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
              
              <div className="relative w-full md:w-48">
                <select
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 appearance-none"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <FaFilter className="absolute left-3 top-3 text-gray-400" />
              </div>
            </>
          )}
        </div>
        
        <button className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700">
          <FaPlus />
          <span>Add {activeTab === 'posts' ? 'Post' : 'Category'}</span>
        </button>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'posts' && (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.length > 0 ? (
                  currentItems.map((post) => (
                    <tr key={post.id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{post.id}</td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{post.title}</div>
                        <div className="text-sm text-gray-500 max-w-xs truncate">{post.excerpt}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{post.author}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{post.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{post.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(post.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          className="text-amber-600 hover:text-amber-800 transition-colors duration-200 p-2 rounded-full hover:bg-amber-50"
                          onClick={() => handleViewDetails(post)}
                          title="View Post Details"
                        >
                          <FaEye />
                        </button>
                        <button 
                          className="text-blue-600 hover:text-blue-800 transition-colors duration-200 p-2 rounded-full hover:bg-blue-50 ml-1"
                          title="Edit Post"
                        >
                          <FaEdit />
                        </button>
                        <button 
                          className="text-red-600 hover:text-red-800 transition-colors duration-200 p-2 rounded-full hover:bg-red-50 ml-1"
                          title="Delete Post"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                      No posts found
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
                    {Math.min(indexOfLastItem, filteredPosts.length)}
                  </span>{' '}
                  of <span className="font-medium">{filteredPosts.length}</span> results
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

      {activeTab === 'categories' && (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Post Count</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.length > 0 ? (
                  currentItems.map((category) => (
                    <tr key={category.id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{category.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{category.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-700 max-w-xs">{category.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{category.postCount}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          className="text-amber-600 hover:text-amber-800 transition-colors duration-200 p-2 rounded-full hover:bg-amber-50"
                          onClick={() => handleViewDetails(category)}
                          title="View Category Details"
                        >
                          <FaEye />
                        </button>
                        <button 
                          className="text-blue-600 hover:text-blue-800 transition-colors duration-200 p-2 rounded-full hover:bg-blue-50 ml-1"
                          title="Edit Category"
                        >
                          <FaEdit />
                        </button>
                        <button 
                          className="text-red-600 hover:text-red-800 transition-colors duration-200 p-2 rounded-full hover:bg-red-50 ml-1"
                          title="Delete Category"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                      No categories found
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
                    {Math.min(indexOfLastItem, filteredCategories.length)}
                  </span>{' '}
                  of <span className="font-medium">{filteredCategories.length}</span> results
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

export default AdminBlog;