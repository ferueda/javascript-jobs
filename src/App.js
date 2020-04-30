import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createGlobalStyle } from 'styled-components';

import { jobsToShow } from './utils/helpers';
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

const useJobsFetch = (city, skip) => {
  const [isLoading, setIsLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  const baseURL = 'http://localhost:3001/jobs';

  useEffect(() => {
    setIsLoading(true);
    fetch(`${baseURL}?city=${city}&skip=${skip}`)
      .then((res) => res.json())
      .then((data) => {
        setJobs((jobs) => [...jobs, ...data.jobs]);
        setHasMore(data.pagination.remainingRows > 0);
        setIsLoading(false);
      });
  }, [city, skip]);

  return { isLoading, jobs, setJobs, hasMore };
};

function App() {
  const [city, setCity] = useState('sydney');
  const [filter, setFilter] = useState([]);
  const [skip, setSkip] = useState(0);

  const { jobs, setJobs, isLoading, hasMore } = useJobsFetch(city, skip);

  const handleSearch = (event) => {
    event.preventDefault();
    const value = event.target.tech.value;
    if (value !== '') {
      setFilter([value]);
    }
  };

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

  const handleCitySelection = (event) => {
    setCity(event.target.value);
    setJobs([]);
    setSkip(0);
  };

  console.log('rendered');

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
        jobs={jobsToShow(jobs, filter)}
        loading={isLoading}
        hasMore={hasMore}
        setSkip={setSkip}
      />
    </React.Fragment>
  );
}

export default App;
