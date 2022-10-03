import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { FaDiscord, FaGithub, FaGoogle } from "react-icons/fa";
import { FiAlertCircle } from "react-icons/fi";
import { Route, Routes, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import validator from "validator";
import LogoImg from "../../assets/s-hub_logo_color.svg";
import config from "../../config";
import {
	Container,
	InputText,
	InputTextContainer,
	Logo,
	Section,
	SignUpButton,
	Text,
} from "./style";

const generateState = (len) => {
	const arr = new Uint8Array((len || 40) / 2);
	window.crypto.getRandomValues(arr);
	const str = Array.from(arr, (dec) => dec.toString(16).padStart(2, "0")).join("");
	window.localStorage.setItem("currState", str);
	return str;
};
function SignUp(props) {
	const navigate = useNavigate();
	return (
		<Section>
			<Container>
				<Logo src={LogoImg} />
				<Text>
					Join S-Hub and show <br /> the world your Setups!
				</Text>
				<SignUpButton
					full={true}
					colors={{ bg: "#5865F2", text: "#fefefe" }}
					icon={<FaDiscord size={"1.6rem"} color="#fff" />}
					text="Discord"
					onClick={() =>
						window.location.assign(
							"https://discord.com/oauth2/authorize?response_type=code&client_id=" +
								config.ds_app_client +
								"&scope=identify%20email&redirect_uri=" +
								encodeURIComponent(config.redirect_uri) +
								"&state=ds" +
								generateState(16)
						)
					}
				/>
				<SignUpButton
					full={true}
					colors={{ bg: "#21262e", text: "#fefefe" }}
					icon={<FaGithub size={"1.6rem"} color="#fff" />}
					text="GitHub"
					onClick={() =>
						window.location.assign(
							"https://github.com/login/oauth/authorize?client_id=" +
								config.gh_app_client +
								"&scope=read:user%20user:email&redirect_uri=" +
								encodeURIComponent(config.redirect_uri) +
								"&state=gh" +
								generateState(16)
						)
					}
				/>
				<SignUpButton
					full={true}
					disabled={true}
					colors={{ bg: "#4285F4", text: "#fefefe" }}
					icon={<FaGoogle size={"1.6rem"} color="#fff" />}
					text="Coming soon"
				/>
				<SignUpButton
					full={true}
					colors={{ bg: "#fefefe", text: "#21262e", border: "#21262e" }}
					text="Email"
					onClick={() => navigate("/signup/email")}
				/>
			</Container>
		</Section>
	);
}
function OAuth(props) {
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();
	const processOauthCode = async (code, provider) => {
		axios
			.post(config.api_url + "/auth/oauth", { code: code, type: provider })
			.then(({ data }) => {
				if (data.success) {
					if (data.message == "logged_in") {
						window.location = "/";
					} else {
						navigate("/signup/username", { state: { key: data.key } });
					}
				}
			})
			.catch((e) => {
				console.log(e);
			});
	};
	useEffect(() => {
		if (searchParams.has("code") && searchParams.has("state")) {
			const code = searchParams.get("code");
			const state = searchParams.get("state");
			if (state.substring(2) != window.localStorage.getItem("currState")) {
				return;
			}
			const provider = state.startsWith("ds")
				? "discord"
				: state.startsWith("gh")
				? "github"
				: "google";
			processOauthCode(code, provider);
		}
	}, []);
	return (
		<Section>
			<Text>
				Signing up...
				<br />
				Do not close or refresh this page
			</Text>
		</Section>
	);
}
function Email(props) {
	const [validity, setValidity] = useState({
		email: { value: "", valid: false },
		password: { value: "", valid: false },
		confirm: { value: "", valid: false },
	});
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		if (validity.email.valid && validity.password.valid && validity.confirm.valid) {
			if (loading) {
				return;
			}
			setLoading((_) => true);
			axios
				.post(config.api_url + "/auth/email", {
					email: validity.email.value,
					password: validity.password.value,
				})
				.then(({ data }) => {
					if (data.success) {
						navigate("/signup/email/verify", { state: { key: data.key } });
					} else {
						window.location.reload(false);
					}
				})
				.catch((e) => {})
				.finally(() => {
					setLoading((_) => false);
				});
		} else {
			console.log("Invalid input!");
		}
	};

	return (
		<Section>
			<Container>
				<Text>Register with email</Text>
				<InputTextContainer>
					<InputText
						className="input-text"
						name="email"
						placeholder="Email"
						onChange={(e) => {
							if (validator.isEmail(e.target.value)) {
								e.target.parentElement.classList.remove("invalid");
								e.target.parentElement.classList.add("valid");
								setValidity((value) => {
									return { ...value, email: { value: e.target.value, valid: true } };
								});
							} else {
								e.target.parentElement.classList.remove("valid");
								e.target.parentElement.classList.add("invalid");
								setValidity((value) => {
									return { ...value, email: { value: e.target.value, valid: false } };
								});
							}
						}}
					/>
					<FiAlertCircle
						id="email-warning"
						className="warning-icon"
						color="#ff0000"
						size="1rem"
						data-for="info-tooltip"
						data-tip="Please enter a valid email adress."
						data-type="error"
					/>
				</InputTextContainer>
				<InputTextContainer>
					<InputText
						className="input-text"
						type="password"
						name="pass"
						placeholder="Password"
						onChange={(e) => {
							const confirm = document.getElementById("confirm-password");
							if (confirm.value == e.target.value) {
								confirm.classList.remove("invalid");
								confirm.classList.add("valid");
							} else if (confirm.classList.contains("valid")) {
								confirm.classList.remove("valid");
								confirm.classList.add("invalid");
							}
							if (validator.isStrongPassword(e.target.value)) {
								e.target.parentElement.classList.remove("invalid");
								e.target.parentElement.classList.add("valid");
								setValidity((value) => {
									return { ...value, password: { value: e.target.value, valid: true } };
								});
							} else {
								e.target.parentElement.classList.remove("valid");
								e.target.parentElement.classList.add("invalid");
								if (confirm.classList.contains("valid")) {
									confirm.classList.remove("valid");
									confirm.classList.add("invalid");
								}
								setValidity((value) => {
									return { ...value, password: { value: e.target.value, valid: false } };
								});
							}
						}}
					/>
					<FiAlertCircle
						id="password-warning"
						className="warning-icon"
						color="#ff0000"
						size="1rem"
						data-for="info-tooltip"
						data-tip="Must contain 8 characters, one uppercase, one lowercase, one numeric and one symbol."
						data-type="error"
					/>
				</InputTextContainer>
				<InputTextContainer id="confirm-password">
					<InputText
						className="input-text"
						type="password"
						name="confirmPass"
						placeholder="Confirm password"
						onChange={(e) => {
							if (
								validator.isStrongPassword(validity.password.value) &&
								validity.password.value == e.target.value
							) {
								e.target.parentElement.classList.remove("invalid");
								e.target.parentElement.classList.add("valid");
								setValidity((value) => {
									return { ...value, confirm: { value: e.target.value, valid: true } };
								});
							} else {
								console.log(validity.password.value);
								e.target.parentElement.classList.remove("valid");
								e.target.parentElement.classList.add("invalid");
								setValidity((value) => {
									return { ...value, confirm: { value: e.target.value, valid: false } };
								});
							}
						}}
					/>
					<FiAlertCircle
						id="confirm-warning"
						className="warning-icon"
						color="#ff0000"
						size="1rem"
						data-for="info-tooltip"
						data-tip="Passwords are not matching."
						data-type="error"
					/>
				</InputTextContainer>
				<SignUpButton
					icon={loading ? <AiOutlineLoading /> : <></>}
					onClick={handleSubmit}
					colors={{ bg: "#23D160", text: "#fefefe" }}
					style={{ cursor: loading ? "not-allowed" : "pointer" }}
					text={loading ? "" : "Next"}
				/>
			</Container>
			<ReactTooltip
				id="info-tooltip"
				place="top"
				effect="solid"
				arrowColor="transparent"
				overridePosition={(
					{ left, top },
					currEvent,
					currTarget,
					node,
					place,
					desiredPlace,
					effect,
					offset
				) => {
					const targetRect = currTarget.getBoundingClientRect();
					const popupRect = node.getBoundingClientRect();
					var x = targetRect.x + targetRect.width / 2 - popupRect.width / 2;
					var y = targetRect.y - popupRect.height;
					return { left: x, top: y };
				}}
			/>
		</Section>
	);
}
function VerifyEmail(props) {
	const location = useLocation();
	const [data, setData] = useState({ email: "", key: "" });
	const otp = useRef("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		if (!(data.key && otp.current.length == 6)) {
			console.log("Key or otp invalid!");
			return;
		}
		setLoading((_) => true);
		axios
			.post(config.api_url + "/auth/email/verify", { key: data.key, otp: otp.current })
			.then((res) => {
				if (res.data.success) {
					navigate("/signup/username", { state: { key: data.key } });
				} else {
					console.log(res.data.message);
				}
			})
			.catch((e) => {
				console.log(e);
			})
			.finally(() => {
				setLoading((_) => false);
			});
	};

	useEffect(() => {
		const key = location.state ? location.state.key : false;
		if (!key) {
			console.log("No key!");
			return;
		}
		axios.post(config.api_url + "/auth/key", { key: key }).then(({ data }) => {
			setData((_) => {
				return { email: data.email, key: key };
			});
		});
	}, []);
	return (
		<Section>
			{data.email ? (
				<Container>
					<Text>Email</Text>
					<InputTextContainer>
						<InputText value={data.email || "hello@world.com"} disabled />
					</InputTextContainer>
					<Text>Enter OTP</Text>
					<InputTextContainer>
						<InputText
							placeholder="OTP"
							onChange={(e) => {
								otp.current = e.target.value;
							}}
						/>
					</InputTextContainer>
					<SignUpButton
						icon={loading ? <AiOutlineLoading /> : <></>}
						onClick={handleSubmit}
						colors={{ bg: "#23D160", text: "#fefefe" }}
						style={{ cursor: loading ? "not-allowed" : "pointer" }}
						text={loading ? "" : "Next"}
					/>
				</Container>
			) : (
				<Text>Loading...</Text>
			)}
		</Section>
	);
}
function Username(props) {
	const location = useLocation();
	const data = useRef({ key: "", username: "" });
	const [errorMessage, setErrorMessage] = useState("");
	const [loading, setLoading] = useState(false);
	const handleSubmit = (e) => {
		if (loading) {
			return;
		} else {
			setLoading((_) => true);
			axios
				.post(config.api_url + "/auth/signup", {
					...data.current,
				})
				.then(({ data }) => {
					if (data.success) {
						window.location = "/";
					} else {
						console.log(data.message);
					}
				})
				.catch((e) => {
					console.log(e);
				})
				.finally(() => {
					setLoading((_) => false);
				});
		}
	};
	let timer;
	let controller = new AbortController();
	const checkUserName = (target) => {
		clearTimeout(timer);
		controller.abort();
		timer = setTimeout(() => {
			controller = new AbortController();
			if (
				!data.current.username ||
				!validator.matches(data.current.username, "[a-zA-Z0-9_.-]{3,8}")
			) {
				setErrorMessage(
					(_) =>
						"Must be between 3 and 8 characters. Only alphanumeric characters, ., _, - allowed."
				);
				target.parentElement.classList.remove("valid");
				target.parentElement.classList.add("invalid");
				return;
			}
			axios
				.post(
					config.api_url + "/auth/validate-username",
					{ username: data.current.username },
					{ signal: controller.signal }
				)
				.then(({ data }) => {
					if (data) {
						if (!data.success) {
							target.parentElement.classList.remove("invalid");
							target.parentElement.classList.add("valid");
						} else {
							setErrorMessage((_) => "Username already exists!");
							target.parentElement.classList.remove("valid");
							target.parentElement.classList.add("invalid");
						}
					}
				})
				.catch((e) => {
					console.log(e);
				});
		}, 500);
	};
	useEffect(() => {
		const key = location.state ? location.state.key : false;
		if (!key) {
			console.log("No key!");
			return;
		} else {
			data.current.key = key;
		}
	});
	return (
		<Section>
			<Container>
				<Text>Choose username</Text>
				<InputTextContainer>
					<InputText
						className="input-text"
						id="username-input"
						name="username"
						placeholder="Username"
						pattern="[a-zA-Z0-9_\.\-]"
						onChange={(e) => {
							data.current.username = e.target.value;
							checkUserName(e.target);
						}}
					/>
					<FiAlertCircle
						id="username-warning"
						className="warning-icon"
						color="#ff0000"
						size="1rem"
						data-for="info-tooltip"
						data-tip={errorMessage}
						data-type="error"
					/>
				</InputTextContainer>
				<SignUpButton
					icon={
						loading ? (
							<AiOutlineLoading size="1.6rem" color="#fff" className="button-loading" />
						) : (
							<></>
						)
					}
					colors={{ bg: "#23D160", text: "#fefefe" }}
					text={!loading ? "Submit" : ""}
					onClick={handleSubmit}
				/>
			</Container>
			<ReactTooltip
				id="info-tooltip"
				place="top"
				effect="solid"
				arrowColor="transparent"
				overridePosition={(
					{ left, top },
					currEvent,
					currTarget,
					node,
					place,
					desiredPlace,
					effect,
					offset
				) => {
					const targetRect = currTarget.getBoundingClientRect();
					const popupRect = node.getBoundingClientRect();
					var x = targetRect.x + targetRect.width / 2 - popupRect.width / 2;
					var y = targetRect.y - popupRect.height;
					return { left: x, top: y };
				}}
			/>
		</Section>
	);
}

export default function Auth(props) {
	return (
		<Routes>
			<Route path="/" element={<SignUp />} />
			<Route path="/email" element={<Email />} />
			<Route path="/email/verify" element={<VerifyEmail />} />
			<Route path="/oauth" element={<OAuth />} />
			<Route path="/username" element={<Username />} />
		</Routes>
	);
}
