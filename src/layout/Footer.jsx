import React from 'react';
import { Instagram, MessageCircle, Twitter } from 'lucide-react';
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaPaypal, FaCcDiscover, FaApplePay } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white relative overflow-hidden">
      {/* Right Side Coffee Bean Image */}
      {/* Ensure this image path is correct in your project structure */}
      <div className="absolute right-0 bottom-0 w-[350px] h-auto z-0">
        <img
          src="/src/assets/coffee-dummy-data/footer-right.png"
          alt="Right Coffee Bean"
          className="w-full h-auto object-contain"
          onError={(e) => { e.target.style.display='none' }}
        />
      </div>


      {/* Main container with max-width and centering to ensure alignment */}
      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Coffee Brand Section */}
          <div className="lg:col-span-1">
            <h2 className="text-4xl font-bold mb-6 text-[#A68977]">Coffee</h2>
            <h3 className="text-3xl font-semibold mb-4 leading-tight">
              A cup of coffee, a
              <br />
              <span className="text-[#A68977]">moment of your time</span>
            </h3>
            <p className="text-white text-lg leading-relaxed">
              As the coffee shop market becomes more popular, the number of cafe websites is growing. The internet and social media play an important role in finding new customers.
            </p>
          </div>

          {/* Shop Section */}
          <div>
            <h4 className="text-xl text-white font-bold mb-6">Shop:</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-white hover:text-gray-300 transition-colors text-lg font-semibold">Search</a></li>
              <li><a href="#" className="text-white hover:text-gray-300 transition-colors text-lg font-semibold">All collections</a></li>
              <li><a href="#" className="text-white hover:text-gray-300 transition-colors text-lg font-semibold">All products</a></li>
              <li><a href="#" className="text-white hover:text-gray-300 transition-colors text-lg font-semibold">My Cart</a></li>
              <li><a href="#" className="text-white hover:text-gray-300 transition-colors text-lg font-semibold">Compare</a></li>
              <li><a href="#" className="text-white hover:text-gray-300 transition-colors text-lg font-semibold">Wishlist</a></li>
            </ul>
          </div>

          {/* Account Section */}
          <div>
            <h4 className="text-xl text-white font-bold mb-6">Account:</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-white hover:text-gray-300 transition-colors text-lg font-semibold">About Us</a></li>
              <li><a href="#" className="text-white hover:text-gray-300 transition-colors text-lg font-semibold">Contact with us</a></li>
              <li><a href="#" className="text-white hover:text-gray-300 transition-colors text-lg font-semibold">Faq's</a></li>
              <li><a href="#" className="text-white hover:text-gray-300 transition-colors text-lg font-semibold">Privacy Policy</a></li>
              <li><a href="#" className="text-white hover:text-gray-300 transition-colors text-lg font-semibold">Shipping & Delivery</a></li>
              <li><a href="#" className="text-white hover:text-gray-300 transition-colors text-lg font-semibold">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Share Section */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Share:</h4>
            <div className="flex space-x-3">
              <a href="#" className="w-10 h-10 bg-white text-black rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"><Instagram size={18} /></a>
              <a href="#" className="w-10 h-10 bg-white text-black rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"><MessageCircle size={18} /></a>
              <a href="#" className="w-10 h-10 bg-white text-black rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"><Twitter size={18} /></a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col lg:flex-row justify-between items-center">
          <div className="text-sm text-gray-400 mb-4 lg:mb-0">
            © 2025, Coffee WorkDo, Powered by WorkDo.io
          </div>
          {/* Payment Methods */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-8 rounded flex items-center justify-center"><FaCcVisa size={40} color='white'/></div>
            <div className="w-12 h-8 rounded flex items-center justify-center"><FaCcMastercard size={40} color='orange' /></div>
            <div className="w-12 h-8 bg-blue-800 rounded flex items-center justify-center"><FaCcAmex size={40} /></div>
            <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center"><FaPaypal size={30}/></div>
            <div className="w-12 h-8 bg-gray-800 rounded flex items-center justify-center"><FaApplePay size={40}/></div>
            <div className="w-12 h-8 bg-orange-500 rounded flex items-center justify-center"><FaCcDiscover size={40}/></div>
          </div>
        </div>
      </div>
      {/* Bottom Left Coffee Bean Decoration */}
      {/* Ensure this image path is correct in your project structure */}
      <div className="absolute top-0 left-0 w-[120px] h-auto z-0">
        <img
          src="/src/assets/coffee-dummy-data/leftcoffee.png"
          alt="Left Coffee Bean"
          className="w-full h-auto object-contain"
          onError={(e) => { e.target.style.display='none' }}
        />
      </div>
    </footer>
  );
};

export default Footer;
