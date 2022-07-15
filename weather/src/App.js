import React, { useState } from 'react';

import Wrapper from './components/Wrapper';
import InfoBox from './components/InfoBox';
import Footer from './components/Footer';

const homeSections = ['Current Weather', 'Hourly Weather', '10 Day Forecast'];

const App = () => {
  const [showSearchWindow, setShowSearchWindow] = useState(false);
  const [savedLocs, setSavedLocs] = useState([1, 2, 3]);

  return (
    <>
      {!showSearchWindow && (
        <Wrapper className={'wrapper'}>
          {homeSections.map((index, sect) => {
            return <InfoBox key={index} title={sect} />;
          })}
          <Footer setShowSearchWindow={setShowSearchWindow} />
        </Wrapper>
      )}
      {showSearchWindow && (
        <Wrapper className={'wrapper'}>
          <h1>Your Locations</h1>
          <input type='text' id='search-bar' />
          <Wrapper className={'locations'}>
            {savedLocs.map((index, loc) => {
              return <InfoBox key={index} title={loc} />;
            })}
          </Wrapper>
        </Wrapper>
      )}
    </>
  );
};

export default App;
