import {readFile} from "fs/promises";
import path from "path";

export const cat = async (currentDir, filePath) => {
	const fullPath = path.resolve(currentDir, filePath);

	try {
		const content = await readFile(fullPath, "utf-8");
		console.log(content);
	} catch {
		console.log("Operation failed");
	}
};
