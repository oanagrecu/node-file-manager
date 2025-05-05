import {writeFile} from "node:fs/promises";
import path from "node:path";

export const add = async (currentDir, fileName) => {
	try {
		const fullPath = path.join(currentDir, fileName);
		await writeFile(fullPath, "", {flag: "wx"});
	} catch {
		console.log("Operation failed");
	}
};
