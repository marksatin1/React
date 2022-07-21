import { dtToDay, codeToImage } from '../helpers/Helpers';

import './Daily.css';

const Daily = ({ dailyWeather }) => {
  return (
    <div className='daily'>
      <p>7 Day Forecast</p>
      {dailyWeather.map((day) => {
        return (
          <div key={day.day} className='day'>
            <h4>{day === dailyWeather[0] ? 'Today' : dtToDay(day.day)}</h4>
            <img src={codeToImage(day.icon)} alt='day.icon' />
            <label htmlFor='daily-meter'>{day.low}&#176;</label>
            <meter id='daily-meter'></meter>
            <label htmlFor='daily-meter'>{day.high}&#176;</label>
          </div>
        );
      })}
    </div>
  );
};

export default Daily;
