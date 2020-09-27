import React from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';

import Search from './Search';

const HeroContainer = styled.div`
  width: 100%;
  height: 35vh;
  min-height: 20rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  /* background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5)),
    url('/assets/mel-hero.jpg'); */
  background-image: ${({ city }) => `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5)),
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

  @media (max-width: 500px) {
    font-size: 4rem;
  }
`;

const ButtonContainer = styled.div`
  position: absolute;
  top: 2rem;
  right: 2rem;

  @media (max-width: 800px) {
    display: none;
  }
`;

const Hero = ({ handleSearch }) => {
  const { city } = useParams();

  return (
    <HeroContainer role="container" city={city}>
      <HeroTitle>
        <Link to={`/${city}`}>
          JavaScript <span>Jobs</span>
        </Link>
      </HeroTitle>
      <Search placeholder="Enter a keyword" city={city} handleSearch={handleSearch} />
    </HeroContainer>
  );
};

export default React.memo(Hero);
