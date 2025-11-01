import React, { useState } from 'react';
import { FaSave, FaTimes, FaUpload, FaStar, FaWeight, FaGlobeAmericas, FaFire } from 'react-icons/fa';

function AdminProductsNew() {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'single-origin',
    price: '',
    stock: '',
    status: 'active',
    weight: '',
    origin: '',
    roastLevel: 'medium',
    image: null,
    imagePreview: null,
    featured: false,
    tags: '',
  });

  // Categories for coffee products
  const categories = [
    { id: 'single-origin', name: 'Single Origin' },
    { id: 'blend', name: 'Blend' },
    { id: 'decaf', name: 'Decaf' },
    { id: 'flavored', name: 'Flavored' },
    { id: 'organic', name: 'Organic' },
    { id: 'espresso', name: 'Espresso' },
  ];

  // Roast levels
  const roastLevels = [
    { id: 'light', name: 'Light' },
    { id: 'medium', name: 'Medium' },
    { id: 'medium-dark', name: 'Medium-Dark' },
    { id: 'dark', name: 'Dark' },
  ];

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
        imagePreview: URL.createObjectURL(file),
      });
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would normally send the data to your API
    console.log('Product data:', formData);
    alert('Product added successfully!');
    // Reset form after submission
    setFormData({
      name: '',
      description: '',
      category: 'single-origin',
      price: '',
      stock: '',
      status: 'active',
      weight: '',
      origin: '',
      roastLevel: 'medium',
      image: null,
      imagePreview: null,
      featured: false,
      tags: '',
    });
  };

  // Handle form reset
  const handleReset = () => {
    setFormData({
      name: '',
      description: '',
      category: 'single-origin',
      price: '',
      stock: '',
      status: 'active',
      weight: '',
      origin: '',
      roastLevel: 'medium',
      image: null,
      imagePreview: null,
      featured: false,
      tags: '',
    });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Add New Product</h1>
        <p className="text-gray-600">Create a new coffee product for your store</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Basic Information */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b">Basic Information</h2>
            
            <div className="space-y-6">
              {/* Product Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                  placeholder="e.g., Ethiopian Yirgacheffe"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                  placeholder="Describe the coffee's flavor profile, origin, and characteristics..."
                  required
                ></textarea>
              </div>

              {/* Category and Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                    required
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                    Status *
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                    required
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              {/* Price and Stock */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                    Price ($) *
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                    placeholder="0.00"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
                    Stock Quantity *
                  </label>
                  <input
                    type="number"
                    id="stock"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                    placeholder="0"
                    required
                  />
                </div>
              </div>

              {/* Coffee Specific Details */}
              <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-6 pb-2 border-b">Coffee Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
                    Weight (g) *
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      id="weight"
                      name="weight"
                      value={formData.weight}
                      onChange={handleInputChange}
                      min="0"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                      placeholder="250"
                      required
                    />
                    <FaWeight className="absolute left-3 top-3 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label htmlFor="origin" className="block text-sm font-medium text-gray-700 mb-1">
                    Origin *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="origin"
                      name="origin"
                      value={formData.origin}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                      placeholder="e.g., Ethiopia"
                      required
                    />
                    <FaGlobeAmericas className="absolute left-3 top-3 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label htmlFor="roastLevel" className="block text-sm font-medium text-gray-700 mb-1">
                    Roast Level *
                  </label>
                  <div className="relative">
                    <select
                      id="roastLevel"
                      name="roastLevel"
                      value={formData.roastLevel}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500 appearance-none"
                      required
                    >
                      {roastLevels.map((roast) => (
                        <option key={roast.id} value={roast.id}>
                          {roast.name}
                        </option>
                      ))}
                    </select>
                    <FaFire className="absolute left-3 top-3 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                  Tags
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                  placeholder="e.g., fruity, chocolate, nutty (comma separated)"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Image and Options */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b">Product Image</h2>
            
            {/* Image Upload */}
            <div className="mb-8">
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                {formData.imagePreview ? (
                  <div className="mb-4">
                    <img 
                      src={formData.imagePreview} 
                      alt="Product preview" 
                      className="w-48 h-48 object-cover rounded-lg mx-auto"
                    />
                  </div>
                ) : (
                  <div className="mb-4">
                    <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center mx-auto">
                      <span className="text-gray-400">No Image</span>
                    </div>
                  </div>
                )}
                
                <label className="cursor-pointer bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition flex items-center">
                  <FaUpload className="mr-2" />
                  <span>Upload Image</span>
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleImageUpload}
                  />
                </label>
                <p className="mt-2 text-sm text-gray-500">JPG, PNG, GIF up to 5MB</p>
              </div>
            </div>

            {/* Product Options */}
            <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b">Product Options</h2>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                />
                <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">
                  Feature this product on homepage
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="mt-8 pt-6 border-t flex justify-end space-x-4">
          <button
            type="button"
            onClick={handleReset}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center"
          >
            <FaTimes className="mr-2" />
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 flex items-center"
          >
            <FaSave className="mr-2" />
            Save Product
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminProductsNew;