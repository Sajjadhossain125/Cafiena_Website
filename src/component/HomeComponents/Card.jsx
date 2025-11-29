// Card.js (updated with hover effect)
import React from "react";
import { Heart, Eye, Zap } from "lucide-react";

const Card = ({ product, onOpenPopup }) => {
  const handleEyeClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Eye icon clicked");
    onOpenPopup();
  };

  return (
    <div className="card-hover bg-[#40342F] rounded-xl p-3 sm:p-4 w-full h-auto sm:h-[225px] flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 shadow-md relative">
      {/* Top-left column: Discount + NEW badge */}
      <div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex flex-col gap-2 z-10">
        {product.discount && (
          <div className="bg-white text-[#262626] text-xs font-semibold px-2 sm:px-3 py-1 rounded-full">
            {product.discount}
          </div>
        )}
        {product.badge === "NEW" && (
          <div className="bg-white text-[#262626] text-xs font-semibold px-2 sm:px-3 py-1 rounded-full">
            {product.badge}
          </div>
        )}
      </div>

      {/* Left: Product Image */}
      <div className="flex-shrink-0 flex justify-center items-center w-full sm:w-[140px] h-[120px] sm:h-[180px] relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/140x180/cccccc/000000?text=Image+Not+Found";
          }}
        />
      </div>

      {/* Right: Info */}
      <div className="flex flex-col justify-between flex-1 w-full h-full py-1 sm:py-2">
        {/* Action Icons (top-right, vertical order) */}
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 flex flex-col gap-2 z-10">
          <button className="p-1 hover:bg-white/10 rounded-md transition">
            <Heart size={16} className="text-white" />
          </button>
          <button className="p-1 hover:bg-white/10 rounded-md transition">
            <Zap size={16} className="text-white" />
          </button>
          {/* Eye icon triggers popup */}
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

        {/* Product Name */}
        <h3 className="text-[#E2C6A0] text-base sm:text-lg font-bold truncate uppercase">
          {product.name}
        </h3>

        {/* Category */}
        <p className="text-white text-xs">{product.category}</p>

        {/* Variant Selector */}
        <div className="relative my-1 sm:my-2 w-full sm:w-[150px]">
          <select className="w-full bg-[#40342F] text-white px-3 py-1.5 rounded-full border border-white/30 appearance-none cursor-pointer text-xs">
            <option>{product.selectedColor}</option>
          </select>
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg width="12" height="7" viewBox="0 0 14 8" fill="none">
              <path d="M1 1L7 7L13 1" stroke="white" strokeWidth="1.5" />
            </svg>
          </div>
        </div>

        {/* Price Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-1 sm:mt-0 gap-2">
          {/* Prices stacked */}
          <div className="flex flex-col">
            {product.originalPrice && (
              <p className="text-gray-400 text-xs line-through">{product.originalPrice}</p>
            )}
            <p className="text-white text-sm font-bold">{product.price}</p>
          </div>

          {product.isSoldOut ? (
            <span className="text-gray-400 text-xs font-semibold">+ SOLD OUT</span>
          ) : (
            <button className="bg-white text-black px-2 sm:px-3 py-1.5 rounded-md hover:bg-gray-200 transition text-xs font-semibold">
              + ADD TO CART
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
