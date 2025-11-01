// PageDropDown.jsx - Mobile Responsive Version
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const pageLinks = [
  { name: "About Us", href: "/about" },
  { name: "Contact With Us", href: "/contact" },
  { name: "FAQ's", href: "/faq" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Shipping & Delivery", href: "/shipping" },
  { name: "Terms & Conditions", href: "/terms" },
];

function PageDropDown({ isMobile = false, onBack }) {
  // Mobile View
  if (isMobile) {
    return (
      <div className="bg-white h-full overflow-y-auto">
        {/* Back Header */}
        <div className="sticky top-0 bg-[#A7897B] px-4 py-3 flex items-center">
          <button onClick={onBack} className="mr-3">
            <ChevronLeft size={20} className="text-gray-800" />
          </button>
          <h2 className="text-gray-800 font-semibold text-base">Pages</h2>
        </div>

        {/* Page Links */}
        <div className="px-4">
          {pageLinks.map((link, index) => (
            <React.Fragment key={index}>
              <a
                href={link.href}
                className="w-full flex items-center justify-between py-4 text-left"
              >
                <span className="text-gray-900 font-medium">{link.name}</span>
                <ChevronRight size={20} className="text-gray-600" />
              </a>
              {index < pageLinks.length - 1 && (
                <div className="border-b border-dashed border-gray-300" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }

  // Desktop View
  return (
    <div className="bg-white/95 backdrop-blur-md shadow-2xl">
      <div className="max-w-7xl mx-auto p-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {pageLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="group relative overflow-hidden bg-gradient-to-br from-[#A7897B]/10 to-transparent hover:from-[#A7897B]/20 rounded-xl p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="text-base font-semibold text-gray-800 group-hover:text-[#A7897B] transition-colors duration-200">
                  {link.name}
                </span>
                <svg
                  className="w-5 h-5 text-gray-400 group-hover:text-[#A7897B] group-hover:translate-x-1 transition-all duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PageDropDown;