import React from 'react';
import styled from 'styled-components';

import Button from './Button';

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

  li > p,
  li > div {
    display: inline;
  }
`;

const JobDescription = ({ data, apply }) => {
  return (
    <ContentContainer>
      <ApplyBtnContainer>
        <Button href={apply}>Apply now</Button>
      </ApplyBtnContainer>
      <div dangerouslySetInnerHTML={{ __html: data }}></div>
      <ApplyBtnContainer>
        <Button href={apply}>Apply now</Button>
      </ApplyBtnContainer>
    </ContentContainer>
  );
};

export default JobDescription;
