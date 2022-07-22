import Window from './Window';

import { dtToHour, codeToImage } from '../helpers/Helpers';

import './Hourly.css';

const Hourly = ({ hrlyWeather }) => {
  return (
    <Window className='window-large' title='Hourly Forecast'>
      <div className='hours'>
        {hrlyWeather.map((hour) => {
          return (
            <div key={hour.time} className='hour'>
              <p className='time'>
                {hour === hrlyWeather[0] ? 'Now' : dtToHour(hour.time)}
              </p>
              <img src={codeToImage(hour.icon)} alt={hour.icon} />
              <p className='temp'>{hour.temp}&#176;</p>
            </div>
          );
        })}
      </div>
    </Window>
  );
};

export default Hourly;
