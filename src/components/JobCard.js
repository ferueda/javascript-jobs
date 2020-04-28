import React from 'react';
import styled from 'styled-components';
import JobDescription from './JobDescription';
import { setCompanyLogoFromName } from '../utils/helpers';

const JobCardContainer = styled.div`
  display: grid;
  grid-template-columns: auto 3fr 1fr 3fr auto;
  grid-template-rows: 1fr;
  gap: 15px;
  width: 100%;
  padding: 10px;
  background-color: ${({ active }) => (active ? '#ecf0f1' : '')};
  border-bottom: 1px solid #ecf0f1;
  transition: 0.1s ease-out;
  cursor: pointer;
  &:hover {
    background-color: #ecf0f1;
  }
  border-radius: 3px;
  overflow: hidden;
`;

const CompanyThumbContainer = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  width: 50px;
  color: #bdc3c7;
  font-size: 3rem;
  font-weight: 900;
`;

const CompanyThumbImg = styled.img`
  border-radius: 3px;
  overflow: hidden;
`;

const JobInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  h2 {
    font-weight: 900;
    font-size: 1.75rem;
    line-height: 1.5;
  }

  h3 {
    font-size: 1.5rem;
    font-weight: 500;
  }

  h4 {
    font-size: 1.25rem;
    color: #7f8c8d;
  }
`;

const SalaryContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 1.4rem;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap-reverse;
  justify-content: center;
  align-items: center;
`;

const Tags = styled.span`
  color: #2c3e50;
  border: 2px solid #2c3e50;
  font-size: 1.25rem;
  font-weight: 900;
  padding: 0.25rem 0.5rem;
  border-radius: 3px;
  margin: 0.2rem 0.2rem;
`;

const TimeContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.45rem;
  min-width: 3.6rem;
  color: #7f8c8d;
  text-align: center;
`;

const JobCard = ({
  id,
  thumb,
  company,
  jobTitle,
  location,
  salary,
  tags,
  timestamp,
  active,
  description,
  handleActiveChange,
  apply,
}) => {
  const dateDiff = (d1, d2) => {
    const utc1 = Date.UTC(d1.getFullYear(), d1.getMonth(), d1.getDate());
    const utc2 = Date.UTC(d2.getFullYear(), d2.getMonth(), d2.getDate());

    return Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));
  };

  const today = new Date();
  const jobDate = new Date(timestamp);

  const time = dateDiff(jobDate, today);

  return (
    <React.Fragment>
      <JobCardContainer active={active === id} onClick={handleActiveChange}>
        <CompanyThumbContainer>
          {thumb ? (
            <CompanyThumbImg src={thumb} alt={`${company} logo`} />
          ) : (
            setCompanyLogoFromName(company)
          )}
        </CompanyThumbContainer>
        <JobInfoContainer>
          <h3>{company}</h3>
          <h2>{jobTitle}</h2>
          <h4>{location}</h4>
        </JobInfoContainer>
        <SalaryContainer>{salary}</SalaryContainer>
        <TagsContainer>
          {tags.map((tag) => (
            <Tags key={tag} name={tag.toLowerCase()} children={tag} />
          ))}
        </TagsContainer>
        <TimeContainer>{time !== 0 ? `${time}d` : 'today'}</TimeContainer>
      </JobCardContainer>
      {active === id && <JobDescription apply={apply} data={description} />}
    </React.Fragment>
  );
};

export default JobCard;
