import React from "react";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const collections = [
  {
    name: "Capsulated Coffee",
    image:
      "https://insanelygoodrecipes.com/wp-content/uploads/2020/07/Cup-Of-Creamy-Coffee.png",
    path: "/collections/capsulated-coffee",
  },
  {
    name: "Brewing Tools",
    image:
      "https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=800&q=80",
    path: "/brewing-tools",
  },
  {
    name: "Roast & Grinders",
    image:
      "https://www.kauveryhospitalsbangalore.com/assets/uploads/blog/mobcup_68526509d42eb.jpg",
    path: "/roast-grinders",
  },
  {
    name: "Coffee",
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80",
    path: "/coffee",
  },
];

function CollectionDropDown({ isMobile = false, onBack }) {
  const navigate = useNavigate();

  // Mobile View
  if (isMobile) {
    return (
      <div className="bg-white h-full overflow-y-auto">
        {/* Back Header */}
        <div className="sticky top-0 bg-[#A7897B] px-4 py-3 flex items-center">
          <button onClick={onBack} className="mr-3">
            <ChevronLeft size={20} className="text-gray-800" />
          </button>
          <h2 className="text-gray-800 font-semibold text-base">Collections</h2>
        </div>

        {/* Collection Items */}
        <div className="px-4 py-4 space-y-4">
          {collections.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(item.path)}
              className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-all"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 text-center font-semibold text-gray-800">
                {item.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Desktop View
  return (
    <div className="bg-white/95 backdrop-blur-md shadow-2xl">
      <div className="max-w-7xl mx-auto p-8">
        <div className="grid grid-cols-4 gap-6">
          {collections.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(item.path)}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl cursor-pointer transition-all duration-300 transform hover:scale-105"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover rounded-t-2xl"
              />
              <div className="p-4 text-center font-semibold text-gray-800">
                {item.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CollectionDropDown;
