// ShowProducts.js
import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
import { products, categories } from "../../assets/coffee-dummy-data/dummyData";
import Card from "./Card";
import ProductPopup from "./ProductPopup";
import CoffeeSection from "./CoffeeSection";

function ShowProducts() {
  const [activeCategory, setActiveCategory] = useState("All products");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Filter products based on active category
  const filteredProducts =
    activeCategory === "All products"
      ? products
      : products.filter((p) => p.category === activeCategory);

  // Responsive breakpoints for carousel
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 640 },
      items: 2,
      slidesToSlide: 2
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 1,
      slidesToSlide: 1
    }
  };

  // Custom Left Arrow
  const CustomLeftArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all duration-200"
      aria-label="Previous products"
    >
      <MdKeyboardDoubleArrowLeft size={24} className="text-white" />
    </button>
  );

  // Custom Right Arrow
  const CustomRightArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all duration-200"
      aria-label="Next products"
    >
      <MdKeyboardDoubleArrowRight size={24} className="text-white" />
    </button>
  );

  // Custom Dot
  const CustomDot = ({ onClick, active }) => (
    <button
      onClick={onClick}
      className={`transition-all duration-300 rounded-full ${
        active ? "bg-white w-6 h-2" : "bg-gray-600 w-2 h-2"
      }`}
      aria-label={active ? "Current page" : "Go to page"}
    />
  );

  return (
    <div className="bg-black py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Category Navigation */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div className="flex gap-4 sm:gap-8 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`text-sm font-medium transition whitespace-nowrap ${
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
          <div className="flex items-center gap-4">
            <button className="text-white text-sm sm:text-lg font-bold underline hover:text-gray-300">
              Show more products
            </button>
            <button
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className="text-white text-sm underline hover:text-gray-300"
              aria-label={isAutoPlay ? "Pause auto-play" : "Start auto-play"}
            >
              {isAutoPlay ? "Pause" : "Play"}
            </button>
          </div>
        </div>

        {/* Products Carousel */}
        <div className="relative">
          <Carousel
            responsive={responsive}
            infinite={true}
            autoPlay={isAutoPlay}
            autoPlaySpeed={5000}
            keyBoardControl={true}
            customTransition="transform 300ms ease-in-out"
            transitionDuration={300}
            containerClass="carousel-container"
            removeArrowOnDeviceType={[]}
            dotListClass="custom-dot-list-style"
            itemClass="px-3"
           
            swipeable={true}
            draggable={true}
            customLeftArrow={<CustomLeftArrow />}
            customRightArrow={<CustomRightArrow />}
           
            ssr={true}
            partialVisible={false}
          >
            {filteredProducts.map((product) => (
              <div key={product.id} className="h-full">
                <Card
                  product={{
                    ...product,
                    badge: product.isNew
                      ? "NEW"
                      : product.isSoldOut
                      ? "SOLD OUT"
                      : null
                  }}
                  onOpenPopup={() => setSelectedProduct(product)}
                />
              </div>
            ))}
          </Carousel>
        </div>
        <div className="relative">
          <Carousel
            responsive={responsive}
            infinite={true}
            autoPlay={isAutoPlay}
            autoPlaySpeed={5000}
            keyBoardControl={true}
            customTransition="transform 300ms ease-in-out"
            transitionDuration={300}
            containerClass="carousel-container"
            removeArrowOnDeviceType={[]}
            dotListClass="custom-dot-list-style"
            itemClass="px-3"
            showDots={true}
            swipeable={true}
            draggable={true}
            customLeftArrow={<CustomLeftArrow />}
            customRightArrow={<CustomRightArrow />}
            customDot={<CustomDot />}
            ssr={true}
            partialVisible={false}
          >
            {filteredProducts.map((product) => (
              <div key={product.id} className="h-full">
                <Card
                  product={{
                    ...product,
                    badge: product.isNew
                      ? "NEW"
                      : product.isSoldOut
                      ? "SOLD OUT"
                      : null
                  }}
                  onOpenPopup={() => setSelectedProduct(product)}
                />
              </div>
            ))}
          </Carousel>
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
      <div className="mt-8">
        <CoffeeSection />
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .custom-dot-list-style {
          display: flex;
          justify-content: center;
          margin-top: 1.5rem;
          gap: 0.5rem;
        }
        
        .carousel-container {
          padding-bottom: 2rem;
        }
      `}</style>
    </div>
  );
}

export default ShowProducts;