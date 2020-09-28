import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
	display: grid;
	grid-template-columns: auto 1fr 2fr;
	grid-template-rows: 1fr;
	grid-template-areas: 'Thumb Info Tags';
	gap: 15px;
	width: 100%;
	padding: 10px;
	border-bottom: 1px solid #ecf0f1;
	border-radius: 3px;
	overflow: hidden;

	@media (max-width: 600px) {
		grid-template-areas:
			'Thumb Info '
			'Thumb Tags';

		gap: 10px;
		row-gap: 5px;
	}
`;

const Thumb = styled.div`
	grid-area: Thumb;
	width: 50px;
	height: 61px;
	border-radius: 3px;
	background: linear-gradient(90deg, #ecf0f1, #b6c1c5);
	background-size: 200% 100%;
	animation: change 2s ease-in-out infinite;

	/* @media (max-width: 600px) {
		width: 40px;
		height: 50px;
	} */

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
	grid-area: Info;
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

	@media (max-width: 600px) {
		margin: 2px 0;
		margin-right: auto;
		height: 90%;
	}

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
	grid-area: Tags;
	display: flex;
	justify-content: center;
	align-items: center;

	@media (max-width: 600px) {
		justify-content: flex-start;
	}
`;

const Tag = styled.div`
	margin: 2px;
	height: 20px;
	width: 50px;
	display: inline-block;
	background: linear-gradient(90deg, #ecf0f1, #b6c1c5);
	background-size: 200% 100%;
	animation: change 2s ease-in-out infinite;

	@media (max-width: 600px) {
		height: 20px;
		width: 50px;
	}

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

export const SkeletonJobCard = () => {
	return (
		<StyledDiv data-testid="jobcard skeleton">
			<Thumb />
			<InfoContainer>
				<Row width={150} height={10} />
				<Row width={300} height={16} />
				<Row width={120} height={9} />
			</InfoContainer>
			<TagsContainer>
				<Tag />
				<Tag />
				<Tag />
			</TagsContainer>
		</StyledDiv>
	);
};

const ThreeSkeletonJobCards = () => {
	return (
		<React.Fragment>
			<SkeletonJobCard />
			<SkeletonJobCard />
			<SkeletonJobCard />
		</React.Fragment>
	);
};

export default ThreeSkeletonJobCards;
