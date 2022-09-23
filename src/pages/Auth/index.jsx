import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { FaDiscord, FaGithub, FaGoogle } from "react-icons/fa";
import { FiAlertCircle } from "react-icons/fi";
import ReactTooltip from "react-tooltip";
import Swal from "sweetalert2";
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

function SignUp(props) {
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
					onClick={() => props.onNext("discord")}
				/>
				<SignUpButton
					full={true}
					colors={{ bg: "#21262e", text: "#fefefe" }}
					icon={<FaGithub size={"1.6rem"} color="#fff" />}
					text="GitHub"
					onClick={() => props.onNext("github")}
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
					onClick={() => props.onNext("email")}
				/>
			</Container>
		</Section>
	);
}

const generateId = (len) => {
	var arr = new Uint8Array((len || 40) / 2);
	window.crypto.getRandomValues(arr);
	return Array.from(arr, (dec) => dec.toString(16).padStart(2, "0")).join("");
};

function OAuth(props) {
	const processOauthCode = async (code, provider) => {
		axios
			.post(config.api_url + "/auth/" + provider, { code: code })
			.then(({ data }) => {
				if (data.success) {
					if (data.message == "logged_in") {
						window.location = "/";
					} else {
						props.onNext(data.key);
					}
				}
			})
			.catch((e) => {
				alert("Please check your connection!");
				window.location.reload(false);
			});
	};

	useEffect(() => {
		const provider = props.provider;
		const raw_state = generateId(16);
		axios.post(config.api_url + "/auth/auth-uri", { provider: provider }).then(({ data }) => {
			if (data.success) {
				const authUri = data.uri + "&state=" + raw_state;
				const popup = open(authUri, "_blank", "popup,width=600,height=500");
				const timer = setInterval(() => {
					if (popup.closed) {
						dispatchEvent(
							new CustomEvent(`finishAuth${raw_state}`, {
								detail: { success: false, error: "authorization_terminated" },
							})
						);
					}
				}, 500);
				const authFinishHandler = (e) => {
					clearInterval(timer);
					popup.close();
					removeEventListener(`finishAuth${raw_state}`, authFinishHandler);
					const { success, code, state, error } = e.detail;
					if (success && state == raw_state) {
						processOauthCode(code, provider);
					} else {
						props.onAuthError(error);
					}
				};
				addEventListener(`finishAuth${raw_state}`, authFinishHandler);
			} else {
				props.onAuthError(data.message);
			}
		});
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
						props.onNext(data.key);
					} else {
						props.onAuthError(data.message);
					}
				})
				.catch((e) => {
					alert("Please check your connection!");
					window.location.reload(false);
				})
				.finally(() => {
					setLoading((_) => false);
				});
		} else {
			console.log("Invalid input!");
		}
	};

	// useEffect(() => {
	// 	var timeout = undefined;
	// 	window.addEventListener("resize", (e) => {
	// 		clearTimeout(timeout);
	// 		timeout = setTimeout(() => {
	// 			console.log("rebuilding tool tip");
	// 			ReactTooltip.rebuild();
	// 		}, 250);
	// 	});
	// });

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

function Username(props) {
	const [errorMessage, setErrorMessage] = useState("");
	const username = useRef("");
	const [loading, setLoading] = useState(false);
	const handleSubmit = (e) => {
		if (loading) {
			return;
		} else {
			setLoading((_) => true);
			axios
				.post(config.api_url + "/auth/signup", {
					key: props.tempkey,
					username: username.current,
				})
				.then(({ data }) => {
					if (data.success) {
						window.location = "/";
					} else {
						props.onAuthError(data.message);
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
			if (!username.current || !validator.matches(username.current, "[a-zA-Z0-9_.-]{3,8}")) {
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
					{ username: username.current },
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
							username.current = e.target.value;
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
	const [authType, setAuthType] = useState("");
	const tempKey = useRef("");
	const setTempKey = (func) => {
		tempKey.current = func(tempKey.current);
	};
	const errorHandler = (error) => {
		Swal.fire("Sign up error", error || "unknown_error", "error");
		setAuthType((_) => "");
	};
	let component;
	if (authType) {
		switch (authType) {
			case "username":
				component = <Username tempkey={tempKey.current} onAuthError={errorHandler} />;
				break;
			case "email":
				component = (
					<Email
						onNext={(key) => {
							setTempKey((_) => key);
							setAuthType((_) => "username");
						}}
						onAuthError={errorHandler}
					/>
				);
				break;
			default:
				component = (
					<OAuth
						provider={authType}
						onNext={(key) => {
							setTempKey((_) => key);
							setAuthType((_) => "username");
						}}
						onAuthError={errorHandler}
					/>
				);
				break;
		}
	} else {
		component = <SignUp onNext={(type) => setAuthType((_) => type)} />;
	}

	return component;
}
