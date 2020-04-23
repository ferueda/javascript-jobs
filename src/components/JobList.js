import React, { useState } from 'react';
import styled from 'styled-components';
import JobCard from './JobCard';

const JobsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  max-width: 1000px;
`;

const JobListTitle = styled.h2`
  align-self: flex-start;
  font-weight: 900;
  font-size: 2.5rem;
  margin: 15px auto;
  margin-left: 2.5rem;
`;

const JobList = ({ jobs }) => {
  const [isActive, setIsActive] = useState(null);

  const handleActiveChange = (jobId) => {
    if (isActive === jobId) {
      setIsActive(null);
    } else {
      setIsActive(jobId);
    }
  };

  return (
    <JobsContainer>
      <JobListTitle>Latest jobs</JobListTitle>
      {jobs.map((job) => {
        return (
          <JobCard
            key={job.id}
            thumb={job.thumb}
            company={job.company}
            jobTitle={job.jobTitle}
            location={job.location}
            tags={job.tags}
            time={job.time}
            salary={job.salary}
            active={isActive}
            handleActiveChange={() => handleActiveChange(job.id)}
            description={job.description}
            id={job.id}
          />
        );
      })}
      <h2></h2>
    </JobsContainer>
  );
};

export default JobList;
