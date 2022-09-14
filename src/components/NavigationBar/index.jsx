import { useNavigate } from "react-router-dom";
import AvatarImg from "../../assets/boy1.webp";
import { Avatar, Container, Link, Links, Logo, LogoContainer, LogoText, Section } from "./style";
import Button from "../Button";

export default function NavBar(props) {
	const navigate = useNavigate();
	return (
		<Section>
			<Container>
				<LogoContainer onClick={() => navigate("/")}>
					<Logo />
					<LogoText>
						S Hub <span className="logo-by">by</span> <span className="logo-core">JaxCore</span>
					</LogoText>
				</LogoContainer>
				<Links>
					<Link to="/explore">Explore</Link>
					<Link to="/about">About</Link>
					<Link to="/faq">FAQ</Link>
				</Links>
				<Button
					text="Submit setup"
					onClick={() => {
						console.log("Will submit set up");
					}}
				/>
				<Avatar src={AvatarImg} alt="avatar" />
			</Container>
		</Section>
	);
}
