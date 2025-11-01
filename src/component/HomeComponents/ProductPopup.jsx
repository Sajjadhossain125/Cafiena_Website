// ProductPopup.js (updated)
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
import { IoIosCloseCircle } from "react-icons/io";
import { BiCartAdd } from "react-icons/bi";



export default function ProductPopup({ onClose, product }) {
  const [selectedColor, setSelectedColor] = useState(product.selectedColor || 'Black');
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Use product data or fallback to default
  const productData = {
    name: product.name || "Veken Coffee Canister",
    description: product.description || "Allow food to stay fresh longer, safe, and convenient for packaging. With a lid to keep moisture away from the food inside the bean canister.",
    colors: product.colors || [
      { name: "Black", image: product.image, thumbnail: product.image },
      { name: "Grey", image: product.image, thumbnail: product.image },
      { name: "White", image: product.image, thumbnail: product.image },
      { name: "Brown", image: product.image, thumbnail: product.image },
    ],
    price: {
      current: parseFloat(product.price?.replace(/[^0-9.]/g, '')) || 653.00,
      original: parseFloat(product.originalPrice?.replace(/[^0-9.]/g, '')) || 700.00
    },
    additionalImages: product.additionalImages || [
      product.image,
      product.image,
      product.image
    ],
    discount: product.discount || null // Add discount property
  };
  
  // Filter images based on the selected color
  const getDisplayImages = () => {
    const selectedColorData = productData.colors.find(color => color.name === selectedColor);
    return selectedColorData ? [selectedColorData.image, ...productData.additionalImages] : [];
  };
  
  const displayImages = getDisplayImages();
  
  // Handlers for quantity change
  const handleQuantityChange = (delta) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };
  
  // Handlers for image navigation
  const handleNextImage = () => {
    setCurrentImageIndex(prev => (prev + 1) % displayImages.length);
  };
  
  const handlePrevImage = () => {
    setCurrentImageIndex(prev => (prev - 1 + displayImages.length) % displayImages.length);
  };
  
  // Effect to reset image index when color changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [selectedColor]);
  
  // Effect to ensure image loads when popup opens
  useEffect(() => {
    setCurrentImageIndex(0);
  }, []);
  
  // Close popup when pressing Escape key
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);
  
  // Create portal root if it doesn't exist
  useEffect(() => {
    if (!document.getElementById('portal-root')) {
      const portalRoot = document.createElement('div');
      portalRoot.id = 'portal-root';
      document.body.appendChild(portalRoot);
    }
  }, []);
  
  const portalRoot = document.getElementById('portal-root');
  
  if (!portalRoot) return null;
  
  return ReactDOM.createPortal(
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 z-50  transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Popup Content */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto font-inter">
        <div 
          className="relative bg-[#A7897B] text-black rounded-xl shadow-2xl max-w-5xl w-full flex flex-col lg:flex-row p-6 md:p-8 transform transition-all duration-300 scale-95 md:scale-100"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-black hover:text-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded-full p-1 z-10"
            aria-label="Close"
          >
         <IoIosCloseCircle size={40}/>
          </button>
          
          {/* Product Image Section */}
          <div className="relative flex-1 flex items-center justify-center p-4 md:p-8  lg:mr-8 mb-6 lg:mb-0 aspect-w-1 aspect-h-1 max-h-[500px]">
            {displayImages.length > 0 && (
              <img
                key={currentImageIndex} // Force re-render when index changes
                src={displayImages[currentImageIndex]}
                alt={`${productData.name} - ${selectedColor}`}
                className="max-h-full max-w-full object-contain rounded-md"
                onError={(e) => { 
                  e.target.onerror = null; 
                  e.target.src="https://placehold.co/600x600/cccccc/000000?text=Image+Not+Found"; 
                }}
              />
            )}
            
            {/* Image Navigation Arrows */}
            {displayImages.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-800 bg-opacity-60 hover:bg-opacity-80 rounded-full p-2 text-white focus:outline-none z-10"
                  aria-label="Previous image"
                >
                 <MdKeyboardDoubleArrowLeft size={20}/>
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-800 bg-opacity-60 hover:bg-opacity-80 rounded-full p-2 text-white focus:outline-none z-10"
                  aria-label="Next image"
                >
                 <MdKeyboardDoubleArrowRight size={20} />
                </button>
              </>
            )}
          </div>
          
          {/* Product Details Section */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              {/* Discount Badge - only show if product has discount */}
              {productData.discount && (
                <div className="bg-white text-[#262626] text-xs font-semibold px-3 py-1 rounded-full inline-block mb-4">
                  {productData.discount}
                </div>
              )}
              
              <h2 className="text-3xl md:text-4xl font-bold mb-3 leading-tight font-inter">
                {productData.name}
              </h2>
              <p className="text-black font-semibold mb-6 text-sm md:text-base font-inter">
                {productData.description}
              </p>
              
              {/* Color Selection */}
          {/* Color Selection */}
<div className="mb-6 font-inter">
  <p className="text-sm font-medium mb-2">Color: <span className="font-semibold">{selectedColor}</span></p>
  <div className="flex space-x-3">
    {productData.colors.map((color) => (
      <button
        key={color.name}
        onClick={() => setSelectedColor(color.name)}
        className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 focus:outline-none
          ${selectedColor === color.name 
            ? 'border-white' 
            : 'border-black hover:border-white'}`}
        aria-label={`Select ${color.name} color`}
      >
        <img
          src={color.thumbnail}
          alt={color.name}
          className="w-full h-full object-cover"
          onError={(e) => { 
            e.target.onerror = null; 
            e.target.src="https://placehold.co/60x60/cccccc/000000?text=Color"; 
          }}
        />
      </button>
    ))}
  </div>
</div>
              
              {/* Price */}
              <div className="flex items-baseline mb-6 font-inter">
                <span className="text-4xl font-bold text-black mr-3">${productData.price.current.toFixed(2)} USD</span>
                <span className="text-xl text-black line-through">${productData.price.original.toFixed(2)} USD</span>
              </div>
            </div>
            
            {/* Quantity and Add to Cart */}
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-6 pt-6 border-t border-gray-400">
              {/* Add to Cart Button */}
              <button
                onClick={() => console.log(`Added ${quantity} of ${selectedColor} ${productData.name} to cart.`)}
                className="flex items-center justify-center px-6 py-3 bg-[#1B1C1D] text-white rounded-full shadow-md hover:bg-gray-800 transition duration-300 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-opacity-75 w-full sm:w-auto font-inter text-lg font-medium"
              >
                Add To Cart
                <BiCartAdd size={30}/>
              </button>
              
              {/* Quantity Selector */}
              <div className="flex items-center  rounded-full border border-bg-gray-500/50 px-2 py-1 shadow-inner font-inter text-black">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="px-3 py-1 text-gray-600 hover:text-black focus:outline-none"
                  aria-label="Decrease quantity"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                  </svg>
                </button>
                <span className="text-xl font-semibold px-4 w-16 text-center">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="px-3 py-1 text-gray-600 hover:text-black focus:outline-none"
                  aria-label="Increase quantity"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>,
    portalRoot
  );
}