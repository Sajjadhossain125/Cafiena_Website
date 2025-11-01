// components/dropdown/DropdownWrapper.jsx
import React from "react";
import { motion } from "framer-motion";

const DropdownWrapper = ({ isActive, dropdownName, setActiveDropdown, children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="absolute left-0 top-full w-full pt-2"
      onMouseEnter={() => setActiveDropdown(dropdownName)}
      onMouseLeave={() => setActiveDropdown(null)}
    >
      {/* Animated Line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        exit={{ scaleX: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="h-[2px] bg-gradient-to-r from-transparent via-[#A7897B] to-transparent origin-center"
      />
      
      {/* Dropdown Content with Slide Down Animation */}
      <motion.div
        initial={{ height: 0, opacity: 0, y: -20 }}
        animate={{ 
          height: "auto", 
          opacity: 1, 
          y: 0,
          transition: {
            height: { duration: 0.4, ease: "easeOut" },
            opacity: { duration: 0.3, delay: 0.2 },
            y: { duration: 0.4, ease: "easeOut" }
          }
        }}
        exit={{ 
          height: 0, 
          opacity: 0, 
          y: -20,
          transition: {
            height: { duration: 0.3, ease: "easeIn" },
            opacity: { duration: 0.2 },
            y: { duration: 0.3, ease: "easeIn" }
          }
        }}
        className="overflow-hidden"
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default DropdownWrapper;