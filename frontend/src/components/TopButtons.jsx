import React from "react";
import { MapPin } from "lucide-react";

const TopButtons = ({ setQuery }) => {
  const cities = [
    { id: 1, name: "Bangalore", icon: "🌴" },
    { id: 2, name: "Delhi", icon: "🏛️" },
    { id: 3, name: "Mumbai", icon: "🌊" },
    { id: 4, name: "Chennai", icon: "🏖️" },
    { id: 5, name: "Kolkata", icon: "🚋" },
    { id: 6, name: "Hyderabad", icon: "🍗" },
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-center gap-2 mb-4">
        <MapPin className="h-5 w-5 text-white" />
        <h2 className="text-xl font-semibold text-white">Popular Cities</h2>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {cities.map((city) => (
          <button
            key={city.id}
            className="group flex flex-col items-center justify-center p-3 
                     rounded-xl backdrop-blur-sm bg-white/10 
                     hover:bg-white/20 transition-all duration-300
                     border border-white/10 hover:border-white/20
                     shadow-lg hover:shadow-xl"
            onClick={() => setQuery({ q: city.name })}
          >
            <span className="text-2xl mb-1 transform group-hover:scale-110 transition-transform duration-300">
              {city.icon}
            </span>
            <span className="text-sm font-medium text-white group-hover:text-white/90">
              {city.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TopButtons;