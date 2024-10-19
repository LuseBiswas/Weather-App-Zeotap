const fetch = require('node-fetch');
const dotenv = require('dotenv');

// Load environment variables from .env
dotenv.config();

// Get values from environment variables
const API_KEY = process.env.API_KEY;
const BASE_URL = process.env.BASE_URL;

const getWeatherData = async (infoType, searchParams) => {
  const url = new URL(BASE_URL + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

  const response = await fetch(url);
  const data = await response.json();
  return data;
};

module.exports = getWeatherData;
