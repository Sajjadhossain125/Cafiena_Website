// AppProduct.jsx - Enhanced Mobile Responsive Version
import React, { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

function AppProduct({ isMobile = false, onBack }) {
  const [activeCategory, setActiveCategory] = useState(null);

  const coffeeAccessories = [
    "Adventure Reusable Vacuum Quencher Tumbler",
    "Classic French Press",
    "Coffee Mixer For Cappuccino",
    "Distributor",
    "Unibody Aluminum Tamper",
    "Quick Mill Stretta",
  ];

  const cupsAndMugs = [
    "Aluminium Grinder",
    "BARATZA SETTE 30 GRINDER",
    "Burr Coffee Grinder",
    "Classic Pro Espresso Machine",
    "Coffee Center 12-Cup Coffeemaker",
    "Coffee Grinder Electric",
    "Coffee Maker Brewer Includes 14Oz",
    "Conical Burr Grinder",
  ];

  const categories = [
    { name: "Coffee Accessories", items: coffeeAccessories },
    { name: "Cups & Mugs", items: cupsAndMugs },
  ];

  // Mobile View
  if (isMobile) {
    // Sub-category view
    if (activeCategory !== null) {
      const category = categories[activeCategory];
      return (
        <div className="bg-white h-full overflow-y-auto">
          {/* Back Header */}
          <div className="sticky top-0 bg-[#A7897B] px-4 py-3 flex items-center">
            <button onClick={() => setActiveCategory(null)} className="mr-3">
              <ChevronLeft size={20} className="text-gray-800" />
            </button>
            <h2 className="text-gray-800 font-semibold text-base">
              {category.name}
            </h2>
          </div>

          {/* Product Items */}
          <div className="px-4 pb-6">
            {category.items.map((item, index) => (
              <React.Fragment key={index}>
                <button className="w-full py-4 text-left text-gray-900 hover:text-gray-600 transition-colors">
                  <span className="text-sm">{item}</span>
                </button>
                {index < category.items.length - 1 && (
                  <div className="border-b border-dashed border-gray-300" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      );
    }

    // Main category view
    return (
      <div className="bg-white h-full overflow-y-auto">
        {/* Back Header */}
        <div className="sticky top-0 bg-[#A7897B] px-4 py-3 flex items-center">
          <button onClick={onBack} className="mr-3">
            <ChevronLeft size={20} className="text-gray-800" />
          </button>
          <h2 className="text-gray-800 font-semibold text-base">All Products</h2>
        </div>

        {/* Category Menu Items */}
        <div className="px-4">
          {categories.map((category, index) => (
            <React.Fragment key={category.name}>
              <button
                onClick={() => setActiveCategory(index)}
                className="w-full flex items-center justify-between py-4 text-left"
              >
                <span className="text-gray-900 font-medium">{category.name}</span>
                <ChevronRight size={20} className="text-gray-600" />
              </button>
              {index < categories.length - 1 && (
                <div className="border-b border-dashed border-gray-300" />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Images Section */}
        <div className="px-4 py-6 space-y-4">
          <img
            src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800"
            alt="Coffee Accessories"
            className="w-full h-48 object-cover rounded-2xl shadow-md"
          />
          <img
            src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800"
            alt="Coffee Beans"
            className="w-full h-48 object-cover rounded-2xl shadow-md"
          />
        </div>
      </div>
    );
  }

  // Desktop View (unchanged)
  return (
    <div className="bg-white/95 backdrop-blur-md shadow-2xl">
      <div className="max-w-7xl mx-auto p-10 flex justify-between items-start">
        {/* Left Section (Text Columns) */}
        <div className="grid grid-cols-2 gap-10 w-2/3">
          {/* Coffee Accessories */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Coffee Accessories
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              {coffeeAccessories.map((item, index) => (
                <li
                  key={index}
                  className="hover:text-[#A7897B] cursor-pointer transition-colors duration-200"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Cups & Mugs */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Cups & Mugs
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              {cupsAndMugs.map((item, index) => (
                <li
                  key={index}
                  className="hover:text-[#A7897B] cursor-pointer transition-colors duration-200"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Section (Images) */}
        <div className="flex gap-4 w-1/3 justify-end">
          <img
            src="https://images.unsplash.com/photo-1509042239860-f550ce710b93"
            alt="Coffee Accessories"
            className="w-40 h-40 object-cover rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          />
          <img
            src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format"
            alt="Coffee Beans"
            className="w-40 h-40 object-cover rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
}

export default AppProduct;