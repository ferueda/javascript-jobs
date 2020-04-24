import React, { useState } from 'react';
import styled from 'styled-components';

const HeroInput = styled.input`
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  border: none;
  width: 25rem;
  height: 5rem;
  padding: 0 1rem;
  text-align: left;
  color: black;
  font-size: 2.5rem;
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
`;

const FlexForm = styled.form`
  display: flex;
`;

const Search = ({ placeholder, handleSearch }) => {
  const [search, setSearch] = useState('');

  const onChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <FlexForm
      onSubmit={(e) => {
        handleSearch(e);
        setSearch('');
      }}
    >
      <HeroInput
        name='tech'
        value={search}
        onChange={onChange}
        type='text'
        placeholder={placeholder}
      />
      <InputBtn>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='black'
          width='30px'
          height='30px'
        >
          <path d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z' />
          <path d='M0 0h24v24H0z' fill='none' />
        </svg>
      </InputBtn>
    </FlexForm>
  );
};

export default Search;
