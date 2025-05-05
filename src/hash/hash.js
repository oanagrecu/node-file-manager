import fs from "fs";
import path from "path";
import crypto from "crypto";
import {access, constants} from "fs/promises";

export const hash = async (currentDir, fileName) => {
	try {
		const filePath = path.resolve(currentDir, fileName);

		// Check if the file exists
		await access(filePath, constants.F_OK);

		// Create a hash object (e.g., using sha256)
		const hash = crypto.createHash("sha256");

		// Create a readable stream for the file
		const readStream = fs.createReadStream(filePath);

		// Pipe the file data into the hash object
		readStream.on("data", (chunk) => {
			hash.update(chunk); // Update the hash with each chunk of data
		});

		// Once the file is fully processed, print the hash
		readStream.on("end", () => {
			const fileHash = hash.digest("hex"); // Get the final hash in hexadecimal format
			console.log(`Hash of file ${fileName}: ${fileHash}`);
		});

		readStream.on("error", (err) => {
			console.error("Error reading file:", err);
		});
	} catch (err) {
		console.error("Error during hash calculation:", err);
		throw new Error("FS operation failed");
	}
};
