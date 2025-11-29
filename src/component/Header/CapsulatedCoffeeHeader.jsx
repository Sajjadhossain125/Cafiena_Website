import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";

function CapsulatedCoffeeHeader() {
  const fullText =
    "Coffee is a drink prepared from roasted coffee beans. Darkly colored, slightly acidic, and enriched with caffeine, coffee remains one of the most beloved beverages worldwide.";

  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      setDisplayText(fullText.slice(0, index));
      index++;

      if (index > fullText.length) {
        clearInterval(interval);
      }
    }, 25); // typing speed in ms (25 = fast, 60 = slower)

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-[334px] bg-black relative overflow-hidden flex items-center justify-center">
      {/* Soft gradient highlight */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/40 pointer-events-none" />

      {/* Decorative blurred circle light */}
      <div className="absolute right-20 top-10 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-[1288px] h-[334px] text-white flex flex-col justify-center px-8 rounded-2xl">
        
        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="group flex items-center gap-3 text-sm font-light text-white transition mb-6 w-fit"
        >
          <span className="w-9 h-9 border border-white/50 backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-300 group-hover:border-[#C49A6C] group-hover:text-[#C49A6C]">
            <ArrowLeft size={18} />
          </span>

          <span className="transition-all duration-300 group-hover:text-[#C49A6C]">
            Back To Home
          </span>
        </button>

        {/* Main Title */}
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight drop-shadow-md flex items-baseline gap-3">
          Capsulated Coffee
        </h1>

        {/* Typing Animation Text */}
        <p className="mt-3 max-w-3xl text-gray-300 leading-relaxed text-sm md:text-base font-light drop-shadow-sm whitespace-pre-line">
          {displayText}
        </p>
      </div>
    </div>
  );
}

export default CapsulatedCoffeeHeader;
