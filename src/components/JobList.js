import React, { useState, useRef, useCallback } from 'react';
import styled from 'styled-components';
import JobCard from './JobCard';
import ThreeSkeletonJobCard from './Skeletons/SkeletonJobCard';

const JobsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  margin-bottom: 2rem;
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

const JobList = ({ jobs, loading, hasMore, setSkip }) => {
  const [isActive, setIsActive] = useState(null);

  const observer = useRef();

  const lastJobCardRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setSkip((skip) => skip + 20);
        }
      });
      if (node) observer.current.observe(node);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [loading, hasMore]
  );

  const handleActiveChange = (jobId) => {
    if (isActive === jobId) {
      setIsActive(null);
    } else {
      setIsActive(jobId);
    }
  };

  return (
    <JobsContainer>
      <JobListTitle>
        Latest jobs <span>({jobs.length})</span>
      </JobListTitle>
      {jobs.map((job, index) => {
        if (
          (jobs.length > 5 && jobs.length === index + 5) ||
          (jobs.length <= 5 && jobs.length === index + 1)
        ) {
          return (
            <JobCard
              cbFunc={lastJobCardRef}
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
        } else {
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
        }
      })}
      {loading && <ThreeSkeletonJobCard />}
    </JobsContainer>
  );
};

export default JobList;
