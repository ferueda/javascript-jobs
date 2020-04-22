import React from 'react';
import styled from 'styled-components';
import JobCard from './JobCard';

const JobsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  max-width: 1000px;
`;

const JobList = ({ jobs }) => {
  return (
    <JobsContainer>
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
            active={job.active}
            descrition={job.description}
          />
        );
      })}
    </JobsContainer>
  );
};

export default JobList;
