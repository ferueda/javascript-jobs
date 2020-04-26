import React from 'react';
import styled from 'styled-components';

import Search from './Search';

const HeroContainer = styled.div`
  width: 100%;
  height: 35vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5)),
    url('/assets/sf-hero.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
`;

const HeroTitle = styled.h1`
  font-size: 4.5rem;
  font-weight: 900;
  color: #f0db4f;

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

const Hero = ({ handleSearch }) => {
  return (
    <HeroContainer>
      <HeroTitle>
        <a href='/'>
          JavaScript <span>Jobs</span>
        </a>
      </HeroTitle>
      <Search placeholder='react...' handleSearch={handleSearch} />
    </HeroContainer>
  );
};

export default Hero;