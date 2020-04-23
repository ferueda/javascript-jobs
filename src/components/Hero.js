import React from 'react';
import styled from 'styled-components';

import Search from './Search';

const HeroContainer = styled.div`
  width: 100%;
  height: 30vh;
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
  font-size: 6rem;
  font-weight: 900;
  color: #f0db4f;
`;

const Hero = ({ handleSearch }) => {
  return (
    <HeroContainer>
      <HeroTitle>JavaScript Jobs</HeroTitle>
      <Search placeholder='react...' handleSearch={handleSearch} />
    </HeroContainer>
  );
};

export default Hero;
