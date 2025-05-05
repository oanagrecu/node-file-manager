// src/cat.js
import fs from "node:fs";
import path from "node:path";

export const cat = async (currentDir, filePath) => {
	const fullPath = path.resolve(currentDir, filePath);

	return new Promise((resolve) => {
		const readStream = fs.createReadStream(fullPath, {encoding: "utf8"});

		readStream.on("error", () => {
			console.log("Operation failed");
			resolve(); // Allow returning to prompt
		});

		readStream.on("open", () => {
			readStream.pipe(process.stdout);
		});

		readStream.on("end", () => {
			console.log(); // Add newline after content
			resolve(); // Allow returning to prompt
		});
	});
};
