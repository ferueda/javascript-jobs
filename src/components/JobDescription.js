import React from 'react';
import styled from 'styled-components';

const BaseBtn = styled.a`
  background-color: #2980b9;
  color: #fff;
  padding: 10px 55px;
  border: 2px solid #2980b9;
  border-radius: 3px;
  font-size: 1.5rem;
  font-weight: 600;
  outline: none;
  cursor: pointer;
  text-decoration: none;
`;

const ApplyBtn = styled(BaseBtn)`
  &:hover {
    opacity: 0.8;
  }
`;

// const ApplyBtnTransparent = styled(BaseBtn)`
//   background-color: transparent;
//   color: #2980b9;
//   &:hover {
//     opacity: 0.8;
//   }
// `;

const ApplyBtnContainer = styled.div`
  display: flex;
  align-content: center;
  align-self: center;
  margin: 20px auto;
`;

const ContentContainer = styled.div`
  width: 80%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  font-size: 1.35rem;
  border-bottom: 1px solid #ecf0f1;
  h3 {
    margin: 1rem auto;
  }
  ul {
    list-style-position: inside;
    margin: 1rem auto;
  }

  li {
    margin-left: 3rem;
    line-height: 1.5;
  }

  div,
  p {
    margin: 1rem auto;
  }

  li > p {
    display: inline;
  }
`;

const JobDescription = ({ data, apply }) => {
  return (
    <ContentContainer>
      <ApplyBtnContainer>
        <ApplyBtn href={apply} target='_blank'>
          Apply now
        </ApplyBtn>
      </ApplyBtnContainer>
      <div dangerouslySetInnerHTML={{ __html: data }}></div>
      <ApplyBtnContainer>
        <ApplyBtn href={apply} target='_blank'>
          Apply now
        </ApplyBtn>
      </ApplyBtnContainer>
    </ContentContainer>
  );
};

export default JobDescription;
