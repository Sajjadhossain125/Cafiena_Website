// Header.jsx - Fixed Version for Mobile with Login/Search
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
        className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Mobile Menu Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-[85%] max-w-sm bg-white z-[70] transform transition-transform duration-300 ease-in-out md:hidden overflow-hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header Section */}
        <div className="bg-[#A7897B] px-4 py-4 flex items-center justify-between flex-shrink-0">
          <Link to='/' onClick={onClose} className="text-xl font-bold text-gray-800">
            The Caffeina
          </Link>
          <button
            onClick={onClose}
            className="p-2 text-gray-800 hover:text-gray-900"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Language & Currency Selectors */}
        <div className="bg-white px-4 py-4 grid grid-cols-2 gap-3 border-b border-gray-200 flex-shrink-0">
          <LanguageSelector isMobile={true} />
          <CurrencySelector isMobile={true} />
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1" style={{ height: 'calc(100vh - 250px)' }}>
          {activeSubmenu ? (
            renderSubmenu()
          ) : (
            <div className="px-4 pt-4">
              <nav className="space-y-0">
                {menuItems.map((item, index) => (
                  <React.Fragment key={item.name}>
                    {item.hasDropdown ? (
                      <button
                        onClick={() => handleMenuClick(item.name)}
                        className="w-full flex items-center justify-between py-4 text-left text-gray-900 hover:text-gray-600 transition-colors"
                      >
                        <span className="font-medium">{item.name}</span>
                        <ChevronRight size={20} />
                      </button>
                    ) : (
                      <Link
                        to={item.path || '#'}
                        onClick={onClose}
                        className="w-full flex items-center justify-between py-4 text-left text-gray-900 hover:text-gray-600 transition-colors"
                      >
                        <span className="font-medium">{item.name}</span>
                      </Link>
                    )}
                    {index < menuItems.length - 1 && (
                      <div className="border-b border-dashed border-gray-300" />
                    )}
                  </React.Fragment>
                ))}
              </nav>
            </div>
          )}
        </div>

        {/* Bottom Actions - Search & Login */}
        <div className="border-t border-gray-200 bg-white p-4 flex-shrink-0">
          <div className="grid grid-cols-2 gap-3">
            {/* Search Button */}
            <button 
              onClick={onClose}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg transition-colors font-medium"
            >
              <Search size={18} />
              <span>Search</span>
            </button>
            
            {/* Login Button */}
            <Link to="/login" onClick={onClose}>
              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#A7897B] hover:bg-[#9C7B6B] text-white rounded-lg transition-colors font-medium">
                <User size={18} />
                <span>Login</span>
              </button>
            </Link>
          </div>
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

  // Close mobile menu
  const handleCloseMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header 
        className={`text-white py-3 md:py-5 px-4 md:px-6 fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
          isHomePage 
            ? "bg-transparent backdrop-blur-sm" 
            : "bg-black"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 md:gap-4">
          {/* Mobile Menu Button - Left */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden p-2 hover:text-gray-300 transition-colors rounded-full hover:bg-gray-800 flex-shrink-0"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>

          {/* Logo */}
          <Link 
            to='/' 
            className="text-lg md:text-2xl font-bold tracking-wide flex-grow md:flex-grow-0 text-center md:text-left"
          >
            The Caffeina
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 flex-1 justify-center">
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
          <div className="flex items-center space-x-2 md:space-x-4 flex-shrink-0">
            {/* Search - Desktop only */}
            <button className="hidden sm:block p-2 hover:text-gray-300 transition-colors rounded-full hover:bg-gray-800">
              <Search size={18} />
            </button>

            {/* User - Visible on all screens */}
            <Link to="/login" className="block">
              <button className="p-2 hover:text-gray-300 transition-colors rounded-full hover:bg-gray-800">
                <User size={18} />
              </button>
            </Link>

            {/* Language & Currency - Desktop only */}
            <div className="hidden md:block">
              <LanguageSelector />
            </div>
            <div className="hidden md:block">
              <CurrencySelector />
            </div>

            {/* Cart - Responsive */}
            <button className="flex items-center space-x-1 md:space-x-2 bg-[#A7897B] hover:bg-[#9C7B6B] px-2 md:px-4 py-1.5 md:py-2 rounded-full transition-colors">
              <ShoppingCart size={16} className="flex-shrink-0" />
              <span className="hidden sm:inline text-sm font-medium whitespace-nowrap">0 Items</span>
              <span className="sm:hidden text-xs font-medium">0</span>
            </button>
          </div>
        </div>

        {/* Desktop Dropdowns */}
        <div className="hidden md:block">
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
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={handleCloseMobileMenu}
        menuItems={menuItems}
      />
    </>
  );
};

export default Header;