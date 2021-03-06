import React from 'react';
import styled from 'styled-components';
import { techFilters } from '../utils/helpers';

const StyledNav = styled.nav`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  max-width: 900px;
  overflow-x: auto;
  margin: 2rem auto 0 auto;
  padding-bottom: 1rem;
`;

const TechContainer = styled.div`
  max-width: 120px;
  min-width: 80px;
  flex: 1 1 0;
  text-align: center;
  cursor: pointer;
  transition: 0.1s ease-out;
  padding: 5px 0 0 0;
  margin: 0 2px 0 2px;
  border-radius: 3px;
  &:first-child {
    margin-left: 10px;
  }

  &:last-child {
    margin-right: 10px;
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      transform: scale(0.95);
      background-color: #ecf0f1;
    }
  }

  &.active {
    transform: scale(0.95);
    background-color: #ecf0f1;
  }

  &:active {
    transform: scale(0.9);
  }

  span {
    font-weight: 600;
    font-size: 1.4rem;
  }
`;

const Tech = ({ imgSrc, tech, handleFilters, filters }) => {
  return (
    <TechContainer
      onClick={() => handleFilters(tech.toLowerCase())}
      className={filters.includes(tech.toLowerCase()) && 'active'}
    >
      <div>
        <img src={imgSrc} alt={`${tech} logo`} />
      </div>
      <span>{tech}</span>
    </TechContainer>
  );
};

const Nav = ({ handleFilters, filters }) => {
  const logosSrc = [...techFilters];

  return (
    <StyledNav>
      {logosSrc.map((logo) => {
        return (
          <Tech
            key={logo}
            imgSrc={`assets/logos/${logo}.svg`}
            tech={`${logo}`}
            handleFilters={handleFilters}
            filters={filters}
          />
        );
      })}
    </StyledNav>
  );
};

export default Nav;
