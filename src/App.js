import React, { useState, useCallback } from 'react';
import { createGlobalStyle } from 'styled-components';

import { useJobsFetch } from './hooks/useJobsFetch';
import { filterJobs } from './utils/helpers';
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
  const [filter, setFilter] = useState([]);

  const {
    jobs,
    isLoading,
    hasMore,
    isError,
    city,
    dispatchJobsFetch,
  } = useJobsFetch();

  const handleSearch = useCallback((event) => {
    event.preventDefault();
    const value = event.target.tech.value;
    if (value !== '') {
      setFilter([value]);
    }
  }, []);

  const handleFilters = (tech) => {
    if (filter.includes(tech)) {
      setFilter(filter.filter((t) => t !== tech));
    } else {
      setFilter((filter) => [...filter, tech]);
    }
  };

  const handleSearchGuideTagRemove = (term) => {
    setFilter(filter.filter((t) => t !== term));
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

  const jobsToShow = filterJobs(jobs, filter);

  console.log('App: render');

  return (
    <React.Fragment>
      <GlobalStyle />
      <Hero
        handleSearch={handleSearch}
        handleCitySelection={handleCitySelection}
        city={city}
      />
      <Nav handleFilters={handleFilters} filter={filter} />
      {filter.length && (
        <SearchGuide
          handleTagRemove={handleSearchGuideTagRemove}
          filter={filter}
        />
      )}
      <JobList
        jobs={jobsToShow}
        loading={isLoading}
        hasMore={hasMore}
        dispatchJobsFetch={dispatchJobsFetch}
      />
      {isError && <h3>Something went wrong. Please refresh</h3>}
    </React.Fragment>
  );
}

export default App;
