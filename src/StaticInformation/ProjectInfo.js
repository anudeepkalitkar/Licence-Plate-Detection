const ProjectInfo = {
	title: "License Plate Detection",
	coverImage: "Images/License-Plate.png",
	intro: "Our Automatic Vehicle Number Plate Recognition (ANPR) system utilizes dash camera footage to detect and cross-reference license plates, aiding in vehicle identification for traffic-related applications.",
	description:
		"In today's bustling traffic environment, the Automatic Vehicle Number Plate Recognition (ANPR) system stands out as an essential tool for various applications. With the proliferation of dash cameras in vehicles, there's a continuous stream of traffic data available. This data is invaluable for identifying stolen vehicles, pinpointing vehicles involved in accidents, and more. Our proposed system begins by capturing a crisp, distortion-free image of the vehicle's number plate. Once captured, the Plate Extraction algorithm comes into play, isolating the license plate from the rest of the image. This cropped image then undergoes Optical Character Recognition (OCR), a powerful tool that identifies and translates the characters on the plate into text. Finally, the detected license number is cross-referenced with a comprehensive database of registered vehicles. This streamlined process ensures accurate, efficient, and rapid vehicle identification, making our ANPR system a game-changer in traffic-related applications.",
	link: null,
	like: "License-Plate-Detection",
	tools: ["Python", "Node.js", "OCR", "OpenCV"],
	sourceCode: null,
};

export { ProjectInfo };
