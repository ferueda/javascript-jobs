import React, { useState, useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';
import Fuse from 'fuse.js';
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
  const [city, setCity] = useState('melbourne');

  const techFilters = [
    'Front end',
    'Back end',
    'JavaScript',
    'React',
    'Vue',
    'Angular',
    'Node',
    'TypeScript',
    'Gatsby',
  ];

  useEffect(() => {
    const localData = JSON.parse(JSON.stringify(j)).data;

    const localDataFiltered = Array.from(new Set(localData.map((s) => s.id)))
      .map((id) => {
        return {
          id,
          jobTitle: localData.find((s) => s.id === id).jobTitle,
          company: localData.find((s) => s.id === id).company,
          companyLogo: localData.find((s) => s.id === id).companyLogo,
          location: localData.find((s) => s.id === id).location,
          salary: localData.find((s) => s.id === id).salary,
          timestamp: localData.find((s) => s.id === id).timestamp,
          rating: localData.find((s) => s.id === id).rating,
          apply: localData.find((s) => s.id === id).apply,
          content: localData.find((s) => s.id === id).contentHTML,
          tags: localData.find((s) => s.id === id).tags,
        };
      })
      .sort((a, b) => b.timestamp - a.timestamp);

    setJobs(localDataFiltered);
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

  const jobsToShow = () => {
    if (!filter.length) {
      return jobs;
    }

    if (
      filter.every((f) => techFilters.map((t) => t.toLowerCase()).includes(f))
    ) {
      return jobs.filter((job) =>
        filter.every((f) => job.tags.includes(f.toLowerCase()))
      );
    } else {
      const options = {
        useExtendedSearch: true,
        keys: ['jobTitle', 'content'],
      };

      const fuse = new Fuse(jobs, options);

      const modFilters = filter.map((f) => `'${f}`).join(' ');

      const fuseResult = fuse.search(modFilters);

      const tagSearch = jobs.filter((job) =>
        filter.every((f) => job.tags.includes(f.toLowerCase()))
      );

      const idArray = fuseResult.map((job) => job.item.id);

      tagSearch.forEach((job) => {
        if (!idArray.includes(job.id)) {
          idArray.push(job.id);
        }
      });

      return jobs.filter((job) => idArray.includes(job.id));
    }
  };

  return (
    <React.Fragment>
      <GlobalStyle />
      <Hero handleSearch={handleSearch} />
      <Nav
        handleFilters={handleFilters}
        filter={filter}
        techFilters={techFilters}
      />
      {filter.length && (
        <SearchGuide
          handleTagRemove={handleSearchGuideTagRemove}
          filter={filter}
        />
      )}
      <JobList jobs={jobsToShow()} />
    </React.Fragment>
  );
}

export default App;
