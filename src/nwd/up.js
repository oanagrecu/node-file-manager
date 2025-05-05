import path from "node:path";

export const up = (currentDir) => {
	const root = path.parse(currentDir).root;
	if (currentDir === root) {
		console.log("You are already at the root directory.");
		return currentDir;
	}
	const parentDir = path.dirname(currentDir);
	return parentDir;
};
