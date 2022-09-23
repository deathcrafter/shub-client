import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Section, Text } from "./style";

export default function Redirector(props) {
	const [valid, setValid] = useState(true);
	const [searchParams, setSearchParams] = useSearchParams();
	useEffect(() => {
		const code = searchParams.get("code");
		const state = searchParams.get("state");
		const error = searchParams.get("error");
		setSearchParams({});

		const opener = window.opener;
		if (!opener) {
			setValid((value) => false);
			return;
		}

		if (state) {
			if (error) {
				opener.dispatchEvent(
					new CustomEvent(`finishAuth${state}`, {
						detail: { success: false, error: error },
					})
				);
			} else if (code) {
				opener.dispatchEvent(
					new CustomEvent(`finishAuth${state}`, {
						detail: { success: true, code: code, state: state },
					})
				);
			}
		} else {
			setValid((value) => false);
		}
	}, []);
	return (
		<Section>
			<Text>{valid ? "Redirecting..." : "404 error"}</Text>
		</Section>
	);
}
