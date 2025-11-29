import React, { useState } from "react";
import { products, categories } from "../../assets/coffee-dummy-data/dummyData";
import Card from "./Card";
import ProductPopup from "./ProductPopup";
import CoffeeSection from "./CoffeeSection";

function ShowProducts() {
  const [activeCategory, setActiveCategory] = useState("All products");
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Filter products based on active category
  const filteredProducts =
    activeCategory === "All products"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="bg-black py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Category Navigation */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div className="flex flex-wrap gap-3 sm:gap-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`text-xs sm:text-sm md:text-base font-medium transition whitespace-nowrap px-2 sm:px-3 py-1 rounded-full ${
                  activeCategory === category
                    ? "text-white border-b-2 border-white pb-1"
                    : "text-gray-400 hover:text-white"
                }`}
                aria-label={`Filter by ${category}`}
                aria-pressed={activeCategory === category}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              product={{
                ...product,
                badge: product.isNew
                  ? "NEW"
                  : product.isSoldOut
                  ? "SOLD OUT"
                  : null,
              }}
              onOpenPopup={() => setSelectedProduct(product)}
            />
          ))}
        </div>
      </div>

      {/* Product Popup */}
      {selectedProduct && (
        <ProductPopup
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {/* Coffee Section */}
      <div className="mt-8 px-4 sm:px-6 lg:px-8">
        <CoffeeSection />
      </div>
    </div>
  );
}

export default ShowProducts;
