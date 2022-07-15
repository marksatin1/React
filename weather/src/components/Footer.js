import './Footer.css';

const Footer = ({ setShowSearchWindow }) => {
  return (
    <div className='footer'>
      <div />
      <div className='locations-box'>
        <button className='location'></button>
        <button className='location'></button>
        <button className='location'></button>
      </div>
      <button className='search-btn' onClick={() => setShowSearchWindow(true)}>
        Search
      </button>
    </div>
  );
};

export default Footer;
