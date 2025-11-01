// Header.jsx - Complete Updated Version with Mobile Menu
import React, { useState } from "react";
import {
  Search,
  User,
  ShoppingCart,
  ChevronDown,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { Link, useLocation } from "react-router";
import { AnimatePresence } from "framer-motion";
import CurrencySelector from "./CurrencySelector";
import LanguageSelector from "./LanguageSelector";
import AppProduct from "./dropdown/AppProduct";
import CollectionDropDown from "./dropdown/CollectionDropDown";
import PageDropDown from "./dropdown/PageDropDown";
import BlogDropDown from "./dropdown/BlogDropDown";
import DropdownWrapper from "./dropdown/DropdownWrapper";

// Mobile Menu Component with Submenu Support
const MobileMenu = ({ isOpen, onClose, menuItems }) => {
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const handleMenuClick = (itemName) => {
    setActiveSubmenu(itemName);
  };

  const handleBack = () => {
    setActiveSubmenu(null);
  };

  // Render submenu based on active item
  const renderSubmenu = () => {
    const componentMap = {
      "All Products": <AppProduct isMobile={true} onBack={handleBack} />,
      "Collections": <CollectionDropDown isMobile={true} onBack={handleBack} />,
      "Pages": <PageDropDown isMobile={true} onBack={handleBack} />,
      "Blog": <BlogDropDown isMobile={true} onBack={handleBack} />,
    };
    return componentMap[activeSubmenu] || null;
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Mobile Menu Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-[85%] max-w-sm bg-white z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Fixed Top Section - Always Visible */}
        <div className="sticky top-0 z-10">
          {/* Coffee Logo & Close Button - Dark Coffee Color */}
          <div className="bg-[#A7897B] px-4 py-4 flex items-center justify-between">
            {/* Logo */}
            <Link to='/' className="text-xl font-bold text-gray-800">The Caffeina </Link>
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 text-gray-800 hover:text-gray-900"
            >
              <X size={24} />
            </button>
          </div>

          {/* Language & Currency Selectors - White Background */}
          <div className="bg-white px-4 py-4 grid grid-cols-2 gap-3 border-b border-gray-200">
            <LanguageSelector isMobile={true} />
            <CurrencySelector isMobile={true} />
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto h-full pb-32">
          {activeSubmenu ? (
            // Submenu View
            renderSubmenu()
          ) : (
            // Main Menu View
            <div className="px-4 pt-4">
              {/* Navigation Links */}
              <nav className="space-y-0">
                {menuItems.map((item, index) => (
                  <React.Fragment key={item.name}>
                    <button
                      onClick={() => item.hasDropdown && handleMenuClick(item.name)}
                      className="w-full flex items-center justify-between py-4 text-left text-gray-900 hover:text-gray-600 transition-colors"
                    >
                      <span className="font-medium">{item.name}</span>
                      {item.hasDropdown && <ChevronRight size={20} />}
                    </button>
                    {index < menuItems.length - 1 && (
                      <div className="border-b border-dashed border-gray-300" />
                    )}
                  </React.Fragment>
                ))}
              </nav>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const Header = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  // Check if current page is home page
  const isHomePage = location.pathname === "/" || location.pathname === "/home";

  const menuItems = [
    { name: "All Products", hasDropdown: true, component: <AppProduct /> },
    { name: "Collections", hasDropdown: true, component: <CollectionDropDown /> },
    { name: "Pages", hasDropdown: true, component: <PageDropDown /> },
    { name: "Blog", hasDropdown: true, component: <BlogDropDown /> },
  ];

  return (
    <>
      <header className={`text-white py-5 px-6 fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        isHomePage 
          ? "bg-transparent backdrop-blur-sm" 
          : "bg-black"
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold tracking-wide"></div>
          <Link to='/' className="text-2xl font-bold tracking-wide">The Caffeina </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <div
                key={item.name}
                className="relative group"
                onMouseEnter={() =>
                  item.hasDropdown && setActiveDropdown(item.name)
                }
              >
                <button
                  className="flex items-center space-x-1 hover:text-gray-300 transition-colors text-sm font-medium"
                >
                  <span>{item.name}</span>
                  {item.hasDropdown && (
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${
                        activeDropdown === item.name ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </button>
              </div>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3 md:space-x-4">
            <button className="p-2 hover:text-gray-300 transition-colors rounded-full hover:bg-gray-800">
              <Search size={18} />
            </button>
            <Link to="/login">
              <button className="p-2 hover:text-gray-300 transition-colors rounded-full hover:bg-gray-800">
                <User size={18} />
              </button>
            </Link>

            {/* Hide Language & Currency on mobile */}
            <div className="hidden md:block">
              <LanguageSelector />
            </div>
            <div className="hidden md:block">
              <CurrencySelector />
            </div>

            <button className="flex items-center space-x-2 bg-[#A7897B] hover:bg-[#9C7B6B] px-3 md:px-4 py-2 rounded-full transition-colors">
              <ShoppingCart size={16} />
              <span className="text-sm font-medium">0 Items</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 hover:text-gray-300 transition-colors rounded-full hover:bg-gray-800"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>

        {/* Desktop Dropdowns */}
        {menuItems.map((item) => (
          <AnimatePresence key={item.name}>
            {activeDropdown === item.name && item.hasDropdown && (
              <DropdownWrapper
                isActive={activeDropdown === item.name}
                dropdownName={item.name}
                setActiveDropdown={setActiveDropdown}
              >
                {item.component}
              </DropdownWrapper>
            )}
          </AnimatePresence>
        ))}
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        menuItems={menuItems}
      />
    </>
  );
};

export default Header;