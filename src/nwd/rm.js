import fs from "fs";
import path from "path";
import {access, constants} from "fs/promises";

export const rm = async (currentDir, file) => {
	try {
		const filePath = path.resolve(currentDir, file);

		await access(filePath, constants.F_OK);

		await fs.promises.unlink(filePath);

		console.log(`File ${file} has been deleted.`);
	} catch (err) {
		console.error("Error during file deletion:", err);
		throw new Error("FS operation failed");
	}
};
