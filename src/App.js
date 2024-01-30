import "./App.css";
import React from "react";
import { ProjectInfo } from "./StaticInformation/ProjectInfo";
import Application from "./Application/Application";

function App() {
	return (
		<div className="body">
			<h1 className="center project-title">{ProjectInfo.title}</h1>
			<Application></Application>
		</div>
	);
}

export default App;
