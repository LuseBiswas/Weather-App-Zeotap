import React, { useState } from "react";
import { BiSearch, BiCurrentLocation } from "react-icons/bi";
import { FaTemperatureHigh } from "react-icons/fa";

const Inputs = ({ setQuery, setUnits, setThreshold }) => {
  const [city, setCity] = useState("");
  const [thre, setThre] = useState("");

  const handleSearchClick = () => {
    if (city.trim() !== "") setQuery({ q: city });
  };

  const handleThreshold = () => {
    if (thre.trim() !== "") setThreshold(Number(thre));
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setQuery({ lat: latitude, lon: longitude });
      });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  const handleThresholdKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleThreshold();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="relative w-full sm:w-3/5 max-w-md">
          <input
            value={city}
            onChange={(e) => setCity(e.currentTarget.value)}
            onKeyPress={handleKeyPress}
            type="text"
            placeholder="Search by city..."
            className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <BiSearch
            size={24}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-blue-500 transition-colors duration-300"
            onClick={handleSearchClick}
          />
        </div>
        <button
          className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-300"
          onClick={handleLocationClick}
        >
          <BiCurrentLocation size={24} />
        </button>
      </div>

      <div className="flex justify-center items-center space-x-4">
        <button
          className="px-4 py-2 text-lg font-medium bg-gray-200 rounded-full hover:bg-gray-300 transition-colors duration-300"
          onClick={() => setUnits("metric")}
        >
          °C
        </button>
        <button
          className="px-4 py-2 text-lg font-medium bg-gray-200 rounded-full hover:bg-gray-300 transition-colors duration-300"
          onClick={() => setUnits("")}
        >
          K
        </button>
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="relative w-full sm:w-auto">
          <input
            value={thre}
            onChange={(e) => setThre(e.currentTarget.value)}
            onKeyPress={handleThresholdKeyPress}
            type="number"
            placeholder="Threshold temp..."
            className="w-full sm:w-48 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <FaTemperatureHigh
            size={20}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
        </div>
        <button
          onClick={handleThreshold}
          className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors duration-300"
        >
          Set Threshold
        </button>
      </div>
    </div>
  );
};

export default Inputs;