import './Current.css';

const Current = ({ crntWeather }) => {
  return (
    <div className='current'>
      <h1>Location</h1>
      <h1>{crntWeather.crntTemp}&#176;</h1>
      <h3>{crntWeather.descrip}</h3>
      <span>
        <h6>H: {crntWeather.high}&#176;</h6>
        <h6>L: {crntWeather.low}&#176;</h6>
      </span>
    </div>
  );
};

export default Current;
