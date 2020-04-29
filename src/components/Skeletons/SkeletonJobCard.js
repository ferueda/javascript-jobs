import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: auto 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 15px;
  width: 100%;
  padding: 10px;
  border-bottom: 1px solid #ecf0f1;
  border-radius: 3px;
  overflow: hidden;
`;

const Thumb = styled.div`
  width: 50px;
  height: 61px;
  border-radius: 3px;
  background: linear-gradient(90deg, #ecf0f1, #b6c1c5);
  background-size: 200% 100%;
  animation: change 2s ease-in-out infinite;

  @keyframes change {
    0% {
      background-position: 0 0;
    }
    50% {
      background-position: 100% 0;
    }
    100% {
      background-position: 0 0;
    }
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const Row = styled.div`
  font-size: 10px;
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  margin-top: 5px;
  margin-bottom: 5px;
  background: linear-gradient(90deg, #ecf0f1, #b6c1c5);
  background-size: 200% 100%;
  animation: change 2s ease-in-out infinite;

  @keyframes change {
    0% {
      background-position: 0 0;
    }
    50% {
      background-position: 100% 0;
    }
    100% {
      background-position: 0 0;
    }
  }
`;

const TagsContainer = styled.div`
  display: flex;

  justify-content: center;
  align-items: center;
`;

const Tag = styled.div`
  margin: 2px;
  height: 20px;
  width: 50px;
  display: inline-block;
  background: linear-gradient(90deg, #ecf0f1, #b6c1c5);
  background-size: 200% 100%;
  animation: change 2s ease-in-out infinite;

  @keyframes change {
    0% {
      background-position: 0 0;
    }
    50% {
      background-position: 100% 0;
    }
    100% {
      background-position: 0 0;
    }
  }
`;

const SkeletonJobCard = () => {
  return (
    <StyledDiv>
      <Thumb />
      <InfoContainer>
        <Row width={150} height={10} />
        <Row width={300} height={16} />
        <Row width={120} height={7} />
      </InfoContainer>
      <TagsContainer>
        <Tag />
        <Tag />
        <Tag />
      </TagsContainer>
    </StyledDiv>
  );
};

export default SkeletonJobCard;
