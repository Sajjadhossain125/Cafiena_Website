import React, { useState } from "react";
import { Plus, Minus, Heart, ShoppingBag, Search, ChevronDown, Eye } from "lucide-react";
import CapsulatedCoffeeHeader from "./../../../component/Header/CapsulatedCoffeeHeader";
import Availability from "../../../component/asidbar/Availability";
import { products } from "../../../assets/coffee-dummy-data/dummyData";
import ProductType from "../../../component/asidbar/ProductType";
import Price from "../../../component/asidbar/Price";

function CapsulatedCoffee() {
  const [openFilter, setOpenFilter] = useState({
    availability: true,
    price: true,
    productType: true,
    brand: false,
  });

  const [hoveredProduct, setHoveredProduct] = useState(null);

  const toggleFilter = (key) => {
    setOpenFilter({ ...openFilter, [key]: !openFilter[key] });
  };

  return (
    <section className="bg-gradient-to-b from-[#FAF9F7] to-white min-h-screen">
      <CapsulatedCoffeeHeader />

      {/* Breadcrumb Bar */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto px-6 py-4">
          <p className="text-xs tracking-wider text-gray-500 uppercase">
            Home <span className="mx-2">/</span> 
            <span className="text-[#2B1E1A] font-medium">Capsulated Coffee</span>
          </p>
        </div>
      </div>

      {/* Main Section */}
      <main className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden sticky top-6">
              
              <div className="p-6 border-b border-gray-100 bg-gradient-to-br from-[#2B1E1A] to-[#3d2e28]">
                <h2 className="text-sm font-semibold tracking-widest text-white uppercase flex items-center gap-2">
                  <Search size={16} />
                  Refine Selection
                </h2>
              </div>

              <div className="divide-y divide-gray-100">
                {/* Availability */}
                <div>
                  <button
                    onClick={() => toggleFilter("availability")}
                    className="flex justify-between w-full items-center px-6 py-4 text-xs font-semibold tracking-widest text-gray-700 uppercase hover:bg-gray-50 transition-colors"
                  >
                    Availability
                    {openFilter.availability ? <Minus size={14} /> : <Plus size={14} />}
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openFilter.availability ? "max-h-48 opacity-100" : "max-h-0 opacity-0"}`}>
                    <div className="px-6 pb-4">
                      <Availability />
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div>
                  <button
                    onClick={() => toggleFilter("price")}
                    className="flex justify-between w-full items-center px-6 py-4 text-xs font-semibold tracking-widest text-gray-700 uppercase hover:bg-gray-50 transition-colors"
                  >
                    Price Range
                    {openFilter.price ? <Minus size={14} /> : <Plus size={14} />}
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openFilter.price ? "max-h-48 opacity-100" : "max-h-0 opacity-0"}`}>
                    <div className="px-6 pb-4">
                      <Price />
                    </div>
                  </div>
                </div>

                {/* Product Type */}
                <div>
                  <button
                    onClick={() => toggleFilter("productType")}
                    className="flex justify-between w-full items-center px-6 py-4 text-xs font-semibold tracking-widest text-gray-700 uppercase hover:bg-gray-50 transition-colors"
                  >
                    Product Type
                    {openFilter.productType ? <Minus size={14} /> : <Plus size={14} />}
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openFilter.productType ? "max-h-48 opacity-100" : "max-h-0 opacity-0"}`}>
                    <div className="px-6 pb-4">
                      <ProductType />
                    </div>
                  </div>
                </div>

                {/* Brand */}
                <div>
                  <button
                    onClick={() => toggleFilter("brand")}
                    className="flex justify-between w-full items-center px-6 py-4 text-xs font-semibold tracking-widest text-gray-700 uppercase hover:bg-gray-50 transition-colors"
                  >
                    Brand
                    {openFilter.brand ? <Minus size={14} /> : <Plus size={14} />}
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openFilter.brand ? "max-h-48 opacity-100" : "max-h-0 opacity-0"}`}>
                    <div className="px-6 pb-4">
                      <label className="flex items-center gap-3 text-sm text-gray-600 cursor-pointer hover:text-gray-900 transition-colors">
                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#2B1E1A] focus:ring-[#2B1E1A]" />
                        Coffee
                      </label>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </aside>

          {/* Product Collection */}
          <section className="flex-1">
            
            {/* Sort Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <div>
                <h1 className="text-2xl font-light text-gray-900 tracking-wide">Capsulated Coffee</h1>
                <p className="text-sm text-gray-500 mt-1">{products.length} Products</p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-600 uppercase tracking-wider">Sort by</span>
                <div className="relative">
                  <select className="appearance-none bg-white border border-gray-200 rounded-md px-4 py-2 pr-10 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2B1E1A] focus:border-transparent cursor-pointer">
                    <option>Best Selling</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Newest First</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" size={16} />
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map((item) => (
                <div
                  key={item.id}
                  onMouseEnter={() => setHoveredProduct(item.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                  className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:bg-[#CFA07A]"
                >
                  {/* Badges */}
                  <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                    {item.isNew && (
                      <span className="bg-[#2B1E1A] text-white text-[10px] px-3 py-1 rounded-full font-semibold tracking-widest uppercase">
                        New
                      </span>
                    )}
                    {item.isSoldOut && (
                      <span className="bg-red-600 text-white text-[10px] px-3 py-1 rounded-full font-semibold tracking-widest uppercase">
                        Sold Out
                      </span>
                    )}
                  </div>

                  {/* Wishlist & Eye Icons */}
                  <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                    <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110">
                      <Heart className="text-gray-700" size={16} />
                    </button>
                    <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110">
                      <Eye className="text-gray-700" size={16} />
                    </button>
                  </div>

                  {/* Product Image */}
                  <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                    <img
                      src={item.image}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      alt={item.name}
                    />
                    
                    {/* Quick Add Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end justify-center pb-6 transition-opacity duration-300 ${hoveredProduct === item.id ? 'opacity-100' : 'opacity-0'}`}>
                      <button className="bg-white text-[#2B1E1A] px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase flex items-center gap-2 hover:bg-[#2B1E1A] hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg">
                        <ShoppingBag size={14} />
                        Quick Add
                      </button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-5">
                    <div className="mb-3">
                      <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1 font-medium">
                        {item.description}
                      </p>
                      <h3 className="text-base font-semibold text-[#2B1E1A] tracking-wide">
                        {item.name}
                      </h3>
                    </div>

                    {/* Blends Selector */}
                    {item.blends?.length > 0 && (
                      <div className="mb-4">
                        <div className="relative">
                          <select className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-md px-3 py-2 pr-8 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2B1E1A] focus:border-transparent cursor-pointer">
                            {item.blends.map((blend) => (
                              <option key={blend}>{blend}</option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" size={14} />
                        </div>
                      </div>
                    )}

                    {/* Price and CTA */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div>
                        <span className="text-lg font-bold text-[#2B1E1A]">${item.price}</span>
                        <span className="text-xs text-gray-500 ml-1">USD</span>
                      </div>
                      <button className="text-[10px] border-2 border-[#2B1E1A] text-[#2B1E1A] px-4 py-2 rounded-full font-bold tracking-widest uppercase hover:bg-[#2B1E1A] hover:text-white transition-all duration-300 transform hover:scale-105">
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </section>
        </div>
      </main>
    </section>
  );
}

export default CapsulatedCoffee;