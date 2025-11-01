// src/components/CoffeeCountry.jsx
import React, { useState } from "react";
import FeatureCoffeeCard from "./FeatureCoffeeCard";

const coffeeData = {
  India: [
    {
      title: "Indian Arabica",
      desc: "Smooth flavor with fruity notes from Indian plantations.",
      client: "Ravi, Client",
      rating: 4.8,
      img: "https://coffee-workdo.myshopify.com/cdn/shop/products/5.png?v=1672642716"
    },
    {
      title: "South Indian Filter Coffee",
      desc: "Traditional rich and strong taste loved worldwide.",
      client: "Ananya, Client",
      rating: 4.7,
      img: "https://upload.wikimedia.org/wikipedia/commons/4/45/Coffee_cup_icon.png"
    }
  ],
  "United Kingdom": [
    {
      title: "UK Roast Blend",
      desc: "Classic dark roasted blend popular in London cafes.",
      client: "James, Client",
      rating: 4.5,
      img: "https://upload.wikimedia.org/wikipedia/commons/4/45/Coffee_cup_icon.png"
    },
    {
      title: "English Breakfast Coffee",
      desc: "Perfect companion to breakfast with a bold taste.",
      client: "Emma, Client",
      rating: 4.6,
      img: "https://upload.wikimedia.org/wikipedia/commons/4/45/Coffee_cup_icon.png"
    }
  ],
  Spain: [
    {
      title: "Spanish Espresso",
      desc: "Rich and bold flavor with a smooth finish.",
      client: "Carlos, Client",
      rating: 4.7,
      img: "https://upload.wikimedia.org/wikipedia/commons/4/45/Coffee_cup_icon.png"
    },
    {
      title: "Spanish Blend",
      desc: "Medium-dark roast with hints of citrus.",
      client: "Maria, Client",
      rating: 4.5,
      img: "https://upload.wikimedia.org/wikipedia/commons/4/45/Coffee_cup_icon.png"
    }
  ],
  Ukraine: [
    {
      title: "Ukrainian Roast",
      desc: "Medium roast with nutty undertones.",
      client: "Olga, Client",
      rating: 4.4,
      img: "https://upload.wikimedia.org/wikipedia/commons/4/45/Coffee_cup_icon.png"
    },
    {
      title: "Kiev Blend",
      desc: "Bold flavor with smoky notes.",
      client: "Ivan, Client",
      rating: 4.6,
      img: "https://upload.wikimedia.org/wikipedia/commons/4/45/Coffee_cup_icon.png"
    }
  ],
  Poland: [
    {
      title: "Polish Blend",
      desc: "Dark roast with chocolate notes.",
      client: "Marek, Client",
      rating: 4.6,
      img: "https://upload.wikimedia.org/wikipedia/commons/4/45/Coffee_cup_icon.png"
    },
    {
      title: "Warsaw Special",
      desc: "Smooth medium roast with caramel finish.",
      client: "Anna, Client",
      rating: 4.8,
      img: "https://upload.wikimedia.org/wikipedia/commons/4/45/Coffee_cup_icon.png"
    }
  ]
};

export default function CoffeeCountry() {
  const [selectedCountry, setSelectedCountry] = useState("India");
  const [currentIndex, setCurrentIndex] = useState(0);
  const countryList = ["Spain", "Ukraine", "India", "United Kingdom", "Poland"];
  const cards = coffeeData[selectedCountry] || [];
  


  return (
    <div className="max-w-7xl mx-auto bg-black grid grid-cols-3 divide-x divide-[#6F4E37] py-10">
      {/* Left Section - No cards here, just the original content */}
      <div className="px-6">
        <h4 className="text-sm font-semibold text-white">Coffee</h4>
        <h2 className="text-3xl font-bold text-[#A7897B] mt-2">
          Fresh roasted coffee <br /> with 24h delivery blogs
        </h2>
        <p className="text-white font-semibold mt-4">
          Denver Biscuit cafe knows how to entice future customers. A video
          takes viewers all the way from the preparation of one of their
          desserts to the service.
        </p>
        <button className="mt-4 text-white font-bold underline font-medium">Show Products</button>
      </div>
      
      {/* Middle Section */}
      <div className="flex flex-col justify-start relative px-6 ">
        <h4 className="text-sm font-semibold text-white mb-6">Choose the origin of the coffee:</h4>
        <ul className="space-y-4 text-4xl font-medium">
          {countryList.map((country) => (
            <li
              key={country}
              onClick={() => {
                setSelectedCountry(country);
                setCurrentIndex(0);
              }}
              className={`cursor-pointer transition-colors duration-200 ${
                selectedCountry === country
                  ? "text-white underline"
                  : "text-[#A7897B] hover:text-white"
              }`}
            >
              {country}
            </li>
          ))}
        </ul>
        
        {/* Coffee Bean Image - Positioned in bottom right corner */}
        <img
          src="/src/assets/coffee-dummy-data/flying-coffee.png"
          alt="Coffee Bean"
          className="absolute bottom-2  right-2 w-32 opacity-70"
        />
      </div>
      
      {/* Right Section - Always show two cards with gap between them */}
      <div className="px-6 flex flex-col justify-center relative">
        {cards.length > 0 ? (
          <div className="space-y-6">
            {/* First Card - Always show current index */}
            <div className="mb-4">
              <FeatureCoffeeCard coffee={cards[currentIndex]} />
            </div>
            
            {/* Second Card - Always show the next one */}
            <div className="mb-4">
              <FeatureCoffeeCard 
                coffee={cards[(currentIndex + 1) % cards.length]} 
              />
            </div>
            
            {/* Slider Controls - Only show if there are more than 2 cards */}
           
          </div>
        ) : (
          <div className="text-center py-8 text-gray-400">
            <p>No coffee available for this country.</p>
          </div>
        )}
      </div>
    </div>
  );
}