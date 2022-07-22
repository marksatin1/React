import './Current.css';

const Current = ({ crntWeather }) => {
  return (
    <div className='current'>
      <h2>Location</h2>
      <h1>{crntWeather.crntTemp}&#176;</h1>
      <h3>{crntWeather.descrip}</h3>
      <h3>
        H: {crntWeather.high}&#176; L: {crntWeather.low}&#176;
      </h3>
    </div>
  );
};

export default Current;
