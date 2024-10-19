import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  WiDaySunny,
  WiNightClear,
  WiCloudy,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiFog,
} from "react-icons/wi";
import { FaSearch, FaToggleOn, FaToggleOff, FaBuilding } from "react-icons/fa";
import { TiLocationOutline } from "react-icons/ti";

const getFormattedWeatherData = async ({ q, units }) => {
  // Simulating API call
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const now = new Date();
  const sunriseTime = new Date(now.setHours(6, 30, 0)).getTime() / 1000; // Example: 6:30 AM
  const sunsetTime = new Date(now.setHours(18, 30, 0)).getTime() / 1000; // Example: 6:30 PM
  const temp_min = Math.random() * 5 + 5; // Example min temperature
  const temp_max = Math.random() * 5 + 30; // Example max temperature
  const avg_temp = (temp_min + temp_max) / 2; // Calculate average temperature

  return {
    name: q,
    country: "Country",
    temp: avg_temp, // Use average temp as the main temperature
    temp_min,
    temp_max,
    feels_like: Math.random() * 30 + 10,
    humidity: Math.floor(Math.random() * 100),
    speed: (Math.random() * 10).toFixed(2),
    description: "Partly cloudy",
    icon: "02d",
    dt: Date.now() / 1000,
    sunrise: sunriseTime,
    sunset: sunsetTime,
  };
};

const WeatherIcon = ({ iconCode }) => {
  const iconMap = {
    "01d": <WiDaySunny className="text-yellow-400" />,
    "01n": <WiNightClear className="text-gray-300" />,
    "02d": <WiCloudy className="text-gray-400" />,
    "02n": <WiCloudy className="text-gray-500" />,
    "03d": <WiCloudy className="text-gray-400" />,
    "03n": <WiCloudy className="text-gray-500" />,
    "04d": <WiCloudy className="text-gray-600" />,
    "04n": <WiCloudy className="text-gray-700" />,
    "09d": <WiRain className="text-blue-400" />,
    "09n": <WiRain className="text-blue-500" />,
    "10d": <WiRain className="text-blue-400" />,
    "10n": <WiRain className="text-blue-500" />,
    "11d": <WiThunderstorm className="text-yellow-600" />,
    "11n": <WiThunderstorm className="text-yellow-700" />,
    "13d": <WiSnow className="text-blue-200" />,
    "13n": <WiSnow className="text-blue-300" />,
    "50d": <WiFog className="text-gray-400" />,
    "50n": <WiFog className="text-gray-500" />,
  };

  return (
    <div className="text-6xl">
      {iconMap[iconCode] || <WiDaySunny className="text-yellow-400" />}
    </div>
  );
};

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
    <div className="bg-white bg-opacity-20 p-4 rounded-lg backdrop-filter backdrop-blur-lg mb-6">
      <h2 className="text-white text-center mb-4 font-semibold">
        Popular Cities
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
        {cities.map((city) => (
          <button
            key={city.id}
            className="flex flex-col items-center justify-center bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-lg p-3 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
            onClick={() => setQuery({ q: city.name })}
          >
            <span className="text-2xl mb-1">{city.icon}</span>
            <span className="text-sm font-medium">{city.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

const App = () => {
  const [query, setQuery] = useState({ q: "Chandigarh" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  const [threshold, setThreshold] = useState(35);

  const getWeather = async () => {
    const cityName = query.q || "current location";
    toast.info(`Fetching weather data for ${cityName}`);

    try {
      const data = await getFormattedWeatherData({ ...query, units });
      toast.success(`Fetched weather data for ${data.name}, ${data.country}`);
      setWeather(data);
    } catch (error) {
      toast.error("Failed to fetch weather data");
    }
  };

  useEffect(() => {
    getWeather();
    const intervalId = setInterval(getWeather, 300000);
    return () => clearInterval(intervalId);
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) return "bg-gradient-to-br from-cyan-700 to-blue-700";
    const threshold2 = units === "metric" ? 20 : 68;
    if (weather.temp > threshold)
      toast.warn(`Temperature exceeded threshold in ${weather.name}`);
    return weather.temp <= threshold2
      ? "bg-gradient-to-br from-cyan-700 to-blue-700"
      : "bg-gradient-to-br from-yellow-700 to-orange-700";
  };

  return (
    <div className={`min-h-screen ${formatBackground()} text-white`}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Weather App</h1>

        <TopButtons setQuery={setQuery} />

        <div className="bg-white bg-opacity-20 rounded-lg p-6 backdrop-filter backdrop-blur-lg">
          <div className="flex items-center justify-between mb-6">
            <div className="relative flex-1 mr-4">
              <input
                type="text"
                placeholder="Search for city..."
                className="w-full py-2 px-4 rounded-full bg-white bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-white"
                value={query.q}
                onChange={(e) => setQuery({ ...query, q: e.target.value })}
              />
              <FaSearch className="absolute right-3 top-3 text-gray-300" />
            </div>
            <button
              onClick={() =>
                setUnits(units === "metric" ? "imperial" : "metric")
              }
              className="flex items-center bg-white bg-opacity-20 rounded-full px-4 py-2 transition-colors duration-200 hover:bg-opacity-30"
            >
              {units === "metric" ? (
                <>
                  <FaToggleOn className="mr-2" /> °C
                </>
              ) : (
                <>
                  <FaToggleOff className="mr-2" /> °F
                </>
              )}
            </button>
          </div>

          {weather && (
            <div className="text-center">
              <h2 className="text-3xl font-semibold mb-2">
                {weather.name}, {weather.country}
              </h2>
              <p className="text-xl mb-6">
                {new Date(weather.dt * 1000).toLocaleDateString(undefined, {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>

              <div className="flex items-center justify-center mb-6">
                <WeatherIcon iconCode={weather.icon} />
                <p className="text-6xl font-bold ml-4">
                  {Math.round(weather.temp)}°{units === "metric" ? "C" : "F"}
                </p>
              </div>

              <p className="text-xl mb-6 capitalize">{weather.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
  <div className="bg-white bg-opacity-20 rounded-lg p-6 shadow-lg transition-transform transform hover:scale-105">
    <p className="text-lg font-medium text-gray-200">Feels Like</p>
    <p className="text-3xl font-bold text-gray-100">
      {Math.round(weather.feels_like)}°
      {units === "metric" ? "C" : "F"}
    </p>
  </div>
  
  <div className="bg-white bg-opacity-20 rounded-lg p-6 shadow-lg transition-transform transform hover:scale-105">
    <p className="text-lg font-medium text-gray-200">Humidity</p>
    <p className="text-3xl font-bold text-gray-100">{weather.humidity}%</p>
  </div>
  
  <div className="bg-white bg-opacity-20 rounded-lg p-6 shadow-lg transition-transform transform hover:scale-105">
    <p className="text-lg font-medium text-gray-200">Wind Speed</p>
    <p className="text-3xl font-bold text-gray-100">
      {weather.speed} {units === "metric" ? "m/s" : "mph"}
    </p>
  </div>
  
  <div className="bg-white bg-opacity-20 rounded-lg p-6 shadow-lg transition-transform transform hover:scale-105">
    <p className="text-lg font-medium text-gray-200">Threshold</p>
    <input
      type="number"
      value={threshold}
      onChange={(e) => setThreshold(Number(e.target.value))}
      className="w-full bg-transparent border-b border-white text-2xl font-bold text-gray-100 focus:outline-none"
      placeholder="Set threshold"
    />
  </div>

  <div className="bg-white bg-opacity-20 rounded-lg p-6 shadow-lg transition-transform transform hover:scale-105">
    <p className="text-lg font-medium text-gray-200">Min Temp</p>
    <p className="text-3xl font-bold text-gray-100">
      {Math.round(weather.temp_min)}°
      {units === "metric" ? "C" : "F"}
    </p>
  </div>
  
  <div className="bg-white bg-opacity-20 rounded-lg p-6 shadow-lg transition-transform transform hover:scale-105">
    <p className="text-lg font-medium text-gray-200">Max Temp</p>
    <p className="text-3xl font-bold text-gray-100">
      {Math.round(weather.temp_max)}°
      {units === "metric" ? "C" : "F"}
    </p>
  </div>
  
  <div className="bg-white bg-opacity-20 rounded-lg p-6 shadow-lg transition-transform transform hover:scale-105">
    <p className="text-lg font-medium text-gray-200">Avg Temp</p>
    <p className="text-3xl font-bold text-gray-100">
      {Math.round(weather.temp)}°{units === "metric" ? "C" : "F"}
    </p>
  </div>
  
  <div className="bg-white bg-opacity-20 rounded-lg p-6 shadow-lg transition-transform transform hover:scale-105">
    <p className="text-lg font-medium text-gray-200">Sunrise</p>
    <p className="text-3xl font-bold text-gray-100">
      {new Date(weather.sunrise * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}
    </p>
  </div>
  
  <div className="bg-white bg-opacity-20 rounded-lg p-6 shadow-lg transition-transform transform hover:scale-105">
    <p className="text-lg font-medium text-gray-200">Sunset</p>
    <p className="text-3xl font-bold text-gray-100">
      {new Date(weather.sunset * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}
    </p>
  </div>
</div>

            </div>
          )}
          <footer className="mt-10 text-center text-sm">
          <p className="text-gray-300">✨ Crafted with care by Ritesh Biswas ✨</p>
        </footer>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar
        theme="dark"
      />
    </div>
  );
};

export default App;
