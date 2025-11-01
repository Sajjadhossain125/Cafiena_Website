import React, { useState, useRef, useEffect } from 'react';
import { MdKeyboardDoubleArrowDown } from "react-icons/md";

const currencies = [
  { code: 'GBP', symbol: '£', flag: "/src/assets/coffee-dummy-data/flag-icons/united-kingdom.png" },
  { code: 'USD', symbol: '$', flag: '/src/assets/coffee-dummy-data/flag-icons/united-states.png' },
  { code: 'AUD', symbol: '$', flag: '/src/assets/coffee-dummy-data/flag-icons/flag.png' },
  { code: 'CAD', symbol: '$', flag: '/src/assets/coffee-dummy-data/flag-icons/canada.png' },
  { code: 'BDT', symbol: '৳', flag: '/src/assets/coffee-dummy-data/flag-icons/bangladesh.png' },
];

const CurrencySelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelectCurrency = (currency) => {
    setSelectedCurrency(currency);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Button */}
      <button
        type="button"
        className="flex items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none"
        onClick={toggleDropdown}
      >
        <img
          src={selectedCurrency.flag}
          alt={selectedCurrency.code}
          className="w-5 h-5 object-cover"
        />
        <span>{selectedCurrency.code}</span>
        <MdKeyboardDoubleArrowDown
          size={16}
          className={`text-gray-600 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div
          className="absolute right-0 z-10 mt-2 w-30 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
        >
          <div className="py-1" role="none">
            {currencies.map((currency) => (
              <button
                key={currency.code}
                onClick={() => handleSelectCurrency(currency)}
                className={`flex items-center space-x-3 px-4 py-2 text-sm w-full text-left hover:bg-gray-100 ${
                  selectedCurrency.code === currency.code ? 'font-bold text-black' : 'text-gray-700'
                }`}
                role="menuitem"
              >
                <img
                  src={currency.flag}
                  alt={currency.code}
                  className="w-5 h-5 object-cover"
                />
                <span>{currency.code}</span>
                <span>{currency.symbol}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrencySelector;
