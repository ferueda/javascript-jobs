import React from 'react';
import styled from 'styled-components';

import JobDescription from './JobDescription';
import { setCompanyLogoFromName, getDateDiff } from '../utils/helpers';

const JobCardContainer = styled.div`
  display: grid;
  grid-template-columns: auto 3fr 1fr 3fr auto;
  grid-template-rows: 1fr;
  grid-template-areas: 'Thumb Info Salary Tags Time';
  gap: 1.5rem;
  width: 100%;
  padding: 0.5rem;
  background-color: ${({ active }) => (active ? '#ecf0f1' : '')};
  border-bottom: 1px solid #ecf0f1;
  transition: 0.1s ease-out;
  cursor: pointer;
  &:hover {
    background-color: #ecf0f1;
  }
  border-radius: 3px;
  overflow: hidden;

  @media (max-width: 500px) {
    grid-template-columns: auto 3fr 1fr auto;
    grid-template-rows: auto;
    grid-template-areas:
      'Thumb Info Info Time'
      'Thumb Tags Tags Time';
    gap: 1rem;
    row-gap: 0.5rem;
  }
`;

const CompanyThumbContainer = styled.div`
  grid-area: Thumb;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  width: 50px;
  color: #bdc3c7;
  font-size: 3rem;
  font-weight: 900;

  @media (max-width: 500px) {
    width: 40px;
    font-size: 2.5rem;
  }
`;

const CompanyThumbImg = styled.img`
  border-radius: 3px;
  overflow: hidden;
`;

const JobInfoContainer = styled.div`
  grid-area: Info;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  h2 {
    font-weight: 900;
    font-size: 1.75em;
    line-height: 1.5;
  }

  h3 {
    font-size: 1.5em;
    font-weight: 500;
  }

  h4 {
    font-size: 1.25em;
    color: #7f8c8d;
  }
  @media (max-width: 500px) {
    font-size: 0.85rem;

    h3 {
      font-size: 1.25rem;
    }

    h4 {
      font-size: 1.2rem;
    }
  }
`;

const SalaryContainer = styled.div`
  grid-area: Salary;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  font-weight: 600;
  font-size: 1.4rem;
  @media (max-width: 500px) {
    display: none;
  }
`;

const TagsContainer = styled.div`
  grid-area: Tags;
  display: flex;
  flex-wrap: wrap-reverse;
  justify-content: flex-start;
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

  &:first-child {
    margin-left: 0;
  }

  @media (max-width: 500px) {
    font-size: 1rem;
    border: 1px solid #2c3e50;
    font-weight: 500;
    margin: 0.15rem 0.15rem;
  }
`;

const TimeContainer = styled.div`
  grid-area: Time;
  display: flex;
  align-items: center;
  font-size: 1.45rem;
  min-width: 3.6rem;
  color: #7f8c8d;
  text-align: center;

  @media (max-width: 500px) {
    font-size: 1.25rem;
  }
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
  cbFunc,
}) => {
  const today = new Date();
  const jobDate = new Date(timestamp);

  const time = getDateDiff(jobDate, today);

  return (
    <React.Fragment>
      <JobCardContainer
        ref={cbFunc}
        active={active === id}
        onClick={handleActiveChange}
      >
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

export default React.memo(JobCard);
