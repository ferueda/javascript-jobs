import React from 'react';
import styled from 'styled-components';

import Search from './Search';
import { LinkButton, RegularButton } from './Button';

const HeroContainer = styled.div`
  width: 100%;
  height: 35vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  /* background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5)),
    url('/assets/mel-hero.jpg'); */
  background-image: ${({
    city,
  }) => `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5)),
    url('/assets/${city}-hero.jpg');`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
`;

const HeroTitle = styled.h1`
  font-size: 5rem;
  font-weight: 900;
  color: #f0db4f;
  margin-top: -4rem;

  a,
  a:link,
  a:visited,
  a:hover,
  a:active {
    text-decoration: none;
    color: inherit;
  }

  span {
    color: #fff;
  }
`;

const ButtonContainer = styled.div`
  position: absolute;
  top: 2rem;
  right: 2rem;
`;

const Hero = ({ handleSearch, city, handleCitySelection }) => {
  return (
    <HeroContainer city={city}>
      <HeroTitle>
        <a href='/'>
          JavaScript <span>Jobs</span>
        </a>
      </HeroTitle>
      <Search
        placeholder='Enter a keyword'
        city={city}
        handleSearch={handleSearch}
        handleCitySelection={handleCitySelection}
      />
      <ButtonContainer>
        <RegularButton>Post a job</RegularButton>
      </ButtonContainer>
    </HeroContainer>
  );
};

export default React.memo(Hero);
