import styled, { keyframes } from "styled-components";

export const Section = styled.div`
	display: flex;
	flex-grow: 1;
	justify-content: center;
	align-items: center;
	background-color: ${({ theme }) => theme.palette.bg[100]};

	& .__react_component_tooltip {
		border-radius: 0.5rem !important;
		background-color: ${({ theme }) => theme.colors.important};
	}
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

export const Logo = styled.img`
	width: 50%;
	aspect-ratio: 1;
`;

export const Text = styled.p`
	max-width: 90%;
	padding-bottom: 1rem;
	text-align: center;
	line-height: 2.5rem;
	font-size: 2rem;
	font-weight: 700;
	color: ${({ theme }) => theme.palette.text.title};
`;

const loadingAnimation = keyframes`
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
`;

const ButtonBg = styled.button`
	display: flex;
	align-items: center;
	gap: 0.5rem;
	width: ${(props) => (props.full ? "90%" : "fit-content")};
	height: 3rem;
	padding-left: 0.9rem;
	padding-right: 0.9rem;
	justify-content: center;
	background-color: ${(props) => props.colors.bg || props.theme.text.title};
	border-style: solid;
	border-width: 0.125rem;
	border-color: ${(props) => props.colors.border || "transparent"};
	border-radius: 0.5rem;

	& .button-loading {
		animation: ${loadingAnimation} 800ms linear 0ms infinite;
	}
`;

const ButtonLogo = styled.img`
	width: 1.5rem;
`;

const ButtonText = styled.div`
	font-size: 1.2rem;
	font-weight: 400;
	color: ${(props) => props.colors.text || props.theme.palette.bg[100]};
`;

export const SignUpButton = (props) => {
	return (
		<ButtonBg
			{...props}
			style={{
				opacity: props.disabled ? "0.4" : "1",
				cursor: props.disabled ? "auto" : "pointer",
			}}
		>
			{props.icon}
			<ButtonText colors={props.colors}>{props.text}</ButtonText>
		</ButtonBg>
	);
};

export const InputTextContainer = styled.div`
	position: relative;
	display: flex;
	width: 90%;

	& .warning-icon {
		display: none;
		position: absolute;
		top: 50%;
		right: 1rem;
		translate: 0% -50%;
		opacity: 0.5;
		transition: opacity 200ms ease-in, transform 200ms ease-in;
		transform: scale(1) rotate(0deg);

		&:hover {
			opacity: 1;
			transform: scale(1.2) rotate(720deg);
		}
	}

	&.valid .warning-icon {
		display: none;
	}

	&.valid .input-text {
		box-shadow: 0px 0px 4px ${({ theme }) => theme.colors.positive};
	}

	&.invalid .warning-icon {
		display: block;
	}

	&.invalid .input-text {
		box-shadow: 0px 0px 4px ${({ theme }) => theme.colors.important};
	}
`;

export const InputText = styled.input`
	display: flex;
	flex-grow: 1;
	justify-content: center;
	align-items: center;
	gap: 0.5rem;
	width: 100%;
	height: 3rem;
	padding-left: 1rem;
	padding-right: 2rem;
	background-color: ${({ theme }) => theme.palette.bg[100]};
	box-shadow: 0px 0px 4px ${({ theme }) => theme.palette.text.title}33;
	border-style: none;
	border-radius: 0.7rem;
	color: ${({ theme }) => theme.palette.text.subtitle};
	font-size: 1rem;
`;
