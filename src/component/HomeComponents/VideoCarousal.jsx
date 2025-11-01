import React, { useState, useEffect } from "react";
import video1 from "../../assets/coffee-dummy-data/video1.mp4";
import PartnersCarousel from "./PartnersCarousel";

function VideoCarousal() {
  // Slides data
  const slides = [
    {
      title: "Coffee",
      heading: "Choose the origin of the coffee",
      description:
        "Coffee that fuels your dreams. Life is short, stay awake for it. Coffee, Art, and Vintage. Fuel for your creativity.",
    },
    {
      title: "Coffee",
      heading: "Chocolate Coffee",
      description:
        "Coffee that fuels your dreams. Life is short, stay awake for it. Coffee, Art, and Vintage. Fuel for your creativity.",
    },
    {
      title: "Coffee",
      heading: "Freshly roasted coffee\nand barista accessories.",
      description:
        "Coffee that fuels your dreams. Life is short, stay awake for it. Coffee, Art, and Vintage. Fuel for your creativity.",
    },
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);
  
  // Auto change text with fade effect
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
        setFade(true);
      }, 500);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);
  
  // Utility: render heading with line breaks
  const renderHeading = (text) =>
    text.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < text.split("\n").length - 1 && <br />}
      </React.Fragment>
    ));
  
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <video
        src={video1}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>
      
      {/* Centered Rotating Content */}
      <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-4">
        <div
          className={`transition-opacity duration-700 max-w-4xl ${
            fade ? "opacity-100" : "opacity-0"
          }`}
        >
          <h3 className="text-lg font-semibold mb-2 tracking-wider uppercase">
            {slides[currentIndex].title}
          </h3>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            {renderHeading(slides[currentIndex].heading)}
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl opacity-90 leading-relaxed">
            {slides[currentIndex].description}
          </p>
        </div>
      </div>
      
      {/* Bottom Partners Carousel */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-black/80 backdrop-blur-sm py-4">
        <div className="max-w-7xl mx-auto px-6">
          <PartnersCarousel standalone={true} />
        </div>
      </div>
    </section>
  );
}

export default VideoCarousal;