import styled from "styled-components";

export const Section = styled.div`
	display: flex;
	flex-grow: 1;
	justify-content: center;
	align-items: center;
	background-color: ${({ theme }) => theme.palette.bg[100]};
`;

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 1rem;
	margin: 1rem;
	padding: 1.5rem;
	min-width: 25rem;
	max-width: 30rem;
	border-radius: 1rem;
	background-color: ${({ theme }) => theme.palette.bg[300]};
	box-shadow: 0px 0px 10px ${({ theme }) => theme.palette.text.title}20;
`;

export const Text = styled.p`
	padding-bottom: 1rem;
	text-align: center;
	line-height: 2.5rem;
	font-size: 2rem;
	font-weight: 700;
	color: ${({ theme }) => theme.palette.text.title};
`;
