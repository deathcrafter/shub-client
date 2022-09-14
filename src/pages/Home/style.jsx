import styled from "styled-components";
import { keyframes } from "styled-components";

export const Section = styled.div`
	display: block;
	background-color: ${({ theme }) => theme.palette.bg[100]};
`;

export const Container = styled.div`
	position: relative;
	display: flex;
	height: fit-content;
	flex-direction: column;
	margin-left: auto;
	margin-right: auto;
	max-width: 100rem;
	overflow: hidden;
`;

export const CarouselContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	height: fit-content;
	padding-top: 1rem;
	padding-bottom: 1rem;
	::before {
		display: inline-block;
		background: linear-gradient(to right, white 0%, rgba(255, 255, 255, 0) 100%);
		content: "";
		height: 100%;
		position: absolute;
		width: 200px;
		z-index: 2;
	}
	::after {
		display: inline-block;
		background: linear-gradient(to left, white 0%, rgba(255, 255, 255, 0) 100%);
		content: "";
		height: 100%;
		position: absolute;
		right: 0;
		width: 200px;
		z-index: 2;
	}
`;

const carouselScroll_1 = keyframes`
	0% {
		transform: translateX(-10%);
	}
	100% {
		transform: translateX(-135%);
	}
`;

const carouselScroll_2 = keyframes`
	0% {
		transform: translateX(2.5%);
	}
	100% {
		transform: translateX(-122.5%);
	}
`;

export const Carousel = styled.div`
	display: flex;
	width: 100%;
	gap: 5%;
	transform: translateX(-${(props) => (props.first ? 10 : 0)}%);
	animation: ${(props) => (props.first ? carouselScroll_1 : carouselScroll_2)} 40s linear 0ms
		infinite;
`;

export const Image = styled.img`
	width: 20%;
	aspect-ratio: 16/9;
	border-radius: 0.55rem;
`;
