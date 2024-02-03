import "./App.css";
import React from "react";
import { ProjectInfo } from "./StaticInformation/ProjectInfo";
import Application from "./Application/Application";
import Footer from "./Footer/Footer"

function App() {
	return (
		<div className="body">
			<h1 className="center project-title">{ProjectInfo.title}</h1>
			<Application></Application>
			<Footer></Footer>
		</div>
	);
}

export default App;
