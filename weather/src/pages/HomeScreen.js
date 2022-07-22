import Wrapper from '../components/Wrapper';
import Current from '../components/Current';
import Hourly from '../components/Hourly';
import Daily from '../components/Daily';
import Window from '../components/Window';
import Footer from '../components/Footer';

import { dtToUsTime, uvDescriber } from '../helpers/Helpers';
import sunset from '../assets/weather-icons/sunset.png';

const HomeScreen = ({ weatherData, setShowSearchWindow }) => {
  return (
    <Wrapper className={'main-wrapper'}>
      <Wrapper className={'content-wrapper'}>
        <Current crntWeather={weatherData.crnt} />
        <Hourly weatherData={weatherData} />
        <Daily dailyWeather={weatherData.daily} />
        <Wrapper className={'window-wrapper'}>
          <Window className='window-small' title='UV Index'>
            <div>
              <h4>{weatherData.crnt.uvi}</h4>
              <h4>{uvDescriber(weatherData.crnt.uvi)}</h4>
              <meter>UV Meter</meter>
            </div>
          </Window>
          <Window className='window-small' title='Sunset'>
            {/* <h4>{dtToUsTime(weatherData.daily.sunset.time)}</h4> */}
            <img src={sunset} alt='Sunset' />
            {/* <p>Sunrise: {dtToUsTime(weatherData.daily.sunrise.time)}</p> */}
          </Window>
          <Window className='window-small' title='Feels Like'>
            <h4>{weatherData.crnt.feels}&#176;</h4>
          </Window>
          <Window className='window-small' title='Humidity'>
            <h4>{weatherData.crnt.humidity}&#37;</h4>
            <p>The dew point is {weatherData.crnt.dew}&#176; right now.</p>
          </Window>
          <Window className='window-small' title='Visibility'>
            <h4>{weatherData.crnt.vis} mi</h4>
          </Window>
          <Window className='window-small' title='Pressure'>
            <h4>{weatherData.crnt.pressure} hPa</h4>
          </Window>
        </Wrapper>
      </Wrapper>
      <Footer setShowSearchWindow={setShowSearchWindow} />
    </Wrapper>
  );
};

export default HomeScreen;
