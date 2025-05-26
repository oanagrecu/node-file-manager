import fs from "fs";
import path from "path";
import crypto from "crypto";
import {access, constants} from "fs/promises";

export const hash = async (currentDir, fileName) => {
	try {
		const filePath = path.resolve(currentDir, fileName);

		await access(filePath, constants.F_OK);

		const hash = crypto.createHash("sha256");

		const readStream = fs.createReadStream(filePath);

		readStream.on("data", (chunk) => {
			hash.update(chunk);
		});

		readStream.on("end", () => {
			const fileHash = hash.digest("hex");
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
