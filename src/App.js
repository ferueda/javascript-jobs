import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { jobs } from './jobs';
import JobList from './components/JobList';

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

  ol, ul {
    list-style: none;
  }

  img {
    max-width: 100%;
    height: auto;
  }
`;

function App() {
  return (
    <React.Fragment>
      <GlobalStyle />
      <h1>Today Jobs</h1>
      <JobList jobs={jobs} />
    </React.Fragment>
  );
}

export default App;
