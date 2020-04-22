import React from 'react';
import styled from 'styled-components';

const JobCardContainer = styled.div`
  display: grid;
  grid-template-columns: auto 3fr 1fr 3fr auto;
  grid-template-rows: 1fr;
  gap: 15px;
  width: 100%;
  padding: 10px;
  border-bottom: 1px solid #ecf0f1;
  cursor: pointer;
  &:hover {
    background-color: #ecf0f1;
  }
`;

const CompanyThumbContainer = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  width: 50px;
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
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const Tags = styled.span`
  color: #2c3e50;
  border: 2px solid #2c3e50;
  font-size: 1.25rem;
  font-weight: 900;
  padding: 2.5px 5px;
  border-radius: 3px;
  margin: 2px 2px;
`;

const TimeContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.45rem;
  color: #7f8c8d;
`;

const BaseBtn = styled.button`
  background-color: #2980b9;
  color: #fff;
  padding: 10px 55px;
  border: 2px solid #2980b9;
  border-radius: 3px;
  font-size: 1.5rem;
  font-weight: 600;
  outline: none;
  cursor: pointer;
`;

const ApplyBtn = styled(BaseBtn)`
  &:hover {
    opacity: 0.8;
  }
`;

const ApplyBtnTransparent = styled(BaseBtn)`
  background-color: transparent;
  color: #2980b9;
  &:hover {
    opacity: 0.8;
  }
`;

const ApplyBtnContainer = styled.div`
  display: flex;
  align-content: center;
`;

const JobCard = ({
  thumb,
  company,
  jobTitle,
  location,
  salary,
  tags,
  time,
}) => {
  return (
    <JobCardContainer>
      <CompanyThumbContainer>
        <CompanyThumbImg src={thumb} alt={`${company} logo`} />
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
      <TimeContainer>{time}</TimeContainer>
    </JobCardContainer>
  );
};

export default JobCard;
