import { dtToHour, codeToImage } from '../helpers/Helpers';

import './Hourly.css';

const Hourly = ({ hrlyWeather }) => {
  return (
    <div>
      <p>Hourly Forecast</p>
      <div className='hourly'>
        {hrlyWeather.map((hour) => {
          return (
            <div key={hour.time} className='hour'>
              <h4>{hour === hrlyWeather[0] ? 'Now' : dtToHour(hour.time)}</h4>
              <img src={codeToImage(hour.icon)} alt={hour.icon} />
              <h4>{hour.temp}&#176;</h4>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Hourly;
