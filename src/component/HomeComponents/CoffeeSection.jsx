import React, { useState } from "react";
import videoBg from "../../assets/coffee-dummy-data/video3.mp4";
import { Heart, Eye, Zap } from "lucide-react";
import ProductPopup from "./ProductPopup";
import { useCountdownTimer } from "../../lib/time"; // Import the custom hook
import { CiClock2 } from "react-icons/ci";
import CoffeeCountry from "./CoffeeCountry";


// CoffeeCard component remains the same
const CoffeeCard = ({ product, timeLeft, onOpenPopup }) => {
  const handleEyeClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Eye icon clicked");
    onOpenPopup();
  };
  return (
    <div className="bg-[#624A3D]/70 backdrop-blur-sm border border-white/20 rounded-xl p-3 sm:p-4 
                    w-full h-auto sm:h-[225px] flex flex-col sm:flex-row 
                    items-center sm:items-start gap-3 sm:gap-4 shadow-md relative">
      {/* Top-left column: Discount + NEW badge */}
      <div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex flex-col gap-2 z-10">
        {product.discount && (
          <div className="bg-white/80 text-[#262626] text-xs font-semibold px-2 sm:px-3 py-1 rounded-full">
            {product.discount}
          </div>
        )}
        {product.badge === "NEW" && (
          <div className="bg-white/80 text-[#262626] text-xs font-semibold px-2 sm:px-3 py-1 rounded-full">
            {product.badge}
          </div>
        )}
      </div>
      {/* Product Image */}
      <div className="flex-shrink-0 flex justify-center items-center w-full sm:w-[140px] h-[120px] sm:h-[180px] relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://placehold.co/140x180/cccccc/000000?text=Image+Not+Found";
          }}
        />
      </div>
      {/* Right Info */}
      <div className="flex flex-col justify-between flex-1 w-full h-full py-1 sm:py-2">
        {/* Action Icons */}
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 flex flex-col gap-2 z-10">
          <button className="p-1 hover:bg-white/10 rounded-md transition">
            <Heart size={16} className="text-white" />
          </button>
          <button className="p-1 hover:bg-white/10 rounded-md transition">
            <Zap size={16} className="text-white" />
          </button>
          <button
            onClick={handleEyeClick}
            className="p-1 hover:bg-white/10 rounded-md transition"
            aria-label="View product details"
          >
            <Eye size={16} className="text-white" />
          </button>
        </div>
        {/* Brand */}
        <p className="text-white text-xs font-normal">{product.brand}</p>
        {/* Name */}
        <h3 className="text-[#E2C6A0] text-base sm:text-lg font-bold truncate uppercase">
          {product.name}
        </h3>
        {/* Category */}
        <p className="text-white text-xs">{product.category}</p>
        {/* Variant */}
        <div className="relative my-1 sm:my-2 w-full sm:w-[150px]">
          <select className="w-full bg-transparent text-white px-3 py-1.5 rounded-full border border-white/40 appearance-none cursor-pointer text-xs">
            <option>{product.selectedColor}</option>
          </select>
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg width="12" height="7" viewBox="0 0 14 8" fill="none">
              <path d="M1 1L7 7L13 1" stroke="white" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
        {/* Price + Timer */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-1 sm:mt-0 gap-2">
          <div className="flex flex-col">
            {product.originalPrice && (
              <p className="text-gray-300 text-xs line-through">
                {product.originalPrice}
              </p>
            )}
            <p className="text-white text-sm font-bold">{product.price}</p>
          </div>
          {product.isSoldOut ? (
            <span className="text-gray-300 text-xs font-semibold">+ SOLD OUT</span>
          ) : (
            <button className="bg-white text-black px-2 sm:px-3 py-1.5 rounded-md hover:bg-gray-200 transition text-xs font-semibold">
              + ADD TO CART
            </button>
          )}
        </div>
        {/* Timer (only if hasTimer = true) */}
       {product.hasTimer && timeLeft && (
  <div className="mt-2 bg-white px-4 py-1 flex items-center justify-center gap-2 rounded-md text-sm text-gray-800 font-semibold shadow-sm">
    <CiClock2 size={20}/>
    <span>{timeLeft.days}d</span>
    <span>{timeLeft.hours}h</span>
    <span>{timeLeft.minutes}m</span>
    <span>{timeLeft.seconds}s</span>
  </div>
)}

      </div>
    </div>
  );
};

const CoffeeSection = () => {
  // Use the custom hook for countdown timer
  const timeLeft = useCountdownTimer(259, 22, 16, 4);
  
  // Popup state
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Product data
  const products = [
    {
      id: 1,
      image: "https://cdn.shopify.com/s/files/1/0700/3193/3753/products/81Ae5UPtIUL._AC_SL1500_-removebg-preview.png?v=1672651238",
      name: "Bean Envy...",
      brand: "Bean",
      category: "Accessories",
      selectedColor: "White",
      price: "500.00 USD",
      discount: "-17%",
      originalPrice: "600.00 USD",
      isSoldOut: false,
      hasTimer: false,
      badge: "NEW"
    },
    {
      id: 2,
      image: "https://cdn.shopify.com/s/files/1/0700/3193/3753/products/1_92c03663-844a-453b-8ddf-d9f371256c19.png?v=1672644683",
      name: "Burr Coffee...",
      brand: "1Zpresso",
      category: "Grinder",
      selectedColor: "Red",
      price: "356.00 USD",
      discount: "-11%",
      originalPrice: "400.00 USD",
      isSoldOut: false,
      hasTimer: true
    }
  ];

  // Handler for popup
  const handleOpenPopup = (product) => {
    console.log(`Opening popup for product`, product);
    setSelectedProduct(product);
  };

  return (
    <section>
      <div className="relative overflow-hidden rounded-xl my-7 md:my-12">
      {/* Background Video */}
      <div className="absolute inset-0 flex justify-center">
        <div className="w-full max-w-7xl h-full">
          <video
            className="w-full h-full object-cover rounded-2xl"
            src={videoBg}
            autoPlay
            loop
            muted
            playsInline
          />
        </div>
      </div>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>
      {/* Content */}
      <div className="relative py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6 items-center">
            
            {/* Left Text Content */}
            <div className="text-white space-y-4">
              <p className="text-sm uppercase tracking-wide">Coffee</p>
              <h2 className="text-3xl md:text-4xl font-bold">The best coffee</h2>
              <p className="text-base opacity-90">
                As the coffee shop market becomes more popular, the number of
                cafe websites is growing. The internet and social media play an
                important role in finding new customers.
              </p>
              <a
                href="#"
                className="inline-block underline font-semibold hover:text-gray-200 transition-colors"
              >
                Show Products
              </a>
            </div>
            {/* Right Side - Product Cards using CoffeeCard component */}
            <div className="md:col-span-2 flex flex-col sm:flex-row gap-4 sm:gap-6">
              {products.map((product) => (
                <div key={product.id} className="flex-1">
                  <CoffeeCard
                    product={product}
                    timeLeft={product.hasTimer ? timeLeft : null}
                    onOpenPopup={() => handleOpenPopup(product)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Product Popup */}
      {selectedProduct && (
        <ProductPopup 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
      
    </div>
    <CoffeeCountry/>
    </section>
    
  );
};

export default CoffeeSection;