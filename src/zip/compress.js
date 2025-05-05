import fs from "fs";
import path from "path";
import {createBrotliCompress} from "zlib";

export const compress = async (sourcePath, destinationPath) => {
	const resolvedSourcePath = path.resolve(sourcePath);
	const resolvedDestinationPath = path.resolve(destinationPath);

	if (!fs.existsSync(resolvedSourcePath)) {
		console.error(`Source file does not exist: ${resolvedSourcePath}`);
		return;
	}

	const sourceStream = fs.createReadStream(resolvedSourcePath);
	const destinationStream = fs.createWriteStream(resolvedDestinationPath);

	const brotliCompress = createBrotliCompress();

	sourceStream
		.pipe(brotliCompress)
		.pipe(destinationStream)
		.on("finish", () => {
			console.log(`File successfully compressed to ${resolvedDestinationPath}`);
		})
		.on("error", (err) => {
			console.error("Error during compression:", err);
		});
};
