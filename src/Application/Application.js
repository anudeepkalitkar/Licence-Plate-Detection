import React, { useEffect, useState } from "react";
import axios from "axios";
import M from "materialize-css";
import "./Application.css";
import { BackEndUploadURL, BackEndImageURL } from "../StaticInformation/UrlLinkInfo";
import { staticImages } from "../StaticInformation/ImagesInfo";
const Application = (props) => {
	const showStaticImage = [];
	const [licenseNumber, SetLicenseNumber] = useState(null);
	const [filesUpload, SetFilesUpload] = useState({
		carImage: "",
	});
	const [showUploadedImage, SetShowUploadedImage] = useState(null);
	const [staticImageNo, SetStaticImageNo] = useState(0);

	useEffect(() => {
		let modal = document.querySelector(".modal");
		M.Modal.init(modal, {});
	}, []);

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		if (staticImageNo === 0) {
			const formData = new FormData();
			Object.keys(filesUpload).forEach((inputName) => {
				if (filesUpload[inputName]) {
					formData.append(inputName, filesUpload[inputName]);
				}
			});
			let laneImages = {
				method: "post",
				"Content-Type": "multipart/form-data",
				url: BackEndUploadURL,
				data: formData,
			};
			await axios(laneImages).then(
				(res) => {
					if (res.data) {
						SetLicenseNumber(res.data.numberPlate);
					}
				},
				(error) => console.log(error)
			);
		} else {
			let laneImages = {
				method: "post",
				"Content-Type": "application/json",
				url: BackEndImageURL,
				data: { staticImageNo: staticImageNo },
			};
			await axios(laneImages).then(
				(res) => {
					if (res.data) {
						SetLicenseNumber(res.data.numberPlate);
					}
				},
				(error) => console.log(error)
			);
		}
	};

	const handleFileUpload = (e) => {
		SetFilesUpload({ ...filesUpload, [e.target.id]: e.target.files[0] });
		SetShowUploadedImage(URL.createObjectURL(e.target.files[0]));
		SetStaticImageNo(0);
	};
	const handleSelectImage = (e) => {
		SetStaticImageNo({ name: e.target.id });

		SetShowUploadedImage(e.target.src);
	};

	staticImages.forEach((img, key) => {
		showStaticImage.push(
			<div className="col s12 m4" key={key}>
				<a
					className="modal-close"
					id={img.name}
					src={img.path}
					onClick={handleSelectImage}
					href="#!">
					<img className="responsive-img" src={img.path} alt={img.name} id={img.name} />
				</a>
				{img.name}
			</div>
		);
	});
	return (
		<div className="application">
			<div className="container form-container">
				<h5 className="form-desc center">Upload a Car Image and see the magic</h5>
				<form id="form" className="container" onSubmit={handleFormSubmit}>
					<div className="container ">
						<div className="input-field file-field">
							<div className="btn">
								<span>Browse</span>
								<input
									type="file"
									id="carImage"
									name="carImage"
									onChange={handleFileUpload}
								/>
							</div>
							<div className="file-path-wrapper">
								<input
									className="file-path white-text"
									type="text"
									placeholder="Upload Car Image"
									id="carImage_Imagepath"
									name="carImage_Imagepath"
									value={filesUpload.carImage.name}
								/>
							</div>
						</div>
						{showUploadedImage !== null && (
							<div className="center">
								<img
									className="responsive-img"
									src={showUploadedImage}
									alt="Uploaded Image"
								/>
							</div>
						)}
						<div className="row center">
							<div className="col s12 m6">
								<h6>
									<b>Don't have images! No worries I got your back </b>
								</h6>
								<div className="divider"></div>
							</div>
							<div className="col s12 m6">
								<button
									data-target="showImages"
									className="btn-large modal-trigger">
									Select Images
								</button>
							</div>
						</div>
					</div>

					<div className="center">
						<button className="btn-large" onClick={handleFormSubmit}>
							Submit
							<i className="material-icons right">send</i>
						</button>
					</div>
				</form>
				<div id="showImages" className="modal  grey darken-3">
					<div className="modal-content ">
						<div className="row center">{showStaticImage}</div>
					</div>
					<div className="modal-footer grey darken-3">
						<a href="#!" className="modal-close btn">
							close
						</a>
					</div>
				</div>
				{licenseNumber !== null && (
					<div className="container center black-text">
						<h1>Detected Number Plate: {licenseNumber}</h1>
						<div className="divider"></div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Application;
