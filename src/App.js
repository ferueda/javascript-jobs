import React, { useState, useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';
import j from './jobs.json';
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
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    const localData = () => JSON.parse(JSON.stringify(j));
    setJobs(localData().data);
  }, []);

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

  const jobsToShow = !filter.length
    ? jobs
    : jobs.filter(
        (job) =>
          job.tags.some((tag) => filter.includes(tag.toLowerCase())) ||
          job.jobTitle
            .toLowerCase()
            .split(' ')
            .some((word) => filter.includes(word))
      );

  return (
    <React.Fragment>
      <GlobalStyle />
      <Hero handleSearch={handleSearch} />
      <Nav handleFilters={handleFilters} filter={filter} />
      {filter.length && (
        <SearchGuide
          handleTagRemove={handleSearchGuideTagRemove}
          filter={filter}
        />
      )}
      <JobList jobs={jobsToShow} />
    </React.Fragment>
  );
}

export default App;
