import {mkdir as fsMkdir} from "node:fs/promises";
import path from "node:path";

export const mkdir = async (currentDir, dirName) => {
	try {
		const fullPath = path.join(currentDir, dirName);
		await fsMkdir(fullPath);
	} catch {
		console.log("Operation failed");
	}
};
