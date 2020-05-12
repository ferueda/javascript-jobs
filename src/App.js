import React, { useCallback } from 'react';
import { createGlobalStyle } from 'styled-components';

import { useJobsFetch } from './hooks/useJobsFetch';
import JobList from './components/JobList';
import Hero from './components/Hero';
import Nav from './components/Nav';
import SearchGuide from './components/SearchGuide';

const GlobalStyle = createGlobalStyle`
  html {
    font-family: 'IBM Plex Sans', sans-serif;
    box-sizing: border-box;
    font-size: 10px;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body, h1, h2, h3, h4, h5, h6, p, ol, ul {
    margin: 0;
    padding: 0;
    font-weight: normal;
  }

  img {
    max-width: 100%;
    height: auto;
  }
`;

function App() {
  const { jobs, isLoading, hasMore, isError, city, dispatchJobsFetch, filters, totalRows } = useJobsFetch();

  const handleSearch = useCallback(
    (event) => {
      event.preventDefault();
      const value = event.target.tech.value;
      dispatchJobsFetch({
        type: 'SEARCH',
        payload: value,
      });
    },
    [dispatchJobsFetch]
  );

  const handleFilters = (value) => {
    dispatchJobsFetch({
      type: 'CHANGE_FILTERS',
      payload: value,
    });
  };

  const handleCitySelection = useCallback(
    (event) => {
      dispatchJobsFetch({
        type: 'CHANGE_CITY',
        payload: { city: event.target.value },
      });
    },
    [dispatchJobsFetch]
  );

  console.log('App: render');

  return (
    <React.Fragment>
      <GlobalStyle />
      <Hero handleSearch={handleSearch} handleCitySelection={handleCitySelection} city={city} />
      <Nav handleFilters={handleFilters} filter={filters} />
      {Boolean(filters.length) && <SearchGuide handleTagRemove={handleFilters} filter={filters} />}
      <JobList
        jobs={jobs}
        loading={isLoading}
        hasMore={hasMore}
        dispatchJobsFetch={dispatchJobsFetch}
        totalRows={totalRows}
      />
      {isError && <h3>Something went wrong. Please refresh</h3>}
    </React.Fragment>
  );
}

export default App;
