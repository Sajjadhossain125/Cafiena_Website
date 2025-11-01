import React, { useEffect, useRef, useState } from "react";
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";

const partners = ["Coffee", "Latte", "Mocha", "Espresso", "Cappuccino"];

function PartnersCarousel() {
  const sliderRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const animationRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    // ✅ Clone the whole list once for seamless looping
    partners.forEach((item) => {
      const clone = document.createElement("div");
      clone.className =
        "w-[180px] h-[100px] flex items-center justify-center rounded-lg text-white text-lg font-bold";
      clone.textContent = item;
      slider.appendChild(clone);
    });

    // ✅ Auto-scroll function
    const autoScroll = () => {
      if (!isPaused && slider) {
        if (slider.scrollLeft >= slider.scrollWidth / 2) {
          slider.scrollLeft = 0; // reset to start
        } else {
          slider.scrollLeft += 1; // move by 1px
        }
      }
      animationRef.current = requestAnimationFrame(autoScroll);
    };

    animationRef.current = requestAnimationFrame(autoScroll);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPaused]);

  // ✅ Manual controls
  const scrollLeft = () => {
    if (sliderRef.current) {
      setIsPaused(true);
      sliderRef.current.scrollBy({ left: -250, behavior: "smooth" });
      setTimeout(() => setIsPaused(false), 3000);
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      setIsPaused(true);
      sliderRef.current.scrollBy({ left: 250, behavior: "smooth" });
      setTimeout(() => setIsPaused(false), 3000);
    }
  };

  return (
    <section className="py-10 ">
      <div className="max-w-7xl mx-auto  grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Content */}
        <div className="text-left">
          <p className="text-white font-semibold text-sm mb-2 uppercase">
            Coffee
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#d1b094] leading-snug">
            Fresh roasted coffee <br /> with 24h delivery
          </h2>
        </div>

        {/* Right Carousel */}
        <div className="w-full">
          <p className="text-white text-xs font-bold mb-3 uppercase">Partners</p>
          <div className="flex items-center gap-3">
            {/* Left Button */}
            <button
              onClick={scrollLeft}
              className="p-2 bg-[#d1b094] rounded-md text-black hover:bg-[#b78d6a] transition"
              aria-label="Scroll left"
            >
              <MdKeyboardDoubleArrowLeft size={20} />
            </button>

            {/* Slider */}
            <div
              className="overflow-hidden flex-1"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div
                ref={sliderRef}
                className="flex gap-8 whitespace-nowrap scroll-smooth"
                style={{ width: "100%", overflowX: "hidden" }}
              >
                {partners.map((item, i) => (
                  <div
                    key={i}
                    className="w-[180px] h-[100px] flex items-center justify-center 
                                rounded-lg text-white text-lg 
                               font-bold shadow-md"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Button */}
            <button
              onClick={scrollRight}
              className="p-2 bg-[#d1b094] rounded-md text-black hover:bg-[#b78d6a] transition"
              aria-label="Scroll right"
            >
              <MdKeyboardDoubleArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PartnersCarousel;
