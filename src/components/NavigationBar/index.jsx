import { useNavigate } from "react-router-dom";
import AvatarImg from "../../assets/boy1.webp";
import Button from "../Button";
import { Avatar, Container, Logo, LogoContainer, LogoText, Section } from "./style";

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
				<div style={{ display: "flex", gap: "1rem" }}>
					<Button
						text="Submit setup"
						onClick={() => {
							console.log("Will submit set up");
						}}
					/>
					<Avatar src={AvatarImg} alt="avatar" />
				</div>
			</Container>
		</Section>
	);
}
