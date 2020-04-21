import React from 'react';
import { jobs } from './jobs';
import styled from 'styled-components';

const JobContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: lightgray;
`;

const CompanyThumbContainer = styled.div`
  max-width: 50px;
`;

const CompanyThumbImg = styled.img`
  width: 100%;
`;

const Job = ({ thumb, company, jobTitle, location }) => {
  return (
    <JobContainer>
      <CompanyThumbContainer>
        <CompanyThumbImg src={thumb} alt={`${company} logo`} />
      </CompanyThumbContainer>
      <div>
        <h3>{company}</h3>
        <h2>{jobTitle}</h2>
        <h4>{location}</h4>
      </div>
      <div>
        <button>Apply</button>
      </div>
    </JobContainer>
  );
};

const JobList = ({ jobs }) => {
  return (
    <div>
      {jobs.map((job) => {
        return (
          <Job
            key={job.id}
            thumb={job.thumb}
            company={job.company}
            jobTitle={job.jobTitle}
            location={job.location}
          />
        );
      })}
    </div>
  );
};

function App() {
  return (
    <div>
      <h1>Today Jobs</h1>
      <JobList jobs={jobs} />
    </div>
  );
}

export default App;
