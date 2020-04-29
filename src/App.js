import React, { useState, useEffect } from 'react';
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

function App() {
  const [city, setCity] = useState('sydney');
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:3001/jobs?city=${city}`)
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setJobs(data.jobs);
      });
  }, [city]);

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
      <JobList jobs={jobsToShow(jobs, filter)} loading={isLoading} />
    </React.Fragment>
  );
}

export default App;
