import React from "react";
import "./ProjectDescription.css";
import { ProjectInfo } from "../StaticInformation/ProjectInfo";
import { SkillSetImages } from "../StaticInformation/SkillImagesInfo";

// import M from "materialize-css";

const ProjectDescription = (props) => {
	// let carousel = document.querySelector(".carousel");
	// M.Carousel.init(carousel, {});
	const toolsUsed = [];

	ProjectInfo.tools.forEach((tool, key) => {
		toolsUsed.push(
			<div className="col s12 m1" key={"projectTools" + key}>
				{SkillSetImages.find((skill) => skill.skill === tool) && (
					<>
						<img
							src={SkillSetImages.find((skill) => skill.skill === tool).imagePath}
							alt="SkillSet"
						/>
						{tool}
					</>
				)}
				{!SkillSetImages.find((skill) => skill.skill === tool) && (
					<div className="NoSkillImage">
						<b>{tool}</b>
					</div>
				)}
			</div>
		);
	});
	return (
		<div id="ProjectDesc" className="project-desc">
			<div className="container">
				<h3 className="project-title">Introduction: </h3>
				<h5>{ProjectInfo.intro}</h5>
				<h3 className="project-title">Description: </h3>
				<h6 className="project-desc">{ProjectInfo.description}</h6>
				<h4 className="section-title">Tools Used:</h4>
				<div className="container ">
					<div className="row center skills"> {toolsUsed}</div>
				</div>
			</div>
		</div>
	);
};

export default ProjectDescription;
