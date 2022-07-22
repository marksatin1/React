import Window from './Window';

import { dtToUsTime, dtToHour, codeToImage } from '../helpers/Helpers';

import './Hourly.css';

const Hourly = ({ weatherData }) => {
  let hrlyWeather = weatherData.hrly,
    dailyWeather = weatherData.daily;
  let hrsWithSun = [];

  if (dailyWeather[0]) {
    // console.log(weatherData);
    let sunrise1 = dailyWeather[0].sunrise;
    let sunset1 = dailyWeather[0].sunset;
    let sunrise2 = dailyWeather[1].sunrise;
    let sunset2 = dailyWeather[1].sunset;

    for (let hour of hrlyWeather) {
      hrsWithSun.push(hour);
    }

    let sunriseIdx = hrlyWeather.findIndex((hour) => hour.time > sunrise1.time);

    if (sunriseIdx !== -1 && sunriseIdx !== 0) {
      hrsWithSun.splice(sunriseIdx, 0, sunrise1);
    } else if (sunriseIdx === 0) {
      sunriseIdx = hrlyWeather.findIndex((hour) => hour.time > sunrise2.time);
      hrsWithSun.splice(sunriseIdx, 0, sunrise2);
    }

    let sunsetIdx = hrlyWeather.findIndex((hour) => hour.time > sunset1.time);

    if (sunsetIdx !== -1 && sunsetIdx !== 0) {
      hrsWithSun.splice(sunsetIdx, 0, sunset1);
    } else if (sunsetIdx === 0) {
      sunsetIdx = hrlyWeather.findIndex((hour) => hour.time > sunset2.time);
      hrsWithSun.splice(sunsetIdx, 0, sunset2);
    }
  }

  return (
    <Window className='window-large' title='Hourly Forecast'>
      <div className='hours'>
        {hrsWithSun.map((hour) => {
          return (
            <div key={hour.time} className='hour'>
              <p className='time'>
                {hour === hrsWithSun[0]
                  ? 'Now'
                  : hour.temp === 'SUNRISE' || hour.temp === 'SUNSET'
                  ? dtToUsTime(hour.time)
                  : dtToHour(hour.time)}
              </p>
              <img src={codeToImage(hour.icon)} alt={hour.icon} />
              <p className='temp'>
                {hour.temp === 'SUNRISE' || hour.temp === 'SUNSET'
                  ? hour.temp
                  : hour.temp + '°'}
              </p>
            </div>
          );
        })}
      </div>
    </Window>
  );
};

export default Hourly;
