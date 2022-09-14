const commonThemeContent = {
	breakpoints: {
		large: "1000px",
		medium: "880px",
		small: "450px",
		xsmall: "",
	},
	colors: {
		core: "linear-gradient(41.99deg, #F23400 0%, #FFB700 95.26%)",
		positive: "#23D160",
		neutral: "#2F80ED",
		important: "#FE3E46",
	},
};

const darkTheme = {
	theme: "dark",
	palette: {
		bg: {
			100: "#121212",
			200: "#1C1C1C",
			300: "#1F1F1F",
			default: "#202020",
		},
		fg: {
			100: "#323232",
		},
		text: {
			title: "#FFFFFF",
			subtitle: "#787878",
		},
	},
	...commonThemeContent,
};

const lightTheme = {
	theme: "light",
	palette: {
		bg: {
			100: "#FEFEFE",
			200: "#F6F6F6",
			300: "#ECECEC",
			400: "#E1E1E1",
		},
		fg: {
			100: "#D0D0D0",
		},
		text: {
			title: "#2E3440",
			subtitle: "#4C566A",
		},
	},
	...commonThemeContent,
};

export { darkTheme, lightTheme };
