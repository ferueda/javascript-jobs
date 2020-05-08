import React from 'react';
import styled from 'styled-components';

import { LinkButton } from './Button';

const ButtonContainer = styled.div`
  display: flex;
  align-content: center;
  align-self: center;
  margin: 20px auto;
`;

const ContentContainer = styled.div`
  width: 80%;
  padding: 1rem;
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

  @media (max-width: 600px) {
    width: 95%;
  }
`;

const JobDescription = ({ data, apply }) => {
  return (
    <ContentContainer>
      <ButtonContainer>
        <LinkButton href={apply}>Apply now</LinkButton>
      </ButtonContainer>
      <div dangerouslySetInnerHTML={{ __html: data }}></div>
      <ButtonContainer>
        <LinkButton href={apply}>Apply now</LinkButton>
      </ButtonContainer>
    </ContentContainer>
  );
};

export default JobDescription;
