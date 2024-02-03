import React from "react";
import "./Footer.css";
import { HeaderInfo } from "../StaticInformation/AboutMeInfo";
import { linkedinUrl, githubUrl, gmailUrl, instagramUrl, PortFolioURL } from "../StaticInformation/UrlLinkInfo";

const Footer = (props) => {
	return (
		<footer>
			<div className="divider-top"></div>
			<div className="divider black"></div>
			<div className="footer">
				<div className="">
					<div className="row">
						<div className=" col s1"></div>
						<div className="col s7">
							<div className="profile-content">
								<h5 className="footer-heading">
									<b>Anudeep Kalitkar</b>
								</h5>
								<h6 className="footer-desc">{HeaderInfo}</h6>
							</div>
						</div>
						<div className="col s3">
							<h5 className="footer-heading">
								<b>Reach Me at:</b>
							</h5>

							<ul className="social list-inline footer-desc">
								<li className="list-inline">
									<a
										className="icon"
										href={linkedinUrl}
										rel="noreferrer"
										target="_blank">
										<i className="fab fa-linkedin-in"></i>
									</a>
								</li>
								<li className="list-inline">
									<a
										className="icon"
										href={githubUrl}
										rel="noreferrer"
										target="_blank">
										<i className="fab fa-github-alt"></i>
									</a>
								</li>
								<li className="list-inline">
									<a
										className="icon"
										href={gmailUrl}
										rel="noreferrer"
										target="_blank">
										<i className="fas fa-envelope"></i>
									</a>
								</li>
								<li className="list-inline">
									<a
										className="icon"
										href={instagramUrl}
										rel="noreferrer"
										target="_blank">
										<i className="fab fa-instagram"></i>
									</a>
								</li>
							</ul>
							<a className="btn-large grey" href={PortFolioURL}>
								<b>Click to here for Portfolio</b>
							</a>
						</div>
						<div className="col s3">
						
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
