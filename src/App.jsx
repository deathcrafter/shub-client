// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import "./App.css";
import NavBar from "./components/NavigationBar";
import { Auth, Explore } from "./pages";
import Redirector from "./pages/Redirector";
import { lightTheme } from "./themes";

function App() {
	return (
		<ThemeProvider theme={lightTheme}>
			<BrowserRouter>
				<NavBar />
				<Routes>
					<Route path="/" element={<Explore />} />
					<Route path="/signup/*" element={<Auth />} />
					<Route path="/signup/redirect" element={<Redirector />} />
					{/* <Route path="/about" element={<About />} /> */}
					{/* <Route path="/explore" element={<Explore />} /> */}
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default App;
