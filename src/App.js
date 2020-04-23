import React, { useState, useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';
import { jobs as j } from './jobs';
import JobList from './components/JobList';
import Hero from './components/Hero';

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
  const [filter, setFilter] = useState('');

  useEffect(() => {
    setJobs(j);
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    const value = event.target.tech.value;
    if (value !== '') {
      setFilter(value);
    }
  };

  const jobsToShow = !filter
    ? jobs
    : jobs.filter((job) =>
        job.tags.some((tag) => tag.toLowerCase().includes(filter.toLowerCase()))
      );

  return (
    <React.Fragment>
      <GlobalStyle />
      <Hero handleSearch={handleSearch} />
      <JobList jobs={jobsToShow} />
    </React.Fragment>
  );
}

export default App;
