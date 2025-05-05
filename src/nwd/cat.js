import fs from "node:fs";
import path from "node:path";

export const cat = async (currentDir, filePath) => {
	const fullPath = path.resolve(currentDir, filePath);

	return new Promise((resolve) => {
		const readStream = fs.createReadStream(fullPath, {encoding: "utf8"});

		readStream.on("error", () => {
			console.log("Operation failed");
			resolve();
		});

		readStream.on("open", () => {
			readStream.pipe(process.stdout);
		});

		readStream.on("end", () => {
			console.log();
			resolve();
		});
	});
};
