import React from 'react';
import styled from 'styled-components';

const SearchGuideContainer = styled.div`
  max-width: 900px;
  margin: 3rem auto 1rem auto;
  font-size: 1.8rem;
  font-weight: 900;

  @media (max-width: 600px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const SearchSpan = styled.span`
  border-radius: 3px;
  font-size: 1.25rem;
  margin-left: 0.4rem;
  padding: 0.25rem 0.5rem;
  background: black;
  border: 2px solid #2c3e50;
  background-color: transparent;
  color: #2c3e50;
  cursor: pointer;
  transition: 0.1s ease-out;

  &:first-child {
    margin-left: 1rem;
  }

  span {
    padding-left: 5px;
    font-size: 1rem;
    text-align: center;
    color: #2c3e50;
    transition: 0.1s ease-out;
  }

  @media (max-width: 600px) {
    margin-top: 0.25rem;
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      span {
        color: red;
      }
    }
  }
`;

const SearchGuide = ({ filters, handleTagRemove }) => {
  return (
    <SearchGuideContainer>
      Searching for:
      {filters.map((value) => {
        return (
          <SearchSpan key={value} onClick={() => handleTagRemove(value)} data-testid="tech filter">
            {value}
            <span>X</span>
          </SearchSpan>
        );
      })}
    </SearchGuideContainer>
  );
};

export default SearchGuide;
