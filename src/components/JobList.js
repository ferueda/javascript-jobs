import React, { useState } from 'react';
import styled from 'styled-components';
import JobCard from './JobCard';
import SkeletonJobCard from './Skeletons/SkeletonJobCard';

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

  span {
    color: #7f8c8d;
    font-weight: 100;
  }
`;

const JobList = ({ jobs, loading }) => {
  const [isActive, setIsActive] = useState(null);

  const handleActiveChange = (jobId) => {
    if (isActive === jobId) {
      setIsActive(null);
    } else {
      setIsActive(jobId);
    }
  };

  console.log(loading);

  return (
    <JobsContainer>
      <JobListTitle>
        Latest jobs <span>({jobs.length})</span>
      </JobListTitle>
      {loading && new Array(5).fill(<SkeletonJobCard />)}
      {!loading &&
        jobs.map((job) => {
          return (
            <JobCard
              key={job.id}
              thumb={job.company_logo}
              company={job.company_name}
              jobTitle={job.job_title}
              location={job.location}
              tags={job.tags}
              timestamp={job.timestamp}
              salary={job.salary}
              active={isActive}
              handleActiveChange={() => handleActiveChange(job.id)}
              description={job.content_html}
              id={job.id}
              apply={job.apply_link}
            />
          );
        })}
    </JobsContainer>
  );
};

export default JobList;
