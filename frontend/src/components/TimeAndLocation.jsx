import React from "react";
import { FaClock, FaMapMarkerAlt } from "react-icons/fa";
import { WiDaySunny, WiNightClear } from "react-icons/wi";

const TimeAndLocation = ({
  weather: { formattedLocalTime, name, country },
}) => {
  // Determine if it's day or night (this is a simple approximation)
  const hour = parseInt(formattedLocalTime.split(':')[0], 10);
  const isDaytime = hour >= 6 && hour < 18;

  return (
    <div className="bg-gradient-to-r from-blue-400 to-indigo-500 rounded-lg p-6 shadow-lg text-white">
      <div className="flex items-center justify-center mb-4">
        <FaClock className="text-2xl mr-2 text-yellow-300" />
        <p className="text-2xl font-light">{formattedLocalTime}</p>
        {isDaytime ? (
          <WiDaySunny className="text-4xl ml-2 text-yellow-300" />
        ) : (
          <WiNightClear className="text-4xl ml-2 text-blue-200" />
        )}
      </div>

      <div className="flex items-center justify-center">
        <FaMapMarkerAlt className="text-2xl mr-2 text-red-400" />
        <p className="text-3xl font-medium">
          {name}
          <span className="text-xl font-light ml-2">{country}</span>
        </p>
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm font-light italic">
          {isDaytime ? "Enjoy your day!" : "Have a peaceful night!"}
        </p>
      </div>
    </div>
  );
};

export default TimeAndLocation;