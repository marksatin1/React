import Wrapper from '../components/Wrapper';
import Current from '../components/Current';
import Hourly from '../components/Hourly';
import Daily from '../components/Daily';
import Footer from '../components/Footer';

import { dtToUsTime, uvDescriber } from '../helpers/Helpers';

const HomeScreen = ({ weatherData, setShowSearchWindow }) => {
  return (
    <Wrapper className={'main-wrapper'}>
      <Wrapper className={'content-wrapper'}>
        <Current crntWeather={weatherData.crnt} />
        <Hourly hrlyWeather={weatherData.hrly} />
        <Daily dailyWeather={weatherData.daily} />
        <Wrapper className={'small-box-wrapper'}>
          <Wrapper className={'small-box'}>
            <p>UV Index</p>
            <div>
              <h4>{weatherData.crnt.uvi}</h4>
              <h4>{uvDescriber(weatherData.crnt.uvi)}</h4>
              <meter>UV Meter</meter>
            </div>
          </Wrapper>
          <Wrapper className={'small-box'}>
            <p>Sunset</p>
            <h4>{dtToUsTime(weatherData.crnt.sunset)}</h4>
            <img src='' alt='Sunset' />
            <p>Sunrise: {dtToUsTime(weatherData.crnt.sunrise)}</p>
          </Wrapper>
          <Wrapper className={'small-box'}>
            <p>Feels Like</p>
            <h4>{weatherData.crnt.feels}&#176;</h4>
          </Wrapper>
          <Wrapper className={'small-box'}>
            <p>Humidity</p>
            <h4>{weatherData.crnt.humidity}&#37;</h4>
          </Wrapper>
          <Wrapper className={'small-box'}>
            <p>Visibility</p>
            <h4>{weatherData.crnt.vis} ft</h4>
          </Wrapper>
          <Wrapper className={'small-box'}>
            <p>Pressure</p>
            <h4>{weatherData.crnt.pressure}</h4>
          </Wrapper>
        </Wrapper>
      </Wrapper>
      <Footer setShowSearchWindow={setShowSearchWindow} />
    </Wrapper>
  );
};

export default HomeScreen;
