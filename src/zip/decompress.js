import fs from "fs";
import path from "path";
import {createBrotliDecompress} from "zlib";

export const decompress = async (sourcePath, destinationPath) => {
	const resolvedSourcePath = path.resolve(sourcePath);
	const resolvedDestinationPath = path.resolve(destinationPath);

	if (!fs.existsSync(resolvedSourcePath)) {
		console.error(`Source file does not exist: ${resolvedSourcePath}`);
		return;
	}

	const sourceStream = fs.createReadStream(resolvedSourcePath);
	const destinationStream = fs.createWriteStream(resolvedDestinationPath);

	const brotliDecompress = createBrotliDecompress();

	sourceStream
		.pipe(brotliDecompress)
		.pipe(destinationStream)
		.on("finish", () => {
			console.log(`File successfully decompressed to ${resolvedDestinationPath}`);
		})
		.on("error", (err) => {
			console.error("Error during decompression:", err);
		});
};
