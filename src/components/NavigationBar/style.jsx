import { NavLink } from "react-router-dom";
import SHubLogo from "../../assets/s-hub_logo.jsx";
import styled from "styled-components";

export const Section = styled.div`
	position: sticky;
	display: block;
	background-color: ${({ theme }) => theme.palette.bg[100]};
`;

export const Container = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 1rem;
	margin-left: auto;
	margin-right: auto;
	padding-left: 1rem;
	padding-right: 1rem;
	height: 4.8rem;
	max-width: 80rem;
`;

export const LogoContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	gap: 0.7rem;
	height: 3rem;
	cursor: pointer;
`;

export const LogoText = styled.div`
	display: flex;
	flex-direction: row;
	gap: 0.3rem;
	align-items: center;
	height: 2.2rem;
	font-size: 2rem;
	font-weight: 700;
	color: ${({ theme }) => theme.palette.text.title};
	.logo-by {
		align-self: flex-end;
		font-size: 1rem;
		font-weight: 400;
	}
	.logo-core {
		align-self: flex-end;
		font-family: Righteous, sans-serif;
		font-size: 1rem;
	}
`;

export const Logo = styled(SHubLogo)`
	height: 3rem;
	width: 3rem;
	color: ${({ theme }) => theme.palette.text.title};
`;

export const Links = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	gap: 1.5rem;
	flex-grow: 1;
`;

export const Link = styled(NavLink)`
	text-decoration: none;
	font-size: 1.2rem;
	font-weight: 500;
	color: ${({ theme }) => theme.palette.text.title};
	&.active {
		text-shadow: ${({ theme }) => theme.palette.text.title} 0 0 0.7rem;
	}
`;

export const Avatar = styled.img`
	height: 2.4rem;
	/* width: 2.5rem; */
	padding: 0.1rem;
	border-style: solid;
	border-width: 0.2rem;
	border-color: ${({ theme }) => theme.palette.text.title};
	border-radius: 9999px;
`;
