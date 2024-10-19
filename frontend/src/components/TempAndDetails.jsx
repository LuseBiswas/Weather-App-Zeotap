import React from "react";
import { FaThermometerHalf } from "react-icons/fa";
import { BiSolidDropletHalf } from "react-icons/bi";
import { FiWind } from "react-icons/fi";
import { GiSunrise, GiSunset } from "react-icons/gi";
import { MdKeyboardArrowUp, MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";

const TempAndDetails = ({
  weather: {
    details,
    icon,
    temp,
    temp_min,
    temp_max,
    sunrise,
    sunset,
    speed,
    humidity,
    feels_like,
  },
  units,
}) => {
  const verticalDetails = [
    {
      id: 1,
      Icon: FaThermometerHalf,
      title: "Real Feel",
      value: `${feels_like.toFixed()}°`,
    },
    {
      id: 2,
      Icon: BiSolidDropletHalf,
      title: "Humidity",
      value: `${humidity.toFixed()}%`,
    },
    {
      id: 3,
      Icon: FiWind,
      title: "Wind",
      value: `${speed.toFixed()} ${units === "metric" ? "km/h" : "m/s"}`,
    },
  ];

  const horizontalDetails = [
    {
      id: 1,
      Icon: GiSunrise,
      title: "Sunrise",
      value: sunrise,
    },
    {
      id: 2,
      Icon: GiSunset,
      title: "Sunset",
      value: sunset,
    },
    {
      id: 3,
      Icon: MdKeyboardArrowUp,
      title: "High",
      value: `${temp_max.toFixed()}°`,
    },
    {
      id: 4,
      Icon: MdKeyboardArrowDown,
      title: "Low",
      value: `${temp_min.toFixed()}°`,
    },
    {
      id: 5,
      Icon: MdKeyboardArrowRight,
      title: "Average",
      value: `${((temp_min + temp_max) / 2).toFixed()}°`,
    },
  ];

  return (
    <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-6 shadow-lg">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-cyan-300">{details}</h2>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <div className="flex items-center mb-4 md:mb-0">
          <img src={icon} alt="weather icon" className="w-24 h-24 mr-4" />
          <p className="text-6xl font-bold text-white">{`${temp.toFixed()}°`}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {verticalDetails.map(({ id, Icon, title, value }) => (
            <div
              key={id}
              className="flex items-center text-white"
            >
              <Icon size={24} className="mr-2 text-red-600" />
              <div>
                <p className="text-sm">{title}</p>
                <p className="font-semibold">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 text-white">
        {horizontalDetails.map(({ id, Icon, title, value }) => (
          <div key={id} className="flex flex-col items-center bg-black bg-opacity-20 rounded-lg p-3">
            <Icon size={30} className="mb-2 text-cyan-300" />
            <p className="text-sm">{title}</p>
            <p className="font-semibold">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TempAndDetails;