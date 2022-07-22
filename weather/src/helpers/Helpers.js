import d01 from '../assets/weather-icons/01d.png';
import n01 from '../assets/weather-icons/01n.png';
import d02 from '../assets/weather-icons/02d.png';
import n02 from '../assets/weather-icons/02n.png';
import b03 from '../assets/weather-icons/03.png';
import b04 from '../assets/weather-icons/04.png';
import b09 from '../assets/weather-icons/09.png';
import d10 from '../assets/weather-icons/10d.png';
import n10 from '../assets/weather-icons/10n.png';
import b11 from '../assets/weather-icons/11.png';
import b13 from '../assets/weather-icons/13.png';
import b50 from '../assets/weather-icons/50.png';
import sunrise from '../assets/weather-icons/sunrise.png';
import sunset from '../assets/weather-icons/sunset.png';

export const dtToHour = (datetime) => {
  let hour = new Date(datetime * 1000).getHours();
  let usHour = ((hour + 11) % 12) + 1;
  let suffix = hour >= 12 ? 'PM' : 'AM';
  return usHour + suffix;
};

export const dtToUsTime = (datetime) => {
  let date = new Date(datetime * 1000);
  let hour = date.getHours();
  let usHour = ((hour + 11) % 12) + 1;
  let minutes = date.getMinutes();
  let suffix = hour >= 12 ? 'PM' : 'AM';
  return usHour + ':' + minutes + ' ' + suffix;
};

export const dtToDay = (datetime) => {
  let weekdays = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
  let dayIdx = new Date(datetime * 1000).getDay();
  let dayName = weekdays[dayIdx];
  return dayName;
};

export const codeToImage = (iconCode) => {
  let icon =
    iconCode === '01d'
      ? d01
      : iconCode === '01n'
      ? n01
      : iconCode === '02d'
      ? d02
      : iconCode === '02n'
      ? n02
      : iconCode === '03d' || iconCode === '03n'
      ? b03
      : iconCode === '04d' || iconCode === '04n'
      ? b04
      : iconCode === '09d' || iconCode === '09n'
      ? b09
      : iconCode === '10d'
      ? d10
      : iconCode === '10n'
      ? n10
      : iconCode === '11d' || iconCode === '11n'
      ? b11
      : iconCode === '13d' || iconCode === '13n'
      ? b13
      : iconCode === '50d' || iconCode === '50n'
      ? b50
      : iconCode === 'sunrise'
      ? sunrise
      : sunset;
  return icon;
};

export const uvDescriber = (rating) => {
  let uvDescrip =
    rating === 0
      ? 'Very Low'
      : rating === 1 || rating === 2
      ? 'Low'
      : rating === 3 || rating === 4 || rating === 5
      ? 'Moderate'
      : rating === 6 || rating === 7
      ? 'High'
      : rating === 8 || rating === 9 || rating === 10
      ? 'Very High'
      : 'Extreme';
  return uvDescrip;
};

export const visConverter = (meterDist) => {
  let miles = Math.round(meterDist * 0.000621371);
  let vis = miles >= 10 ? 10 : miles;
  return vis;
};
