import React, { useEffect, useState } from 'react';

import HomeScreen from './pages/HomeScreen';
import SearchScreen from './pages/SearchScreen';

import { visConverter } from './helpers/Helpers';

const axios = require('axios');

const defaultWeatherApiSettings = {
  lat: 39.084,
  lon: -77.1528,
  units: 'imperial',
};

const App = () => {
  const [searchSettings, setSearchSettings] = useState(
    defaultWeatherApiSettings
  );
  const [weatherData, setWeatherData] = useState({
    crnt: {},
    hrly: [],
    daily: [],
  });
  const [showSearchWindow, setShowSearchWindow] = useState(false);
  const [savedLocs, setSavedLocs] = useState([1, 2, 3]);

  useEffect(() => {
    axios
      .get('https://api.openweathermap.org/data/3.0/onecall', {
        params: {
          lat: searchSettings.lat,
          lon: searchSettings.lon,
          units: searchSettings.units,
          exclude: 'minutely',
          appid: process.env.REACT_APP_OPEN_WEATHER_API_KEY,
        },
      })
      .then((response) => {
        console.log(response.data);
        let hourlyData = [],
          dailyData = [];

        for (let hour = 0; hour < 24; hour++) {
          hourlyData.push({
            time: response.data.hourly[hour].dt,
            icon: response.data.hourly[hour].weather[0].icon,
            temp: Math.round(response.data.hourly[hour].temp),
          });
        }

        for (let day in response.data.daily) {
          dailyData.push({
            day: response.data.daily[day].dt,
            icon: response.data.daily[day].weather[0].icon,
            low: Math.round(response.data.daily[day].temp.min),
            high: Math.round(response.data.daily[day].temp.max),
          });
        }

        setWeatherData({
          crnt: {
            crntTemp: Math.round(response.data.current.temp),
            descrip: response.data.current.weather[0].main,
            low: dailyData[0].low,
            high: dailyData[0].high,
            uvi: Math.round(response.data.current.uvi),
            sunset: response.data.current.sunset,
            sunrise: response.data.current.sunrise,
            feels: Math.round(response.data.current.feels_like),
            humidity: response.data.current.humidity,
            dew: Math.round(response.data.current.dew_point),
            vis: visConverter(response.data.current.visibility),
            pressure: response.data.current.pressure,
          },
          hrly: hourlyData,
          daily: dailyData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [searchSettings]);

  return (
    <>
      {!showSearchWindow ? (
        <HomeScreen
          setShowSearchWindow={setShowSearchWindow}
          weatherData={weatherData}
        />
      ) : (
        <SearchScreen savedLocs={savedLocs} />
      )}
    </>
  );
};

export default App;
