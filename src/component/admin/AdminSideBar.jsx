import React, { useState, useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaCoffee,
  FaBoxOpen,
  FaUsers,
  FaWarehouse,
  FaMoneyBillWave,
  FaGift,
  FaStar,
  FaNewspaper,
  FaCog,
  FaChevronDown,
} from "react-icons/fa";
import sideBg from "../../assets/side-bg.png";

function pathMatches(current, target) {
  if (current === target) return true;
  // Treat target as a prefix boundary: "/a/b" matches "/a/b" and "/a/b/..." only
  return current.startsWith(target + "/");
}

export default function AdminSideBar() {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState({});
  
  const menuItems = useMemo(
    () => [
      { name: "Dashboard", path: "/admin/dashboard", icon: <FaTachometerAlt /> },
      {
        name: "Products",
        icon: <FaCoffee />,
        children: [
          { name: "All Products", path: "/admin/products/all" },
          { name: "Add New Product", path: "/admin/products/new" },
          { name: "Categories", path: "/admin/products/categories" },
        ],
      },
      { name: "Orders", path: "/admin/orders", icon: <FaBoxOpen /> },
      { name: "Customers", path: "/admin/customers", icon: <FaUsers /> },
      { name: "Inventory", path: "/admin/inventory", icon: <FaWarehouse /> },
      { name: "Payments", path: "/admin/payments", icon: <FaMoneyBillWave /> },
      { name: "Promotions", path: "/admin/promotions", icon: <FaGift /> },
      { name: "Reviews", path: "/admin/reviews", icon: <FaStar /> },
      { name: "Blog", path: "/admin/blog", icon: <FaNewspaper /> },
      { name: "Settings", path: "/admin/settings", icon: <FaCog /> },
    ],
    []
  );

  const toggleMenu = (name) => {
    setOpenMenus((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  // Auto-open parent when a child is active
  useEffect(() => {
    const newOpen = {};
    menuItems.forEach((item) => {
      if (item.children) {
        const isChildActive = item.children.some((child) =>
          pathMatches(location.pathname, child.path)
        );
        if (isChildActive) newOpen[item.name] = true;
      }
    });
    setOpenMenus((prev) => ({ ...prev, ...newOpen }));
  }, [location.pathname, menuItems]);

  return (
    <aside className="w-64 bg-[#755E55] text-white min-h-screen shadow-xl flex flex-col relative overflow-hidden">
      {/* Background pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full bg-repeat" style={{ backgroundImage: `url(${sideBg})`, backgroundSize: '20px 20px' }}></div>
      </div>
      
      {/* Sidebar header */}
      <div className="p-6 border-b border-[#B0A194]/30 relative z-10">
        <h1 className="text-2xl font-bold text-white">CAFFIENA</h1>
        <p className="text-xs text-[#B0A194] mt-1">Admin Panel</p>
      </div>
      
      {/* Navigation menu */}
      <nav className="flex-1 mt-6 relative z-10">
        <ul className="space-y-1 px-4">
          {menuItems.map((item) => {
            const hasChildren = Array.isArray(item.children) && item.children.length > 0;
            const isActive = hasChildren
              ? item.children.some((child) => pathMatches(location.pathname, child.path))
              : pathMatches(location.pathname, item.path ?? "");
            
            return (
              <li key={item.name}>
                {hasChildren ? (
                  <>
                    <div
                      className={`flex items-center justify-between px-4 py-3 my-1 rounded-lg cursor-pointer transition-all duration-200 ${
                        isActive 
                          ? "bg-[#896039]/30 text-white border-l-4 border-[#896039]" 
                          : "hover:bg-[#B0A194]/20"
                      }`}
                      onClick={() => toggleMenu(item.name)}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`text-lg ${isActive ? "text-[#B0A194]" : "text-[#B0A194]/70"}`}>
                          {item.icon}
                        </span>
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <FaChevronDown
                        className={`text-xs text-[#B0A194]/70 transform transition-transform duration-200 ${
                          openMenus[item.name] ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                    
                    {openMenus[item.name] && (
                      <ul className="pl-4 mt-1 space-y-1">
                        {item.children.map((child) => {
                          const childActive = pathMatches(location.pathname, child.path);
                          return (
                            <li key={child.name}>
                              <Link
                                to={child.path}
                                className={`flex items-center gap-3 px-4 py-2 my-1 rounded-lg transition-all duration-200 ${
                                  childActive 
                                    ? "bg-[#896039]/20 text-white border-l-4 border-[#896039]" 
                                    : "hover:bg-[#B0A194]/15"
                                }`}
                              >
                                <span className="text-sm">{child.name}</span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 my-1 rounded-lg transition-all duration-200 ${
                      isActive 
                        ? "bg-[#896039]/30 text-white border-l-4 border-[#896039]" 
                        : "hover:bg-[#B0A194]/20"
                    }`}
                  >
                    <span className={`text-lg ${isActive ? "text-[#B0A194]" : "text-[#B0A194]/70"}`}>
                      {item.icon}
                    </span>
                    <span className="font-medium">{item.name}</span>
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
      
      {/* Sidebar footer */}
      <div className="p-4 border-t border-[#B0A194]/30 text-center text-xs text-[#B0A194]/70 relative z-10">
        <p>© 2023 Caffiena Admin</p>
        <p className="mt-1">All rights reserved</p>
      </div>
    </aside>
  );
}