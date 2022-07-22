import Window from './Window';

import { dtToDay, codeToImage } from '../helpers/Helpers';

import './Daily.css';

const Daily = ({ dailyWeather }) => {
  return (
    <Window className='window-large' title='7 Day Forecast'>
      <div className='days'>
        {dailyWeather.map((day) => {
          return (
            <div key={day.day} className='day'>
              <p>{day === dailyWeather[0] ? 'Today' : dtToDay(day.day)}</p>
              <img src={codeToImage(day.icon)} alt='day.icon' />
              <div className='meter'>
                <p>{day.low}&#176;</p>
                <meter id='daily-meter'></meter>
                <p>{day.high}&#176;</p>
              </div>
            </div>
          );
        })}
      </div>
    </Window>
  );
};

export default Daily;
