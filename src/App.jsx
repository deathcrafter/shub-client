// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./themes";
import "./App.css";
import NavBar from "./components/NavigationBar";
import { About, Explore, Home } from "./pages";

function App() {
	return (
		<ThemeProvider theme={lightTheme}>
			<BrowserRouter>
				<NavBar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<About />} />
					<Route path="/explore" element={<Explore />} />
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default App;
