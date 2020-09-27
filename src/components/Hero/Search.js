import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import cities from '../../constants/cities';
import * as ROUTES from '../../constants/routes';

import { capitalizeWord } from '../../utils/helpers';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  font-size: 2rem;
  width: auto;
  margin-top: -4rem;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const HeroInput = styled.input`
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  border: none;
  width: 25rem;
  height: 5rem;
  padding: 0 1rem;
  text-align: left;
  font-size: inherit;
  color: inherit;
  outline: none;
`;

const InputBtn = styled.button`
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  cursor: pointer;
  background-color: #e6e6e6;
  outline: none;
  border: none;
  width: 5rem;
  height: 5rem;
`;

const FlexForm = styled.form`
  display: flex;
`;

const CitySelect = styled.select`
  border-radius: 3px;
  font-size: inherit;
  color: inherit;
  outline: none;
  text-align: center;
  padding: 1rem;
  height: 5rem;
  margin-left: 1rem;

  @media (max-width: 600px) {
    width: 100%;
    margin: auto;
    margin-top: 1.5rem;
  }
`;

const Search = ({ placeholder, city, handleSearch }) => {
  const [search, setSearch] = useState('');

  const history = useHistory();

  const onChange = (event) => {
    setSearch(event.target.value);
  };

  const handleCityUpdate = ({ target }) => {
    setSearch('');
    history.push(ROUTES.citiesRoute[target.value]);
  };

  const onSubmit = (event) => {
    handleSearch(event);
  };

  return (
    <Container>
      <FlexForm data-testid="keyword-form" onSubmit={onSubmit}>
        <HeroInput
          aria-label="keyword input"
          name="tech"
          value={search}
          onChange={onChange}
          type="text"
          placeholder={placeholder}
        />
        <InputBtn aria-label="search keyword">
          <svg
            aria-label="search button"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="black"
            width="30px"
            height="30px"
          >
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            <path d="M0 0h24v24H0z" fill="none" />
          </svg>
        </InputBtn>
      </FlexForm>
      <CitySelect
        aria-label="select city"
        id="cityDopdown"
        onChange={handleCityUpdate}
        value={city}
      >
        {cities.map((city) => (
          <option value={city} key={city}>
            {capitalizeWord(city)}
          </option>
        ))}
      </CitySelect>
    </Container>
  );
};

export default Search;
