// FeatureCoffeeCard.js
import React from "react";
import { FaStar } from "react-icons/fa";

const FeatureCoffeeCard = ({ coffee }) => {
  return (
    <div className="  p-4 rounded-lg shadow-lg h-32">
      <div className="flex h-full">
        {/* Left side - Image */}
        <div className="flex-shrink-0 mr-4">
          <img 
            src={coffee.img} 
            alt={coffee.title} 
            className="w-16 h-16 object-contain"
          />
        </div>
        
        {/* Right side - Content */}
        <div className="flex-1 flex flex-col">
          <h3 className="text-xl font-bold text-[#D3D3D3] truncate">{coffee.title}</h3>
          <p className="text-gray-300 text-sm mt-1 flex-grow overflow-hidden">
            {coffee.desc}
          </p>
          
          {/* Bottom row - Client name and rating */}
          <div className="flex justify-between items-center mt-2">
            <p className="text-white font-medium truncate">{coffee.client}</p>
            <div className="flex items-center space-x-1 flex-shrink-0">
              <FaStar className="text-yellow-400" />
              <span className="text-white">{coffee.rating} / 5.0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureCoffeeCard;