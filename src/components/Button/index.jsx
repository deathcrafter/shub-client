import styled from "styled-components";

const ButtonBg = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 3rem;
	padding-left: 1rem;
	padding-right: 1rem;
	border-radius: 9999px;
	background-color: ${(props) => {
		switch (props.type) {
			case "positive":
				return props.theme.palette.colors.positive;
			case "neutral":
				return props.theme.palette.colors.neutral;
			case "important":
				return props.theme.palette.colors.important;
			default:
				return props.theme.palette.text.title;
		}
	}};
	cursor: pointer;
`;

const ButtonText = styled.span`
	font-size: 1.2rem;
	font-weight: 500;
	color: ${({ theme }) => theme.palette.bg[100]};
`;

export default function Button(props) {
	return (
		<ButtonBg onClick={(e) => props.onClick(e)}>
			<ButtonText>{props.text}</ButtonText>
		</ButtonBg>
	);
}
