import fs from "fs";
import path from "path";
import {access, constants} from "fs/promises";

export const mv = async (currentDir, src, dest) => {
	try {
		const srcPath = path.resolve(currentDir, src);
		const destDir = path.resolve(currentDir, dest);

		await access(srcPath, constants.F_OK);
		await access(destDir, constants.F_OK);

		const fileName = path.basename(srcPath);
		const destPath = path.join(destDir, fileName);

		const readStream = fs.createReadStream(srcPath);
		const writeStream = fs.createWriteStream(destPath);

		await new Promise((resolve, reject) => {
			readStream.pipe(writeStream);
			readStream.on("error", reject);
			writeStream.on("error", reject);
			writeStream.on("finish", resolve);
		});

		await fs.promises.unlink(srcPath);

		console.log(`File successfully moved to ${destPath}`);
	} catch (err) {
		console.error("Error during file move:", err);
		throw new Error("FS operation failed");
	}
};
