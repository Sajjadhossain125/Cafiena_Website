import React from "react";
import { FaBell, FaUserCircle, FaSignOutAlt, FaSearch } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import adminImage from "../../assets/admin.jpg"; // Import the admin image

function AdminNavBar() {
  const navigate = useNavigate();
  
  return (
    <header className="flex items-center justify-between bg-gradient-to-r from-[#755E55] to-[#896039] text-white px-8 h-20 shadow-xl">
      {/* Left side - Logo */}
      <div className="flex items-center gap-3">
        <Link to='/admin/dashboard' className="flex items-center gap-2">
          <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
            <span className="text-amber-200 text-2xl">☕</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-wide">Caffiena Admin</h1>
            <p className="text-xs text-[#B0A194]">Management Panel</p>
          </div>
        </Link>
      </div>
      
      {/* Middle - Search bar */}
      <div className="hidden md:flex items-center bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3 w-2/5 border border-white/20">
        <FaSearch className="text-[#B0A194]/90 mr-3 text-lg" />
        <input
          type="text"
          placeholder="Search products, orders, customers..."
          className="bg-transparent outline-none text-base w-full placeholder-[#B0A194]/60 text-white"
        />
      </div>
      
      {/* Right side - Icons */}
      <div className="flex items-center gap-6">
        {/* Notifications */}
        <button className="relative p-3 rounded-full hover:bg-white/10 backdrop-blur-sm transition-all duration-300 transform hover:scale-105">
          <FaBell className="text-2xl text-[#B0A194]" />
          <span className="absolute top-2 right-2 bg-gradient-to-r from-[#896039] to-[#B0A194] text-xs text-white px-2 py-1 rounded-full font-bold shadow-lg">
            3
          </span>
        </button>
        
        {/* Profile dropdown (dummy now) */}
        <div className="flex items-center gap-3 cursor-pointer hover:bg-white/10 p-3 rounded-xl transition-all duration-300 transform hover:scale-105">
          {/* Replace the icon with the actual image */}
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#B0A194] shadow-lg">
            <img 
              src={adminImage} 
              alt="Admin Profile" 
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback to icon if image fails to load
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement.innerHTML = '<FaUserCircle className="text-3xl text-[#B0A194]" />';
              }}
            />
          </div>
          <div className="hidden sm:block">
            <p className="text-white font-semibold">Admin User</p>
            <p className="text-xs text-[#B0A194]">Administrator</p>
          </div>
        </div>
        
        {/* Logout */}
        <button 
          onClick={() => navigate('/admin/login')}
          className="flex items-center gap-2 bg-gradient-to-r from-[#896039] to-[#755E55] hover:from-[#6d4f2f] hover:to-[#5f4e47] px-5 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          <FaSignOutAlt className="text-lg" />
          <span className="hidden sm:block font-medium">Logout</span>
        </button>
      </div>
    </header>
  );
}

export default AdminNavBar;