import path from "node:path";
import {promises as fs} from "node:fs";

export const cd = async (currentDir, targetDir) => {
	if (!targetDir) {
		console.log("Invalid input: Expect to have: 1 param(s) provided.");
		return currentDir;
	}

	const resolvedPath = path.resolve(currentDir, targetDir);

	try {
		const stats = await fs.stat(resolvedPath);
		if (stats.isDirectory()) {
			return resolvedPath;
		} else {
			console.log("Operation failed: Not a directory");
			return currentDir;
		}
	} catch (err) {
		console.log("Operation failed: ENOENT: no such file or directory", err);
		return currentDir;
	}
};
