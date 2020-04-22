import React from 'react';
import styled from 'styled-components';

const JobCardContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 10px;
  border-bottom: 1px solid #e8e8e8;
  cursor: pointer;
  &:hover {
    background-color: #f2f2f2;
  }
`;

const CompanyThumbContainer = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  width: 50px;
  padding: 0;
`;

const CompanyThumbImg = styled.img`
  border-radius: 3px;
  overflow: hidden;
`;

const JobInfoContainer = styled.div`
  display: flex;
  margin-left: 15px;
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
    font-size: 1.2rem;
  }
`;

const TagsContainer = styled.div`
  margin-left: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  max-width: 40%;
`;

const Tags = styled.span`
  color: black;
  border: 2px solid black;
  font-size: 1.25rem;
  font-weight: 900;
  padding: 2.5px 5px;
  border-radius: 3px;
  margin: 2px 2px;
`;

const ApplyBtn = styled.button`
  background-color: #ff4742;
  color: #fff;
  padding: 10px 55px;
  border: none;
  border-radius: 3px;
  font-size: 1.5rem;
  font-weight: 600;
  outline: none;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  margin: auto 0;
`;

const ApplyBtnContainer = styled.div`
  margin-left: auto;
  display: flex;
  align-content: center;
`;

const JobCard = ({ thumb, company, jobTitle, location, tags }) => {
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
      <TagsContainer>
        {tags.map((tag) => (
          <Tags name={tag.toLowerCase()} children={tag} />
        ))}
      </TagsContainer>
      <ApplyBtnContainer>
        <ApplyBtn>Apply</ApplyBtn>
      </ApplyBtnContainer>
    </JobCardContainer>
  );
};

export default JobCard;
