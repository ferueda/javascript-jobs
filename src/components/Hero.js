import React from 'react';
import styled from 'styled-components';

const HeroContainer = styled.div`
  width: 100%;
  height: 40vh;
  color: #fff;
  font-size: 2.5rem;
  text-align: center;
  font-weight: 900;
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4)),
    url('/assets/sf-hero.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
`;

const HeroInput = styled.input`
  border-radius: 3px;
  border: none;
  width: 200px;
  height: 40px;
  padding: 0 10px;
  text-align: left;
  color: black;
  font-size: 2rem;
  margin: 20px;
`;

const Hero = () => {
  return (
    <HeroContainer>
      <h1>Javascript Jobs</h1>
      <HeroInput type='text' placeholder='enter test...' />
    </HeroContainer>
  );
};

export default Hero;
