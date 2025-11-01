import React, { useState, useRef, useEffect } from 'react';
import { MdKeyboardDoubleArrowDown } from "react-icons/md";

// List of supported languages
const languages = [
  { code: 'en', name: 'English', flag: '/src/assets/coffee-dummy-data/flag-icons/united-states.png' },
  { code: 'bn', name: 'বাংলা',  flag: '/src/assets/coffee-dummy-data/flag-icons/bangladesh.png' },
  { code: 'ar', name: 'العربية', flag: '/src/assets/coffee-dummy-data/flag-icons/saudi-arabia.png' },
  { code: 'fr', name: 'Français', flag: '/src/assets/coffee-dummy-data/flag-icons/france.png' },
];

const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(languages[0]);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelectLanguage = (lang) => {
    setSelectedLang(lang);
    setIsOpen(false);

    // Optional: Store to localStorage or update i18n here
    localStorage.setItem('site-lang', lang.code);

    // If using a library like i18next:
    // i18n.changeLanguage(lang.code);
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
      {/* Toggle Button */}
      <button
        type="button"
        className="flex items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none"
        onClick={toggleDropdown}
      >
        <img
          src={selectedLang.flag}
          alt={selectedLang.name}
          className="w-5 h-5 object-cover "
        />
        <span>{selectedLang.name}</span>
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
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleSelectLanguage(lang)}
                className={`flex items-center space-x-3 px-4 py-2 text-sm w-full text-left hover:bg-gray-100 ${
                  selectedLang.code === lang.code ? 'font-bold text-black' : 'text-gray-700'
                }`}
                role="menuitem"
              >
                <img
                  src={lang.flag}
                  alt={lang.name}
                  className="w-5 h-5 object-cover rounded-full"
                />
                <span>{lang.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
