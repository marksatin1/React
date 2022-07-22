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
        const { data } = response;
        // console.log(data);
        let hourlyData = [],
          dailyData = [];

        for (let hour = 0; hour < 24; hour++) {
          hourlyData.push({
            time: data.hourly[hour].dt,
            icon: data.hourly[hour].weather[0].icon,
            temp: Math.round(data.hourly[hour].temp),
          });
        }

        for (let day in data.daily) {
          dailyData.push({
            day: data.daily[day].dt,
            icon: data.daily[day].weather[0].icon,
            low: Math.round(data.daily[day].temp.min),
            high: Math.round(data.daily[day].temp.max),
            sunrise: {
              time: data.daily[day].sunrise,
              icon: 'sunrise',
              temp: 'SUNRISE',
            },
            sunset: {
              time: data.daily[day].sunset,
              icon: 'sunset',
              temp: 'SUNSET',
            },
          });
        }

        setWeatherData({
          crnt: {
            crntTemp: Math.round(data.current.temp),
            descrip: data.current.weather[0].main,
            low: dailyData[0].low,
            high: dailyData[0].high,
            uvi: Math.round(data.current.uvi),
            feels: Math.round(data.current.feels_like),
            humidity: data.current.humidity,
            dew: Math.round(data.current.dew_point),
            vis: visConverter(data.current.visibility),
            pressure: data.current.pressure,
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
