import React from 'react';
import styled from 'styled-components';

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
  align-self: center;
  margin: 20px auto;
`;

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const JobDescription = () => {
  return (
    <ContentContainer>
      <ApplyBtnContainer>
        <ApplyBtn>Apply now</ApplyBtn>
      </ApplyBtnContainer>
    </ContentContainer>
  );
};

export default JobDescription;
