import Wrapper from '../components/Wrapper';

const SearchScreen = ({ savedLocs }) => {
  return (
    <Wrapper className={'wrapper'}>
      <h1>Your Locations</h1>
      <input type='text' id='search-bar' />
      <Wrapper className={'locations'}>
        {savedLocs.map((index, loc) => {
          return <div key={index} title={loc} />;
        })}
      </Wrapper>
    </Wrapper>
  );
};

export default SearchScreen;
