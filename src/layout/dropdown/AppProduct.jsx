// AppProduct.jsx - Enhanced Mobile + Desktop Animation Version
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

  // -------------------------------------
  // 📱 MOBILE VIEW
  // -------------------------------------
  if (isMobile) {
    // Sub-category view
    if (activeCategory !== null) {
      const category = categories[activeCategory];

      return (
        <div className="bg-white h-full overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-[#A7897B] px-4 py-3 flex items-center">
            <button
              onClick={() => setActiveCategory(null)}
              className="mr-3 active:scale-90 transition"
            >
              <ChevronLeft size={20} className="text-gray-800" />
            </button>
            <h2 className="text-gray-800 font-semibold text-base">
              {category.name}
            </h2>
          </div>

          {/* Item list */}
          <div className="px-4 pb-6">
            {category.items.map((item, index) => (
              <React.Fragment key={index}>
                <button className="w-full py-4 text-left active:scale-95 transition text-gray-900">
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
        {/* Header */}
        <div className="sticky top-0 bg-[#A7897B] px-4 py-3 flex items-center">
          <button onClick={onBack} className="mr-3 active:scale-90 transition">
            <ChevronLeft size={20} className="text-gray-800" />
          </button>
          <h2 className="text-gray-800 font-semibold text-base">All Products</h2>
        </div>

        {/* Category Menu */}
        <div className="px-4">
          {categories.map((category, index) => (
            <React.Fragment key={index}>
              <button
                onClick={() => setActiveCategory(index)}
                className="w-full flex items-center justify-between py-4 text-left active:scale-95 transition"
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

        {/* Images */}
        <div className="px-4 py-6 space-y-4">
          <img
            src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800"
            className="w-full h-48 object-cover rounded-2xl shadow-md transition-transform duration-300 hover:scale-[1.03]"
            alt="Coffee"
          />

          <img
            src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800"
            className="w-full h-48 object-cover rounded-2xl shadow-md transition-transform duration-300 hover:scale-[1.03]"
            alt="Coffee Beans"
          />
        </div>
      </div>
    );
  }

  // -------------------------------------
  // 🖥 DESKTOP VIEW (NOW WITH ANIMATION)
  // -------------------------------------

  return (
    <div className="bg-white/95 backdrop-blur-md shadow-2xl">
      <div className="max-w-7xl mx-auto p-10 flex justify-between items-start">
        
        {/* LEFT COLUMN */}
        <div className="grid grid-cols-2 gap-10 w-2/3">

          {/* Coffee Accessories */}
          <div
            className="group relative bg-gradient-to-br from-[#A7897B]/10 to-transparent hover:from-[#A7897B]/20 
            rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.03]"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-3 group-hover:text-[#A7897B] transition">
              Coffee Accessories
            </h3>

            <ul className="space-y-2 text-sm text-gray-700">
              {coffeeAccessories.map((item, i) => (
                <li
                  key={i}
                  className="cursor-pointer hover:text-[#A7897B] transition"
                >
                  {item}
                </li>
              ))}
            </ul>

            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 
              bg-gradient-to-r from-transparent to-[#A7897B]/10 
              transition-opacity duration-300 pointer-events-none"
            />
          </div>

          {/* Cups & Mugs */}
          <div
            className="group relative bg-gradient-to-br from-[#A7897B]/10 to-transparent hover:from-[#A7897B]/20 
            rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.03]"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-3 group-hover:text-[#A7897B] transition">
              Cups & Mugs
            </h3>

            <ul className="space-y-2 text-sm text-gray-700">
              {cupsAndMugs.map((item, i) => (
                <li
                  key={i}
                  className="cursor-pointer hover:text-[#A7897B] transition"
                >
                  {item}
                </li>
              ))}
            </ul>

            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 
              bg-gradient-to-r from-transparent to-[#A7897B]/10 
              transition-opacity duration-300 pointer-events-none"
            />
          </div>
        </div>

        {/* RIGHT IMAGE SECTION */}
        <div className="flex gap-4 w-1/3 justify-end">
          <img
            src="https://images.unsplash.com/photo-1509042239860-f550ce710b93"
            className="w-40 h-40 object-cover rounded-xl shadow-md 
            transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            alt="Coffee"
          />

          <img
            src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format"
            className="w-40 h-40 object-cover rounded-xl shadow-md 
            transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            alt="Coffee Beans"
          />
        </div>
      </div>
    </div>
  );
}

export default AppProduct;
